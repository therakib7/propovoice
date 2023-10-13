import EmailTemplateForm from "../EmailTemplateForm";

const Main = () => {
	return (
		<>
			<EmailTemplateForm
				tab="estimate_default"
				title="Default Template"
				subVars="{id}, {org_name}, {client_name}"
				msgVars="{id}, {client_name}, {date}, {due_date}, {amount}, {org_name}"
			/>

			<EmailTemplateForm
				tab="estimate_reminder"
				title="Reminder Template"
				subVars="{id}, {org_name}, {client_name}"
				msgVars="{id}, {client_name}, {date}, {due_date}, {amount}, {org_name}"
				isPro={true}
			/>
		</>
	);
};
export default Main;
