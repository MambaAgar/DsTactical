<!--
<h1><?= _xls_get_conf('ENABLE_FAMILIES_MENU_LABEL') ?></h1>
<div class="familylist">
    <ul>
    <?php foreach ($model as $family): ?>
        <li><a href="<?= $family->request_url ?>" ><?= $family->family ?></a></li>
    <?php endforeach; ?>
    </ul>
</div>
-->
<h1><?= _xls_get_conf('ENABLE_FAMILIES_MENU_LABEL') ?></h1>
<div class="familylist">
<?php 
	$brandsmenu = $this->MenuTree['families_brands_menu'];
	$brands = $brandsmenu['children'];
	echo "<ul>";
	//print_r($brands);
	foreach ($brands as $brand) {
		$url = $brand['link'];
		$title = $brand['text'];
		echo "<li><a href=" . $url . ">" . $title . "</a></li>";
	}
	echo "</ul>";
?>
</div>
