import React, { Component, Suspense, lazy } from 'react'
import Breadcrumb from 'block/breadcrumb';
import Spinner from 'block/preloader/spinner';
const Task = lazy(() => import('cpnt/list-single/tab/task'));

const TaskList = (props) => {
const i18n = ndpv.i18n;
	return (
		<div className="ndpv-cpnt">
			<Breadcrumb title={ndpv.i18n.taska} />
			{/* <div className="row">
					<div className="col-lg">
						<h2 className="pv-page-title">{i18n.taska}</h2>
					</div>
				</div> */}

			<div className="row">
				<div className="col-lg-12">
					<div className="pv-horizontal-tab">
						<ul className="pv-tabs">
							<li className={"pv-tab "}>
								{i18n.taska}
							</li>
						</ul>

						<div className="pv-tab-content">
							<Suspense fallback={<Spinner />}>
								<Task tab_id={null} />
							</Suspense>
						</div>
					</div>
				</div>

				{false && <div className="col-lg-3 pv-lead-right-content">

					<div className="pv-widget pv-timeline-box">
						<h3 className="pv-widget-title pv-mb-15">Timeline Info (Upcoming)</h3>
						<ul>
							<li>
								<h4 className="timeline-title">Nasir Created a Project</h4>
								<span>Aprill 12, 2022</span>
								<span>4.10 PM</span>
							</li>
							<li>
								<h4 className="timeline-title">Rakib Created a Task</h4>
								<span>Aprill 11, 2022</span>
								<span>4.10 PM</span>
							</li>
							<li>
								<h4 className="timeline-title">Manir Crated a Lead</h4>
								<span>Aprill 10, 2022</span>
								<span>4.10 PM</span>
							</li>
						</ul>
					</div>
				</div>}
			</div>
		</div>
	);
}
export default TaskList; 