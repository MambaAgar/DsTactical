<!--
<h1>Welcome to <i><?php echo CHtml::encode(Yii::app()->name); ?></i></h1>

<p>You may change the content of this page by modifying :</p>
<ul>
	<li>View file: <tt><?php echo __FILE__; ?></tt></li>

</ul>
-->
<head>
<link rel ="stylesheet" type="text/css" href="<?php YiiBase::getPathOfAlias('webroot').'/themes/'.Yii::app()->theme->name.'/css/custom.css'?>">
</head>
<ul id="navbar">
		<li><a href="brand/511" class="darken"><img src="images/gallery/1/_22.png" width="<?php echo Yii::app() -> theme -> config -> navSize?>" /></a></li>
		<li><a href="brand/arcteryx" class="darken"><img src="images/gallery/1/_23.jpg" width="<?php echo Yii::app() -> theme -> config -> navSize?>" /></a></li>
		<li><a href="brand/surefire" class="darken"><img src="images/gallery/1/_24.jpg" width="<?php echo Yii::app() -> theme -> config -> navSize?>" /></a></li>
		<li><a href="brand/team-wendy" class="darken"><img src="images/gallery/1/_27.jpg" width="<?php echo Yii::app() -> theme -> config -> navSize?>" /></a></li>
		<li><a href="brand/lowa" class="darken"><img src="images/gallery/1/_36.jpg" width="<?php echo Yii::app() -> theme -> config -> navSize?>"/></a></li>
		<li><a href="brand/aimpoint" class="darken"><img src="images/gallery/1/_33.jpg" width="<?php echo Yii::app() -> theme -> config -> navSize?>" /></a></li>
		<!-- <li><a href="brand/kifaru" class="darken"><img src="images/gallery/1/_34.jpg" width="<?php echo Yii::app() -> theme -> config -> navSize?>" /></a></li> -->
		<li><a href="brand/vortex" class="darken"><img src="images/gallery/1/_35.jpg" width="<?php echo Yii::app() -> theme -> config -> navSize?>" /></a></li>
		<li><a href="brand/tactical-tailor" class="darken"><img src="images/gallery/1/_44.jpg" width="<?php echo Yii::app() -> theme -> config -> navSize?>" /></a></li>
		<li><a href="brand/vertx" class="darken"><img src="images/gallery/1/_46.jpg" width="<?php echo Yii::app() -> theme -> config -> navSize?>" /></a></li>
</ul>
		
<?php
unset(Yii::app()->session['current_page']);

$getSliderImages = Yii::app() -> theme -> config -> slider_images;
$sliderEffect = Yii::app() -> theme -> config -> slider_effect;
$sliderDuration = Yii::app() -> theme -> config -> slider_duration;
$sliderTransition = Yii::app() -> theme -> config -> slider_transition;
$hasQuery = Yii::app() -> theme -> config -> hasQuery;

if(!empty($getSliderImages)) {

	//Grabbing data from checkboxlist makes key the index number, so make key the image directory
	$dataHolder = array_flip($getSliderImages);
	$imageDescript = Gallery::ImageListByDescript(1);

	//Join arrays based on key, and set value to Description(holding url)
	$dataArray = array_intersect_key($imageDescript, $dataHolder);

	$image_url = Yii::app()->baseUrl;

	foreach($dataArray as $dataKey => $dataValue) {
		!empty($dataValue) ? $image_arr[] = array('image' => $image_url . $dataKey, 'url' => $dataValue)
		: $image_arr[] = array('image' => $image_url . $dataKey);
	}

$this->widget('application.extensions.wowslider.WowSlider', array(
            'sliderid' => 'wowslider-container1', // required slide unique Id
            'data_arr' => $image_arr, // required data array
            'effect' => $sliderEffect, // optional stack_vertical|basic|blast|blinds|blur|fade|fly|kenburns|rotate|slices|squares|stack
            'duration' => $sliderTransition, // optional in milisecond (default 2000)
            'delay' => $sliderDuration, // optional in milisecond (default 2000)
            'width' => 960, // optional (default 960)
            'height' => 360, // optional (default 360)
            'autoPlay' => true, // optional true|false (default true)
            'stopOnHover' => false, // optional true|false (default false)
            'loop' => false, // optional true|false (default false)
            'bullets' => true, // optional true|false (default true)
            'caption' => true, // optional true|false (default true)
            'controls' => true, // optional true|false (default true)
            'loading' => '', // optional loading image url (default /images/loader.gif)
        ));
}
?>

<div class="featured">
Featured Items:
</div>

<?php
	if($hasQuery != null)
	{
		//$strQ = "fake";

		//If we passed a category as a request_url, translate here
		if (isset($_GET['cat'])) {
			$objCategory = Category::LoadByRequestUrl($_GET['cat']);
			if ($objCategory instanceof Category)
				$_GET['cat'] = $objCategory->id;
		}

		$formModel = new AdvancedSearchForm();
		$formModel->attributes = $_GET;

		//$strQ = str_replace(array('<','>','=',';'),'',$strQ);

		//We have to run the query twice -- once to get total # for our paginator, then again with our current limits

		//Get our total qty first for pagination
		$objCommand = $this->BuildCommand($formModel,-1); //passing -1 as the limit triggers a count(*) query
		$numberOfRecords = $objCommand->queryScalar();
		$pages=new CPagination(intval($numberOfRecords));
		$pages->pageSize = Yii::app()->params['PRODUCTS_PER_PAGE'];

		$objCommand = $this->BuildCommand($formModel,$pages->pageSize, $pages->currentPage*$pages->pageSize);
		$rows = $objCommand->QueryAll();

		//Convert rows to objects for our view layer so it's consistent
		$model = Product::model()->populateRecords($rows,false);

		$strCurrentUrl = $this->createAbsoluteUrl(Yii::app()->request->getPathInfo() . '?' . http_build_query($formModel->attributes));
		
		/*
		$strBreadcrumbText = '';

		if (empty($this->strBreadcrumbCat))
			$strBreadcrumbText = Yii::t('global', 'Searching for "{terms}"', array('{terms}' => $strQ));
		else
			$strBreadcrumbText = Yii::t('global', 'Searching for "{terms}" in category "{category}"',
									array('{terms}' => $strQ, '{category}' => $this->strBreadcrumbCat));

		$this->breadcrumbs = array($strBreadcrumbText => $strCurrentUrl);
		*/		

		if(isset($_GET['cpc']))
		{
			//We have been sent over Custom Page Content
			$objCustomPage = CustomPage::model()->findByPk($_GET['cpc']);
			if($objCustomPage)
			{
				$this->pageTitle=$objCustomPage->PageTitle;
				$this->pageDescription=$objCustomPage->meta_description;
				$this->pageImageUrl = '';
				$this->breadcrumbs = array($objCustomPage->title=>$objCustomPage->RequestUrl);
				$this->custom_page_content = $objCustomPage->page;
				$this->pageHeader = $objCustomPage->title;
			}
		}

		$this->CanonicalUrl = $strCurrentUrl;

		$this->returnUrl = $this->CanonicalUrl;
		$this->pageImageUrl = "";

		$model = $this->createBookends($model);

		$this->renderPartial('grid',array(
				'model'=> $model,
				'item_count'=>$numberOfRecords,
				'page_size'=>Yii::app()->params['PRODUCTS_PER_PAGE'],
				'items_count'=>$numberOfRecords,
				'pages'=>$pages,
		));
	}

else {
$strB = Yii::app()->getRequest()->getQuery('brand');

$strInv='';

//If we haven't passed any criteria, we just query the database
$criteria = new CDbCriteria();
$criteria->alias = 'Product';

if (!empty($strB)) {

	$objFamily = Family::LoadByRequestUrl($strB);
	if($objFamily)
	{
		$criteria->addCondition('family_id = :id');
		$criteria->params = array (':id'=>$objFamily->id);

		$this->pageTitle=$objFamily->PageTitle;
		//$this->pageDescription=$objFamily->PageDescription;
		//$this->breadcrumbs = $objCategory->Breadcrumbs;
		$this->pageHeader = $objFamily->family;

		$this->CanonicalUrl = $objFamily->Link;
	}


}

if (_xls_get_conf('INVENTORY_OUT_ALLOW_ADD') == Product::InventoryMakeDisappear)
	$criteria->addCondition('(inventory_avail>0 OR inventoried=0)');

if (!_xls_get_conf('CHILD_SEARCH') || empty($strQ))
	$criteria->addCondition('Product.parent IS NULL');

if (Product::HasFeatured() && empty($strS) && empty($strB) && empty($strC))
{
	$criteria->addCondition('featured=1');
	$this->pageHeader = 'Featured Products';
}

$criteria->addCondition('web=1');
$criteria->addCondition('current=1');
$criteria->order = 'Product.'._xls_get_sort_order();

$numberOfRecords = Product::model()->count($criteria);

$pages = new CPagination($numberOfRecords);
$pages->setPageSize(Yii::app()->params['PRODUCTS_PER_PAGE']);
$pages->applyLimit($criteria);  // the trick is here!

$model = Product::model()->findAll($criteria);
$model = $this->createBookends($model);

$this->returnUrl = $this->CanonicalUrl;
$this->pageImageUrl = "";

if ($strB=='*')
{
    $families = Family::model()->findAll(array('order'=>'family'));
    $this->render('brands',array('model'=>$families));
}
else
	$this->renderPartial('grid',array(	//Render partial important, to ensure we don't display navigation bar, search, carts etc. again
	'model'=> $model,
	'item_count'=>$numberOfRecords,
	'page_size'=>Yii::app()->params['PRODUCTS_PER_PAGE'],
	'items_count'=>$numberOfRecords,
	'pages'=>$pages,
	));
}

//$post = Product::model()->findAllBySql('SELECT * FROM Products');
?>


