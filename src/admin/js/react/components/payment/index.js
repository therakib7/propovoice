import React, { Component } from 'react';
import { toast } from 'react-toastify';

import AppContext from '../../context/app-context';
import ReactPaginate from 'react-paginate';

import Preloader from 'block/preloader/table';
import Style from './style.scoped.scss'
import Api from 'api/payment';

//form
import FormBank from './FormBank';
import FormPaypal from './FormPaypal';
import FormStripe from './FormStripe';

//table
import TableBank from './TableBank';
import TablePaypal from './TablePaypal';
import TableStripe from './TableStripe';
import Search from './Search';
import Empty from 'block/empty';

export default class Payment extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: 'Payment',
            currentTab: 'bank',
            currentTabTitle: 'Bank',
            empty: false,
            preloader: true,
            formModal: false,
            searchModal: false,
            formModalType: 'new',
            payment: { id: null },
            payments: [],
            checkedBoxes: [],
            offset: 0,
            perPage: 10,
            totalPage: 1,
            currentPage: 1
        };
    }

    static contextType = AppContext;

    componentDidMount() {
        this.getLists();
    }

    getLists = (searchArgs = null) => {

        this.setState({ preloader: true });

        let args = {
            page: this.state.currentPage,
            per_page: this.state.perPage,
            type: this.state.currentTab
        }

        if (searchArgs) {
            //Filter all falsy values ( "", 0, false, null, undefined )
            searchArgs = Object.entries(searchArgs).reduce((a, [k, v]) => (v ? (a[k] = v, a) : a), {})
            args = { ...args, ...searchArgs }
        }

        let params = new URLSearchParams(args).toString();

        Api.getAll(params)
            .then(resp => {
                let result = resp.data.data.result;
                let total = resp.data.data.total;
                let empty = result.length ? false : true;
                this.setState({ payments: result, preloader: false, empty });

                this.setState({
                    totalPage: Math.ceil(total / this.state.perPage)
                })
            })
    };

    handleSubmit = payment => {
        if (this.state.formModalType == 'new') {
            Api.create(payment)
                .then(resp => {
                    if (resp.data.success) {
                        this.setState({ formModal: false })
                        toast.success(this.context.CrudMsg.create);
                        this.getLists();
                    } else {
                        resp.data.data.forEach(function (value, index, array) {
                            toast.error(value);
                        });
                    }
                })
        } else {
            Api.update(payment.id, payment)
                .then(resp => {
                    if (resp.data.success) {
                        this.setState({ formModal: false })
                        toast.success(this.context.CrudMsg.update);
                        this.getLists();
                    } else {
                        resp.data.data.forEach(function (value, index, array) {
                            toast.error(value);
                        });
                    }
                })
        }
    }

    deleteEntry = (type, index) => {

        if (confirm(this.context.CrudMsg.confirm)) {

            if (type == 'single') {
                this.setState({
                    payments: this.state.payments.filter((payment, i) => {
                        return payment.id !== index;
                    })
                });
            }
            let ids = (type == 'single') ? index : this.state.checkedBoxes.toString();
            Api.remove(ids)
                .then(resp => {
                    if (resp.data.success) {
                        toast.success(this.context.CrudMsg.delete);
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

    setActiveTab(e, id) {
        e.preventDefault();

        let title;
        switch (id) {
            case 'bank':
                title = 'Bank'
                break;

            case 'paypal':
                title = 'Paypal'
                break;

            case 'stripe':
                title = 'Stripe'
                break;

        }

        this.setState({
            currentTab: id,
            currentTabTitle: title
        }, () => {
            this.getLists();
        });
    }

    openForm = (type = 'new', payment = null) => {
        this.setState({ formModal: true });

        if (type == 'new') {
            this.setState({ formModalType: 'new' });
        } else {
            this.setState({ formModalType: 'edit' });
            this.setState({ payment: payment });
        }
    };

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
                this.state.payments.map((row) => { ids.push(row.id) });
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

    render() {
        const { payments, title, currentTab, currentTabTitle } = this.state;
        return (
            <div className="ncpi-components">
                {!wage.length &&
                    <>
                        <h1>{title}</h1>
                        <nav className='pi-breadcrumb'>
                            <ul>
                                <li>
                                    <a href='#' >
                                        Home
                                    </a>
                                </li>
                                <li>&gt;</li>
                                <li className='pi-active'>
                                    {title}
                                </li>
                            </ul>
                        </nav>
                    </>}

                {wage.length > 0 &&
                    <>
                        <div className="pi-setting-heading-content">
                            <h3>Payment Info</h3>
                            <p><b>Note:</b> In this version, You can add only bank info</p>
                        </div>
                    </>}

                <div className="pi-payment-tab">
                    <ul className="pi-tabs">
                        <li data-tab-target="#pi-bank" className={'pi-tab ' + (currentTab == 'bank' ? 'pi-active' : '')} onClick={(e) => this.setActiveTab(e, 'bank')}>
                            <svg
                                width={25}
                                height={25}
                                viewBox="0 0 28 29"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M12.3479 0.555556C13.3232 -0.185185 14.6789 -0.185185 15.6542 0.555556L27.2321 9.33565C28.7067 10.4537 27.9157 12.787 26.0631 12.7963H1.93665C0.0863324 12.787 -0.706994 10.4537 0.769993 9.33565L12.3479 0.555556ZM13.9999 8.74537C14.464 8.74537 14.9091 8.56246 15.2373 8.23688C15.5655 7.91129 15.7499 7.4697 15.7499 7.00926C15.7499 6.54881 15.5655 6.10723 15.2373 5.78164C14.9091 5.45606 14.464 5.27315 13.9999 5.27315C13.5357 5.27315 13.0906 5.45606 12.7624 5.78164C12.4343 6.10723 12.2499 6.54881 12.2499 7.00926C12.2499 7.4697 12.4343 7.91129 12.7624 8.23688C13.0906 8.56246 13.5357 8.74537 13.9999 8.74537ZM3.49997 15.1111V22.0556H6.99994V15.1111H3.49997ZM9.33325 15.1111V22.0556H12.8332V15.1111H9.33325ZM15.1665 15.1111V22.0556H18.6665V15.1111H15.1665ZM20.9998 15.1111V22.0556H24.4998V15.1111H20.9998ZM0 27.2639C0 25.6667 1.30665 24.3704 2.91664 24.3704H25.0831C26.6931 24.3704 27.9997 25.6667 27.9997 27.2639V27.8426C27.9997 28.1496 27.8768 28.4439 27.658 28.661C27.4392 28.8781 27.1425 29 26.8331 29H1.16666C0.85724 29 0.560496 28.8781 0.341706 28.661C0.122915 28.4439 0 28.1496 0 27.8426V27.2639Z"
                                    fill="#4A5568"
                                />
                            </svg>
                            Bank & Others Account
                        </li>
                        {!wage.length &&
                            <>
                                <li data-tab-target="#pi-paypal" className={'pi-tab ' + (currentTab == 'paypal' ? 'pi-active' : '')} onClick={(e) => this.setActiveTab(e, 'paypal')}>
                                    <svg
                                        width={24}
                                        height={24}
                                        viewBox="0 0 23 27"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M19.5675 2.57768C18.3585 1.19971 16.1731 0.608938 13.3774 0.608938H5.26339C4.98664 0.608789 4.71892 0.707424 4.50841 0.887085C4.2979 1.06675 4.15843 1.31564 4.11508 1.58898L0.738033 23.0176C0.722374 23.117 0.728452 23.2187 0.755848 23.3155C0.783244 23.4123 0.831307 23.5021 0.896726 23.5785C0.962144 23.655 1.04336 23.7164 1.13479 23.7585C1.22621 23.8005 1.32566 23.8223 1.4263 23.8222H6.43554L7.69363 15.8425L7.65463 16.0924C7.69714 15.8196 7.83569 15.5709 8.0453 15.3913C8.25491 15.2116 8.5218 15.1127 8.79788 15.1123H11.1783C15.8546 15.1123 19.5162 13.2129 20.5858 7.71836C20.6176 7.55587 20.645 7.3977 20.6688 7.24315C20.9866 5.2123 20.6667 3.82999 19.5682 2.5784"
                                            fill="#003087"
                                        />
                                        <path
                                            d="M19.5675 2.57768C18.3585 1.19971 16.1731 0.608938 13.3774 0.608938H5.26339C4.98664 0.608789 4.71892 0.707424 4.50841 0.887085C4.2979 1.06675 4.15843 1.31564 4.11508 1.58898L0.738033 23.0176C0.722374 23.117 0.728452 23.2187 0.755848 23.3155C0.783244 23.4123 0.831307 23.5021 0.896726 23.5785C0.962144 23.655 1.04336 23.7164 1.13479 23.7585C1.22621 23.8005 1.32566 23.8223 1.4263 23.8222H6.43554L7.69363 15.8425L7.65463 16.0924C7.69714 15.8196 7.83569 15.5709 8.0453 15.3913C8.25491 15.2116 8.5218 15.1127 8.79788 15.1123H11.1783C15.8546 15.1123 19.5162 13.2129 20.5858 7.71836C20.6176 7.55587 20.645 7.3977 20.6688 7.24315C20.9866 5.2123 20.6667 3.82999 19.5682 2.5784"
                                            fill="#003087"
                                        />
                                        <path
                                            d="M9.04492 7.26989C9.08288 7.03105 9.20471 6.81356 9.38856 6.65645C9.57241 6.49934 9.80623 6.41289 10.0481 6.41263H16.4093C17.1625 6.41263 17.8653 6.46174 18.5073 6.56429C18.8583 6.62076 19.2056 6.69843 19.5473 6.79684C19.9353 6.90593 20.3107 7.05552 20.6674 7.24317C20.9866 5.2116 20.666 3.83001 19.5675 2.5777C18.3578 1.20045 16.1731 0.60968 13.3775 0.60968H5.26271C4.98621 0.609877 4.71884 0.708664 4.50863 0.888294C4.29842 1.06792 4.15915 1.31663 4.11585 1.58972L0.737354 23.0162C0.721589 23.1156 0.727563 23.2173 0.754864 23.3141C0.782166 23.411 0.830145 23.5008 0.895497 23.5773C0.960848 23.6539 1.04202 23.7153 1.13341 23.7575C1.22481 23.7996 1.32425 23.8215 1.4249 23.8215H6.43486L7.69295 15.8411L9.04492 7.26989Z"
                                            fill="#003087"
                                        />
                                        <path
                                            d="M20.6681 7.24249C20.6434 7.40138 20.6157 7.55981 20.5851 7.7177C19.5155 13.2115 15.8539 15.1117 11.1776 15.1117H8.79647C8.52043 15.1119 8.25356 15.2108 8.04404 15.3905C7.83451 15.5702 7.69615 15.8189 7.65394 16.0917L6.43485 23.8208L6.08819 26.0134C6.07441 26.1005 6.07966 26.1895 6.1036 26.2743C6.12753 26.3591 6.16958 26.4377 6.22683 26.5047C6.28408 26.5717 6.35519 26.6255 6.43524 26.6624C6.51529 26.6993 6.60238 26.7183 6.69051 26.7183H10.9133C11.413 26.7183 11.8377 26.3543 11.9164 25.861L11.9576 25.6458L12.7535 20.6019L12.804 20.3231C12.8419 20.0841 12.9638 19.8664 13.1478 19.7093C13.3318 19.5521 13.5659 19.4658 13.8079 19.4659H14.4398C18.5304 19.4659 21.7334 17.8048 22.6694 12.9978C23.0594 10.99 22.8572 9.31234 21.8244 8.13441C21.4965 7.76922 21.1046 7.46696 20.6681 7.24249Z"
                                            fill="#009CDE"
                                        />
                                        <path
                                            d="M19.5479 6.79685C19.3846 6.74846 19.2164 6.70513 19.043 6.66685C18.8697 6.62857 18.6906 6.59463 18.5072 6.56574C17.8644 6.46102 17.1624 6.41191 16.4084 6.41191H10.0479C9.80583 6.41161 9.57161 6.49795 9.38762 6.65531C9.20364 6.81268 9.08203 7.03067 9.04478 7.26989L7.69281 15.8425L7.65381 16.0917C7.69602 15.8189 7.83438 15.5702 8.04391 15.3904C8.25343 15.2107 8.5203 15.1118 8.79634 15.1116H11.1775C15.8538 15.1116 19.5154 13.2122 20.585 7.71766C20.6167 7.55516 20.6435 7.39773 20.668 7.24245C20.3855 7.09465 20.0913 6.97049 19.7884 6.87123C19.7096 6.84523 19.6295 6.82068 19.5479 6.79613"
                                            fill="#012169"
                                        />
                                    </svg>
                                    Paypal
                                </li>

                                <li data-tab-target="#pi-stripe" className={'pi-tab ' + (currentTab == 'stripe' ? 'pi-active' : '')} onClick={(e) => this.setActiveTab(e, 'stripe')}>
                                    <span className="pi-color-blue">stripe</span>
                                </li>
                            </>
                        }
                    </ul>
                    <div className="pi-payment-tab-content">

                        <div id="pi-bank" data-tab-content="" className='pi-active'>
                            {currentTab == 'bank' && <FormBank
                                handleSubmit={this.handleSubmit}
                                show={this.state.formModal}
                                modalType={this.state.formModalType}
                                data={this.state.payment}
                                close={this.closeForm}
                            />}

                            {currentTab == 'paypal' && <FormPaypal
                                handleSubmit={this.handleSubmit}
                                show={this.state.formModal}
                                modalType={this.state.formModalType}
                                data={this.state.payment}
                                close={this.closeForm}
                            />}

                            {currentTab == 'stripe' && <FormStripe
                                handleSubmit={this.handleSubmit}
                                show={this.state.formModal}
                                modalType={this.state.formModalType}
                                data={this.state.payment}
                                close={this.closeForm}
                            />}

                            {this.state.empty && <div className="pi-payment-empty-content pi-text-center">
                                <span>
                                    {currentTab == 'bank' && <svg
                                        width={35}
                                        height={35}
                                        viewBox="0 0 28 29"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M12.3479 0.555556C13.3232 -0.185185 14.6789 -0.185185 15.6542 0.555556L27.2321 9.33565C28.7067 10.4537 27.9157 12.787 26.0631 12.7963H1.93665C0.0863324 12.787 -0.706994 10.4537 0.769993 9.33565L12.3479 0.555556ZM13.9999 8.74537C14.464 8.74537 14.9091 8.56246 15.2373 8.23688C15.5655 7.91129 15.7499 7.4697 15.7499 7.00926C15.7499 6.54881 15.5655 6.10723 15.2373 5.78164C14.9091 5.45606 14.464 5.27315 13.9999 5.27315C13.5357 5.27315 13.0906 5.45606 12.7624 5.78164C12.4343 6.10723 12.2499 6.54881 12.2499 7.00926C12.2499 7.4697 12.4343 7.91129 12.7624 8.23688C13.0906 8.56246 13.5357 8.74537 13.9999 8.74537ZM3.49997 15.1111V22.0556H6.99994V15.1111H3.49997ZM9.33325 15.1111V22.0556H12.8332V15.1111H9.33325ZM15.1665 15.1111V22.0556H18.6665V15.1111H15.1665ZM20.9998 15.1111V22.0556H24.4998V15.1111H20.9998ZM0 27.2639C0 25.6667 1.30665 24.3704 2.91664 24.3704H25.0831C26.6931 24.3704 27.9997 25.6667 27.9997 27.2639V27.8426C27.9997 28.1496 27.8768 28.4439 27.658 28.661C27.4392 28.8781 27.1425 29 26.8331 29H1.16666C0.85724 29 0.560496 28.8781 0.341706 28.661C0.122915 28.4439 0 28.1496 0 27.8426V27.2639Z"
                                            fill="#4A5568"
                                        />
                                    </svg>}

                                    {currentTab == 'paypal' && <svg
                                        width={24}
                                        height={24}
                                        viewBox="0 0 23 27"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M19.5675 2.57768C18.3585 1.19971 16.1731 0.608938 13.3774 0.608938H5.26339C4.98664 0.608789 4.71892 0.707424 4.50841 0.887085C4.2979 1.06675 4.15843 1.31564 4.11508 1.58898L0.738033 23.0176C0.722374 23.117 0.728452 23.2187 0.755848 23.3155C0.783244 23.4123 0.831307 23.5021 0.896726 23.5785C0.962144 23.655 1.04336 23.7164 1.13479 23.7585C1.22621 23.8005 1.32566 23.8223 1.4263 23.8222H6.43554L7.69363 15.8425L7.65463 16.0924C7.69714 15.8196 7.83569 15.5709 8.0453 15.3913C8.25491 15.2116 8.5218 15.1127 8.79788 15.1123H11.1783C15.8546 15.1123 19.5162 13.2129 20.5858 7.71836C20.6176 7.55587 20.645 7.3977 20.6688 7.24315C20.9866 5.2123 20.6667 3.82999 19.5682 2.5784"
                                            fill="#003087"
                                        />
                                        <path
                                            d="M19.5675 2.57768C18.3585 1.19971 16.1731 0.608938 13.3774 0.608938H5.26339C4.98664 0.608789 4.71892 0.707424 4.50841 0.887085C4.2979 1.06675 4.15843 1.31564 4.11508 1.58898L0.738033 23.0176C0.722374 23.117 0.728452 23.2187 0.755848 23.3155C0.783244 23.4123 0.831307 23.5021 0.896726 23.5785C0.962144 23.655 1.04336 23.7164 1.13479 23.7585C1.22621 23.8005 1.32566 23.8223 1.4263 23.8222H6.43554L7.69363 15.8425L7.65463 16.0924C7.69714 15.8196 7.83569 15.5709 8.0453 15.3913C8.25491 15.2116 8.5218 15.1127 8.79788 15.1123H11.1783C15.8546 15.1123 19.5162 13.2129 20.5858 7.71836C20.6176 7.55587 20.645 7.3977 20.6688 7.24315C20.9866 5.2123 20.6667 3.82999 19.5682 2.5784"
                                            fill="#003087"
                                        />
                                        <path
                                            d="M9.04492 7.26989C9.08288 7.03105 9.20471 6.81356 9.38856 6.65645C9.57241 6.49934 9.80623 6.41289 10.0481 6.41263H16.4093C17.1625 6.41263 17.8653 6.46174 18.5073 6.56429C18.8583 6.62076 19.2056 6.69843 19.5473 6.79684C19.9353 6.90593 20.3107 7.05552 20.6674 7.24317C20.9866 5.2116 20.666 3.83001 19.5675 2.5777C18.3578 1.20045 16.1731 0.60968 13.3775 0.60968H5.26271C4.98621 0.609877 4.71884 0.708664 4.50863 0.888294C4.29842 1.06792 4.15915 1.31663 4.11585 1.58972L0.737354 23.0162C0.721589 23.1156 0.727563 23.2173 0.754864 23.3141C0.782166 23.411 0.830145 23.5008 0.895497 23.5773C0.960848 23.6539 1.04202 23.7153 1.13341 23.7575C1.22481 23.7996 1.32425 23.8215 1.4249 23.8215H6.43486L7.69295 15.8411L9.04492 7.26989Z"
                                            fill="#003087"
                                        />
                                        <path
                                            d="M20.6681 7.24249C20.6434 7.40138 20.6157 7.55981 20.5851 7.7177C19.5155 13.2115 15.8539 15.1117 11.1776 15.1117H8.79647C8.52043 15.1119 8.25356 15.2108 8.04404 15.3905C7.83451 15.5702 7.69615 15.8189 7.65394 16.0917L6.43485 23.8208L6.08819 26.0134C6.07441 26.1005 6.07966 26.1895 6.1036 26.2743C6.12753 26.3591 6.16958 26.4377 6.22683 26.5047C6.28408 26.5717 6.35519 26.6255 6.43524 26.6624C6.51529 26.6993 6.60238 26.7183 6.69051 26.7183H10.9133C11.413 26.7183 11.8377 26.3543 11.9164 25.861L11.9576 25.6458L12.7535 20.6019L12.804 20.3231C12.8419 20.0841 12.9638 19.8664 13.1478 19.7093C13.3318 19.5521 13.5659 19.4658 13.8079 19.4659H14.4398C18.5304 19.4659 21.7334 17.8048 22.6694 12.9978C23.0594 10.99 22.8572 9.31234 21.8244 8.13441C21.4965 7.76922 21.1046 7.46696 20.6681 7.24249Z"
                                            fill="#009CDE"
                                        />
                                        <path
                                            d="M19.5479 6.79685C19.3846 6.74846 19.2164 6.70513 19.043 6.66685C18.8697 6.62857 18.6906 6.59463 18.5072 6.56574C17.8644 6.46102 17.1624 6.41191 16.4084 6.41191H10.0479C9.80583 6.41161 9.57161 6.49795 9.38762 6.65531C9.20364 6.81268 9.08203 7.03067 9.04478 7.26989L7.69281 15.8425L7.65381 16.0917C7.69602 15.8189 7.83438 15.5702 8.04391 15.3904C8.25343 15.2107 8.5203 15.1118 8.79634 15.1116H11.1775C15.8538 15.1116 19.5154 13.2122 20.585 7.71766C20.6167 7.55516 20.6435 7.39773 20.668 7.24245C20.3855 7.09465 20.0913 6.97049 19.7884 6.87123C19.7096 6.84523 19.6295 6.82068 19.5479 6.79613"
                                            fill="#012169"
                                        />
                                    </svg>}

                                    No {currentTabTitle} <br />
                                    Account Found
                                </span>
                            </div>}

                            {this.state.preloader ? (
                                <Preloader />
                            ) : (
                                <>
                                    {currentTab == 'bank' && <TableBank tableData={payments} editEntry={this.openForm} deleteEntry={this.deleteEntry} />}
                                    {currentTab == 'paypal' && <TablePaypal tableData={payments} editEntry={this.openForm} deleteEntry={this.deleteEntry} />}
                                    {currentTab == 'stripe' && <TableStripe tableData={payments} editEntry={this.openForm} deleteEntry={this.deleteEntry} />}
                                </>
                            )}

                            <button
                                className="pi-btn pi-bg-blue pi-bg-hover-blue"
                                onClick={() => this.openForm('new')}
                            >
                                <svg
                                    width={10}
                                    height={10}
                                    viewBox="0 0 10 10"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M5 0C5.26522 0 5.51957 0.105357 5.70711 0.292893C5.89464 0.48043 6 0.734784 6 1V4H9C9.26522 4 9.51957 4.10536 9.70711 4.29289C9.89464 4.48043 10 4.73478 10 5C10 5.26522 9.89464 5.51957 9.70711 5.70711C9.51957 5.89464 9.26522 6 9 6H6V9C6 9.26522 5.89464 9.51957 5.70711 9.70711C5.51957 9.89464 5.26522 10 5 10C4.73478 10 4.48043 9.89464 4.29289 9.70711C4.10536 9.51957 4 9.26522 4 9V6H1C0.734784 6 0.48043 5.89464 0.292893 5.70711C0.105357 5.51957 0 5.26522 0 5C0 4.73478 0.105357 4.48043 0.292893 4.29289C0.48043 4.10536 0.734784 4 1 4H4V1C4 0.734784 4.10536 0.48043 4.29289 0.292893C4.48043 0.105357 4.73478 0 5 0Z"
                                        fill="#2D3748"
                                    />
                                </svg>
                                Add Account
                            </button>
                        </div>
                    </div>
                    {/* ./ pi-tabs */}
                </div>

            </div>
        );
    }
} 