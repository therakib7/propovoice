<?php
namespace Ndpv\Ctrl\Hook\Type\Action;

class Role
{
    public static $ndpv_caps = [
        "ndpv_core" => true,
        "ndpv_dashboard" => true,
        "ndpv_lead" => true,
        "ndpv_deal" => true,
        "ndpv_estimate" => true,
        "ndpv_invoice" => true,
        "ndpv_client" => true,
        "ndpv_project" => true,
        "ndpv_action" => true,
        "ndpv_business" => true,
        "ndpv_contact" => true,
        "ndpv_email" => true,
        "ndpv_file" => true,
        "ndpv_form" => true,
        "ndvp_media" => true,
        "ndpv_note" => true,
        "ndpv_org" => true,
        "ndpv_payment" => true,
        "ndpv_person" => true,
        "ndpv_setting" => true,
        "ndpv_task" => true,
        "ndpv_taxonomy" => true,
        "ndpv_webhook" => true,
        "ndpv_workspace" => true,
    ];

    public function __construct()
    {
        add_action("init", [$this, "update_admin_caps"], 11);
        add_filter("woocommerce_prevent_admin_access", "__return_false");
    }

    public function update_admin_caps()
    {
        $admin_role = get_role("administrator");

        foreach (self::$ndpv_caps as $cap => $perm) {
            $admin_role->add_cap($cap, $perm);
        }
    }
}
