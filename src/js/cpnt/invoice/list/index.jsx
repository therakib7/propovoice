import React, { Component } from "react";
import { toast } from "react-toastify";
import EntityFields from "block/add-new/EntityFields";
import { useNavigate, useLocation } from "react-router-dom";
import AppContext from "context/app-context";

// import ReactPaginate from 'react-paginate';

// import Preloader from 'block/preloader/table';
import AddNew from "block/add-new";
import Action from "block/action/table";
import Breadcrumb from "block/breadcrumb";
import Pagination from "block/pagination";
import Preloader from "block/preloader/table";

import Api from "api/invoice";
import ApiAction from "api/action";

import Table from "./Table";
import Search from "./Search";
import Empty from "block/empty";
import pro from "block/pro-alert";

class Invoice extends Component {
  constructor(props) {
    super(props);

    this.state = {
      prefix: "",
      title: "",
      path: "",
      empty: false,
      preloader: true,
      formModal: false,
      searchModal: false,
      formModalType: "new",
      invoice: { id: null },
      invoices: [],
      summary: {
        total: 0,
        paid: 0,
        unpaid: 0,
        draft: 0,
        sent: 0,
      },
      checkedBoxes: [],
      offset: 0,
      perPage: 10,
      total: 1,
      totalPage: 1,
      currentPage: 1,
      searchVal: "",
    };
    this.timeout = 0;
  }

  static contextType = AppContext;

  componentDidMount() {
    const i18n = ndpv.i18n;
    let title = this.props.path == "/invoice" ? i18n.inv : i18n.est;
    let path = this.props.path == "/invoice" ? "invoice" : "estimate";

    this.setState({ title, path }, () => {
      this.getLists();
    });
  }

  getLists = (searchArgs = null) => {
    let args = {
      page: this.state.currentPage,
      per_page: this.state.perPage,
    };

    args.path = this.state.path;

    if (this.props.invoice_id) {
      args.invoice_id = this.props.invoice_id;
    }

    if (this.props.module_id) {
      args.module_id = this.props.module_id;
    }

    if (this.props.client_mod) {
      args.client_mod = true;
    }

    if (this.props.dashboard) {
      args.dashboard = true;
    }

    if (searchArgs) {
      //Filter all falsy values ( "", 0, false, null, undefined )
      searchArgs = Object.entries(searchArgs).reduce(
        (a, [k, v]) => (v ? ((a[k] = v), a) : a),
        {},
      );
      args = { ...args, ...searchArgs };
    }

    let params = new URLSearchParams(args).toString();

    Api.getAll(params).then((resp) => {
      let prefix = resp.data.data.prefix;
      let result = resp.data.data.result;
      let total = resp.data.data.total;
      let empty = result.length ? false : true;
      this.setState({
        prefix,
        invoices: result,
        preloader: false,
        empty,
        total,
        totalPage: Math.ceil(total / this.state.perPage),
      });
    });
  };

  handleSearch = (e) => {
    const { value } = e.target;

    this.setState({ searchVal: value }, () => {
      // if (this.state.searchVal.length < 3) return;

      //search when typing stop
      if (this.timeout) clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.getLists({
          s: this.state.searchVal,
        });
      }, 300);
    });
  };

  showItem = (e) => {
    const { value } = e.target;
    this.setState({ perPage: value }, () => {
      this.getLists();
    });
  };

  deleteEntry = (type, index) => {
    if (confirm(ndpv.i18n.aConf)) {
      if (type == "single") {
        /* this.setState({
                    invoices: this.state.invoices.filter((invoice, i) => {
                        return invoice.id !== index;
                    })
                }); */
      }
      let ids = type == "single" ? index : this.state.checkedBoxes.toString();
      Api.remove(ids).then((resp) => {
        if (resp.data.success) {
          toast.success(ndpv.i18n.aDel);
          if (type != "single") {
            this.setState({ checkedBoxes: [] });
          }

          this.getLists();
        } else {
          resp.data.data.forEach(function (value) {
            toast.error(value);
          });
        }
      });
    }
  };

  closeForm = (type = "new") => {
    if (type == "new") {
      this.setState({ formModal: false });
    } else {
      this.setState({ searchModal: false });
    }
  };

  handleCheckbox = (e, type, id = null) => {
    let arr = this.state.checkedBoxes;
    if (type == "single") {
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
        this.state.invoices.map((row) => {
          ids.push(row.id);
        });
        this.setState({ checkedBoxes: ids });
      } else {
        this.setState({ checkedBoxes: [] });
      }
    }
  };

  handlePageClick = (e) => {
    const selectedPage = e.selected + 1;
    const offset = selectedPage * this.state.perPage;
    this.setState(
      {
        currentPage: selectedPage,
        offset: offset,
      },
      () => {
        this.getLists();
      },
    );
  };

  newInvoie = () => {
    this.props.routeChange();
  };

  handleBulkAction = async (type) => {
    let ids = this.state.checkedBoxes;

    // Action for sent, paid, accept, decline
    await this.applyUpdateAction(ids, type);

    // Action for copy to invoice
    await this.copyToInvoiceAction(ids, type);

    this.setState({ checkedBoxes: [] });
    this.getLists();
  };

  applyUpdateAction = async (ids, type) => {
    //Exclude copy to invoice
    if (type == "copy-to-inv") {
      return;
    }

    const actionIds = this.actionIdsToUpdate(ids, type);
    ids = actionIds.toString();

    if (!ids) {
      return;
    }

    const resp = await ApiAction.update(ids, { type });
    if (resp.data.success) {
      // console.log(`${type} action successfull for id - ${id}`);
    } else {
      resp.data.data.forEach(function (value) {
        toast.error(value);
      });
    }
  };

  actionIdsToUpdate = (ids, type) => {
    return ids.filter((id) => {
      const invoice = this.state.invoices.find((inv) => inv.id === id);

      // Restrict sent while an invoice status is paid
      if (type === "sent" && invoice.status === "paid") {
        toast.error(`Can not be sent ${invoice.num} after paid!!!`);
        return false;
      }
      return true;
    });
  };

  copyToInvoiceAction = async (ids, type) => {
    const id = ids.toString();

    // Check for type is copy-to-inv
    if (type !== "copy-to-inv" || !id) {
      return;
    }

    try {
      const resp = await ApiAction.create({ id, type });
      if (resp.data.success) {
        toast.success("Copy to invoice action successful");
      } else {
        resp.data.data.forEach((value) => {
          toast.error(value);
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  handleAction = (type, id) => {
    const i18n = ndpv.i18n;
    if (wage.length > 0 && (type == "copy" || type == "copy-to-inv")) {
      pro();
      return;
    }

    if (
      type == "sent" ||
      type == "paid" ||
      type == "accept" ||
      type == "decline"
    ) {
      ApiAction.update(id, { type }).then((resp) => {
        if (resp.data.success) {
          if (type == "sent") {
            toast.success(
              i18n.scf + " " + i18n.mark_as_sent,
            );
          } else if (type == "paid") {
            toast.success(
              i18n.scf + " " + i18n.mark_as_paid,
            );
          } else if (type == "accept") {
            toast.success(
              i18n.scf + " " + i18n.mark_as_acpt,
            );
          } else if (type == "decline") {
            toast.success(
              i18n.scf + " " + i18n.mark_as_decl,
            );
          }
          this.getLists();
        } else {
          resp.data.data.forEach(function (value) {
            toast.error(value);
          });
        }
      });
    } else if (type == "copy" || type == "copy-to-inv") {
      ApiAction.create({ id, type }).then((resp) => {
        if (resp.data.success) {
          if (type == "copy") {
            toast.success(ndpv.i18n.scf + " " + ndpv.i18n.cc);
            this.getLists();
          } else if (type == "copy-to-inv") {
            toast.success(
              i18n.scf + " " + i18n.copy_to_inv,
            );
          }
        } else {
          resp.data.data.forEach(function (value) {
            toast.error(value);
          });
        }
      });
    }
  };

  actions = {
    common: [
      {
        slug: "delete",
        type: "selected",
        label: ndpv.i18n.del,
        handleClick: this.deleteEntry,
      },
    ],
    estimate: [
      {
        slug: "mark_accepted",
        type: "accept",
        label: ndpv.i18n.mark + " " + ndpv.i18n.acptd,
        handleClick: this.handleBulkAction,
      },
      {
        slug: "mark_declined",
        type: "decline",
        label: ndpv.i18n.mark + " " + ndpv.i18n.dec,
        handleClick: this.handleBulkAction,
      },
      {
        slug: "copy_to_invoicce",
        type: "copy-to-inv",
        label: ndpv.i18n.copy_to_inv,
        handleClick: this.handleBulkAction,
      },
    ],
    invoice: [
      {
        slug: "mark_sent",
        type: "sent",
        label: ndpv.i18n.mark + " " + ndpv.i18n.sent,
        handleClick: this.handleBulkAction,
      },
      {
        slug: "mark_paid",
        type: "paid",
        label: ndpv.i18n.mark + " " + ndpv.i18n.paid,
        handleClick: this.handleBulkAction,
      },
    ],
  };

  render() {
    const { prefix, title, invoices, checkedBoxes, searchVal } = this.state;
    const { total, paid, unpaid, draft, sent } = this.state.summary;
    const caps = ndpv.caps;
    return (
      <div className="ndpv-cpnt">
        {!this.props.module_id && !this.props.dashboard && (
          <Breadcrumb title={title} />
        )}

        {!this.props.dashboard && (
          <div className="row">
            <div className="col">
              <h2 className="pv-page-title">{title}</h2>
            </div>
            <div className="col">
              {!caps.includes("ndpv_client_role") && (
                <AddNew title={title} openForm={() => this.newInvoie()} />
              )}
            </div>
          </div>
        )}

        {!this.props.module_id && !this.props.dashboard && false && (
          <div className="pv-buttons-group pv-mb-20">
            <button className="pv-btn pv-btn-icon pv-bg-hover-shadow pv-mr-5">
              <svg width={20} height={20} viewBox="0 0 20 20" fill="none">
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
              <svg width={20} height={20} viewBox="0 0 20 20" fill="none">
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
          </div>
        )}

        {!this.props.module_id && !this.props.dashboard && (
          <Search
            path={this.state.path}
            title={title}
            showing={invoices.length}
            showItem={this.showItem}
            total={this.state.total}
            handleSubmit={this.getLists}
          />
        )}

        {checkedBoxes.length > 0 && (
          <Action
            path={this.state.path}
            length={checkedBoxes.length}
            uncheckAll={() => this.setState({ checkedBoxes: [] })}
            actions={this.actions}
          />
        )}

        {this.state.empty && !this.props.dashboard && (
          <Empty
            title={title}
            searchVal={searchVal}
            clickHandler={() => this.newInvoie()}
          />
        )}

        {this.state.preloader ? (
          <Preloader />
        ) : (
          <Table
            prefix={prefix}
            reload={this.getLists}
            tableData={invoices}
            checkedBoxes={{
              data: checkedBoxes,
              handle: this.handleCheckbox,
              totalRow: this.state.invoices.length,
            }}
            deleteEntry={this.deleteEntry}
            invoice_id={this.props.invoice_id}
            path={this.state.path}
            action={this.handleAction}
          />
        )}

        {this.state.totalPage > 1 && (
          <Pagination
            forcePage={this.state.currentPage - 1}
            pageCount={this.state.totalPage}
            onPageChange={this.handlePageClick}
          />
        )}
      </div>
    );
  }
}

function InvoiceWrap(props) {
  const location = useLocation();
  let path = location.pathname;
  //module id is, project, deal id etc
  let module_id = null;
  let client_mod = false;
  if (props.path) {
    path = "/" + props.path;
  }

  if (props.module_id) {
    module_id = props.module_id;
  }

  if (props.client_mod) {
    client_mod = true;
  }

  let navigate = useNavigate();
  const routeChange = () => {
    if (module_id) {
      navigate(`${path}/new?module=${props.parent}&module_id=${module_id}`);
    } else {
      navigate(`${path}/new`);
    }
  };

  return (
    <>
      <Invoice
        routeChange={routeChange}
        path={path}
        module={props.parent}
        module_id={module_id}
        client_mod={client_mod}
        dashboard={props.dashboard}
        key={path}
      />
    </>
  );
}
export default InvoiceWrap;
