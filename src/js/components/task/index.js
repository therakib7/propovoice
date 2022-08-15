import React, { Component, Suspense, lazy } from 'react'
import Breadcrumb from 'block/breadcrumb';
import Spinner from 'block/preloader/spinner';
const Task = lazy(() => import('components/list-single/tab/task'));

const TaskList = (props) => {
	 
	return (
		<div className="ncpi-components">
			<Breadcrumb title={'Task & Activity'} />
			{/* <div className="row">
					<div className="col-lg">
						<h2 className="pi-page-title">Task &amp; Activity</h2>
					</div>
				</div> */}

			<div className="row">
				<div className="col-lg-12">
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

				{false && <div className="col-lg-3 pi-lead-right-content">

					<div className="pi-widget pi-timeline-box">
						<h3 className="pi-widget-title pi-mb-15">Timeline Info (Upcoming)</h3>
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