import EmailTemplateForm from "../EmailTemplateForm";

const Main = (props) => {
	return (
		<>
			<EmailTemplateForm
				tab="invoice_default"
				title="Default Template"
				subVars="{id}, {org_name}, {client_name}"
				msgVars="{id}, {client_name}, {date}, {due_date}, {amount}, {org_name}"
			/>
			<EmailTemplateForm
				tab="invoice_reminder"
				title="Reminder Template"
				subVars="{id}, {org_name}, {client_name}"
				msgVars="{id}, {client_name}, {date}, {due_date}, {amount}, {org_name}"
				isPro={true}
			/>
			<EmailTemplateForm
				tab="invoice_recurring"
				title="Recurring Template"
				subVars="{id}, {org_name}, {client_name}"
				msgVars="{id}, {client_name}, {date}, {due_date}, {amount}, {org_name}"
				isPro={true}
			/>
		</>
	);
};
export default Main;
