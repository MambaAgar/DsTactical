<?php

/**
 * This is the model class for table "{{filter}}".
 *
 * @package application.models
 * @name Filter
 *
 */
class Filter extends CActiveRecord
{
	public static function getSortOptions()
	{
    		return array('M'=>'Most Recent','H' => 'Highest Price', 'L' => 'Lowest Price');
	}

	public static function getValueFromKey($key)
	{
	switch($key) 
		{
	case 'H':
		return 'Highest Price';
	case 'L':
		return 'Lowest Price';
	default:
		return 'Most Recent';
		}
	}
	
	public static function getShowOptions()
	{
		return array('A'=>'All Items', 'I' => 'In Stock');
	}
}
