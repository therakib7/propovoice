import { useState, useEffect } from "react";
import Preloader from 'block/preloader/table';
import { toast } from 'react-toastify';
import Form from './Form';
import FormEdit from './FormEdit';
import Table from './Table';
//import Search from './Search';
//import Empty from 'block/empty';
import WithApi from 'hoc/Api';
import Crud from 'hoc/Crud';

const Task = (props) => {

    useEffect(() => {
        props.getLists();
    }, []);

    const [activeTab, setActiveTab] = useState(null);
    const [taxonomies, setTaxonomies] = useState({
        status: [],
        types: [],
        priorities: [],
    });

    const { lists, checkedBoxes, searchVal } = props.state;

    let openTodayTab, openOtherTab, openUnscheduleTab = false;

    if (lists.hasOwnProperty('today')) {
        if (lists.today.length > 0) {
            openTodayTab = true;
        }

        if (!lists.today.length && lists.other.length > 0) {
            openOtherTab = true;
        }

        if (!lists.today.length && !lists.other.length && lists.unschedule.length > 0) {
            openUnscheduleTab = true;
        }
    }

    const handleDelete = (type, id) => {
        if (confirm('Are you sure, to delete it?')) { //TODO: translation 
            props.remove('tasks', id).then(resp => {
                if (resp.data.success) {
                    toast.success('Successfully deleted'); //TODO: translation
                    props.getLists({ status_id: activeTab });
                } else {
                    resp.data.data.forEach(function (value, index, array) {
                        toast.error(value);
                    });
                }
            });
        }
    }
    const i18n = ndpv.i18n;
    return (
        <div className="">
            <Form
                handleSubmit={props.handleSubmit}
                setTaxonomies={setTaxonomies}
                tab_id={props.tab_id}
            />

            {props.state.formModal && <FormEdit
                tab_id={props.tab_id}
                reload={props.getLists}
                taxonomies={taxonomies}
                handleSubmit={props.handleSubmit}
                modalType={props.state.formModalType}
                data={props.state.list}
                close={props.closeForm}
            />}

            {!props.dashboard && <div className="pv-small-button-group">
                <h3 className="pv-title-small">{i18n.my} {i18n.work}</h3>
                {lists.task_status && lists.task_status.map((status, statusIndex) => {
                    return (
                        <button key={statusIndex}
                            className={'pv-btn pv-btn-small pv-bg-stroke pv-bg-hover-shadow ' + ((activeTab == status.id) || (!activeTab && statusIndex == 0) ? 'pv-active' : '')}
                            onClick={() => { setActiveTab(status.id); props.getLists({ status_id: status.id }); }}
                        >
                            {status.label}
                        </button>
                    )
                })}
            </div>}

            {props.state.preloader ? <Preloader /> :
                <>
                    {props.dashboard && <div style={{ marginTop: '15px' }}></div>}
                    {props.dashboard && <Table dashboard tableData={lists.latest} taxonomies={taxonomies} searchVal={searchVal} editEntry={props.openForm} checkedBoxes={{ data: checkedBoxes, handle: props.handleCheckbox }} handleSubmit={props.handleSubmit} deleteEntry={handleDelete} />}

                    {!props.dashboard &&
                        <div className="pv-accordion">
                            {lists.today.length > 0 &&
                                <>
                                    <input type="radio" name="pv-accordion" defaultChecked={openTodayTab} id="pv-task-today" />
                                    <section className="pv-accordion-table">
                                        <label className="pv-accordion-title" htmlFor="pv-task-today">
                                            <span className="pv-down-angle">
                                                <svg
                                                    width={11}
                                                    height={7}
                                                    viewBox="0 0 11 7"
                                                    fill="none"
                                                    
                                                >
                                                    <path
                                                        d="M9.72339 1.53915L5.72339 5.53915L1.72339 1.53915"
                                                        stroke="#CBD5E0"
                                                        strokeWidth="1.5"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                            </span>
                                            <b>{i18n.today}</b>
                                        </label>
                                        <label className="pv-table-close" htmlFor="pv-acc-close" />
                                        <div className="pv-accordion-content">
                                            <Table tableData={lists.today} taxonomies={taxonomies} searchVal={searchVal} editEntry={props.openForm} checkedBoxes={{ data: checkedBoxes, handle: props.handleCheckbox }} handleSubmit={props.handleSubmit} deleteEntry={handleDelete} />
                                        </div>
                                    </section>
                                </>
                            }

                            {lists.other.length > 0 &&
                                <>
                                    <input type="radio" name="pv-accordion" defaultChecked={openOtherTab} id="pv-task-other" />
                                    <section className="pv-accordion-table">
                                        <label className="pv-accordion-title" htmlFor="pv-task-other">
                                            <span className="pv-down-angle">
                                                <svg
                                                    width={11}
                                                    height={7}
                                                    viewBox="0 0 11 7"
                                                    fill="none"
                                                    
                                                >
                                                    <path
                                                        d="M9.72339 1.53915L5.72339 5.53915L1.72339 1.53915"
                                                        stroke="#CBD5E0"
                                                        strokeWidth="1.5"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                            </span>
                                            <b>{i18n.othrday}</b>
                                        </label>
                                        <label className="pv-table-close" htmlFor="pv-acc-close" />
                                        <div className="pv-accordion-content">
                                            <Table tableData={lists.other} taxonomies={taxonomies} searchVal={searchVal} editEntry={props.openForm} checkedBoxes={{ data: checkedBoxes, handle: props.handleCheckbox }} deleteEntry={handleDelete} />
                                        </div>
                                    </section>
                                </>
                            }

                            {lists.unschedule.length > 0 &&
                                <>
                                    <input type="radio" name="pv-accordion" defaultChecked={openUnscheduleTab} id="pv-task-unschedule" />
                                    <section className="pv-accordion-table">
                                        <label className="pv-accordion-title" htmlFor="pv-task-unschedule">
                                            <span className="pv-down-angle">
                                                <svg
                                                    width={11}
                                                    height={7}
                                                    viewBox="0 0 11 7"
                                                    fill="none"
                                                    
                                                >
                                                    <path
                                                        d="M9.72339 1.53915L5.72339 5.53915L1.72339 1.53915"
                                                        stroke="#CBD5E0"
                                                        strokeWidth="1.5"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                            </span>
                                            <b>{i18n.unschedule}</b>
                                        </label>
                                        <label className="pv-table-close" htmlFor="pv-acc-close" />
                                        <div className="pv-accordion-content">
                                            <Table tableData={lists.unschedule} taxonomies={taxonomies} searchVal={searchVal} editEntry={props.openForm} checkedBoxes={{ data: checkedBoxes, handle: props.handleCheckbox }} deleteEntry={handleDelete} />
                                        </div>
                                    </section>
                                </>
                            }
                            <input type="radio" name="pv-accordion" id="pv-acc-close" />
                        </div>}
                </>
            }
        </div>
    );
}
const TaskHoc = Crud(Task, 'task', ndpv.i18n.taska);
export default WithApi(TaskHoc);