<?php

namespace Ncpi\Ctrls; 

use Ncpi\Ctrls\Ajax\AjaxController;
use Ncpi\Ctrls\Api\ApiController;
use Ncpi\Ctrls\Asset\AssetContoller;
use Ncpi\Ctrls\Cron\CronController;
use Ncpi\Ctrls\Template\PageTemplater;
use Ncpi\Ctrls\Filter\FilterController;
use Ncpi\Ctrls\Hook\HookController;
use Ncpi\Ctrls\Marketing\MarketingController;
use Ncpi\Ctrls\Meta\MetaController;
use Ncpi\Ctrls\Setting\SettingController;
use Ncpi\Ctrls\PostType\PostTypeController;
use Ncpi\Ctrls\Taxonomy\TaxonomyController; 
use Ncpi\Ctrls\Widget\WidgetController;

class MainController {

    public function __construct() {    
        
        //if ( is_admin() ) {
            new PostTypeController();
            new TaxonomyController(); 
            new SettingController(); 
            new MarketingController();
        //}
        new AssetContoller();
        new PageTemplater();
        new WidgetController(); 
        new AjaxController();
        new FilterController();
        new HookController(); 
        new MetaController();
        new ApiController();
        new CronController();
    } 
}