import React from 'react'
import { useParams, useNavigate } from "react-router-dom";

import Invoice from './tab/invoice';

function InvoiceWrap() {

	const { id } = useParams();
	let navigate = useNavigate();
	const routeChange = id => {
		navigate(`/invoice/single/${id}`, { replace: true });
	};
	return (
		<>
			<Invoice id={id} routeChange={routeChange} />
		</>
	);
}
export default InvoiceWrap; 