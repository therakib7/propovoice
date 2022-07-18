import { useState } from "react";
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

    const handleDelete = ( type, id) => {
		if ( confirm('Are you sure, to delete it?') ) { //TODO: translation 
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

            {!props.dashboard && <div className="pi-small-button-group">
                <h3 className="pi-title-small">My Work</h3>
                {lists.task_status && lists.task_status.map((status, statusIndex) => {
                    return (
                        <button key={statusIndex}
                            className={'pi-btn pi-btn-small pi-bg-stroke pi-bg-hover-shadow ' + ((activeTab == status.id) || (!activeTab && statusIndex == 0) ? 'pi-active' : '')}
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
                    {props.dashboard && <Table dashboard={true} tableData={lists.latest} taxonomies={taxonomies} searchVal={searchVal} editEntry={props.openForm} checkedBoxes={{ data: checkedBoxes, handle: props.handleCheckbox }} handleSubmit={props.handleSubmit} deleteEntry={handleDelete} />}

                    {!props.dashboard &&
                        <div className="pi-accordion">
                            {lists.today.length > 0 &&
                                <>
                                    <input type="radio" name="pi-accordion" defaultChecked={openTodayTab} id="pi-task-today" />
                                    <section className="pi-accordion-table">
                                        <label className="pi-accordion-title" htmlFor="pi-task-today">
                                            <span className="pi-down-angle">
                                                <svg
                                                    width={11}
                                                    height={7}
                                                    viewBox="0 0 11 7"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
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
                                            <b>Today</b>
                                        </label>
                                        <label className="pi-table-close" htmlFor="pi-acc-close" />
                                        <div className="pi-accordion-content">
                                            <Table tableData={lists.today} taxonomies={taxonomies} searchVal={searchVal} editEntry={props.openForm} checkedBoxes={{ data: checkedBoxes, handle: props.handleCheckbox }} handleSubmit={props.handleSubmit} deleteEntry={handleDelete} />
                                        </div>
                                    </section>
                                </>
                            }

                            {lists.other.length > 0 &&
                                <>
                                    <input type="radio" name="pi-accordion" defaultChecked={openOtherTab} id="pi-task-other" />
                                    <section className="pi-accordion-table">
                                        <label className="pi-accordion-title" htmlFor="pi-task-other">
                                            <span className="pi-down-angle">
                                                <svg
                                                    width={11}
                                                    height={7}
                                                    viewBox="0 0 11 7"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
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
                                            <b>Others Day</b>
                                        </label>
                                        <label className="pi-table-close" htmlFor="pi-acc-close" />
                                        <div className="pi-accordion-content">
                                            <Table tableData={lists.other} taxonomies={taxonomies} searchVal={searchVal} editEntry={props.openForm} checkedBoxes={{ data: checkedBoxes, handle: props.handleCheckbox }} deleteEntry={handleDelete} />
                                        </div>
                                    </section>
                                </>
                            }

                            {lists.unschedule.length > 0 &&
                                <>
                                    <input type="radio" name="pi-accordion" defaultChecked={openUnscheduleTab} id="pi-task-unschedule" />
                                    <section className="pi-accordion-table">
                                        <label className="pi-accordion-title" htmlFor="pi-task-unschedule">
                                            <span className="pi-down-angle">
                                                <svg
                                                    width={11}
                                                    height={7}
                                                    viewBox="0 0 11 7"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
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
                                            <b>Unschedule</b>
                                        </label>
                                        <label className="pi-table-close" htmlFor="pi-acc-close" />
                                        <div className="pi-accordion-content">
                                            <Table tableData={lists.unschedule} taxonomies={taxonomies} searchVal={searchVal} editEntry={props.openForm} checkedBoxes={{ data: checkedBoxes, handle: props.handleCheckbox }} deleteEntry={handleDelete} />
                                        </div>
                                    </section>
                                </>
                            }
                            <input type="radio" name="pi-accordion" id="pi-acc-close" />
                        </div>}
                </>
            }
        </div>
    );
}  
const TaskHoc = Crud(Task, 'task'); 
export default WithApi(TaskHoc);