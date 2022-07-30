import React, { useCallback, useRef, useState, useEffect } from "react";
import Breadcrumb from 'block/breadcrumb';
import Preloader from 'block/preloader/table';

import Pipeline from './Pipeline';
import TaxonomyForm from 'block/field/taxonomy/Form';
import Action from 'block/action/table';
import Form from './Form';
import Table from './Table';
import Search from './Search';
import Empty from 'block/empty';

import Crud from 'hoc/Crud';

const Deal = (props) => {

    const [loading, setLoading] = useState(false);
    const [boardView, setBoardView] = useState(true);
    const [modal, setModal] = useState(false);
    const [modalType, setModalType] = useState('new');
    const newForm = {
        id: null,
        label: '',
        color: '',
        bg_color: '',
        icon: null
    };
    const [form, setForm] = useState(newForm);

    const taxForm = (type = 'new', data = null) => {
        setModal(true)
        setModalType(type)
        if (type == 'new') {
            setForm(newForm)
        } else {
            const newData = {
                id: data.id,
                label: data.name,
                color: data.color,
                bg_color: data.bg_color,
                icon: null
            }
            setForm(newData)
        }
    };

    useEffect(() => {
        if (props.onLoad) {
            props.onLoad(true);
        }

        props.getLists();

        return () => {
            if (props.onLoad) {
                props.onLoad(false);
            }
        }

    }, []);

    const viewChange = (view = '') => {
        setLoading(true);
        if (view == 'board') {
            const promise = props.getLists();
            promise.then(resp => {
                setBoardView(true);
                setLoading(false);
            })
        } else {
            const promise = props.getLists({ table_view: true });
            promise.then(resp => {
                setBoardView(false);
                setLoading(false);
            })
        }
    }

    const { title, lists, checkedBoxes, searchVal } = props.state;

    const activeColor = '#4A5568';
    const inactiveColor = '#A0AEC0';
    return (
        <div className="ncpi-components">
            {!props.module_id && <Breadcrumb title={title + ' Pipeline'} />}

            {props.state.formModal && <Form
                handleSubmit={props.handleSubmit}
                modalType={props.state.formModalType}
                data={props.state.list}
                close={props.closeForm}
            />}

            {modal && <TaxonomyForm
                {...props}
                taxonomy='deal_stage'
                title='Stage'
                reload={props.getLists}
                modalType={modalType}
                data={form}
                color={true}
                close={() => setModal(false)}
            />}

            <div className="row">
                <div className="col">
                    <h2 className="pi-page-title">{title + (!props.module_id ? ' Pipeline' : '')}</h2>
                </div>
                <div className="col">
                    <div className="pi-list-single-button-content">
                        {!wage.length && !props.module_id && <button
                            className="pi-btn pi-btn-medium pi-bg-stroke pi-bg-hover-shadow"
                            onClick={() => taxForm('new')}
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
                                    stroke="#4A5568"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M8 2.5V13.5"
                                    stroke="#4A5568"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            Add Stage
                        </button>}

                        <button
                            className="pi-btn pi-btn-medium pi-bg-blue pi-bg-hover-blue pi-bg-shadow pi-color-white"
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
            </div>

            {!wage.length && <div className="pi-buttons-group pi-mb-20">

                <button className="pi-btn pi-btn-icon pi-bg-hover-shadow pi-mr-5"
                    onClick={() => viewChange('board')}
                >
                    <svg
                        width={20}
                        height={20}
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M17.5 4.375H2.5C2.15482 4.375 1.875 4.65482 1.875 5V6.875C1.875 7.22018 2.15482 7.5 2.5 7.5H17.5C17.8452 7.5 18.125 7.22018 18.125 6.875V5C18.125 4.65482 17.8452 4.375 17.5 4.375Z"
                            stroke={boardView ? activeColor : inactiveColor}
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M16.875 7.5V15C16.875 15.1658 16.8092 15.3247 16.6919 15.4419C16.5747 15.5592 16.4158 15.625 16.25 15.625H3.75C3.58424 15.625 3.42527 15.5592 3.30806 15.4419C3.19085 15.3247 3.125 15.1658 3.125 15V7.5"
                            stroke={boardView ? activeColor : inactiveColor}
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M8.125 10.625H11.875"
                            stroke={boardView ? activeColor : inactiveColor}
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>

                <button className="pi-btn pi-btn-icon pi-bg-hover-shadow"
                    onClick={() => viewChange('table')}
                >
                    <svg
                        width={20}
                        height={20}
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M7.5 5H16.875"
                            stroke={!boardView ? activeColor : inactiveColor}
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M7.5 10H16.875"
                            stroke={!boardView ? activeColor : inactiveColor}
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M7.5 15H16.875"
                            stroke={!boardView ? activeColor : inactiveColor}
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M3.125 5H4.375"
                            stroke={!boardView ? activeColor : inactiveColor}
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M3.125 10H4.375"
                            stroke={!boardView ? activeColor : inactiveColor}
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M3.125 15H4.375"
                            stroke={!boardView ? activeColor : inactiveColor}
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>
            </div>}

            <Search
                title={title}
                showing={lists.length}
                showItem={props.showItem}
                total={props.state.total}
                handleSubmit={props.getLists}
                boardView={boardView}
            />

            {checkedBoxes.length > 0 &&
                <Action
                    length={checkedBoxes.length}
                    uncheckAll={props.uncheckAll}
                    deleteEntry={props.deleteEntry}
                />
            }

            {props.state.empty && <Empty title={title} searchVal={searchVal} clickHandler={() => props.openForm('new')} />}

            {props.state.preloader || loading ? <Preloader /> : <>
                {(!props.module_id && boardView) && <Pipeline
                    new={props.openForm}
                    data={lists}
                    taxForm={taxForm}
                />}
                {/* {(props.module_id || !boardView) && <> 
                    {console.log(lists)}
                </>} */}

                {(props.module_id || !boardView) && <>
                    <Table tableData={lists} searchVal={searchVal} editEntry={props.openForm} checkedBoxes={{ data: checkedBoxes, handle: props.handleCheckbox }} deleteEntry={props.deleteEntry} />
                    <div className="pi-pagination-content">
                        {props.state.totalPage > 1 && <Pagination forcePage={props.state.currentPage - 1} pageCount={props.state.totalPage} onPageChange={props.handlePageClick} />}
                    </div>
                </>}
            </>}
        </div>
    );
}

export default Crud(Deal, 'deal');