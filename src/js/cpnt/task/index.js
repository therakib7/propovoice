import React, { Component, Suspense, lazy } from 'react'
import Breadcrumb from 'block/breadcrumb';
import Spinner from 'block/preloader/spinner';
const Task = lazy(() => import('cpnt/list-single/tab/task'));

const TaskList = (props) => {
	const i18n = ndpi.i18n;
	return (
		<div className="ncpi-cpnt">
			<Breadcrumb title={i18n.task + ' ' + i18n.nd +' ' + i18n.acti } />
			{/* <div className="row">
					<div className="col-lg">
						<h2 className="pi-page-title">{i18n.task}</h2>
					</div>
				</div> */}

			<div className="row">
				<div className="col-lg-12">
					<div className="pi-horizontal-tab">
						<ul className="pi-tabs">
							<li className={"pi-tab "}>
								{i18n.task}
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