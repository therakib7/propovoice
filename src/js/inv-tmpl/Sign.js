export default (props) => {
	const sign = props.data;
	return (
		<div className="pi-inv-sign">
			{sign &&
				<>
					<img src={sign.src} alt="" />
					{/* <div className="pi-inv-border" />
					<h4>{ndpv.i18n.Sign}</h4> */}
				</>
			}
		</div>
	)
} 