import React, { Component } from 'react';

import ReactPaginate from 'react-paginate';

import Preloader from 'block/preloader/table';

import Form from './Form';
import Table from './Table';
import Search from './Search';
import Empty from 'block/empty';

import Crud from 'hoc/Crud';

class Business extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { title, lists, checkedBoxes, searchVal } = this.props.state;
        return (
            <div className="ncpi-components">
                {wage.length > 0 &&
                    <>
                        <div className="pi-setting-heading-content">
                            <h3>Business Info</h3>
                            <p><b>Note:</b> In this version, You can add only one business info</p>
                        </div>
                    </>}

                <div className="pi-buttons">
                    <button
                        className="pi-btn pi-bg-blue pi-bg-hover-blue"
                        onClick={() => this.props.openForm('new')} >
                        Create New {title}
                    </button>

                    <div className="pi-search-box pi-float-right">
                        <svg
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M10.77 18.3a7.53 7.53 0 110-15.06 7.53 7.53 0 010 15.06zm0-13.55a6 6 0 100 12 6 6 0 000-12z"
                                fill="#718096"
                            />
                            <path
                                d="M20 20.75a.74.74 0 01-.53-.22l-4.13-4.13a.75.75 0 011.06-1.06l4.13 4.13a.75.75 0 01-.53 1.28z"
                                fill="#718096"
                            />
                        </svg>

                        <input
                            type="text"
                            className="pi-search-input"
                            placeholder="Search..."
                            value={searchVal}
                            onChange={this.props.handleSearch}
                        />
                    </div>
                </div>

                {this.props.state.empty && <Empty title={title} searchVal={searchVal} clickHandler={() => this.props.openForm('new')} />}

                {/* <button                    
                    onClick={() => this.setState({ searchModal: true })} >
                    Search
                </button> */}

                <Form
                    handleSubmit={this.props.handleSubmit}
                    show={this.props.state.formModal}
                    modalType={this.props.state.formModalType}
                    data={this.props.state.business}
                    close={this.props.closeForm}
                />

                <Search
                    handleSubmit={this.props.getLists}
                    show={this.props.state.searchModal}
                    close={this.props.closeForm}
                />

                {lists.length > 0 && <div className='pi-table-showing'>
                    <p>
                        {lists.length} {title} showing from {this.props.state.total}
                        <select onChange={this.props.showItem}>
                            <option value="10">Show item 10</option>
                            <option value="20">Show item 20</option>
                            <option value="30">Show item 30</option>
                            <option value="50">Show item 50</option>
                            <option value="100">Show item 100</option>
                        </select>
                    </p>
                </div>}

                {checkedBoxes.length > 0 && <div className='pi-table-showing'>
                    <p>
                        {checkedBoxes.length} {title} selected
                        <button
                            style={{ marginLeft: '10px', backgroundColor: '#edf2f7' }} className="pi-btn"
                            onClick={() => this.props.deleteEntry('selected')} >
                            Delete
                        </button>
                    </p>
                </div>}
                {this.props.state.preloader ? <Preloader /> : <Table tableData={lists} searchVal={searchVal} editEntry={this.props.openForm} checkedBoxes={{ data: checkedBoxes, handle: this.props.handleCheckbox }} deleteEntry={this.props.deleteEntry} />}

                {this.props.state.totalPage > 1 && <ReactPaginate
                    previousClassName='pi-previous'
                    nextClassName='pi-next'
                    disabledClassName='pi-disabled'
                    previousLabel={"<"}
                    nextLabel={">"}
                    breakLabel={"..."}
                    breakClassName='break'
                    forcePage={this.props.state.currentPage - 1}
                    pageCount={this.props.state.totalPage}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.props.handlePageClick}
                    containerClassName={"pi-pagination"}
                    activeClassName='pi-active' />
                }

            </div>
        );
    }
}
export default Crud(Business, 'business', '', 'businesses');