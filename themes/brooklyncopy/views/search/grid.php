<div id="gridheader">

		<?php if (_xls_get_conf('ENABLE_CATEGORY_IMAGE', 0) && isset($this->category) && $this->category->ImageExist): ?>
	    <div id="category_image">
	        <img src="<?= $this->category->CategoryImage; ?>"/>
	    </div>
		<?php endif; ?>

	    <h1><?php echo $this->pageHeader; ?></h1>

	    <div class="subcategories">
			<?php
			if(isset($this->subcategories) && (count($this->subcategories) > 0)) {
				echo _sp("Subcategories").':';
				foreach ($this->subcategories as $item)
					echo CHtml::link(trim($item['label']), $item['link']);
			}
			?>
	    </div>

		<?php if(isset($this->custom_page_content)): ?>
		    <div id="custom_content">
				<?php echo $this->custom_page_content; ?>
		    </div>
		<?php endif; ?>


	</div>

<div id="sort">
<?php 
	//echo Yii::app()->request->requestUri;
	//echo " ".Yii::app()->getController()->getAction()->controller->id;
	//echo " ".Yii::app()->getController()->getAction()->controller->action->id;

	echo CHtml::label('Sort By:',null);
	echo CHtml::dropDownList('sort_list', Yii::app()->session['ajax_sort'], 
             Filter::getSortOptions(),
		array(
		'ajax' => array(
			'type'=>'POST',
			'update' => '#data',
			'data'=>array('sort_list'=>'js:this.value')
			)
		)
		); 
		
	echo CHtml::label('Show:',null);
		echo CHtml::dropDownList('show_list', Yii::app()->session['ajax_show'], 
		Filter::getShowOptions(),
		array(
		'ajax' => array(
			'type'=>'POST',
			'update' => '#data',
			'data'=>array('show_list'=>'js:this.value')
			)
		)
		);
	/*
	if(!empty($brands_in_cat)) {
		$header = array(-1 => 'All Brands');
		$brands_in_cat = $header + $brands_in_cat;
		echo CHtml::label('Narrow your results:','');
		echo CHtml::dropDownList('narrow_list', Yii::app()->session['ajax_narrow'], 
		array_values($brands_in_cat),
		array(
		'ajax' => array(
			'type'=>'POST',
			'update' => '#data',
			'data'=>array('narrow_list'=>'js:this.value')
			)
		)
		);
	}
	*/
?>
</div>

<div id="data">
<?php
	$this->renderPartial('_ajaxContent',array(
		'model'=> $model,
		'item_count'=>$item_count,
		'page_size'=>Yii::app()->params['PRODUCTS_PER_PAGE'],
		'items_count'=>$items_count,
		'pages'=>$pages,
		));
?>
</div>
