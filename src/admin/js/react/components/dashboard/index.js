import React, { useCallback, useRef, useState, useEffect, Suspense, lazy } from "react";
import Spinner from 'block/preloader/spinner';

const Task = lazy(() => import('components/list-single/tab/task'));


const Summary = lazy(() => import('./section/Summary'));
const DealFunnel = lazy(() => import('./section/DealFunnel'));

//lead, source
const ChartPie = lazy(() => import('./chart/Pie'));

//deal
const ChartLine = lazy(() => import('./chart/Line'));

//estimate, invoice
const ChartBar = lazy(() => import('./chart/Bar'));

import WithApi from 'hoc/Api';

const Dashboard = (props) => {
    const [dropdown, setDropdown] = useState(false);

    useEffect(() => {
    }, []);

    return (
        <div className="ncpi-components">
            <div className="row">
                <div className="col">
                    <h2
                        className="pi-page-title"
                        style={{ color: "#2d3748", display: "inline-block" }}
                    >
                        Overview
                    </h2>
                    <select name="source" id="source" className="pi-overview-select">
                        <option value="">This month</option>
                        <option value="">This week</option>
                    </select>
                </div>

                <div className="col">
                    <div
                        className="pi-action-content"
                        style={{ display: "flex", justifyContent: "right" }}
                    >
                        <button
                            className="pi-btn pi-btn-medium pi-bg-blue pi-bg-hover-blue pi-bg-shadow pi-color-white pi-br-4"
                            onClick={() => setDropdown(val => !val)}
                        >
                            <svg
                                width={14}
                                height={12}
                                viewBox="0 0 12 15"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M2.5 8H13.5"
                                    stroke="white"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M8 2.5V13.5"
                                    stroke="white"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            Create
                        </button>

                        {dropdown && <div className="pi-dropdown-content pi-show" style={{ top: 40 }}>
                            <a href="#">Create Project</a>
                            <a href="#">Create Person</a>
                            <a href="#">Create Organization</a>
                        </div>}
                    </div>
                </div>
            </div>

            <Suspense fallback={<Spinner />}>
                <Summary {...props} />
            </Suspense>

            <div className="pi-block">
                <div className="row">
                    <div className="col-lg-7">
                        <div className='pi-bg-white pi-border-gray' style={{ padding: '10px 20px 20px 30px', marginBottom: '20px' }}>
                            <h3
                                className="pi-title-medium pi-mb-20"
                                style={{ fontWeight: "bold", color: "#718096" }}
                            >
                                Latest Task
                            </h3>
                            <Suspense fallback={<Spinner />}>
                                <Task tab_id={null} dashboard={true} />
                            </Suspense>
                        </div>
                    </div>

                    <div className="col-lg-5">
                        <Suspense fallback={<Spinner />}>
                            <DealFunnel {...props} />
                        </Suspense>
                    </div>
                </div>
            </div>

            <div className="pi-mt-30">
                <div className="row">
                    <div className="col-lg-8">
                        <Suspense fallback={<Spinner />}>
                            <ChartLine />
                            <ChartBar {...props} type='estimate' />
                            <ChartBar {...props} type='invoice' />
                        </Suspense>
                    </div>
                    <div className="col-lg-4">
                        <Suspense fallback={<Spinner />}>
                            <ChartPie {...props} type='lead_level' />
                            <ChartPie {...props} type='lead_source' />
                        </Suspense>
                    </div>
                </div>
            </div>
        </div>

    );
}
export default WithApi(Dashboard);