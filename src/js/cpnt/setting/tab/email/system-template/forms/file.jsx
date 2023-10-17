import EmailTemplateForm from "@system-email-template/EmailTemplateForm";
const Main = () => {
  return (
    <>
      <EmailTemplateForm
        tab="file_add_notif"
        title="Add File Notification"
        subVars="{org_name}, {notification}"
        msgVars="{org_name}, {name}, {notification_link}"
      />
    </>
  );
};
export default Main;
