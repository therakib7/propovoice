import React, { Component } from 'react';
import { toast } from 'react-toastify';

import { useNavigate, useLocation } from "react-router-dom";
import AppContext from 'context/app-context';

// import ReactPaginate from 'react-paginate';

// import Preloader from 'block/preloader/table';
import AddNew from 'block/add-new';
import Action from 'block/action/table';
import Breadcrumb from 'block/breadcrumb';
import Pagination from 'block/pagination';
import Preloader from 'block/preloader/table';

import Api from 'api/invoice';
import ApiAction from 'api/action';

import Table from './Table';
import Search from './Search';
import Empty from 'block/empty';
import pro from 'block/pro-alert';

class Invoice extends Component {
    constructor(props) {
        super(props);

        this.state = {
            prefix: '',
            title: '',
            path: '',
            empty: false,
            preloader: true,
            formModal: false,
            searchModal: false,
            formModalType: 'new',
            invoice: { id: null },
            invoices: [],
            summary: {
                total: 0,
                paid: 0,
                unpaid: 0,
                draft: 0,
                sent: 0
            },
            checkedBoxes: [],
            offset: 0,
            perPage: 10,
            total: 1,
            totalPage: 1,
            currentPage: 1,
            searchVal: ''
        };
        this.timeout = 0;
    }

    static contextType = AppContext;

    componentDidMount() {
        const i18n = ndpv.i18n;
        let title = this.props.path == '/invoice' ? i18n.inv : i18n.est;
        let path = this.props.path == '/invoice' ? 'invoice' : 'estimate';

        this.setState({ title, path }, () => {
            this.getLists();
        });
    }

    getLists = (searchArgs = null) => {

        let args = {
            page: this.state.currentPage,
            per_page: this.state.perPage
        }

        args.path = this.state.path;

        if (this.props.invoice_id) {
            args.invoice_id = this.props.invoice_id;
        }

        if (this.props.module_id) {
            args.module_id = this.props.module_id;
        }

        if (searchArgs) {
            //Filter all falsy values ( "", 0, false, null, undefined )
            searchArgs = Object.entries(searchArgs).reduce((a, [k, v]) => (v ? (a[k] = v, a) : a), {})
            args = { ...args, ...searchArgs }
        }

        let params = new URLSearchParams(args).toString();

        Api.getAll(params)
            .then(resp => {
                let prefix = resp.data.data.prefix;
                let result = resp.data.data.result;
                let total = resp.data.data.total;
                let empty = result.length ? false : true;
                this.setState({ prefix, invoices: result, preloader: false, empty, total, totalPage: Math.ceil(total / this.state.perPage) });
            })
    };

    handleSearch = (e) => {
        const { value } = e.target;

        this.setState({ searchVal: value }, () => {
            // if (this.state.searchVal.length < 3) return;

            //search when typing stop
            if (this.timeout) clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                this.getLists({
                    s: this.state.searchVal
                });
            }, 300);
        });
    }

    showItem = (e) => {
        const { value } = e.target;
        this.setState({ perPage: value }, () => {
            this.getLists();
        });
    }

    deleteEntry = (type, index) => {

        if (confirm(ndpv.i18n.aConf)) {

            if (type == 'single') {
                /* this.setState({
                    invoices: this.state.invoices.filter((invoice, i) => {
                        return invoice.id !== index;
                    })
                }); */
            }
            let ids = (type == 'single') ? index : this.state.checkedBoxes.toString();
            Api.remove(ids)
                .then(resp => {
                    if (resp.data.success) {
                        toast.success(ndpv.i18n.aDel);
                        if (type != 'single') {
                            this.setState({ checkedBoxes: [] });
                        }

                        this.getLists();
                    } else {
                        resp.data.data.forEach(function (value, index, array) {
                            toast.error(value);
                        });
                    }
                })
        }
    }

    closeForm = (type = 'new') => {
        if (type == 'new') {
            this.setState({ formModal: false });
        } else {
            this.setState({ searchModal: false });
        }
    };

    handleCheckbox = (e, type, id = null) => {
        let arr = this.state.checkedBoxes;
        if (type == 'single') {
            if (e.target.checked) {
                arr.push(id);
                this.setState({ checkedBoxes: arr });
            } else {
                arr.splice(arr.indexOf(id), 1);
                this.setState({ checkedBoxes: arr });
            }
        } else {
            //check all
            if (e.target.checked) {
                let ids = [];
                this.state.invoices.map((row) => { ids.push(row.id) });
                this.setState({ checkedBoxes: ids });
            } else {
                this.setState({ checkedBoxes: [] });
            }
        }
    }

    handlePageClick = (e) => {
        const selectedPage = e.selected + 1;
        const offset = selectedPage * this.state.perPage;
        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.getLists()
        });
    };

    newInvoie = () => {
        this.props.routeChange();
    };

    handleAction = (type, id) => {

        if (wage.length > 0 && (type == 'copy' || type == 'copy-to-inv')) {
            pro();
            return;
        }

        if (
            type == 'sent' ||
            type == 'paid' ||
            type == 'accept' ||
            type == 'decline'
        ) {
            ApiAction.update(id, { type })
                .then(resp => {
                    if (resp.data.success) {
                        if (type == 'sent') {
                            toast.success(i18n.scf + ' ' + i18n.mark + ' ' + i18n.as + ' ' + i18n.sent);
                        } else if (type == 'paid') {
                            toast.success(i18n.scf + ' ' + i18n.mark + ' ' + i18n.as + ' ' + i18n.paid);
                        } else if (type == 'accept') {
                            toast.success(i18n.scf + ' ' + i18n.mark + ' ' + i18n.as + ' ' + i18n.acptd);
                        } else if (type == 'decline') {
                            toast.success(i18n.scf + ' ' + i18n.mark + ' ' + i18n.as + ' ' + i18n.dec);
                        }
                        this.getLists();
                    } else {
                        resp.data.data.forEach(function (value, index, array) {
                            toast.error(value);
                        });
                    }
                })
        } else if (
            type == 'copy' ||
            type == 'copy-to-inv'
        ) {
            ApiAction.create({ id, type })
                .then(resp => {
                    if (resp.data.success) {
                        if (type == 'copy') {
                            toast.success(ndpv.i18n.scf + ' ' + ndpv.i18n.cc);
                            this.getLists();
                        } else if (type == 'copy-to-inv') {
                            toast.success(i18n.scf + ' ' + i18n.conV + ' ' + i18n.to + ' ' + i18n.inv);
                        }
                    } else {
                        resp.data.data.forEach(function (value, index, array) {
                            toast.error(value);
                        });
                    }
                })
        }
    }

    render() {
        const { prefix, title, invoices, checkedBoxes, searchVal } = this.state;
        const { total, paid, unpaid, draft, sent } = this.state.summary;
        return (
            <div className="ndpv-cpnt">
                {!this.props.module_id && <Breadcrumb title={title} />}

                <div className="row">
                    <div className="col">
                        <h2 className="pv-page-title">{title}</h2>
                    </div>
                    <div className="col">
                        <AddNew
                            title={title}
                            openForm={() => this.newInvoie()}
                        />
                    </div>
                </div>

                {!this.props.module_id && false && <div className="pv-buttons-group pv-mb-20">
                    <button className="pv-btn pv-btn-icon pv-bg-hover-shadow pv-mr-5">
                        <svg
                            width={20}
                            height={20}
                            viewBox="0 0 20 20"
                            fill="none"

                        >
                            <path
                                d="M7.5 5H16.875"
                                stroke="#4A5568"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M7.5 10H16.875"
                                stroke="#4A5568"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M7.5 15H16.875"
                                stroke="#4A5568"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M3.125 5H4.375"
                                stroke="#4A5568"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M3.125 10H4.375"
                                stroke="#4A5568"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M3.125 15H4.375"
                                stroke="#4A5568"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                    <button className="pv-btn pv-btn-icon pv-bg-hover-shadow">
                        <svg
                            width={20}
                            height={20}
                            viewBox="0 0 20 20"
                            fill="none"

                        >
                            <path
                                d="M17.5 4.375H2.5C2.15482 4.375 1.875 4.65482 1.875 5V6.875C1.875 7.22018 2.15482 7.5 2.5 7.5H17.5C17.8452 7.5 18.125 7.22018 18.125 6.875V5C18.125 4.65482 17.8452 4.375 17.5 4.375Z"
                                stroke="#A0AEC0"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M16.875 7.5V15C16.875 15.1658 16.8092 15.3247 16.6919 15.4419C16.5747 15.5592 16.4158 15.625 16.25 15.625H3.75C3.58424 15.625 3.42527 15.5592 3.30806 15.4419C3.19085 15.3247 3.125 15.1658 3.125 15V7.5"
                                stroke="#A0AEC0"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M8.125 10.625H11.875"
                                stroke="#A0AEC0"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                </div>}

                {!this.props.module_id && <Search
                    title={title}
                    showing={invoices.length}
                    showItem={this.showItem}
                    total={this.state.total}
                    handleSubmit={this.getLists}
                />}

                {checkedBoxes.length > 0 &&
                    <Action
                        length={checkedBoxes.length}
                        uncheckAll={() => this.setState({ checkedBoxes: [] })}
                        deleteEntry={this.deleteEntry}
                    />
                }

                {this.state.empty && <Empty title={title} searchVal={searchVal} clickHandler={() => this.newInvoie()} />}

                {this.state.preloader ? <Preloader /> : <Table prefix={prefix} reload={this.getLists} tableData={invoices} checkedBoxes={{ data: checkedBoxes, handle: this.handleCheckbox }} deleteEntry={this.deleteEntry} invoice_id={this.props.invoice_id} path={this.state.path} action={this.handleAction} />}

                {this.state.totalPage > 1 && <Pagination forcePage={this.state.currentPage - 1} pageCount={this.state.totalPage} onPageChange={this.handlePageClick} />}
            </div>
        );
    }
}

function InvoiceWrap(props) {
    const location = useLocation();
    let path = location.pathname;
    //module id is, project, deal id etc
    let module_id = null;
    if (props.path) {
        path = '/' + props.path;
    }

    if (props.module_id) {
        module_id = props.module_id;
    }

    let navigate = useNavigate();
    const routeChange = () => {
        if (module_id) {
            navigate(`${path}/single?module_id=${module_id}`);
        } else {
            navigate(`${path}/single`);
        }
    };

    return (
        <>
            <Invoice routeChange={routeChange} path={path} module_id={module_id} key={path} />
        </>
    );
}
export default InvoiceWrap; 