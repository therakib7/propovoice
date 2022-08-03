const Attach = (props) => {
	const attach = props.data;
	return (
		<div className=''>
			{attach.map((item, index) => (
				<div key={index}>
					<img src={item.src} width="100" />
				</div>
			))}
		</div>
	)
}
export default Attach


