import EmailTemplateForm from "@system-email-template/EmailTemplateForm";
const Main = () => {
  return (
    <>
      <EmailTemplateForm
        tab="task_add"
        title="Add Task Notification"
        subVars=""
        msgVars=""
      />
      <EmailTemplateForm
        tab="task_assign"
        title="Assign Task Notification"
        subVars=""
        msgVars=""
      />
      <EmailTemplateForm
        tab="task_status_change"
        title="Status Change Notification"
        subVars=""
        msgVars=""
      />
    </>
  );
};
export default Main;
