import React, { Component } from 'react';

import { toast } from 'react-toastify';
import AppContext from 'context/app-context';
import Taxonomy from 'block/field/taxonomy/setting';

export default class AdditionalAmount extends Component {
    constructor(props) {
        super(props);

        this.state = {
            form: {
                item_tax: false,
                // item_tax_val_type: '',
            }

        };
    }

    static contextType = AppContext;

    componentDidMount() {

        this.props.getAll('settings', 'tab=estvoice_tax').then(resp => {
            if (resp.data.success) {
                this.setState({ form: resp.data.data });
            }
        });
    }

    handleChange = (e) => {
        let form = { ...this.state.form }
        const target = e.target;
        const name = target.name;
        const value = target.type == 'checkbox' ? target.checked : target.value;
        form[name] = value;

        if ( wage.length > 0 && ( name == 'item_tax' ) ) {
			alert('This is pro features');
			return;
		}

        this.setState({ form }, () => {
            let form = this.state.form;
            form.tab = 'estvoice_tax';

            this.props.create('settings', form).then(resp => {
                /* if (resp.data.success) {
                    toast.success(this.context.CrudMsg.update);
                } else {
                    resp.data.data.forEach(function (value, index, array) {
                        toast.error(value);
                    });
                } */
            });
        });
    }

    render() {
        const form = this.state.form;
        return (
            <div className="pi-form-style-one">
                <div className="row">
                    <div className="col">
                        <label id="form-item_tax">Each Item Tax Field
                            {wage.length > 0 && <>
                                <span className="pi-pro-label">PRO</span>
                            </>}
                        </label>
                        <div className="pi-field-switch pi-ml-10">
                            <label className='pi-switch'>
                                <input type='checkbox'
                                    id="form-item_tax"
                                    name='item_tax'
                                    checked={form.item_tax ? 'checked' : ''}
                                    onChange={this.handleChange}
                                />
                                <span className='pi-switch-slider pi-round'></span>
                            </label>
                        </div>
                    </div>
                </div>

                {/* {false && form.item_tax && <div className="row">
                    <div className="col-md">
                        <label htmlFor="field-label">Item Tax Value Type</label>
                        <select name="item_tax_val_type" value={form.item_tax_val_type} onChange={this.handleChange}>
                            <option value="percent">Percent</option>
                            <option value="fixed">Fixed</option>
                        </select>
                    </div>
                    <div className="col-md"></div>
                </div>} */}

                <div className="row">
                    <div className="col">
                        <label>Tax Fields</label>
                        <Taxonomy taxonomy='extra_amount' title='Tax Field' extra_amount_type={'tax'} />
                    </div>
                    <div className="col">
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <label>Additional Fee Fields</label>
                        <Taxonomy taxonomy='extra_amount' title='Additional Fee Field' extra_amount_type={'fee'} />
                    </div>
                    <div className="col">
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <label>Discount Fields</label>
                        <Taxonomy taxonomy='extra_amount' title='Discount Field' extra_amount_type={'discount'} />
                    </div>
                    <div className="col">
                    </div>
                </div>
            </div>
        );
    }
} 