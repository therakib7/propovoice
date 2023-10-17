import EmailTemplateForm from "@system-email-template/EmailTemplateForm";
const Main = () => {
  return (
    <>
      <EmailTemplateForm
        tab="task_add_notif"
        title="Add Task Notification"
        subVars="{org_name}, {notification}"
        msgVars="{org_name}, {name}, {notification_link}"
      />
      <EmailTemplateForm
        tab="task_assign_notif"
        title="Assign Task Notification"
        subVars="{org_name}, {notification}"
        msgVars="{org_name}, {name}, {notification_link}"
      />
      <EmailTemplateForm
        tab="task_status_change_notif"
        title="Status Change Notification"
        subVars="{org_name}, {notification}"
        msgVars="{org_name}, {name}, {notification_link}"
      />
    </>
  );
};
export default Main;
