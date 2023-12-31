import React, { Component } from 'react';
import { toast } from 'react-toastify';
import './style.scoped.scss'

import AppContext from 'context/app-context';
import Preloader from 'block/preloader/table';
import Api from 'api/payment';
import ProLabel from 'block/pro-alert/label';

//form
import FormBank from './form/Bank';
import FormPaypal from './form/Paypal';
import FormStripe from './form/Stripe';

//table
import TableBank from './table/Bank';
import WC from './WC';
import TablePaypal from './table/Paypal';
import TableStripe from './table/Stripe';

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
                        toast.success(ndpv.i18n.aAdd);
                        this.getLists();
                    } else {
                        resp.data.data.forEach(function (value) {
                            toast.error(value);
                        });
                    }
                })
        } else {
            Api.update(payment.id, payment)
                .then(resp => {
                    if (resp.data.success) {
                        this.setState({ formModal: false })
                        toast.success(ndpv.i18n.aUpd);
                        this.getLists();
                    } else {
                        resp.data.data.forEach(function (value) {
                            toast.error(value);
                        });
                    }
                })
        }
    }

    deleteEntry = (type, index) => {

        if (confirm(ndpv.i18n.aConf)) {

            if (type == 'single') {
                this.setState({
                    payments: this.state.payments.filter((payment) => {
                        return payment.id !== index;
                    })
                });
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
                        resp.data.data.forEach(function (value) {
                            toast.error(value);
                        });
                    }
                })
        }
    }

    setActiveTab(e, id) {
        e.preventDefault();
        const i18n = ndpv.i18n;
        let title;
        switch (id) {
            case 'bank':
                title = i18n.bank
                break;

            case 'paypal':
                title = i18n.paypal
                break;

            case 'stripe':
                title = i18n.stripe
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
        const i18n = ndpv.i18n;
        const { payments, currentTab, currentTabTitle } = this.state;
        return (
            <div className="ndpv-cpnt">

                <div className="">
                    <ul className="pv-horizontal-tab">
                        <li data-tab-target="#pv-bank" className={'pv-tab ' + (currentTab == 'bank' ? 'pv-active' : '')} onClick={(e) => this.setActiveTab(e, 'bank')}>
                            <span className='pv-tab-icon'>
                                <svg
                                    width={29}
                                    height={24}
                                    viewBox="0 0 29 24"
                                    fill="none"
                                >
                                    <path
                                        d="M2.71533 9H26.2479L14.4816 3L2.71533 9Z"
                                        stroke="#4A5568"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M6.33569 9V16.5"
                                        stroke="#4A5568"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M11.7664 9V16.5"
                                        stroke="#4A5568"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M17.1969 9V16.5"
                                        stroke="#4A5568"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M22.6277 9V16.5"
                                        stroke="#4A5568"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M3.62036 16.5H25.3427"
                                        stroke="#4A5568"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M1.81018 19.5H27.153"
                                        stroke="#4A5568"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </span>
                            <span className='pv-tab-label'>{i18n.bank} {i18n.nd} {i18n.other}</span>
                        </li>

                        {true && <li data-tab-target="#pv-wc" className={'pv-tab ' + (currentTab == 'wc' ? 'pv-active' : '')} onClick={(e) => this.setActiveTab(e, 'wc')}>
                            <span className='pv-tab-icon'>
                                <svg
                                    width={27}
                                    height={16}
                                    viewBox="0 0 27 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <g clipPath="url(#clip0_6196_88437)">
                                        <path
                                            d="M2.485 0h21.79a2.494 2.494 0 012.496 2.495v8.318a2.494 2.494 0 01-2.495 2.496H16.46l1.073 2.627-4.717-2.627H2.495A2.494 2.494 0 010 10.814V2.494A2.485 2.485 0 012.485 0z"
                                            fill="#9B5C8F"
                                        />
                                        <path
                                            d="M1.525 2.275c.152-.207.38-.316.685-.338.555-.043.87.218.947.784.337 2.274.707 4.2 1.1 5.778l2.382-4.538c.218-.413.49-.63.817-.653.478-.032.772.273.892.915.272 1.447.62 2.677 1.034 3.721.283-2.764.762-4.755 1.436-5.985.164-.305.403-.457.719-.479a.945.945 0 01.685.218c.207.163.316.37.338.62a.945.945 0 01-.11.523c-.424.783-.772 2.1-1.055 3.928-.272 1.774-.37 3.156-.305 4.146a1.29 1.29 0 01-.13.719.701.701 0 01-.577.391c-.283.022-.577-.108-.86-.402-1.012-1.034-1.817-2.58-2.405-4.636a204.256 204.256 0 00-1.567 3.134c-.642 1.23-1.186 1.86-1.643 1.894-.294.021-.544-.229-.762-.751-.555-1.426-1.154-4.18-1.796-8.26a.927.927 0 01.175-.73zM24.91 3.983c-.392-.685-.968-1.099-1.741-1.262a2.855 2.855 0 00-.588-.065c-1.044 0-1.893.544-2.557 1.632a5.766 5.766 0 00-.849 3.069c0 .838.174 1.556.523 2.155.391.685.968 1.099 1.74 1.262.207.044.403.065.588.065 1.056 0 1.905-.544 2.558-1.632a5.831 5.831 0 00.849-3.08c.01-.849-.175-1.556-.523-2.144zm-1.37 3.015c-.153.718-.425 1.251-.828 1.61-.316.283-.61.403-.882.349-.26-.055-.478-.283-.642-.708a2.762 2.762 0 01-.195-.99c0-.272.021-.544.076-.795.098-.446.283-.881.576-1.295.36-.533.74-.75 1.132-.674.262.054.48.283.642.707.13.337.196.675.196.99 0 .283-.021.555-.076.806zm-5.442-3.015c-.392-.685-.98-1.099-1.741-1.262a2.855 2.855 0 00-.588-.065c-1.045 0-1.894.544-2.557 1.632a5.766 5.766 0 00-.85 3.069c0 .838.175 1.556.523 2.155.392.685.969 1.099 1.741 1.262.207.044.403.065.588.065 1.055 0 1.904-.544 2.557-1.632a5.831 5.831 0 00.85-3.08c0-.849-.175-1.556-.523-2.144zm-1.382 3.015c-.153.718-.425 1.251-.827 1.61-.316.283-.61.403-.882.349-.261-.055-.479-.283-.642-.708a2.762 2.762 0 01-.196-.99c0-.272.022-.544.076-.795.098-.446.283-.881.577-1.295.36-.533.74-.75 1.132-.674.261.054.479.283.642.707.13.337.196.675.196.99.01.283-.022.555-.076.806z"
                                            fill="#fff"
                                        />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_6196_88437">
                                            <path fill="#fff" d="M0 0H26.7712V16H0z" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </span>
                            <span className='pv-tab-label'>WC</span>
                        </li>}

                        <li data-tab-target="#pv-paypal" className={'pv-tab ' + (currentTab == 'paypal' ? 'pv-active' : '')} onClick={(e) => this.setActiveTab(e, 'paypal')}>
                            <span className='pv-tab-icon'>
                                <svg
                                    width={23}
                                    height={27}
                                    viewBox="0 0 23 27"
                                    fill="none"
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
                            </span>
                            <span className='pv-tab-label'>Paypal</span>
                        </li>

                        <li data-tab-target="#pv-stripe" className={'pv-tab ' + (currentTab == 'stripe' ? 'pv-active' : '')} onClick={(e) => this.setActiveTab(e, 'stripe')}>
                            <span className='pv-tab-icon'>
                                <svg
                                    width={29}
                                    height={12}
                                    viewBox="0 0 29 12"
                                    fill="none"
                                >
                                    <path
                                        d="M2.0267 4.70227C2.0267 4.38985 2.28304 4.26969 2.70761 4.26969C3.31642 4.26969 4.08545 4.45394 4.69426 4.78238V2.89987C4.02937 2.63551 3.3725 2.53138 2.70761 2.53138C1.08144 2.53138 0 3.38051 0 4.7984C0 7.00935 3.04406 6.65688 3.04406 7.61015C3.04406 7.97864 2.72363 8.0988 2.27503 8.0988C1.61015 8.0988 0.761015 7.82644 0.0881175 7.45794V9.36449C0.833111 9.68491 1.58611 9.82109 2.27503 9.82109C3.94125 9.82109 5.08678 8.996 5.08678 7.56208C5.07877 5.1749 2.0267 5.59947 2.0267 4.70227ZM7.44192 0.929239L5.48732 1.34579L5.4793 7.76235C5.4793 8.94793 6.36849 9.82109 7.55407 9.82109C8.21095 9.82109 8.69159 9.70094 8.95594 9.55674V7.93057C8.6996 8.03471 7.43391 8.4032 7.43391 7.21762V4.37383H8.95594V2.66756H7.43391L7.44192 0.929239ZM11.4473 3.26035L11.3191 2.66756H9.58878V9.6769H11.5915V4.92657C12.0641 4.30975 12.8652 4.4219 13.1135 4.51001V2.66756C12.8571 2.57143 11.9199 2.39519 11.4473 3.26035ZM13.6021 2.66756H15.6128V9.6769H13.6021V2.66756ZM13.6021 2.05874L15.6128 1.62617V0L13.6021 0.424566V2.05874ZM19.7944 2.53138C19.0093 2.53138 18.5047 2.89987 18.2243 3.15621L18.1202 2.65955H16.3578V12L18.3605 11.5754L18.3685 9.30841C18.6569 9.51669 19.0814 9.81308 19.7864 9.81308C21.2203 9.81308 22.526 8.65955 22.526 6.12016C22.518 3.79706 21.1963 2.53138 19.7944 2.53138ZM19.3137 8.05073C18.8411 8.05073 18.5607 7.88251 18.3685 7.67423L18.3605 4.70227C18.5688 4.46996 18.8571 4.30975 19.3137 4.30975C20.0427 4.30975 20.5474 5.12684 20.5474 6.17624C20.5474 7.24967 20.0507 8.05073 19.3137 8.05073ZM28.8384 6.20027C28.8384 4.14953 27.8451 2.53138 25.9466 2.53138C24.0401 2.53138 22.8865 4.14953 22.8865 6.18425C22.8865 8.59546 24.2483 9.81308 26.2029 9.81308C27.1562 9.81308 27.8772 9.5968 28.4219 9.29239V7.69025C27.8772 7.96262 27.2523 8.13084 26.4593 8.13084C25.6822 8.13084 24.9933 7.85848 24.9052 6.91322H28.8224C28.8224 6.80908 28.8384 6.39252 28.8384 6.20027ZM24.8812 5.43925C24.8812 4.53405 25.4339 4.15754 25.9386 4.15754C26.4272 4.15754 26.9479 4.53405 26.9479 5.43925H24.8812Z"
                                        fill="#6772E5"
                                    />
                                </svg>
                            </span>
                            <span className='pv-tab-label'>{i18n.stripe}</span>
                        </li>
                    </ul>
                    <div className="pv-payment-tab-content">

                        <div id="pv-bank" className='pv-active'>
                            {currentTab == 'bank' && this.state.formModal && <FormBank
                                handleSubmit={this.handleSubmit}
                                modalType={this.state.formModalType}
                                data={this.state.payment}
                                close={this.closeForm}
                            />}

                            {currentTab == 'paypal' && this.state.formModal && <FormPaypal
                                handleSubmit={this.handleSubmit}
                                modalType={this.state.formModalType}
                                data={this.state.payment}
                                close={this.closeForm}
                            />}

                            {currentTab == 'stripe' && this.state.formModal && <FormStripe
                                handleSubmit={this.handleSubmit}
                                modalType={this.state.formModalType}
                                data={this.state.payment}
                                close={this.closeForm}
                            />}

                            {currentTab != 'wc' ? <>
                                {this.state.preloader ? (
                                    <Preloader />
                                ) : (
                                    <>
                                        <ul>
                                            {currentTab == 'bank' && <TableBank tableData={payments} editEntry={this.openForm} deleteEntry={this.deleteEntry} />}
                                            {currentTab == 'paypal' && <TablePaypal tableData={payments} editEntry={this.openForm} deleteEntry={this.deleteEntry} />}
                                            {currentTab == 'stripe' && <TableStripe tableData={payments} editEntry={this.openForm} deleteEntry={this.deleteEntry} />}
                                        </ul>
                                        <button
                                            className="pv-btn pv-bg-blue pv-bg-hover-blue"
                                            onClick={() => this.openForm('new')}
                                        >
                                            {i18n.add} {currentTabTitle} {i18n.account} {currentTab != 'bank' && <ProLabel blueBtn />}
                                        </button>
                                    </>
                                )}
                            </> : <WC />}

                        </div>
                    </div>
                    {/* ./ pv-tabs */}
                </div>

            </div>
        );
    }
} 