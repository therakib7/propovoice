import EmailTemplateForm from "@system-email-template/EmailTemplateForm";

export default function Deal() {
  return (
    <>
      <EmailTemplateForm
        tab="deal_add_notif"
        title="Add Notification Template"
        subVars="{org_name}, {notification}"
        msgVars="{org_name}, {name}, {notification_link}"
        isPro={true}
      />
      <EmailTemplateForm
        tab="deal_assign_notif"
        title="Assign Notification Template"
        subVars="{org_name}, {notification}"
        msgVars="{org_name}, {name}, {notification_link}"
        isPro={true}
      />
      <EmailTemplateForm
        tab="deal_stage_change_notif"
        title="Stage Change Notification Template"
        subVars="{org_name}, {notification}"
        msgVars="{org_name}, {name}, {notification_link}"
        isPro={true}
      />
    </>
  );
}
