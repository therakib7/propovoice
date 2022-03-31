<?php

namespace Ncpi\Controllers; 

use Ncpi\Controllers\Ajax\AjaxController;
use Ncpi\Controllers\Api\ApiController;
use Ncpi\Controllers\Asset\AssetContoller;
use Ncpi\Controllers\Template\PageTemplater;
use Ncpi\Controllers\Filter\FilterController;
use Ncpi\Controllers\Hook\HookController;
use Ncpi\Controllers\Marketing\MarketingController;
use Ncpi\Controllers\Meta\MetaController;
use Ncpi\Controllers\Setting\SettingController;
use Ncpi\Controllers\PostType\PostTypeController;
use Ncpi\Controllers\Taxonomy\TaxonomyController; 
use Ncpi\Controllers\Widget\WidgetController;

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
    } 
}