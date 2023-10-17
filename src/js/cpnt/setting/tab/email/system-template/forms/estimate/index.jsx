import EmailTemplateForm from "@system-email-template/EmailTemplateForm";

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

			<EmailTemplateForm
				tab="estimate_add_notif"
				title="Add Notification Template"
				subVars="{org_name}, {notification}"
				msgVars="{org_name}, {name}, {notification_link}"
				isPro={true}
			/>
			<EmailTemplateForm
				tab="estimate_edit_notif"
				title="Edit Notification Template"
				subVars="{org_name}, {notification}"
				msgVars="{org_name}, {name}, {notification_link}"
				isPro={true}
			/>
			<EmailTemplateForm
				tab="estimate_accept_notif"
				title="Accept Notification Template"
				subVars="{org_name}, {notification}"
				msgVars="{org_name}, {name}, {notification_link}"
				isPro={true}
			/>
			<EmailTemplateForm
				tab="estimate_reject_notif"
				title="Reject Notification Template"
				subVars="{org_name}, {notification}"
				msgVars="{org_name}, {name}, {notification_link}"
				isPro={true}
			/>
		</>
	);
};
export default Main;
