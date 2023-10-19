import EmailTemplateForm from "@system-email-template/EmailTemplateForm";
const Main = () => {
  return (
    <EmailTemplateForm
      tab="team_password"
      title="Team Invitation"
      subVars="{org_name}"
      msgVars="{client_name}, {login_url}, {email}, {password}, {org_name}"
      isPro={true}
    />
  );
};
export default Main;
