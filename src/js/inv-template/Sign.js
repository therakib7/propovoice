export default (props) => {
	const sign = props.data;
	return (
		<div className="pi-inv-sign">
			{sign &&
				<>
					<img src={sign.src} alt="" />
					<div className="pi-border" />
					<h4>Signature</h4>
				</>
			}
		</div>
	)
} 