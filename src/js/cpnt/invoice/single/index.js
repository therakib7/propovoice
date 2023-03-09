import React from 'react'
import { useParams, useSearchParams, useNavigate, useLocation } from "react-router-dom";
import Style from './style.scoped.scss'
import WithApi from 'hoc/Api';

import Invoice from './tab/invoice';

const InvoiceWrap = (props) => {

	const { id, tab } = useParams();
	let navigate = useNavigate();

	const location = useLocation();
	let path = '';
	let module_id = null;
	const [searchParams, setSearchParams] = useSearchParams();

	if (searchParams.get('module_id')) {
		module_id = searchParams.get('module_id');
	}

	if (id === undefined) {
		path = location.pathname == '/invoice/new' ? 'invoice' : 'estimate';
	} else {
		let url_path = location.pathname.slice(0, location.pathname.lastIndexOf('/'));
		path = url_path.includes('invoice') ? 'invoice' : 'estimate';
	}

	const routeChange = id => {
		navigate(`/${path}/${id}`);
	};

	const routeInvoice = () => {
		navigate(`/${path}`);
	};

	return (
		<>
			<Invoice
				{...props}
				id={id}
				tab={tab}
				module_id={module_id}
				routeChange={routeChange}
				routeInvoice={routeInvoice}
				path={path}
				key={path}
			/>
		</>
	);
}

export default WithApi(InvoiceWrap);