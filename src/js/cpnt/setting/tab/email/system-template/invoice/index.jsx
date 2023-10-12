import { useState, useEffect } from "react";
import WithApi from "hoc/Api";

import Default from "./sub/Default";
import Reminder from "./sub/Reminder";
import Recurring from "./sub/Recurring";
import ProLabel from "block/pro-alert/label";
import EmailTemplateForm from "../EmailTemplateForm";

const Main = (props) => {
	return (
		<>
			<EmailTemplateForm
				module="settings"
				tab="email_invoice_default"
				formTitle="Default Template"
				subVars="{id} {org_name} {client_name}"
				msgVars="{id} {client_name} {date} {due_date} {amount} {org_name}"
			/>
			<EmailTemplateForm
				module="settings"
				tab="email_invoice_reminder"
				formTitle="Reminder Template"
				subVars="{id} {org_name} {client_name}"
				msgVars="{id} {client_name} {date} {due_date} {amount} {org_name}"
			/>
			<EmailTemplateForm
				module="settings"
				tab="email_invoice_recurring"
				formTitle="Recurring Template"
				subVars="{id} {org_name} {client_name}"
				msgVars="{id} {client_name} {date} {due_date} {amount} {org_name}"
			/>
			{/* <Default {...props} /> */}
			{/* <Reminder {...props} /> */}
			{/* <Recurring {...props} /> */}
		</>
	);
};
export default WithApi(Main);
