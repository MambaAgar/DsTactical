<div id="menubar" class="row-fluid hidden-xs">

	<div class="span2">
		<?php $this->widget('application.extensions.wsmenu.wsmenu', array(
			'categories'=> $this->MenuTree,
			'menuheader'=> Yii::t('global','Products'),
			'showarrow'=>true,
		)); //products dropdown menu ?>
	</div>
	
	
	<?php 
	//Extract brand names from the menu tree tab, requires manufacturers to be enabled in admin panel
	$brandsmenu = $this->MenuTree['families_brands_menu'];
	$brands = $brandsmenu['children'];
	?>

	<div class="span2">
		<?php $this->widget('application.extensions.wsmenu.wsmenu', array(
			'categories'=> $brands,
			'menuheader'=> Yii::t('global','Manufacturers'),
			'showarrow'=>true,
		)); //Manufacturers dropdown menu ?>
	</div>

	<div class="span4">
		<?php if (count(CustomPage::model()->toptabs()->findAll()))
			$this->widget('zii.widgets.CMenu', array(
				'id'=>'menutabs',
				'itemCssClass'=>'menutab menuheight menuunderline span'.round(12/count(CustomPage::model()->toptabs()->findAll())),
				'items'=>CustomPage::model()->toptabs()->findAll(),
				'activeCssClass'=>'active',
			)); ?>
	</div>

	<div id="searchentry" class="span3 offset1">
		<?php echo $this->renderPartial("/site/_search",array(),true); ?>
	</div>

</div><!-- menubar -->

<?php if(Yii::app()->theme->info->showSeparateMobileMenu): ?>
	<div id="menubar-xs" class="visible-xs">
		<a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
			<?= Yii::t('global','Menu'); ?>
		</a>
		<div class="nav-collapse collapse">
			<?php $this->widget('zii.widgets.CMenu',array(
				'items'=> count(CustomPage::model()->toptabs()->findAll()) ? array_merge(CustomPage::model()->toptabs()->findAll(), $this->MenuTreeTop) : $this->MenuTreeTop,
				'htmlOptions'=>array('class'=>'nav'),
				'activeCssClass'=>'active',
			)); //products dropdown menu ?>
		</div>
	</div><!-- mobile menubar -->
<?php endif; ?>

<div class="clearfix"></div>
