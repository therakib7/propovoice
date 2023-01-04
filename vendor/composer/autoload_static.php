<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit3f0b3e05358d4aa966d9b3171edb6baf
{
    public static $prefixLengthsPsr4 = array (
        'N' => 
        array (
            'Ndpv\\' => 5,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'Ndpv\\' => 
        array (
            0 => __DIR__ . '/../..' . '/app',
        ),
    );

    public static $classMap = array (
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
        'Ndpv\\Ctrl\\Ajax\\AjaxCtrl' => __DIR__ . '/../..' . '/app/Ctrl/Ajax/AjaxCtrl.php',
        'Ndpv\\Ctrl\\Ajax\\Type\\Auth' => __DIR__ . '/../..' . '/app/Ctrl/Ajax/Type/Auth.php',
        'Ndpv\\Ctrl\\Api\\ApiCtrl' => __DIR__ . '/../..' . '/app/Ctrl/Api/ApiCtrl.php',
        'Ndpv\\Ctrl\\Api\\Type\\Action' => __DIR__ . '/../..' . '/app/Ctrl/Api/Type/Action.php',
        'Ndpv\\Ctrl\\Api\\Type\\Business' => __DIR__ . '/../..' . '/app/Ctrl/Api/Type/Business.php',
        'Ndpv\\Ctrl\\Api\\Type\\Client' => __DIR__ . '/../..' . '/app/Ctrl/Api/Type/Client.php',
        'Ndpv\\Ctrl\\Api\\Type\\Contact' => __DIR__ . '/../..' . '/app/Ctrl/Api/Type/Contact.php',
        'Ndpv\\Ctrl\\Api\\Type\\Dashbaord' => __DIR__ . '/../..' . '/app/Ctrl/Api/Type/Dashbaord.php',
        'Ndpv\\Ctrl\\Api\\Type\\Deal' => __DIR__ . '/../..' . '/app/Ctrl/Api/Type/Deal.php',
        'Ndpv\\Ctrl\\Api\\Type\\Email' => __DIR__ . '/../..' . '/app/Ctrl/Api/Type/Email.php',
        'Ndpv\\Ctrl\\Api\\Type\\File' => __DIR__ . '/../..' . '/app/Ctrl/Api/Type/File.php',
        'Ndpv\\Ctrl\\Api\\Type\\Form' => __DIR__ . '/../..' . '/app/Ctrl/Api/Type/Form.php',
        'Ndpv\\Ctrl\\Api\\Type\\Invoice' => __DIR__ . '/../..' . '/app/Ctrl/Api/Type/Invoice.php',
        'Ndpv\\Ctrl\\Api\\Type\\Lead' => __DIR__ . '/../..' . '/app/Ctrl/Api/Type/Lead.php',
        'Ndpv\\Ctrl\\Api\\Type\\Media' => __DIR__ . '/../..' . '/app/Ctrl/Api/Type/Media.php',
        'Ndpv\\Ctrl\\Api\\Type\\Note' => __DIR__ . '/../..' . '/app/Ctrl/Api/Type/Note.php',
        'Ndpv\\Ctrl\\Api\\Type\\Org' => __DIR__ . '/../..' . '/app/Ctrl/Api/Type/Org.php',
        'Ndpv\\Ctrl\\Api\\Type\\Payment' => __DIR__ . '/../..' . '/app/Ctrl/Api/Type/Payment.php',
        'Ndpv\\Ctrl\\Api\\Type\\PaymentProcess' => __DIR__ . '/../..' . '/app/Ctrl/Api/Type/PaymentProcess.php',
        'Ndpv\\Ctrl\\Api\\Type\\Person' => __DIR__ . '/../..' . '/app/Ctrl/Api/Type/Person.php',
        'Ndpv\\Ctrl\\Api\\Type\\Project' => __DIR__ . '/../..' . '/app/Ctrl/Api/Type/Project.php',
        'Ndpv\\Ctrl\\Api\\Type\\Setting' => __DIR__ . '/../..' . '/app/Ctrl/Api/Type/Setting.php',
        'Ndpv\\Ctrl\\Api\\Type\\Task' => __DIR__ . '/../..' . '/app/Ctrl/Api/Type/Task.php',
        'Ndpv\\Ctrl\\Api\\Type\\Taxonomy' => __DIR__ . '/../..' . '/app/Ctrl/Api/Type/Taxonomy.php',
        'Ndpv\\Ctrl\\Api\\Type\\Webhook' => __DIR__ . '/../..' . '/app/Ctrl/Api/Type/Webhook.php',
        'Ndpv\\Ctrl\\Api\\Type\\Workspace' => __DIR__ . '/../..' . '/app/Ctrl/Api/Type/Workspace.php',
        'Ndpv\\Ctrl\\Asset\\AssetCtrl' => __DIR__ . '/../..' . '/app/Ctrl/Asset/AssetCtrl.php',
        'Ndpv\\Ctrl\\Assist\\AssistCtrl' => __DIR__ . '/../..' . '/app/Ctrl/Assist/AssistCtrl.php',
        'Ndpv\\Ctrl\\Assist\\Type\\Feedback' => __DIR__ . '/../..' . '/app/Ctrl/Assist/Type/Feedback.php',
        'Ndpv\\Ctrl\\Assist\\Type\\Link' => __DIR__ . '/../..' . '/app/Ctrl/Assist/Type/Link.php',
        'Ndpv\\Ctrl\\Cron\\CronCtrl' => __DIR__ . '/../..' . '/app/Ctrl/Cron/CronCtrl.php',
        'Ndpv\\Ctrl\\Hook\\HookCtrl' => __DIR__ . '/../..' . '/app/Ctrl/Hook/HookCtrl.php',
        'Ndpv\\Ctrl\\Hook\\Type\\Action' => __DIR__ . '/../..' . '/app/Ctrl/Hook/Type/Action.php',
        'Ndpv\\Ctrl\\Hook\\Type\\Filter' => __DIR__ . '/../..' . '/app/Ctrl/Hook/Type/Filter.php',
        'Ndpv\\Ctrl\\Install\\InstallCtrl' => __DIR__ . '/../..' . '/app/Ctrl/Install/InstallCtrl.php',
        'Ndpv\\Ctrl\\Install\\Type\\DB' => __DIR__ . '/../..' . '/app/Ctrl/Install/Type/DB.php',
        'Ndpv\\Ctrl\\Install\\Type\\Installer' => __DIR__ . '/../..' . '/app/Ctrl/Install/Type/Installer.php',
        'Ndpv\\Ctrl\\Install\\Type\\Page' => __DIR__ . '/../..' . '/app/Ctrl/Install/Type/Page.php',
        'Ndpv\\Ctrl\\Install\\Type\\Taxonomy' => __DIR__ . '/../..' . '/app/Ctrl/Install/Type/Taxonomy.php',
        'Ndpv\\Ctrl\\Integrate\\Form\\FormCtrl' => __DIR__ . '/../..' . '/app/Ctrl/Integrate/Form/FormCtrl.php',
        'Ndpv\\Ctrl\\Integrate\\Form\\FormList' => __DIR__ . '/../..' . '/app/Ctrl/Integrate/Form/FormList.php',
        'Ndpv\\Ctrl\\Integrate\\IntegrateCtrl' => __DIR__ . '/../..' . '/app/Ctrl/Integrate/IntegrateCtrl.php',
        'Ndpv\\Ctrl\\Integrate\\Smtp\\SmtpCtrl' => __DIR__ . '/../..' . '/app/Ctrl/Integrate/Smtp/SmtpCtrl.php',
        'Ndpv\\Ctrl\\Integrate\\Smtp\\SmtpList' => __DIR__ . '/../..' . '/app/Ctrl/Integrate/Smtp/SmtpList.php',
        'Ndpv\\Ctrl\\MainCtrl' => __DIR__ . '/../..' . '/app/Ctrl/MainCtrl.php',
        'Ndpv\\Ctrl\\Meta\\MetaCtrl' => __DIR__ . '/../..' . '/app/Ctrl/Meta/MetaCtrl.php',
        'Ndpv\\Ctrl\\Meta\\User\\User' => __DIR__ . '/../..' . '/app/Ctrl/Meta/User/User.php',
        'Ndpv\\Ctrl\\Setting\\SettingCtrl' => __DIR__ . '/../..' . '/app/Ctrl/Setting/SettingCtrl.php',
        'Ndpv\\Ctrl\\Setting\\Type\\Dashboard' => __DIR__ . '/../..' . '/app/Ctrl/Setting/Type/Dashboard.php',
        'Ndpv\\Ctrl\\Setting\\Type\\Welcome' => __DIR__ . '/../..' . '/app/Ctrl/Setting/Type/Welcome.php',
        'Ndpv\\Ctrl\\Taxonomy\\TaxonomyCtrl' => __DIR__ . '/../..' . '/app/Ctrl/Taxonomy/TaxonomyCtrl.php',
        'Ndpv\\Ctrl\\Template\\TemplateCtrl' => __DIR__ . '/../..' . '/app/Ctrl/Template/TemplateCtrl.php',
        'Ndpv\\Ctrl\\Widget\\Elementor\\ElementorCtrl' => __DIR__ . '/../..' . '/app/Ctrl/Widget/Elementor/ElementorCtrl.php',
        'Ndpv\\Ctrl\\Widget\\Elementor\\Widgets\\Registration' => __DIR__ . '/../..' . '/app/Ctrl/Widget/Elementor/Widgets/Registration.php',
        'Ndpv\\Ctrl\\Widget\\Gutenberg\\GutenbergCtrl' => __DIR__ . '/../..' . '/app/Ctrl/Widget/Gutenberg/GutenbergCtrl.php',
        'Ndpv\\Ctrl\\Widget\\WidgetCtrl' => __DIR__ . '/../..' . '/app/Ctrl/Widget/WidgetCtrl.php',
        'Ndpv\\Helper\\Constant' => __DIR__ . '/../..' . '/app/Helper/Constant.php',
        'Ndpv\\Helper\\Data' => __DIR__ . '/../..' . '/app/Helper/Data.php',
        'Ndpv\\Helper\\Fns' => __DIR__ . '/../..' . '/app/Helper/Fns.php',
        'Ndpv\\Helper\\I18n' => __DIR__ . '/../..' . '/app/Helper/I18n.php',
        'Ndpv\\Helper\\Info' => __DIR__ . '/../..' . '/app/Helper/Info.php',
        'Ndpv\\Model\\Client' => __DIR__ . '/../..' . '/app/Model/Client.php',
        'Ndpv\\Model\\Contact' => __DIR__ . '/../..' . '/app/Model/Contact.php',
        'Ndpv\\Model\\Deal' => __DIR__ . '/../..' . '/app/Model/Deal.php',
        'Ndpv\\Model\\Email' => __DIR__ . '/../..' . '/app/Model/Email.php',
        'Ndpv\\Model\\Form' => __DIR__ . '/../..' . '/app/Model/Form.php',
        'Ndpv\\Model\\Invoice' => __DIR__ . '/../..' . '/app/Model/Invoice.php',
        'Ndpv\\Model\\Lead' => __DIR__ . '/../..' . '/app/Model/Lead.php',
        'Ndpv\\Model\\Org' => __DIR__ . '/../..' . '/app/Model/Org.php',
        'Ndpv\\Model\\Person' => __DIR__ . '/../..' . '/app/Model/Person.php',
        'Ndpv\\Model\\Project' => __DIR__ . '/../..' . '/app/Model/Project.php',
        'Ndpv\\Traits\\Singleton' => __DIR__ . '/../..' . '/app/Traits/Singleton.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInit3f0b3e05358d4aa966d9b3171edb6baf::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInit3f0b3e05358d4aa966d9b3171edb6baf::$prefixDirsPsr4;
            $loader->classMap = ComposerStaticInit3f0b3e05358d4aa966d9b3171edb6baf::$classMap;

        }, null, ClassLoader::class);
    }
}
