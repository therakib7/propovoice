export default (props) => {
	const sign = props.data;
	return (
		<div className="pv-inv-sign">
			{sign &&
				<>
					<img src={sign.src} alt="" />
					{/* <div className="pv-inv-border" />
					<h4>{ndpv.i18n.Sign}</h4> */}
				</>
			}
		</div>
	)
} 