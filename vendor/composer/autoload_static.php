<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInitb50624ffc1f1204e2d5fae31ece50372
{
    public static $prefixLengthsPsr4 = array (
        'N' => 
        array (
            'Ncpi\\' => 5,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'Ncpi\\' => 
        array (
            0 => __DIR__ . '/../..' . '/includes',
        ),
    );

    public static $classMap = array (
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
        'Ncpi\\Controllers\\Ajax\\AjaxController' => __DIR__ . '/../..' . '/includes/Controllers/Ajax/AjaxController.php',
        'Ncpi\\Controllers\\Ajax\\Types\\Auth' => __DIR__ . '/../..' . '/includes/Controllers/Ajax/Types/Auth.php',
        'Ncpi\\Controllers\\Api\\ApiController' => __DIR__ . '/../..' . '/includes/Controllers/Api/ApiController.php',
        'Ncpi\\Controllers\\Api\\Types\\Setting' => __DIR__ . '/../..' . '/includes/Controllers/Api/Types/Setting.php',
        'Ncpi\\Controllers\\Asset\\AssetContoller' => __DIR__ . '/../..' . '/includes/Controllers/Asset/AssetContoller.php',
        'Ncpi\\Controllers\\Filter\\FilterController' => __DIR__ . '/../..' . '/includes/Controllers/Filter/FilterController.php',
        'Ncpi\\Controllers\\Hook\\HookController' => __DIR__ . '/../..' . '/includes/Controllers/Hook/HookController.php',
        'Ncpi\\Controllers\\Installation\\InstallationController' => __DIR__ . '/../..' . '/includes/Controllers/Installation/InstallationController.php',
        'Ncpi\\Controllers\\Installation\\Types\\DB' => __DIR__ . '/../..' . '/includes/Controllers/Installation/Types/DB.php',
        'Ncpi\\Controllers\\MainController' => __DIR__ . '/../..' . '/includes/Controllers/MainController.php',
        'Ncpi\\Controllers\\Marketing\\MarketingController' => __DIR__ . '/../..' . '/includes/Controllers/Marketing/MarketingController.php',
        'Ncpi\\Controllers\\Marketing\\Types\\Link' => __DIR__ . '/../..' . '/includes/Controllers/Marketing/Types/Link.php',
        'Ncpi\\Controllers\\Meta\\MetaController' => __DIR__ . '/../..' . '/includes/Controllers/Meta/MetaController.php',
        'Ncpi\\Controllers\\Meta\\Taxonomy\\Any' => __DIR__ . '/../..' . '/includes/Controllers/Meta/Taxonomy/Any.php',
        'Ncpi\\Controllers\\Meta\\Types\\Any' => __DIR__ . '/../..' . '/includes/Controllers/Meta/Types/Any.php',
        'Ncpi\\Controllers\\Meta\\Types\\Code' => __DIR__ . '/../..' . '/includes/Controllers/Meta/Types/Code.php',
        'Ncpi\\Controllers\\Meta\\User\\User' => __DIR__ . '/../..' . '/includes/Controllers/Meta/User/User.php',
        'Ncpi\\Controllers\\PostType\\PostTypeController' => __DIR__ . '/../..' . '/includes/Controllers/PostType/PostTypeController.php',
        'Ncpi\\Controllers\\PostType\\Types\\Job' => __DIR__ . '/../..' . '/includes/Controllers/PostType/Types/Job.php',
        'Ncpi\\Controllers\\Setting\\SettingController' => __DIR__ . '/../..' . '/includes/Controllers/Setting/SettingController.php',
        'Ncpi\\Controllers\\Setting\\Types\\Main' => __DIR__ . '/../..' . '/includes/Controllers/Setting/Types/Main.php',
        'Ncpi\\Controllers\\Taxonomy\\TaxonomyController' => __DIR__ . '/../..' . '/includes/Controllers/Taxonomy/TaxonomyController.php',
        'Ncpi\\Controllers\\Widget\\Elementor\\ElementorController' => __DIR__ . '/../..' . '/includes/Controllers/Widget/Elementor/ElementorController.php',
        'Ncpi\\Controllers\\Widget\\Elementor\\Widgets\\Registration' => __DIR__ . '/../..' . '/includes/Controllers/Widget/Elementor/Widgets/Registration.php',
        'Ncpi\\Controllers\\Widget\\Gutenberg\\GutenbergController' => __DIR__ . '/../..' . '/includes/Controllers/Widget/Gutenberg/GutenbergController.php',
        'Ncpi\\Controllers\\Widget\\WidgetController' => __DIR__ . '/../..' . '/includes/Controllers/Widget/WidgetController.php',
        'Ncpi\\Helpers\\Constant' => __DIR__ . '/../..' . '/includes/Helpers/Constant.php',
        'Ncpi\\Helpers\\Functions' => __DIR__ . '/../..' . '/includes/Helpers/Functions.php',
        'Ncpi\\Models\\Post' => __DIR__ . '/../..' . '/includes/Models/Post.php',
        'Ncpi\\Models\\SettingsAPI' => __DIR__ . '/../..' . '/includes/Models/SettingsAPI.php',
        'Ncpi\\Traits\\SingletonTrait' => __DIR__ . '/../..' . '/includes/Traits/SingletonTrait.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInitb50624ffc1f1204e2d5fae31ece50372::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInitb50624ffc1f1204e2d5fae31ece50372::$prefixDirsPsr4;
            $loader->classMap = ComposerStaticInitb50624ffc1f1204e2d5fae31ece50372::$classMap;

        }, null, ClassLoader::class);
    }
}
