import EmailTemplateForm from "./EmailTemplateForm";

export default function Deal() {
  return (
    <>
      <EmailTemplateForm
        tab="deal_add_notif"
        title="Add Notification Template"
        isPro={true}
      />
      <EmailTemplateForm
        tab="deal_assign_notif"
        title="Assign Notification Template"
        isPro={true}
      />
      <EmailTemplateForm
        tab="deal_stage_change_notif"
        title="Stage Change Notification Template"
        isPro={true}
      />
    </>
  );
}
