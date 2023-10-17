import EmailTemplateForm from "@system-email-template/EmailTemplateForm";

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
			<EmailTemplateForm
				tab="invoice_add_notif"
				title="Add Notification Template"
				subVars="{org_name}, {notification}"
				msgVars="{org_name}, {name}, {notification_link}"
				isPro={true}
			/>
			<EmailTemplateForm
				tab="invoice_edit_notif"
				title="Edit Notification Template"
				subVars="{org_name}, {notification}"
				msgVars="{org_name}, {name}, {notification_link}"
				isPro={true}
			/>
			<EmailTemplateForm
				tab="invoice_paid_notif"
				title="Paid Notification Template"
				subVars="{org_name}, {notification}"
				msgVars="{org_name}, {name}, {notification_link}"
				isPro={true}
			/>
			<EmailTemplateForm
				tab="invoice_paid_req_notif"
				title="Paid Request Notification Template"
				subVars="{org_name}, {notification}"
				msgVars="{org_name}, {name}, {notification_link}"
				isPro={true}
			/>
		</>
	);
};
export default Main;
