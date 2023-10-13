import EmailTemplateForm from "./EmailTemplateForm";

export default function Lead() {
  return (
    <>
      <EmailTemplateForm
        tab="lead_add_notif"
        title="Add Notification Template"
        isPro={true}
      />
      <EmailTemplateForm
        tab="lead_assign_notif"
        title="Assign Notification Template"
        isPro={true}
      />
      <EmailTemplateForm
        tab="lead_level_change_notif"
        title="Level Change Notification Template"
        isPro={true}
      />
      <EmailTemplateForm
        tab="lead_to_deal_notif"
        title="Lead To Deal Notification Template"
        isPro={true}
      />
    </>
  );
}
