import EmailTemplateForm from "@system-email-template/EmailTemplateForm";

export default function Lead() {
  return (
    <>
      <EmailTemplateForm
        tab="lead_add_notif"
        title="Add Notification Template"
        subVars="{org_name}, {notification}"
        msgVars="{org_name}, {name}, {notification_link}"
        isPro={true}
      />
      <EmailTemplateForm
        tab="lead_assign_notif"
        title="Assign Notification Template"
        subVars="{org_name}, {notification}"
        msgVars="{org_name}, {name}, {notification_link}"
        isPro={true}
      />
      <EmailTemplateForm
        tab="lead_level_change_notif"
        title="Level Change Notification Template"
        subVars="{org_name}, {notification}"
        msgVars="{org_name}, {name}, {notification_link}"
        isPro={true}
      />
      <EmailTemplateForm
        tab="lead_to_deal_notif"
        title="Lead To Deal Notification Template"
        subVars="{org_name}, {notification}"
        msgVars="{org_name}, {name}, {notification_link}"
        isPro={true}
      />
    </>
  );
}
