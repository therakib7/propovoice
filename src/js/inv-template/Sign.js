export default (props) => {
	const sign = props.data;
	return (
		<div className="pi-inv-sign">
			{sign &&
				<>
					<img src={sign.src} alt="" />
					<div className="pi-border" />
					<h4>{ndpi.i18n.Sign}</h4>
				</>
			}
		</div>
	)
} 