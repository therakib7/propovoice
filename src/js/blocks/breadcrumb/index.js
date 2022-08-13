
const Breadcrumb = (props) => {
	return (
		<nav className="">
			<ul className="">
				<li>
					<a href="#" className="">
						Home
					</a>
				</li>
				<li>
					<svg
						width={5}
						height={10}
						viewBox="0 0 5 10"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M0.5 1.25L4.25 5L0.5 8.75"
							stroke="#718096"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</li>
				<li className="pi-active">{props.title}</li>
			</ul>
		</nav>
	);
};

export default Breadcrumb;