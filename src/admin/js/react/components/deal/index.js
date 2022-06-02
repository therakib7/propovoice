import React, { Component } from 'react';

import ReactPaginate from 'react-paginate';

import Preloader from 'block/preloader/table';

import Pipeline from './Pipeline';
import Form from './Form';
import Table from './Table';
import Search from './Search';
import Empty from 'block/empty';

import Crud from 'hoc/Crud';

const Deal = (props) => {
    const { title, lists } = props.state;
    return (
        <div className="ncpi-components">
                <nav className='pi-breadcrumb'>
                    <ul>
                        <li>
                            <a href='#' >
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
                                    d="M.5 1.25L4.25 5 .5 8.75"
                                    stroke="#718096"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </li>
                        <li className='pi-active'>
                            {title} Pipeline
                        </li>
                    </ul>
                </nav>

                <div className="row">
                    <div className="col-lg-6">
                        <h2 className="pi-page-title">Deal Pipeline</h2>
                    </div>
                    <div className="col-lg-6 pi-text-right">
                        <button 
                        className="pi-btn pi-btn-medium pi-bg-blue pi-bg-hover-blue pi-bg-shadow"
                        onClick={() => props.openForm('new')}
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
                            Add {title}
                        </button>
                    </div>
                </div>

                {/* {props.state.empty && <Empty title={title} searchVal={searchVal} clickHandler={() => props.openForm('new')} />}  */}

                {props.state.formModal && <Form
                    handleSubmit={props.handleSubmit}
                    // show={props.state.formModal}
                    modalType={props.state.formModalType}
                    data={props.state.list}
                    close={props.closeForm}
                />}

                {props.state.preloader ? <Preloader /> : 
                <Pipeline 
                    new={props.openForm}
                    data={lists}
                />}
            </div> 
    );
}

export default Crud(Deal, 'deal');