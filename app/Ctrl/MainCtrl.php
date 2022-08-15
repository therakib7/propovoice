<?php

namespace Ncpi\Ctrl; 

use Ncpi\Ctrl\Ajax\AjaxCtrl;
use Ncpi\Ctrl\Api\ApiCtrl;
use Ncpi\Ctrl\Asset\AssetCtrl;
use Ncpi\Ctrl\Cron\CronCtrl;
use Ncpi\Ctrl\Template\PageTemplater;
use Ncpi\Ctrl\Filter\FilterCtrl;
use Ncpi\Ctrl\Hook\HookCtrl;
use Ncpi\Ctrl\Marketing\MarketingCtrl;
use Ncpi\Ctrl\Meta\MetaCtrl;
use Ncpi\Ctrl\Setting\SettingCtrl;
use Ncpi\Ctrl\PostType\PostTypeCtrl;
use Ncpi\Ctrl\Taxonomy\TaxonomyCtrl; 
use Ncpi\Ctrl\Widget\WidgetCtrl;

class MainCtrl {

    public function __construct() {    
        
        //if ( is_admin() ) {
            new PostTypeCtrl();
            new TaxonomyCtrl(); 
            new SettingCtrl(); 
            new MarketingCtrl();
        //}
        new AssetCtrl();
        new PageTemplater();
        new WidgetCtrl(); 
        new AjaxCtrl();
        new FilterCtrl();
        new HookCtrl(); 
        new MetaCtrl();
        new ApiCtrl();
        new CronCtrl();
    } 
}