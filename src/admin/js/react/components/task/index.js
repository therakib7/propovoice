import React, { Component, Suspense, lazy } from 'react'
import Breadcrumb from 'block/breadcrumb';
import WithApi from 'hoc/Api';
import Spinner from 'block/preloader/spinner';
const Task = lazy(() => import('components/list-single/tab/task'));

class ListSingle extends Component {

	constructor(props) {
		super(props);

		this.state = {  
			action: false, 
		};

		this.timeout = 0;
	}

	componentDidMount() {
	}

	setActiveTab(e, id) {
		e.preventDefault();
		this.setState({
			currentTab: id
		});
	}

	render() {
		const { tabs = [], currentTab } = this.state;
		return (
			<div className="ncpi-components">
				<Breadcrumb title={'Task & Activity'} />

				{/* <div className="row">
					<div className="col-lg">
						<h2 className="pi-page-title">Task &amp; Activity</h2>
					</div>
				</div> */}

				<div className="row pi-mt-25">
					<div className="col-lg-9">
						<div className="pi-horizontal-tab">
							<ul className="pi-tabs">
								<li className={"pi-tab "}>
									Task &amp; Activity
								</li>
							</ul>

							<div className="pi-tab-content">
								<Suspense fallback={<Spinner />}>
									<Task tab_id={null} />
								</Suspense>
							</div>
						</div>
					</div>

					<div className="col-lg-3 pi-lead-right-content">

						<div className="pi-widget pi-timeline-box">
							<h3 className="pi-widget-title">Timeline Info</h3>
							<ul>
								<li>
									<h4 className="timeline-title">Nabil Created Project Propovoice</h4>
									<span>Aprill 12, 2022</span>
									<span>4.10 PM</span>
								</li>
								<li>
									<h4 className="timeline-title">Nabil Created Project Propovoice</h4>
									<span>Aprill 12, 2022</span>
									<span>4.10 PM</span>
								</li>
								<li>
									<h4 className="timeline-title">Nabil Created Project Propovoice</h4>
									<span>Aprill 12, 2022</span>
									<span>4.10 PM</span>
								</li>
								<li>
									<h4 className="timeline-title">Nabil Created Project Propovoice</h4>
									<span>Aprill 12, 2022</span>
									<span>4.10 PM</span>
								</li>
							</ul>
							{/* ./ widget */}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default WithApi(ListSingle); 