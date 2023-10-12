import WithApi from "hoc/Api";
import EmailTemplateForm from "../EmailTemplateForm";
// import { useState, useEffect } from "react";
// import Default from "./sub/Default";
// import Reminder from "./sub/Reminder";
// import ProLabel from "block/pro-alert/label";

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
			{/* <Default {...props} /> */}
			{/* <Reminder {...props} /> */}
		</>
	);
};
export default WithApi(Main);
