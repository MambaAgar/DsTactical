<div class="span9">
	<div class="hero-unit nobottom">

		<h3><?php echo Yii::t('admin','Manage Header and Uploaded Images'); ?></h3>
		<div class="editinstructions">
			<?php echo Yii::t('admin','Upload images here to be used as your header image, and with themes that require additional images.'); ?>
			<?php  if(Yii::app()->user->fullname=="Lightspeed")
				echo "<p><strong>".Yii::t('admin','To upload a new image, drag and drop a file on top of the Add button. NOTE: You can also log into Admin Panel externally at {url} to use the Add button normally.',array('{url}'=>$this->createAbsoluteUrl("/admin")))."</strong></p>";
			else
				echo Yii::t('admin','To upload a new image to add to your collection, click Add and select your file.');

			echo " ".Yii::t('admin',"You can provide an optional name and description after uploading. Click the green star to make the image your Header Image.");

			echo Yii::t('admin','<p></p><p><b>SLIDER IMAGE INSTRUCTIONS:</b></p>');

			echo Yii::t('admin','<p>For using setting a image for the slider on the homepage, simply upload an image and then select it on the "Configure Brooklynn Copy" tab.</p>');

			echo " ".Yii::t('admin','If you would like the image to redirect to a URL, type the url in the description. NOTE: external URLs such as Google must be typed with "http://", such as http://google.ca');

			echo " ".Yii::t('admin','For internal links, you can leave off the main URL. For example, if you would like to link to cases type "cases", or for manufactuerers type "brand/accu-shot".');

			echo " ".Yii::t('admin','If you are unsure what the url is for the product or manufacturer simply check it when you are browsing the site.');
			?>
		</div>
		<div class="clearfix spaceafter"></div>

		<div class="row-fluid">
		<?php $this->widget('ext.galleryManager.GalleryManager', array(
			'gallery' => $gallery,
			'controllerRoute' => 'admin/gallery', //route to gallery controller
			));
		?>
		</div>
		<div class="clearfix spaceafter"></div>


</div>
</div>
