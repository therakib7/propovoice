<?php

namespace Ndpi\Ctrl; 

use Ndpi\Ctrl\Ajax\AjaxCtrl;
use Ndpi\Ctrl\Api\ApiCtrl;
use Ndpi\Ctrl\Asset\AssetCtrl;
use Ndpi\Ctrl\Cron\CronCtrl;
use Ndpi\Ctrl\Template\TemplateCtrl;
use Ndpi\Ctrl\Hook\HookCtrl;
use Ndpi\Ctrl\Intg\IntgCtrl;
use Ndpi\Ctrl\Marketing\MarketingCtrl;
use Ndpi\Ctrl\Meta\MetaCtrl;
use Ndpi\Ctrl\Setting\SettingCtrl;
use Ndpi\Ctrl\PostType\PostTypeCtrl;
use Ndpi\Ctrl\Taxonomy\TaxonomyCtrl; 
use Ndpi\Ctrl\Widget\WidgetCtrl;

class MainCtrl {

    public function __construct() {    
        
        //if ( is_admin() ) {
            new PostTypeCtrl();
            new TaxonomyCtrl(); 
            new SettingCtrl(); 
            new MarketingCtrl();
        //}
        new AssetCtrl();
        new TemplateCtrl();
        new WidgetCtrl(); 
        new AjaxCtrl();
        new HookCtrl(); 
        new MetaCtrl();
        new ApiCtrl();
        new CronCtrl();
        new IntgCtrl();
    } 
}