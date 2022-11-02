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

const Widget = lazy(() => import('./section/Widget'));

import WithApi from 'hoc/Api';

const TaskCom = () => {
    const i18n = ndpv.i18n;
    return (
        <div className='pv-bg-white pv-border-gray' style={{ minHeight: '435px', padding: '10px 20px 5px 30px', borderRadius: '8px' }}>
            <h3
                className="pv-title-medium pv-mb-20"
                style={{ fontWeight: "bold", color: "#718096", marginLeft: '-10px' }}
            >
                {i18n.latest} {i18n.taska}
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

    const create = ndpv.i18n.create;
    const i18n = ndpv.i18n;
    return (
        <div className="ndpv-dashboard">
            <div className="row">
                <div className="col">
                    <h2
                        className="pv-page-title"
                        style={{ color: "#2d3748", display: "inline-block" }}
                    >
                        {i18n.ov}
                    </h2>
                    <select name="summary_by" id="summary_by" className="pv-overview-select">
                        <option value="2022">2022</option>
                    </select>
                </div>

                <div className="col">
                    {false && <div
                        className="pv-action-content"
                        style={{ display: "flex", justifyContent: "right" }}
                        ref={dropdownRef}
                    >
                        <button
                            className="pv-btn pv-btn-medium pv-bg-blue pv-bg-hover-blue pv-bg-shadow pv-color-white pv-br-4"
                            onClick={() => setDropdown(val => !val)}>
                            <svg
                                width={14}
                                height={12}
                                viewBox="0 0 12 15"
                                fill="none"
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
                                    strokeLinejoin="round" />
                            </svg>
                            {create}
                        </button>

                        {dropdown && <div className="pv-dropdown-content pv-show" style={{ top: 40 }}>
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
                    </div>}
                </div>
            </div>

            <Suspense fallback={<Spinner />}>
                <Summary {...props} />
            </Suspense>

            {!wage.length && <div className="pv-block">
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
                        {wage.length > 0 && <div style={{ marginBottom: 25 }}><TaskCom /></div>}
                        {!wage.length && <ChartLine {...props} type='deal_tracking' />}
                        <ChartBar {...props} type='estimate' />
                        <ChartBar {...props} type='invoice' />

                        {false && <div className="row">
                            <div className="col-md-6">

                            </div>
                            <div className="col-md-6">
                                <Widget
                                    title='Missing Any Feature?'
                                    desc='If you, unfortunately, find any features missing or struggle to use any of them, please inform us. We will try our level best to fix it as soon as possible.'
                                    btnTxt='Request Feature'
                                    btnUrl='#'
                                    bgColor='EFE7DF'
                                >
                                    <svg
                                        width={37}
                                        height={37}
                                        viewBox="0 0 37 37"
                                        fill="none"
                                    >
                                        <path
                                            d="M28.2974 32.1724H8.04742C7.74906 32.1724 7.46291 32.0539 7.25193 31.8429C7.04095 31.6319 6.92242 31.3458 6.92242 31.0474V6.29742C6.92242 5.99906 7.04095 5.71291 7.25193 5.50193C7.46291 5.29095 7.74906 5.17242 8.04742 5.17242H21.5474L29.4224 13.0474V31.0474C29.4224 31.3458 29.3039 31.6319 29.0929 31.8429C28.8819 32.0539 28.5958 32.1724 28.2974 32.1724Z"
                                            stroke="#A49485"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M21.5474 5.17242V13.0474H29.4224"
                                            stroke="#A49485"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M20.3943 24.2693L22.6443 26.5193"
                                            stroke="#A49485"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M17.6099 25.4224C19.7845 25.4224 21.5474 23.6595 21.5474 21.4849C21.5474 19.3103 19.7845 17.5474 17.6099 17.5474C15.4353 17.5474 13.6724 19.3103 13.6724 21.4849C13.6724 23.6595 15.4353 25.4224 17.6099 25.4224Z"
                                            stroke="#A49485"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </Widget>
                            </div>
                        </div>}

                    </Suspense>
                </div>
                <div className="col-lg-4">
                    <Suspense fallback={<Spinner />}>
                        <ChartPie {...props} type='lead_level' />
                        <ChartPie {...props} type='lead_source' />

                        {wage.length > 0 && <Widget
                            title='Upgrade Pro to Get Access All Insight'
                            desc='Please upgrade to pro and get access to enjoy all the amazing features that accelerate your business growth and take your business experience to the next level.'
                            btnTxt='Upgrade Now'
                            btnUrl='https://propovoice.com/pricing'
                            bgColor='FFEED9'
                        >
                            <svg
                                width={37}
                                height={37}
                                viewBox="0 0 37 37"
                                fill="none"

                            >
                                <path
                                    d="M7.0147 29.1727C7.05068 29.3206 7.11594 29.4598 7.20662 29.5821C7.2973 29.7043 7.41156 29.8071 7.54265 29.8845C7.67375 29.9618 7.81901 30.0121 7.96986 30.0324C8.12071 30.0526 8.27409 30.0424 8.42095 30.0024C15.1245 28.1463 22.2064 28.1463 28.91 30.0024C29.0569 30.0424 29.2102 30.0526 29.3611 30.0324C29.5119 30.0121 29.6572 29.9618 29.7883 29.8845C29.9194 29.8071 30.0337 29.7043 30.1243 29.5821C30.215 29.4598 30.2803 29.3206 30.3163 29.1727L33.9022 13.9431C33.9514 13.7392 33.9427 13.5257 33.877 13.3265C33.8113 13.1273 33.6913 12.9505 33.5304 12.816C33.3695 12.6814 33.1743 12.5945 32.9666 12.5651C32.759 12.5356 32.5473 12.5648 32.3553 12.6493L25.2397 15.8134C24.9819 15.9269 24.6911 15.9408 24.4236 15.8525C24.1561 15.7642 23.9308 15.5799 23.7913 15.3352L19.6569 7.88212C19.5596 7.70628 19.417 7.55971 19.2439 7.45765C19.0708 7.35559 18.8735 7.30176 18.6725 7.30176C18.4715 7.30176 18.2743 7.35559 18.1011 7.45765C17.928 7.55971 17.7854 7.70628 17.6881 7.88212L13.5538 15.3352C13.4142 15.5799 13.1889 15.7642 12.9214 15.8525C12.6539 15.9408 12.3631 15.9269 12.1053 15.8134L4.9897 12.6493C4.79776 12.5648 4.58603 12.5356 4.3784 12.5651C4.17076 12.5945 3.97549 12.6814 3.81463 12.816C3.65376 12.9505 3.53371 13.1273 3.46801 13.3265C3.40231 13.5257 3.39359 13.7392 3.44282 13.9431L7.0147 29.1727Z"
                                    stroke="#FF6B00"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M14.1725 23.4148C17.1638 23.0914 20.1812 23.0914 23.1725 23.4148"
                                    stroke="#FF6B00"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </Widget>}

                        {false && <Widget
                            title='Newsletter Subscription'
                            desc='Please subscribe now and get informative content and weekly updates on service business.
                            Accurate information and timely updates take you ahead of your competitors.'
                            btnTxt='Subscribe Now'
                            btnUrl='https://propovoice.com'
                            bgColor='FAEADA'
                        >
                            <svg
                                width={27}
                                height={28}
                                viewBox="0 0 27 28"
                                fill="none"

                            >
                                <path
                                    d="M0 21.0193C1.5913 21.0193 3.11742 21.6514 4.24264 22.7766C5.36786 23.9019 6 25.428 6 27.0193H0V21.0193ZM0 10.5193C9.1125 10.5193 16.5 17.9068 16.5 27.0193H13.5C13.5 23.4389 12.0777 20.0051 9.54594 17.4733C7.0142 14.9416 3.58042 13.5193 0 13.5193V10.5193ZM0 0.0192871C14.9115 0.0192871 27 12.1078 27 27.0193H24C24 13.7638 13.2555 3.01929 0 3.01929V0.0192871Z"
                                    fill="#EBA45D"
                                />
                            </svg>
                        </Widget>}

                        {wage.length > 0 && <Widget
                            title='Help and Support'
                            desc='Feel free to ping us whenever you need any support. We will be happy to assist you and make your journey smooth. We keep our users satisfaction top of our minds.'
                            btnTxt='See Documentation'
                            btnUrl='https://propovoice.com/docs'
                            bgColor='E0F0EC'
                            contact
                        >
                            <svg
                                width={34}
                                height={34}
                                viewBox="0 0 34 34"
                                fill="none"
                            >
                                <path
                                    d="M28.907 11H30.5C31.2956 11 32.0587 11.316 32.6213 11.8787C33.1839 12.4413 33.5 13.2043 33.5 14V20C33.5 20.7956 33.1839 21.5587 32.6213 22.1213C32.0587 22.6839 31.2956 23 30.5 23H28.907C28.5413 25.8999 27.1299 28.5667 24.9376 30.5C22.7453 32.4332 19.9229 33.4999 17 33.5V30.5C19.3869 30.5 21.6761 29.5518 23.364 27.8639C25.0518 26.1761 26 23.8869 26 21.5V12.5C26 10.113 25.0518 7.82384 23.364 6.13601C21.6761 4.44818 19.3869 3.49997 17 3.49997C14.6131 3.49997 12.3239 4.44818 10.636 6.13601C8.94821 7.82384 8 10.113 8 12.5V23H3.5C2.70435 23 1.94129 22.6839 1.37868 22.1213C0.816071 21.5587 0.5 20.7956 0.5 20V14C0.5 13.2043 0.816071 12.4413 1.37868 11.8787C1.94129 11.316 2.70435 11 3.5 11H5.093C5.45905 8.10032 6.87062 5.43388 9.06286 3.50099C11.2551 1.56809 14.0773 0.501587 17 0.501587C19.9227 0.501587 22.7449 1.56809 24.9371 3.50099C27.1294 5.43388 28.541 8.10032 28.907 11ZM3.5 14V20H5V14H3.5ZM29 14V20H30.5V14H29ZM10.64 22.6775L12.23 20.1335C13.6596 21.029 15.313 21.5027 17 21.5C18.687 21.5027 20.3404 21.029 21.77 20.1335L23.36 22.6775C21.4539 23.8717 19.2493 24.5034 17 24.5C14.7507 24.5034 12.5461 23.8717 10.64 22.6775Z"
                                    fill="#4BB99E"
                                />
                            </svg>
                        </Widget>}

                    </Suspense>
                </div>
            </div>
        </div>
    );
}
export default WithApi(Dashboard);