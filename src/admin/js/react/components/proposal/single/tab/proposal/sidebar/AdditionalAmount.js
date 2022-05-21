import React, { Component } from 'react';

import Api from 'api/payment';

class AdditionalAmount extends Component {

    constructor(props) {
        super(props);

        this.state = {
            preloader: true,
            payment: { id: null },
            payments: [],
            checkedBoxes: [],
            offset: 0,
            perPage: 10,
            currentPage: 1
        };
    }

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
                this.setState({ payments: result, preloader: false });
            })
    };

    handleSubmit = (e) => {
        e.preventDefault();
        // this.props.handleSubmit(this.state.form);
        // this.setState({ form: this.initialState });
    }

    setPayment = (data) => {
        this.props.handleChange(data);
    }

    render() {
        const { payment_id } = this.props.data 
        return (
            <li>
                <input type="checkbox" defaultChecked="checked" />
                <i />
                <h3>Additional Amount</h3>
                <div className="pi-form-accrodion">
                    <div className="pi-tab">
                        <input type="checkbox" id="rd4" name="rd" />
                        <label className="pi-tab-label" htmlFor="rd4">
                            Tax
                        </label>
                        <div className="pi-tab-content pi-bg-pearl">
                            <div className="pi-form-content pi-form-style-two pi-form-style-four">
                                <div className="pi-radio-content">
                                    <div className="pi-radio-group">
                                        <h4>Tax in:</h4>
                                        <input type="radio" name="tax" id="rate" />
                                        <label htmlFor="rate">Flat Rate</label>
                                        <input type="radio" name="tax" id="percent" />
                                        <label htmlFor="percent">Percentage</label>
                                    </div>
                                    <input type="number" id="number" name="number" placeholder="100$" />
                                    <span>% Invoice Balance</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="pi-tab">
                        <input type="checkbox" id="rd5" name="rd" />
                        <label className="pi-tab-label" htmlFor="rd5">
                            Discount Price
                        </label>
                        <div className="pi-tab-content pi-bg-pearl">
                            <div className="pi-form-content pi-form-style-two pi-form-style-four">
                                <div className="pi-radio-content">
                                    <div className="pi-radio-group">
                                        <h4>Discount Price in:</h4>
                                        <input type="radio" name="discount" id="flat" />
                                        <label htmlFor="flat">Flat Rate</label>
                                        <input type="radio" name="discount" id="discount" />
                                        <label htmlFor="discount">Percentage</label>
                                    </div>
                                    <input type="number" id="number" name="number" placeholder="100$" />
                                    <span>% Invoice Balance</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div class="pi-tab">
                    <input type="radio" id="rd6" name="rd" />
                    <label class="pi-tab-label pi-arrow-none" for="rd6"
                        >None</label
                    >
                    </div> */}
                    <div className="pi-payment-buttons">
                        <button className="pi-btn pi-bg-blue pi-bg-hover-blue pi-hover-color-white">
                            Save
                        </button>
                        <button className="pi-btn pi-color-blue pi-bg-hover-blue pi-hover-color-white">
                            Clear
                        </button>
                    </div>
                </div>
            </li>
        );
    }
}

export default AdditionalAmount;
