import ReactPaginate from 'react-paginate';
import Preloader from 'block/preloader/table';

import Form from './Form';
import FormEdit from './FormEdit';
import Table from './Table';
// import Search from './Search';
// import Empty from 'block/empty';

import Crud from 'hoc/Crud';

const Task = (props) => {
    const { lists, checkedBoxes, searchVal } = props.state;
    return (
        <div className="">
            <Form
                handleSubmit={props.handleSubmit}
                tab_id={props.tab_id}
            />

            <FormEdit
                tab_id={props.tab_id}
                handleSubmit={props.handleSubmit}
                show={props.state.formModal}
                modalType={props.state.formModalType}
                data={props.state.list}
                close={props.closeForm}
            />

            <div className="pi-small-button-group">
                <h3>My Work</h3>
                <button className="pi-btn pi-btn-small pi-bg-stroke pi-bg-hover-shadow">
                    To do
                </button>
                <button className="pi-btn pi-btn-small pi-bg-stroke pi-bg-hover-shadow">
                    In Progress
                </button>
                <button className="pi-btn pi-btn-small pi-bg-stroke pi-bg-hover-shadow">
                    Done
                </button>
            </div>

            {props.state.preloader ? <Preloader /> : <div className="pi-accordion">
                {true &&
                    <>
                        <input type="radio" name="pi-accordion" id="pi-task-today" />
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
                            <label className="pi-table-close" htmlFor="acc-close" />
                            <div className="pi-accordion-content">
                                <Table tableData={lists.today} searchVal={searchVal} editEntry={props.openForm} checkedBoxes={{ data: checkedBoxes, handle: props.handleCheckbox }} deleteEntry={props.deleteEntry} />
                            </div>
                        </section>
                    </>
                } 

                {true &&
                    <>
                        <input type="radio" name="pi-accordion" id="pi-task-other" />
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
                            <label className="pi-table-close" htmlFor="acc-close" />
                            <div className="pi-accordion-content">
                                <Table tableData={lists.other} searchVal={searchVal} editEntry={props.openForm} checkedBoxes={{ data: checkedBoxes, handle: props.handleCheckbox }} deleteEntry={props.deleteEntry} />
                            </div>
                        </section>
                    </>
                }


                {true &&
                    <>
                        <input type="radio" name="pi-accordion" id="pi-task-unschedule" />
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
                                <b>Unscheduled</b>
                            </label>
                            <label className="pi-table-close" htmlFor="acc-close" />
                            <div className="pi-accordion-content">
                                <Table tableData={lists.unschedule} searchVal={searchVal} editEntry={props.openForm} checkedBoxes={{ data: checkedBoxes, handle: props.handleCheckbox }} deleteEntry={props.deleteEntry} />
                            </div>
                        </section>
                        <input type="radio" name="pi-accordion" id="acc-close" />
                    </>
                }


            </div>}

            {props.state.totalPage > 1 && <ReactPaginate
                previousClassName='pi-previous'
                nextClassName='pi-next'
                disabledClassName='pi-disabled'
                previousLabel={"<"}
                nextLabel={">"}
                breakLabel={"..."}
                breakClassName='break'
                forcePage={props.state.currentPage - 1}
                pageCount={props.state.totalPage}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={props.handlePageClick}
                containerClassName={"pi-pagination"}
                activeClassName='pi-active' />
            }
        </div>
    );
}


export default Crud(Task, 'task');