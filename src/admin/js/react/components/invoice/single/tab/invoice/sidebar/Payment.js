import React, { Component } from 'react';
import { toast } from 'react-toastify'; 
import AppContext from 'context/app-context'; 
import Api from 'api/payment';

//others component
import FormBank from 'components/payment/FormBank';

class Payment extends Component {

    constructor(props) {
        super(props);

        this.state = {
            preloader: true,
            bankModal: false,
            payment: { id: null },
            payments: [],
            checkedBoxes: [],
            offset: 0,
            perPage: 10,
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
            per_page: this.state.perPage,
            data_from: 'single_invoice',
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
                this.setState({ payments: result, preloader: false });
            })
    };

    setPayment = (data, type) => {
        this.props.handleChange(data, type);
    }

    handleSubmit = payment => {
        Api.create(payment)
            .then(resp => {
                if (resp.data.success) {
                    this.setState({ bankModal: false })
                    toast.success(this.context.CrudMsg.create);
                    this.props.handleChange(resp.data.data, 'bank');
                    this.getLists();
                } else {
                    resp.data.data.forEach(function (value, i, array) {
                        toast.error(value);
                    });
                }
            })
    }

    render() {
        const { payment_methods } = this.props.data
        return (
            <div className="pi-form-accordion pi-additional">
                {this.state.payments.map((row, i) => {
                    if (wage.length > 0) {
                        if (row.method_id !== 'bank') return;
                    }

                    return (
                        <div className="pi-tab" key={i}>
                            <input type="checkbox" defaultChecked={payment_methods.hasOwnProperty(row.method_id)} id={"pi-payment-" + row.method_id} onChange={() => this.setPayment(row.method_id, 'method')} name="pi-payment-type" />
                            <label className={(payment_methods.hasOwnProperty(row.method_id) ? 'pi-active' : '') + ' pi-tab-label'} htmlFor={"pi-payment-" + row.method_id}>
                                {row.method_name}
                            </label>
                            <div className="pi-tab-content">
                                {row.list.map((single, i_single) => {
                                    return (
                                        <div className="pi-payment-bank-content" key={i_single} onClick={() => this.setPayment(single, 'id')} >
                                            <div className="pi-payment-image">
                                                <span>
                                                    <svg
                                                        width={20}
                                                        height={20}
                                                        viewBox="0 0 28 29"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            d="M12.3479 0.555556C13.3232 -0.185185 14.6789 -0.185185 15.6542 0.555556L27.2321 9.33565C28.7067 10.4537 27.9157 12.787 26.0631 12.7963H1.93665C0.0863324 12.787 -0.706994 10.4537 0.769993 9.33565L12.3479 0.555556ZM13.9999 8.74537C14.464 8.74537 14.9091 8.56246 15.2373 8.23688C15.5655 7.91129 15.7499 7.4697 15.7499 7.00926C15.7499 6.54881 15.5655 6.10723 15.2373 5.78164C14.9091 5.45606 14.464 5.27315 13.9999 5.27315C13.5357 5.27315 13.0906 5.45606 12.7624 5.78164C12.4343 6.10723 12.2499 6.54881 12.2499 7.00926C12.2499 7.4697 12.4343 7.91129 12.7624 8.23688C13.0906 8.56246 13.5357 8.74537 13.9999 8.74537ZM3.49997 15.1111V22.0556H6.99994V15.1111H3.49997ZM9.33325 15.1111V22.0556H12.8332V15.1111H9.33325ZM15.1665 15.1111V22.0556H18.6665V15.1111H15.1665ZM20.9998 15.1111V22.0556H24.4998V15.1111H20.9998ZM0 27.2639C0 25.6667 1.30665 24.3704 2.91664 24.3704H25.0831C26.6931 24.3704 27.9997 25.6667 27.9997 27.2639V27.8426C27.9997 28.1496 27.8768 28.4439 27.658 28.661C27.4392 28.8781 27.1425 29 26.8331 29H1.16666C0.85724 29 0.560496 28.8781 0.341706 28.661C0.122915 28.4439 0 28.1496 0 27.8426V27.2639Z"
                                                            fill="#4A5568"
                                                        />
                                                    </svg>
                                                </span>
                                            </div>

                                            <div className="payment-text-content">
                                                {Object.values(payment_methods).indexOf(single.id) > -1 && <span>
                                                    <svg
                                                        width={20}
                                                        height={20}
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        xmlnsXlink="http://www.w3.org/1999/xlink"
                                                        viewBox="3.4 5.6 17.6 13.4"
                                                        enableBackground="new 3.4 5.6 17.6 13.4"
                                                        xmlSpace="preserve"
                                                    >
                                                        <path d="M9,16.2L4.8,12l-1.4,1.4L9,19L21,7l-1.4-1.4L9,16.2z" />
                                                    </svg>
                                                </span>}

                                                {(row.method_id == 'paypal' || row.method_id == 'stripe') &&
                                                    <>
                                                        <h4 className="pi-payment-title">{single.account_name}</h4>
                                                    </>
                                                }

                                                {row.method_id == 'bank' &&
                                                    <>
                                                        <h4 className="pi-payment-title">{single.name}</h4>
                                                    </>
                                                }
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}

                {!this.state.payments.length &&
                    <div className='pi-payment-buttons'>
                        {this.state.bankModal && <FormBank
                            handleSubmit={this.handleSubmit}
                            show={this.state.bankModal}
                            modalType={'new'}
                            // data={this.state.businessData}
                            close={() => this.setState({ bankModal: false })}
                        />}
                        <button
                            className='pi-btn pi-bg-blue pi-bg-hover-blue pi-hover-color-white'
                            // onClick={this.goToPayment}
                            onClick={() => this.setState({ bankModal: true })}
                        >
                            Add New Payment
                        </button>
                    </div>
                }
            </div>
        );
    }
}

export default Payment; 
