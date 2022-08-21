import React, { useCallback, useRef, lazy, Suspense, useEffect, useState } from "react";
import Spinner from 'block/preloader/spinner';
import { NavLink } from "react-router-dom";
import useClickOutside from 'block/outside-click';

const Task = lazy(() => import('cpnt/list-single/tab/task'));

const Summary = lazy(() => import('./section/Summary'));
const DealFunnel = lazy(() => import('./section/DealFunnel'));

//lead, source
const ChartPie = lazy(() => import('./chart/Pie'));

//deal
const ChartLine = lazy(() => import('./chart/Line'));

//estimate, invoice
const ChartBar = lazy(() => import('./chart/Bar'));

import WithApi from 'hoc/Api';

const TaskCom = () => {
    return (
        <div className='pi-bg-white pi-border-gray' style={{ minHeight: '435px', padding: '10px 20px 5px 30px', borderRadius: '8px' }}>
            <h3
                className="pi-title-medium pi-mb-20"
                style={{ fontWeight: "bold", color: "#718096", marginLeft: '-10px' }}
            >
                {ndpi.i18n.latest} {ndpi.i18n.task}
            </h3>
            <Suspense fallback={<Spinner />}>
                <Task tab_id={null} dashboard />
            </Suspense>
        </div>
    )
}

const Dashboard = (props) => {
    const [dropdown, setDropdown] = useState(false);

    const dropdownRef = useRef();
    const close = useCallback(() => setDropdown(false), []);
    useClickOutside(dropdownRef, close);

    const i18n = ndpi.i18n;
    const create = ndpi.i18n.create;

    return (
        <div className="ndpi-dashboard">
            <div className="row">
                <div className="col">
                    <h2
                        className="pi-page-title"
                        style={{ color: "#2d3748", display: "inline-block" }}
                    >
                        {i18n.ov}
                    </h2>
                    <select name="summary_by" id="summary_by" className="pi-overview-select">
                        <option value="2022">2022</option>
                    </select>
                </div>

                <div className="col">
                    <div
                        className="pi-action-content"
                        style={{ display: "flex", justifyContent: "right" }}
                        ref={dropdownRef}
                    >
                        <button
                            className="pi-btn pi-btn-medium pi-bg-blue pi-bg-hover-blue pi-bg-shadow pi-color-white pi-br-4"
                            onClick={() => setDropdown(val => !val)}>
                            <svg
                                width={14}
                                height={12}
                                viewBox="0 0 12 15"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg">
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
                                    strokeLinejoin="round" />
                            </svg>
                            {create}
                        </button>

                        {dropdown && <div className="pi-dropdown-content pi-show" style={{ top: 40 }}>
                            <NavLink to='/lead'>
                                {create} {i18n.lead}
                            </NavLink>
                            <NavLink to='/deal'>
                                {create} {i18n.deal}
                            </NavLink>
                            <NavLink to='/estimate'>
                                {create} {i18n.est}
                            </NavLink>
                            <NavLink to='/invoice'>
                                {create} {i18n.inv}
                            </NavLink>
                            <NavLink to='/project'>
                                {create} {i18n.project}
                            </NavLink>
                        </div>}
                    </div>
                </div>
            </div>

            <Suspense fallback={<Spinner />}>
                <Summary {...props} />
            </Suspense>

            {!wage.length && <div className="pi-block">
                <div className="row">
                    <div className="col-lg-7">
                        <TaskCom />
                    </div>

                    <div className="col-lg-5">
                        <Suspense fallback={<Spinner />}>
                            <DealFunnel {...props} />
                        </Suspense>
                    </div>
                </div>
            </div>}

            <div className="row">
                <div className="col-lg-8">
                    <Suspense fallback={<Spinner />}>
                        {wage.length > 0 &&<div style={{marginBottom: 25}}><TaskCom /></div>}
                        {!wage.length && <ChartLine {...props} type='deal_tracking' />}
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
    );
}
export default WithApi(Dashboard);