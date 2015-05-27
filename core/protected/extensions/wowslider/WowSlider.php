<?php
class WowSlider extends CWidget
{
    /**
	 * slider id
	 */
    public $sliderid;
	/**
	 * sliding effect
	 */
	public $effect;
	/**
	 * sliding duration
	 */
	public $duration;
	/**
	 * delay between two slides
	 */
	public $delay;
	/**
	 * width of slider
	 */
	public $width;
	/**
	 * height of slider
	 */
	public $height;
    /** 
	 * autoPlay 
	 */
	public $autoPlay;
    /**
	 * stop on hover 
	 */
    public $stopOnHover;
	/**
	 * loop
 	 */
    public $loop;
	/**
	 * bullets (show bullets on top right)
	 */
    public $bullets;
    /**
	 * caption
	 */
    public $caption;
    /**
	 * controls (show controls)
	 */
    public $controls;
    /**
	 * loading image
	 */
    public $loading;
    
    /**
	 * data array
	 */
    public $data_arr;
	
    public function init()
	{
		// initiliaze parameters. set default values
        if (empty($this->sliderid)) $this->sliderid = 'wowslider-container1';
		if (empty($this->effect)) $this->effect = 'stack_vertical';
        if (empty($this->duration)) $this->duration = 20 * 100;
        if (empty($this->delay)) $this->delay = 20 * 100;
        if (empty($this->width)) $this->width = 960;
        if (empty($this->height)) $this->height = 360;
        if (empty($this->autoPlay)) $this->autoPlay = 'true';
        if (empty($this->stopOnHover)) $this->stopOnHover = 'false';
        if (empty($this->loop)) $this->loop = 'false';
        if (empty($this->bullets)) $this->bullets = 'true';
        if (empty($this->caption)) $this->caption = 'true';
        if (empty($this->controls)) $this->controls = 'true';
        if (empty($this->loading)) $this->loading =  Yii::app()->baseUrl . '/images/loader.gif';
        if (empty($this->data_arr)) $this->data_arr = array();
        
        // Add css files
		$cs = Yii::app()->clientScript;
		$cssFile = CHtml::asset(dirname(__FILE__).DIRECTORY_SEPARATOR.'css'.DIRECTORY_SEPARATOR.'wowslider.css');
		$cs->registerCssFile($cssFile);
        
        // Add js files
        $jsFile = CHtml::asset(dirname(__FILE__).DIRECTORY_SEPARATOR.'js'.DIRECTORY_SEPARATOR.'wowslider.js');
		$cs->registerScriptFile($jsFile);
	}
    
	public function run()
	{
        $html = '<div id="'.$this->sliderid.'">
                    <div class="ws_images">
                        <ul>';
                            for($i=0;$i<count($this->data_arr);$i++) {
				if(isset($this->data_arr[$i]['url'])) {
				$html .= '<li><a href="'.$this->data_arr[$i]['url'].'"><img src="'.$this->data_arr[$i]['image'].'" alt="'.(isset($this->data_arr[$i]['title']) ? $this->data_arr[$i]['title'] : '').'" title="'.(isset($this->data_arr[$i]['title']) ? $this->data_arr[$i]['title'] : '').'" id="wows1_'.$i.'"/>'.(isset($this->data_arr[$i]['desc']) ? $this->data_arr[$i]['desc'] : '').'</a></li>';
				}
				else {
				$html .= '<li><img src="'.$this->data_arr[$i]['image'].'" alt="'.(isset($this->data_arr[$i]['title']) ? $this->data_arr[$i]['title'] : '').'" title="'.(isset($this->data_arr[$i]['title']) ? $this->data_arr[$i]['title'] : '').'" id="wows1_'.$i.'"/>'.(isset($this->data_arr[$i]['desc']) ? $this->data_arr[$i]['desc'] : '').'</li>';
				}
/*
$html .= '<li><img src="'.$this->data_arr[$i]['image'].'" alt="'.(isset($this->data_arr[$i]['title']) ? $this->data_arr[$i]['title'] : '').'" title="'.(isset($this->data_arr[$i]['title']) ? $this->data_arr[$i]['title'] : '').'" id="wows1_'.$i.'"/>'.(isset($this->data_arr[$i]['desc']) ? $this->data_arr[$i]['desc'] : '').'</li>';
*/
                            }            
                
        $html .= '      </ul>
                    </div>
                    <div class="ws_bullets">
                        <div>';
                            for($i=0;$i<count($this->data_arr);$i++) {
                                $html .= '<a href="#" title="'.(isset($this->data_arr[$i]['title']) ? $this->data_arr[$i]['title'] : '').'">'.($i+1).'</a>';
                            }                    
        $html .= '      </div>
                    </div>
                </div>';
        
		echo $html.'
            <script language="javascript">
            '.$this->js.'
            </script>';
	}
    
    /**
	 * Renders the contents of the <script> tag
	 *
	 * @return string
	 */
	public function getJs()
	{
        $ret = 'wowReInitor(jQuery("#'.$this->sliderid.'"), {';
        $ret .= '   effect: "'.$this->effect.'",
                    prev: "",
                    next: "",
                    duration:'.$this->duration.',
                    delay: '.$this->delay.',
                    width: '.$this->width.',
                    height: '.$this->height.',
                    autoPlay: '.$this->autoPlay.',
                    stopOnHover: '.$this->stopOnHover.',
                    loop: '.$this->loop.',
                    bullets: '.$this->bullets.',
                    caption: '.$this->caption.',
                    controls: '.$this->controls.',
                    logo: "'.$this->loading.'"';
        
        $ret .= '});';
        
        return $ret;
	}
	
}
?>
