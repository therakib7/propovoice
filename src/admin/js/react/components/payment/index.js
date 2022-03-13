import React, { Component } from 'react';
import { toast } from 'react-toastify';

import AppContext from '../../context/app-context';
import ReactPaginate from 'react-paginate';

import TablePreloader from 'block/preloader/table';
import Style from './style.scoped.scss'
import Api from '../../api/payment';
import Form from './Form';
import Table from './Table';
import Search from './Search';
import Empty from 'block/empty';

export default class Payment extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            title: 'Payment',
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

        let args = {
            page: this.state.currentPage,
            per_page: this.state.perPage
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
        const checkedBoxes = this.state.checkedBoxes;
        const payments = this.state.payments;
        const title = this.state.title;
        return (
            <div className="ncpi-components"> 
                <h1 className="">{title}</h1>
                <nav className="pi-breadcrumb">
                    <ul className="">
                        <li>
                            <a href="#" className="">
                            Home
                            </a>
                        </li>
                        <li>&gt;</li>
                        <li className="active">
                            <a href="#" className="">
                            {title}
                            </a>
                        </li>
                    </ul>
                </nav>  
				
				<div className="pi-payment-tab">
					<ul className="pi-tabs">
						<li data-tab-target="#pi-bank" className="active pi-tab">
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
						Bank Account
						</li>
						<li data-tab-target="#pi-paypal" className="pi-tab">
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

						<li data-tab-target="#pi-stripe" className="pi-tab">
						<span className="pi-color-blue">stripe</span>
						</li> 
					</ul>
					<div className="pi-tab-content">
						
						<div id="pi-bank" data-tab-content="" className="active">
							<ul>
								<li className="pi-bg-air-white">
								<div className="pi-edit">
									<span>
									<svg
										width={10}
										height={10}
										viewBox="0 0 13 13"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
										d="M12.5241 0.47579C12.2193 0.171142 11.8061 0 11.3752 0C10.9443 0 10.531 0.171142 10.2263 0.47579L4.0625 6.63957V8.93738H6.36031L12.5241 2.7736C12.8287 2.46886 12.9999 2.0556 12.9999 1.62469C12.9999 1.19379 12.8287 0.78053 12.5241 0.47579Z"
										fill="#A0AEC0"
										/>
										<path
										fillRule="evenodd"
										clipRule="evenodd"
										d="M0 3.24978C0 2.81879 0.171209 2.40546 0.475963 2.1007C0.780718 1.79595 1.19405 1.62474 1.62504 1.62474H4.87512C5.09062 1.62474 5.29728 1.71034 5.44966 1.86272C5.60204 2.0151 5.68764 2.22177 5.68764 2.43726C5.68764 2.65275 5.60204 2.85942 5.44966 3.0118C5.29728 3.16417 5.09062 3.24978 4.87512 3.24978H1.62504V11.375H9.75024V8.1249C9.75024 7.90941 9.83585 7.70274 9.98823 7.55036C10.1406 7.39799 10.3473 7.31238 10.5628 7.31238C10.7783 7.31238 10.9849 7.39799 11.1373 7.55036C11.2897 7.70274 11.3753 7.90941 11.3753 8.1249V11.375C11.3753 11.806 11.2041 12.2193 10.8993 12.5241C10.5946 12.8288 10.1812 13 9.75024 13H1.62504C1.19405 13 0.780718 12.8288 0.475963 12.5241C0.171209 12.2193 0 11.806 0 11.375V3.24978Z"
										fill="#A0AEC0"
										/>
									</svg>
									</span>
									<span>
									<svg
										width={10}
										height={10}
										viewBox="0 0 9 9"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
										d="M8.07284 2.38745C8.07282 2.48303 8.03773 2.57528 7.97422 2.64671C7.9107 2.71814 7.82318 2.76377 7.72825 2.77496L7.68259 2.77769H7.35284L6.87245 7.66354C6.84629 7.92866 6.72246 8.17456 6.52505 8.35344C6.32764 8.53232 6.07075 8.63138 5.80435 8.63135H2.92669C2.66029 8.63138 2.4034 8.53232 2.20599 8.35344C2.00858 8.17456 1.88475 7.92866 1.85859 7.66354L1.3782 2.77769H1.04845C0.944948 2.77769 0.845688 2.73657 0.772503 2.66339C0.699318 2.5902 0.658203 2.49094 0.658203 2.38745C0.658203 2.28395 0.699318 2.18469 0.772503 2.1115C0.845688 2.03832 0.944948 1.9972 1.04845 1.9972H2.99967C2.99967 1.81783 3.035 1.64022 3.10364 1.47451C3.17228 1.3088 3.27288 1.15823 3.39972 1.0314C3.52655 0.904566 3.67712 0.803958 3.84283 0.735317C4.00854 0.666677 4.18615 0.631348 4.36552 0.631348C4.54489 0.631348 4.7225 0.666677 4.88821 0.735317C5.05392 0.803958 5.20449 0.904566 5.33132 1.0314C5.45816 1.15823 5.55876 1.3088 5.6274 1.47451C5.69604 1.64022 5.73137 1.81783 5.73137 1.9972H7.68259C7.78609 1.9972 7.88535 2.03832 7.95854 2.1115C8.03172 2.18469 8.07284 2.28395 8.07284 2.38745ZM5.24357 3.65574C5.17284 3.65574 5.10451 3.68135 5.05121 3.72784C4.9979 3.77433 4.96324 3.83855 4.95362 3.90862L4.95089 3.94842V6.68013L4.95362 6.71993C4.96326 6.78999 4.99793 6.85418 5.05123 6.90065C5.10453 6.94712 5.17286 6.97272 5.24357 6.97272C5.31428 6.97272 5.3826 6.94712 5.43591 6.90065C5.48921 6.85418 5.52388 6.78999 5.53352 6.71993L5.53625 6.68013V3.94842L5.53352 3.90862C5.5239 3.83855 5.48923 3.77433 5.43593 3.72784C5.38263 3.68135 5.3143 3.65574 5.24357 3.65574ZM3.48747 3.65574C3.41674 3.65574 3.34841 3.68135 3.29511 3.72784C3.24181 3.77433 3.20714 3.83855 3.19752 3.90862L3.19479 3.94842V6.68013L3.19752 6.71993C3.20716 6.78999 3.24183 6.85418 3.29513 6.90065C3.34844 6.94712 3.41676 6.97272 3.48747 6.97272C3.55818 6.97272 3.62651 6.94712 3.67981 6.90065C3.73311 6.85418 3.76778 6.78999 3.77742 6.71993L3.78015 6.68013V3.94842L3.77742 3.90862C3.7678 3.83855 3.73314 3.77433 3.67983 3.72784C3.62653 3.68135 3.5582 3.65574 3.48747 3.65574ZM4.36552 1.41184C4.21027 1.41184 4.06138 1.47351 3.9516 1.58329C3.84183 1.69306 3.78015 1.84195 3.78015 1.9972H4.95089C4.95089 1.84195 4.88921 1.69306 4.77944 1.58329C4.66966 1.47351 4.52077 1.41184 4.36552 1.41184Z"
										fill="#718096"
										/>
									</svg>
									</span>
								</div>
								<div className="pi-bank-image">
									<svg
									width={28}
									height={29}
									viewBox="0 0 28 29"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
									>
									<path
										d="M12.3479 0.555556C13.3232 -0.185185 14.6789 -0.185185 15.6542 0.555556L27.2321 9.33565C28.7067 10.4537 27.9157 12.787 26.0631 12.7963H1.93665C0.0863324 12.787 -0.706994 10.4537 0.769993 9.33565L12.3479 0.555556ZM13.9999 8.74537C14.464 8.74537 14.9091 8.56246 15.2373 8.23688C15.5655 7.91129 15.7499 7.4697 15.7499 7.00926C15.7499 6.54881 15.5655 6.10723 15.2373 5.78164C14.9091 5.45606 14.464 5.27315 13.9999 5.27315C13.5357 5.27315 13.0906 5.45606 12.7624 5.78164C12.4343 6.10723 12.2499 6.54881 12.2499 7.00926C12.2499 7.4697 12.4343 7.91129 12.7624 8.23688C13.0906 8.56246 13.5357 8.74537 13.9999 8.74537ZM3.49997 15.1111V22.0556H6.99994V15.1111H3.49997ZM9.33325 15.1111V22.0556H12.8332V15.1111H9.33325ZM15.1665 15.1111V22.0556H18.6665V15.1111H15.1665ZM20.9998 15.1111V22.0556H24.4998V15.1111H20.9998ZM0 27.2639C0 25.6667 1.30665 24.3704 2.91664 24.3704H25.0831C26.6931 24.3704 27.9997 25.6667 27.9997 27.2639V27.8426C27.9997 28.1496 27.8768 28.4439 27.658 28.661C27.4392 28.8781 27.1425 29 26.8331 29H1.16666C0.85724 29 0.560496 28.8781 0.341706 28.661C0.122915 28.4439 0 28.1496 0 27.8426V27.2639Z"
										fill="#4A5568"
									/>
									</svg>
								</div>
								<div className="bank-text-content">
									<h2 className="pi-bank-title">Islami Bank Bangladesh...</h2>
									<h4 className="pi-bank-subtitle">Ac No. 2165365436546543365</h4>
								</div>
								</li>
							</ul>

							<Form
								handleSubmit={this.handleSubmit}
								show={this.state.formModal}
								modalType={this.state.formModalType}
								data={this.state.client}
								close={this.closeForm} 
							/> 

							{/* {this.state.preloader ? <TablePreloader /> : <Table tableData={this.state.clients} editEntry={this.openForm} checkedBoxes={{ data: checkedBoxes, handle: this.handleCheckbox }} deleteEntry={this.deleteEntry} />} */}

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
								Add Bank Account
							</button>
						</div>
					</div>
					{/* ./ pi-tabs */}
				</div>

            </div>
        );
    }
} 