<?php

/**
 * Site Controller, default controller when going to URL with no parameters.
 *
 * @category   Controller
 * @package    Site
 * @license    http://opensource.org/licenses/osl-3.0.php  Open Software License (OSL 3.0)
 * @copyright  Copyright &copy; 2013 Lightspeed Retail, Inc. http://www.lightspeedretail.com
 * @version    3.0
 * @since      2013-05-14
 */
class SiteController extends Controller
{
	public $layout = '//layouts/column2';

	/**
	 * Default action.
	 *
	 * This is the default 'index' action that is invoked
	 * when an action is not explicitly requested by users.
	 *
	 * @return void
	 */
	public function actionIndex()
	{
		$homePage = _xls_get_conf('HOME_PAGE', '*products');

		switch ($homePage)
		{
			case "*index":
				if (Yii::app()->params['LIGHTSPEED_MT'] == '1')
				{
					if (Yii::app()->theme->info->showCustomIndexOption)
					{
						$this->render("/site/index");
					}
					else
					{
						$this->forward("search/browse");
					}
				}
				else
				{
					$this->render("/site/index");
				}

				break;

			case "*products":
				$this->forward("search/browse");
				break;

			default:
				//Custom Page
				$objCustomPage = CustomPage::LoadByKey($homePage);
				if (!($objCustomPage instanceof CustomPage))
				{
					_xls_404();
				}

				$this->pageTitle = $objCustomPage->PageTitle;
				$this->pageDescription = $objCustomPage->meta_description;
				$this->pageImageUrl = '';
				$this->breadcrumbs = array(
					$objCustomPage->title => $objCustomPage->RequestUrl,
				);

				$dataProvider = $objCustomPage->taggedProducts();

				$this->CanonicalUrl = $objCustomPage->CanonicalUrl;
				$this->render('/custompage/index', array('model' => $objCustomPage, 'dataProvider' => $dataProvider));
				break;
		}
	}

	/**
	 * Sitemap
	 */
	public function actionMap()
	{

		$tdata = Category::GetTree(true);
		$arrCustomPages = CustomPage::model()->activetabs()->findAll();
		$arrProducts = array();

		$this->render('map', array('tdata' => $tdata, 'arrProducts' => $arrProducts, 'arrCustomPages' => $arrCustomPages));
	}

	/**
	 * This is the action to handle external exceptions.
	 */
	public function actionError()
	{
		$strPath = Yii::app()->getViewPath();
		if (substr($strPath, -5) == "views")
		{
			Yii::app()->setViewPath(Yii::getPathOfAlias('application') . "/views-cities");
		}

		$this->layout = '//layouts/errorlayout';

		if ($error = Yii::app()->errorHandler->error)
		{
			if (Yii::app()->request->isAjaxRequest)
			{
				echo $error['message'];
			}
			elseif (Yii::app()->request->preferredAcceptType['type'] === 'text' && Yii::app()->request->preferredAcceptType['subType'] === 'html')
			{
				$this->render('error', $error);
			}
		}
	}

	/**
	 * Process login from the popup Login box
	 */
	public function actionLogin()
	{
		if (!Yii::app()->user->isGuest && Yii::app()->isCommonSSL)
		{
			Yii::app()->user->logout();
		}

		if (!Yii::app()->user->isGuest)
		{
			$this->redirect($this->createAbsoluteUrl("/site"));
		}

		$model = new LoginForm();
		$model->setScenario('Existing');

		$response_array = array();

		// collect user input data
		if (isset($_POST['LoginForm']))
		{
			Yii::log("Attempting login", 'info', 'application.' . __CLASS__ . "." . __FUNCTION__);
			$model->attributes = $_POST['LoginForm'];
			// validate user input and redirect to the previous page if valid
			if ($model->validate() && $model->login())
			{
				// remove any existing form information in cache
				unset(Yii::app()->session[MultiCheckoutForm::$sessionKey]);

				//If we're doing this as a shared login, redirect
				if (Yii::app()->isCommonSSL)
				{
					Yii::log("Common login redirecting", 'info', 'application.' . __CLASS__ . "." . __FUNCTION__);
					//We logged in under the common URL but we don't stay here, so pass our login back

					$strTimestamp = date("YmdHis");
					$intCart = Yii::app()->shoppingcart->id;
					$strIdentity = Yii::app()->user->id . "," . $intCart . "," . $strTimestamp;

					Yii::log("Going to Shared URL with info: " . $strIdentity, 'info', 'application.' . __CLASS__ . "." . __FUNCTION__);
					$redirString = _xls_encrypt($strIdentity);

					$url = Yii::app()->createAbsoluteUrl("commonssl/login", array('link' => $redirString), 'http');
					$strCustomUrl = Yii::app()->params['LIGHTSPEED_HOSTING_CUSTOM_URL'];
					$strLightSpeedUrl = Yii::app()->params['LIGHTSPEED_HOSTING_LIGHTSPEED_URL'];
					$url = str_replace(
						$strLightSpeedUrl,
						$strCustomUrl,
						$url
					);

					Yii::app()->getRequest()->redirect($url, true);
				}
				else
				{
					$this->redirect($this->createAbsoluteUrl("site/index", array(), 'http'));
				}
			}
		}

		if (Yii::app()->request->isAjaxRequest)
		{
			echo json_encode($response_array);
		}
		else
		{
			$this->render('login', array('model' => $model));
		}
	}

	/**
	 * Logs out the current user and redirect to homepage.
	 */
	public function actionLogout()
	{
		Yii::app()->user->logout();
		if (_xls_facebook_login())
		{
			Yii::app()->facebook->destroySession();
		}
		if (Yii::app()->isCommonSSL)
		{
			$url = Yii::app()->createUrl("site/logout");
			$url = str_replace(
				"https://" . Yii::app()->params['LIGHTSPEED_HOSTING_LIGHTSPEED_URL'],
				"http://" . Yii::app()->params['LIGHTSPEED_HOSTING_CUSTOM_URL'],
				$url
			);
		}
		else
		{
			$url = $this->createAbsoluteUrl("site/index", array(), 'http');
		}

		$this->redirect($url);
	}

	/**
	 * Displays the category grid of top level categories to begin browsing
	 */
	public function actionCategory()
	{

		$id = Yii::app()->getRequest()->getQuery('id');

		//If we're not passing a specific category id, reroute to main display
		if (!empty($id))
		{
			$this->redirect(array('search/index?c=' . $id));
		}

		$criteria = new CDbCriteria();
		$criteria->alias = 'Category';
		$criteria->condition = 'parent = 0';
		$criteria->order = 'menu_position';

		$item_count = Category::model()->count($criteria);

		$pages = new CPagination($item_count);
		$pages->setPageSize(Yii::app()->params['PRODUCTS_PER_PAGE']);
		$pages->applyLimit($criteria); // the trick is here!

		$model = Category::model()->findAll($criteria);
		foreach ($model as $m)
		{
			$arrModel[] = $m;
		}

		$this->render(
			'category',
			array(
				'arrmodel' => $arrModel, // must be the same as $item_count
				'item_count' => $item_count,
				'page_size' => Yii::app()->params['PRODUCTS_PER_PAGE'],
				'items_count' => $item_count,
				'pages' => $pages,
			)
		);
	}

	public function actionForgotpassword()
	{
		$model = new LoginForm();

		if (isset($_POST['LoginForm']))
		{
			Yii::log(print_r($_POST['LoginForm'], true), 'error', 'application.' . __CLASS__ . "." . __FUNCTION__);
			$model->attributes = $_POST['LoginForm'];

			if (empty($model->email))
			{
				$response_array = array(
					'status' => "failure",
					'message' => Yii::t('global', 'Please enter your email before clicking this link.'));
				echo json_encode($response_array);
				Yii::app()->end();
			}

			$objCustomer = Customer::model()->findByAttributes(array('record_type' => Customer::REGISTERED, 'email' => $model->email));
			if ($objCustomer instanceof Customer)
			{
				if (is_null($objCustomer->password))
				{
					$response_array = array(
						'status' => "failure",
						'message' => Yii::t('global', 'Your email address was found but only as a registered Facebook user. Log in via Facebook.'));
					echo json_encode($response_array);

					return;
				}

				if (!$objCustomer->GenerateTempPassword())
				{
					$response_array = array(
						'status' => "failure",
						'message' => Yii::t('global', 'Could not reset password, please contact the site administrator.'));
					echo json_encode($response_array);

					return;
				}

				$strHtmlBody = $this->renderPartial('/mail/_resetpassword', array('model' => $objCustomer), true);
				$strSubject = Yii::t('global', 'Password reset');

				$objEmail = new EmailQueue;

				$objEmail->htmlbody = $strHtmlBody;
				$objEmail->subject = $strSubject;
				$objEmail->to = $objCustomer->email;

				$objEmail->save();

				$response_array = array(
					'status' => "success",
					'message' => Yii::t('wishlist', 'Check your email for password reset link.'),
					'url' => CController::createUrl('site/sendemail', array("id" => $objEmail->id)),
					'reload' => true,
				);

				echo json_encode($response_array);
			}
			else
			{
				$response_array = array(
					'status' => "failure",
					'message' => Yii::t('global', 'Your email address was not found in our system.'));
				echo json_encode($response_array);
			}
		}
		else
		{
			$response_array = array(
				'status' => "failure",
				'message' => Yii::t('global', 'Please enter your email before clicking this link.'));
			echo json_encode($response_array);
		}
	}

	/**
	 * Send pending email.
	 *
	 * Emails are queued in table. This function is typically called via JavaScript
	 * at the end of checkout to actually send the email. This covers us in case
	 * email sending fails, we don't error on checkout.
	 *
	 * @return void
	 */
	public function actionSendemail()
	{

		$id = Yii::app()->getRequest()->getQuery('id');

		_xls_send_email($id);
	}

	/**
	 * Redirect to custom page contact.
	 *
	 * Since many third party templates have site/contact as a default tab, redirect to our own
	 *
	 * @return void
	 */
	public function actionContact()
	{
		$this->redirect(Yii::app()->createUrl("custompage/contact"));
	}

	/**
	 * Returns robots.txt.
	 *
	 * Generate realtime robots.txt which points to sitemap.
	 *
	 * @return void
	 */
	public function actionRobots()
	{
		echo <<<EOF
User-agent: *
Disallow:

Sitemap: http://{$_SERVER['HTTP_HOST']}/store/sitemap.xml
EOF;
		Yii::app()->end();
	}

	public function actionSystemcheck()
	{
		$this->redirect(Yii::app()->createUrl("/systemcheck.php"));
	}

	//Custom added function, brought from SearchController.php for featured items on index page
	protected function BuildCommand($formModel,$intLimit = null, $intOffset = null)
	{

		//Query string from admin panel
		$strQ = Yii::app() -> theme -> config -> query;

		//Sanitize inputs
		//$strQ = str_replace(array('<','>','=',';'),'',$strQ);

		$strInv = '';
		$intCount = 0;
		$arrBind = array(':query'=>$strQ);

		if (_xls_get_conf('INVENTORY_OUT_ALLOW_ADD') == Product::InventoryMakeDisappear)
			$strInv .= " AND (inventory_avail>0 OR inventoried=0) ";

		if (!_xls_get_conf('CHILD_SEARCH'))
			$strInv .= " AND parent IS NULL ";

		//Since we have passed our AdvancedSearchForm, go through the used fields and add them to our query
		foreach($formModel as $key=>$val)
			if (!empty($val) && $key != "q") //We process our query term separately so keep it out of this loop
			{
				$arrBind[':'.$key]=$val;
				switch ($key)
				{
					case 'startprice':      $strInv .= " AND sell_web >= :startprice "; break;
					case 'endprice':        $strInv .= " AND sell_web <= :endprice ";   break;
					case 'product_size':    $strInv .= " AND product_size = :product_size "; break;
					case 'product_color':   $strInv .= " AND product_color = :product_color "; break;
					case 'tag':             $strInv .= " AND tag = :tag "; break;
				}
			}


		$arr = explode(" ",$strQ);
		$strCases = "(CASE WHEN `title` = :query THEN 10 ELSE 0 END) +";
		$strWhere = " `title` = :query OR ";


		foreach ($arr as $item)
		{

			$strTag = ':item'.$intCount;
			$strTag1 = ':itemL1'.$intCount;
			$strTag2 = ':itemL2'.$intCount;
			$strTag3 = ':itemL3'.$intCount;
			$arrBind[':item'.$intCount]=$item;
			$arrBind[':itemL1'.$intCount]="%$item%";
			$arrBind[':itemL2'.$intCount]="%$item %";
			$arrBind[':itemL3'.$intCount]="$item%";


			$strCases .= "(CASE WHEN `title` = $strTag THEN 20 ELSE 0 END) +";
			$strCases .= "(CASE WHEN `title` LIKE $strTag3 THEN 15 ELSE 0 END) +";
			$strCases .= "(CASE WHEN `title` LIKE $strTag2 THEN 10 ELSE 0 END) +";
			$strCases .= "(CASE WHEN `title` LIKE $strTag1 THEN 3 ELSE 0 END) +";
			$strCases .= "(CASE WHEN `description_long` LIKE $strTag1 THEN 2 ELSE 0 END) +";
			$strCases .= "(CASE WHEN `tag` = $strTag THEN 2 ELSE 0 END) +";
			$strCases .= "(CASE WHEN `description_short` LIKE $strTag1 THEN 1 ELSE 0 END) +";
			$strCases .= "(CASE WHEN `code` = $strTag THEN 1 ELSE 0 END) +";
			$strCases .= "(CASE WHEN `product_size` = $strTag THEN 1 ELSE 0 END) +";
			$strCases .= "(CASE WHEN `product_color` = $strTag THEN 1 ELSE 0 END) +";

			$strWhere .= " `title` = $strTag OR ";
			$strWhere .= " `title` LIKE $strTag3 OR ";
			$strWhere .= " `title` LIKE $strTag2 OR ";
			$strWhere .= " `title` LIKE $strTag1 OR ";
			$strWhere .= " `description_long` LIKE $strTag1 OR ";
			$strWhere .= " `tag` = $strTag  OR ";
			$strWhere .= " `description_short` LIKE $strTag1 OR ";
			$strWhere .= " `code` = $strTag OR ";
			$strWhere .= " `product_size` = $strTag OR ";
			$strWhere .= " `product_color` = $strTag OR ";
			$intCount++;
		}
		$strCases = substr($strCases,0,-1); //Remove last +
		$strWhere = substr($strWhere,0,-3); //Remove last OR(space)


		$objCommand = Yii::app()->db->createCommand();
		$objCommand->select('t.*, (' . $strCases . ') AS relevance');
		$objCommand->leftJoin('xlsws_product_tags t2', 't2.product_id = t.id');
		$objCommand->leftJoin('xlsws_tags t3', 't2.tag_id = t3.id');
		$objCommand->from('xlsws_product t');
		$objCommand->where('(' . $strWhere . ') ' . $strInv . '	AND web=1 AND current=1');

		//If we have passed a category, append it to the search here
		if(isset($formModel['cat'])  && $formModel['cat']>0)
		{
			$objCategory = Category::model()->findbyPk($formModel['cat']);
			$this->strBreadcrumbCat = Yii::t('category',$objCategory->label);
			$intIdArray = array($objCategory->id);
			$intIdArray = array_merge($intIdArray, $objCategory->GetBranchPath());
			unset($arrBind[':cat']);
			$objCommand->leftJoin('xlsws_product_category_assn t4', 't4.product_id = t.id');
			$objCommand->where(array('AND', '(' . $strWhere . ') ' . $strInv . ' AND web=1 AND current=1', array('in', 'category_id', $intIdArray)));
		}


		$objCommand->group('t.id');
		$objCommand->order('relevance DESC');
		if (!is_null($intLimit))
		{
			if ($intLimit==-1) {
				//This means we're just running a count, so we don't need all aspects of this query
				$objCommand->select(' count(DISTINCT t.id) ');
				$objCommand->group(null);
				$objCommand->order(null);
			}
			else $objCommand->limit($intLimit, $intOffset);
		}

		foreach ($arrBind as $key=>$val)
			$objCommand->bindValue($key ,$val, PDO::PARAM_STR);



		return $objCommand;
	}
}

