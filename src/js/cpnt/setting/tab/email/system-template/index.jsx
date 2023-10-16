import React, { useState, lazy } from "react";

import TabBar from "./tab-bar";
import {
	EmailClientPortal,
	EmailDeal,
	EmailEstimate,
	EmailInvoice,
	EmailLead,
	EmailTeam,
} from "./forms";
const i18n = ndpv.i18n;

const Main = () => {
	const [currentTab, setCurrentTab] = useState("team");

	const tabs = [
		{
			id: "team",
			text: i18n.team,
			view: <EmailTeam />,
		},
		{
			id: "client_portal",
			text: "Client Portal",
			view: <EmailClientPortal />,
		},
		{
			id: "lead",
			text: i18n.lead,
			view: <EmailLead />,
		},
		{
			id: "deal",
			text: i18n.deal,
			view: <EmailDeal />,
		},
		{
			id: "estimate",
			text: i18n.est,
			view: <EmailEstimate />,
		},
		{
			id: "invoice",
			text: i18n.inv,
			view: <EmailInvoice />,
		},
		{
			id: "project",
			text: i18n.project,
			view: "",
		},
		{
			id: "task",
			text: i18n.task,
			view: "",
		},
		{
			id: "staff",
			text: i18n.staff,
			view: "",
		},
		{
			id: "file",
			text: i18n.file,
			view: "",
		},
	];

	const currentTabObj = tabs.find((tab) => tab.id === currentTab);

	return (
		<>
			<TabBar
				tabs={tabs}
				currentTab={currentTab}
				setCurrentTab={setCurrentTab}
			/>
			{currentTabObj["view"]}
		</>
	);
};
export default Main;
