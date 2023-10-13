import { useState, useEffect } from "react";

import Default from "./sub/Default";
import Reminder from "./sub/Reminder";
import Recurring from "./sub/Recurring";
import ProLabel from "block/pro-alert/label";
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
			{/* <Default {...props} /> */}
			{/* <Reminder {...props} /> */}
			{/* <Recurring {...props} /> */}
		</>
	);
};
export default Main;
