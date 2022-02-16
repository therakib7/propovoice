import React, { useState, useEffect } from 'react' 
import { useParams, useNavigate } from "react-router-dom"; 

import Invoice from './tab/invoice'; 
import Template from './tab/template'; 



function InvoiceWrap() {

	const { id } = useParams(); 
	let navigate = useNavigate();
	const routeChange = id => { 
		navigate(`/invoice/single/${id}`, { replace: true }); 
    };

	const tabs = [
		{
			id: 'template',
			text: 'Select Template',
			// content: Overview
		},
		{
			id: 'info',
			text: 'Add Information',
			// content: Project
		},
		{
			id: 'save',
			text: 'Save & Share',
			// content: Estimate
		}, 
	]; 
	const [currentTab, setCurrentTab] = useState('template'); 

	const activeTab = (e, id) => {
		e.preventDefault();
        setCurrentTab(id);
    }; 

    return (
		<>
			<div className="border-b border-gray-200 dark:border-gray-700">
				<ul className="flex flex-wrap -mb-px">

					{tabs.map((tab, index) => (
						<li className="mr-2" key={index}>
							<a
								href="#"
								className={"inline-flex py-4 px-4 text-sm font-medium text-center rounded-t-lg border-b-2 " + (currentTab == tab.id ? 'text-gray-700 border-gray-700' : 'border-transparent text-gray-500 hover:text-gray-600 hover:border-gray-300')}
								onClick={(e) => activeTab(e, tab.id)}
							>
								{tab.text}
							</a>
						</li>
					))}
				</ul>
			</div> 
			{ currentTab == 'template' && <Template />}
			{ currentTab == 'info' && <Invoice id={id} routeChange={routeChange} />}
			{ currentTab == 'save' && <Invoice id={id} routeChange={routeChange} />}
		</>
    );
} 
export default InvoiceWrap; 