<?php
namespace Ndpv\Ctrl;

use Ndpv\Ctrl\Ajax\AjaxCtrl;
use Ndpv\Ctrl\Api\ApiCtrl;
use Ndpv\Ctrl\Asset\AssetCtrl;
use Ndpv\Ctrl\Cron\CronCtrl;
use Ndpv\Ctrl\Template\TemplateCtrl;
use Ndpv\Ctrl\Hook\HookCtrl;
use Ndpv\Ctrl\Integrate\IntegrateCtrl;
use Ndpv\Ctrl\Assist\AssistCtrl;
use Ndpv\Ctrl\Meta\MetaCtrl;
use Ndpv\Ctrl\Setting\SettingCtrl;
use Ndpv\Ctrl\Taxonomy\TaxonomyCtrl;
use Ndpv\Ctrl\Widget\WidgetCtrl;

class MainCtrl {

    public function __construct() {

        //if ( is_admin() ) {
            new TaxonomyCtrl();
            new SettingCtrl();
            new AssistCtrl();
        //}
        new AssetCtrl();
        new TemplateCtrl();
        new WidgetCtrl();
        new AjaxCtrl();
        new HookCtrl();
        new MetaCtrl();
        new ApiCtrl();
        new CronCtrl();
        new IntegrateCtrl();
    }
}