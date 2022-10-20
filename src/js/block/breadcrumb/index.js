
export default (props) => {
	return (
		<nav className="pv-breadcrumb">
			<ul className="">
				<li>
					<a href="#" className="">
						{ndpv.i18n.home}
					</a>
				</li>
				<li>
					<svg
						width={5}
						height={10}
						viewBox="0 0 5 10"
						fill="none"
						
					>
						<path
							d="M0.5 1.25L4.25 5L0.5 8.75"
							stroke="#718096"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</li>
				<li className="pv-active">{props.title}</li>
			</ul>
		</nav>
	);
}