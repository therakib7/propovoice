import React, { useState, useEffect, Suspense, lazy } from "react";
import EmailTemplateForm from "./EmailTemplateForm";
const EmailLead = lazy(() => import("./lead"));
const EmailEstimate = lazy(() => import("./estimate"));
const EmailInvoice = lazy(() => import("./invoice"));

const i18n = ndpv.i18n;

const Main = (props) => {
	const [tabs, setTabs] = useState([
		{
			id: "team",
			text: i18n.team,
		},
		{
			id: "client_portal",
			text: "Client Portal",
		},
		{
			id: "lead",
			text: i18n.lead,
		},
		{
			id: "estimate",
			text: i18n.est,
		},
		{
			id: "invoice",
			text: i18n.inv,
		},
	]);
	const [currentTab, setCurrentTab] = useState("team");

	return (
		<>
			<ul className="pv-horizontal-tab">
				{tabs.map((tab, index) => (
					<li
						key={index}
						className={"pv-tab " + (tab.id == currentTab ? "pv-active" : "")}
						onClick={(e) => setCurrentTab(tab.id)}
					>
						{tab.text} {tab.id == "estimate"}
					</li>
				))}
			</ul>

			{currentTab == "lead" && <EmailLead {...props} />}
			{currentTab == "estimate" && <EmailEstimate {...props} />}
			{currentTab == "invoice" && <EmailInvoice {...props} />}
			{currentTab == "client_portal" && (
				<EmailTemplateForm
					tab="client_portal_password"
					title="Client Portal Invitation"
					subVars="{org_name}"
					msgVars="{client_name}, {login_url}, {email}, {password}, {org_name}"
					isPro={true}
				/>
			)}
			{currentTab == "team" && (
				<EmailTemplateForm
					tab="team_password"
					title="Team Invitation"
					subVars="{org_name}"
					msgVars="{client_name}, {login_url}, {email}, {password}, {org_name}"
					isPro={true}
				/>
			)}
		</>
	);
};
export default Main;
