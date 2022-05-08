import React from 'react'
import { useParams, useNavigate, useLocation } from "react-router-dom"; 
import Style from './style.scoped.scss'
import Invoice from './tab/invoice';

export default function InvoiceWrap() { 

	const { id, tab } = useParams();
	let navigate = useNavigate();

	const location = useLocation(); 
	let path = ''; 
	
	if ( id === undefined ) {
		path = location.pathname == '/invoice/single' ? 'invoice' : 'estimate';
	} else {
		let url_path = location.pathname.slice(0, location.pathname.lastIndexOf('/'));		
		path = url_path.includes('invoice') ? 'invoice' : 'estimate';
	}
 
	const routeChange = id => {
		navigate(`/${path}/single/${id}`, { replace: true });
	};

	const routeInvoice = () => {
		navigate(`/${path}`, { replace: true });
	}; 

	return (
		<>
			<Invoice id={id} tab={tab} routeChange={routeChange}  routeInvoice={routeInvoice} path={path} key={path} />
		</>
	);
} 