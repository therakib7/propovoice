import React from 'react'
import { useParams, useNavigate } from "react-router-dom";
import Style from './style.scoped.scss'
import Invoice from './tab/invoice';

function InvoiceWrap() {

	const { id } = useParams();
	let navigate = useNavigate();
	const routeChange = id => {
		navigate(`/invoice/single/${id}`, { replace: true });
	};

	const routeInvoice = () => {
		navigate(`/invoice`, { replace: true });
	};

	return (
		<>
			<Invoice id={id} routeChange={routeChange}  routeInvoice={routeInvoice} />
		</>
	);
}
export default InvoiceWrap; 