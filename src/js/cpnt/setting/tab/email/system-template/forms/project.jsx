import EmailTemplateForm from "@system-email-template/EmailTemplateForm";
const Main = () => {
  return (
    <>
      <EmailTemplateForm
        tab="project_discussion_add_notif"
        title="Add Project Discussion Notification"
        subVars="{org_name}, {notification}"
        msgVars="{org_name}, {name}, {notification_link}"
      />
    </>
  );
};
export default Main;
