export default (props) => {
	let status = false;
	let title, desc;
	let extraClass = '';
	const i18n = ndpv.i18n;
	switch (props.status) {
		case 'accept':
			status = true;
			title = i18n.acptd;
			desc = i18n.acceptDes;
			extraClass = 'pv-green-color';
			break;

		case 'decline':
			status = true;
			title = i18n.dec;
			desc = i18n.decDes;
			break;

		case 'overdue':
			status = true;
			title = i18n.ovd;
			desc = i18n.ovdDes;
			break;

		case 'paid_req':
			status = true;
			title = i18n.appp;
			desc = i18n.paidreqDes;
			break;

		case 'paid':
			status = true;
			title = props.invoice.hasOwnProperty('recurring') ? i18n.subsed : i18n.paid;
			extraClass = 'pv-green-color';
			desc = i18n.paidDes;
			break;
	}

	return (
		<>
			{status && <div className="pv-inv-seal">
				<div
					className={'pv-badge-border ' + extraClass}
					style={{
						position: "absolute",
						top: 120,
						zIndex: 99,
						left: 300,
						width: 185,
						transform: "rotate(340deg)"
					}}
				>
					<div className="pv-badge-style-one">
						<h4>{title}</h4>
						<p>{desc}</p>
					</div>
				</div>
			</div>}
		</>
	)
}