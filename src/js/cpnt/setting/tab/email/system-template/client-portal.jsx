import EmailTemplateForm from "./EmailTemplateForm";
const Main = () => {
  return (
    <EmailTemplateForm
      tab="client_portal_password"
      title="Client Portal Invitation"
      subVars="{org_name}"
      msgVars="{client_name}, {login_url}, {email}, {password}, {org_name}"
      isPro={true}
    />
  );
};
export default Main;
