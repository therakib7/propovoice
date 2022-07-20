// import { useEffect } from "react";
import React, { useCallback, useRef, useState, useEffect } from "react";
import Breadcrumb from 'block/breadcrumb';
import Preloader from 'block/preloader/table';

import Pipeline from './Pipeline';
import TaxonomyForm from 'block/field/taxonomy/Form';
import Form from './Form';
import Table from './Table';
// import Search from './Search';
import Empty from 'block/empty';

import Crud from 'hoc/Crud';

const Deal = (props) => {

    // const [list, setList] = useState([]);
    // const [listById, setListById] = useState([]);
    // const [dropdown, setDropdown] = useState(false);
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

        return () => {
            if (props.onLoad) {
                props.onLoad(false);
            }
        }
    }, []);
    
    const { title, lists, checkedBoxes, searchVal } = props.state;
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
                <div className="col-lg-6">
                    <h2 className="pi-page-title pi-mb-15">{title + ( !props.module_id  ? ' Pipeline' : '' )}</h2>
                </div>

                <div className="col-lg-6 pi-text-right">
                    <div className="pi-list-single-button-content">
                        {!props.module_id && <button
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

            {props.state.empty && <Empty title={title} searchVal={searchVal} clickHandler={() => props.openForm('new')} />}

            {props.state.preloader ? <Preloader /> :
                <>
                    {!props.module_id && <Pipeline
                        new={props.openForm}
                        data={lists}
                        taxForm={taxForm}
                    />}

                    {props.module_id && <>
                        <Table tableData={lists} searchVal={searchVal} editEntry={props.openForm} checkedBoxes={{ data: checkedBoxes, handle: props.handleCheckbox }} deleteEntry={props.deleteEntry} />
                        <div className="pi-pagination-content">
                            {props.state.totalPage > 1 && <Pagination forcePage={props.state.currentPage - 1} pageCount={props.state.totalPage} onPageChange={props.handlePageClick} />}
                        </div>
                    </>}
                </>
            } 

        </div>
    );
}

export default Crud(Deal, 'deal');