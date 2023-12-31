import React, { Component } from "react";
import { toast } from "react-toastify";
import AppContext from "context/app-context";
import { deleteFile } from "api/gapi/gdrive";
import axios from "axios";
import { apiUrl, apiProUrl, token } from "api/helper";

const HOC = (Inner, mod, title, modPlural = "", pro = false) => {
  if (!modPlural) {
    modPlural = mod + "s";
  }

  let urlPath = pro ? apiProUrl : apiUrl;

  const url = urlPath + modPlural;
  const Crud = class extends Component {
    constructor(props) {
      super(props);

      this.state = {
        title: title, //capitalize
        // title: mod.charAt(0).toUpperCase() + mod.slice(1), //capitalize
        empty: false,
        submitPreloader: false,
        preloader: true,
        formModal: false,
        searchModal: false,
        formModalType: "new",
        list: { id: null },
        extra: {},
        lists: [],
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

    // static contextType = AppContext;

    componentDidMount() {
      // this.getLists();
    }

    getLists = (searchArgs = null) => {
      // this.setState({ preloader: true });
      let args = {
        page: this.state.currentPage,
        per_page: this.state.perPage,
      };

      //this is for task tab
      if (this.props.tab_id) {
        args.tab_id = this.props.tab_id;
      }

      //this is for task tab
      if (this.props.dashboard) {
        args.dashboard = this.props.dashboard;
      }

      //this is for task tab
      if (this.props.module_id) {
        args.module_id = this.props.module_id;
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

      const promise = axios.get(`${url}/?${params}`, token);
      const dataPromise = promise.then((resp) => {
        let result = resp.data.data.result;
        let total = resp.data.data.total;
        let empty = result.length ? false : true;

        let extra = {};
        if (resp.data.data.hasOwnProperty("extra")) {
          extra = resp.data.data.extra;
        }
        this.setState({
          lists: result,
          extra,
          preloader: false,
          empty,
          total,
          totalPage: Math.ceil(total / this.state.perPage),
        });
      });
      return promise;
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

    showItem = (e, args = null) => {
      const { value } = e.target;
      this.setState({ perPage: value }, () => {
        this.getLists(args);
      });
    };

    handleSubmit = (list, newType = null, args = null) => {
      //newType for task, note tab
      let type = this.state.formModalType;
      if (newType) {
        type = newType;
      }

      this.setState({ submitPreloader: true });

      if (type == "new") {
        axios.post(url, list, token).then((resp) => {
          if (resp.data.success) {
            this.setState({ formModal: false, submitPreloader: false });
            toast.success(ndpv.i18n.aAdd);
            this.getLists(args);
          } else {
            this.setState({ submitPreloader: false });
            resp.data.data.forEach((value) => {
              toast.error(value);
            });
          }
        });
      } else {
        axios.put(`${url}/${list.id}`, list, token).then((resp) => {
          if (resp.data.success) {
            this.setState({ formModal: false, submitPreloader: false });
            toast.success(ndpv.i18n.aUpd);
            this.getLists(args);
          } else {
            this.setState({ submitPreloader: false });
            resp.data.data.forEach((value) => {
              toast.error(value);
            });
          }
        });
      }
    };

    deleteEntry = async (type, index, module = null, args = null) => {
      if (confirm(ndpv.i18n.aConf)) {
        //TODO: instant delete do it later
        /* if (type == 'single' && module != 'task' ) {
                    this.setState({
                        lists: this.state.lists.filter((list, i) => {
                            return list.id !== index;
                        })
                    });
                } */
        if (type == "singleDrive") {
          await deleteFile(index[1]);
          index = index[0];
        }

        let ids =
          type == "single" || type == "singleDrive"
            ? index
            : this.state.checkedBoxes.toString();

        axios.delete(`${url}/${ids}`, token).then((resp) => {
          if (resp.data.success) {
            toast.success(ndpv.i18n.aDel);
            if (type != "single") {
              this.setState({ checkedBoxes: [] });
            }
            this.getLists(args);
          } else {
            resp.data.data.forEach((value) => {
              toast.error(value);
            });
          }
        });
      }
    };

    openForm = (type = "new", list = null) => {
      if (type == "new") {
        this.setState({ formModal: true, formModalType: "new" });
      } else {
        //for project form
        if (list.hasOwnProperty("start_date") && list.start_date) {
          list.start_date = new Date(list.start_date);
        }
        if (list.hasOwnProperty("due_date") && list.due_date) {
          list.due_date = new Date(list.due_date);
        }

        this.setState({ formModal: true, formModalType: "edit", list: list });
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
          this.state.lists.map((row) => {
            ids.push(row.id);
          });
          this.setState({ checkedBoxes: ids });
        } else {
          this.setState({ checkedBoxes: [] });
        }
      }
    };

    handlePageClick = (e, args = null) => {
      const selectedPage = e.selected + 1;
      const offset = selectedPage * this.state.perPage;
      this.setState(
        {
          currentPage: selectedPage,
          offset: offset,
        },
        () => {
          this.getLists(args);
        },
      );
    };

    render() {
      return (
        <Inner
          {...this.props}
          state={this.state}
          openForm={this.openForm}
          closeForm={this.closeForm}
          showItem={this.showItem}
          getLists={this.getLists}
          handleCheckbox={this.handleCheckbox}
          uncheckAll={() => this.setState({ checkedBoxes: [] })}
          handleSubmit={this.handleSubmit}
          handleSearch={this.handleSearch}
          handlePageClick={this.handlePageClick}
          deleteEntry={this.deleteEntry}
        />
      );
    }
  };

  Crud.contextType = AppContext;
  return Crud;
};

export default HOC;
