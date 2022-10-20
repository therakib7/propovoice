import React, { Component } from 'react';

import { toast } from 'react-toastify';
import AppContext from 'context/app-context';
import Taxonomy from 'block/field/taxonomy/setting';
import pro from 'block/pro-alert';
import ProLabel from 'block/pro-alert/label';

export default class ExtraAmount extends Component {
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

        if ( wage.length > 0 && name == 'item_tax' ) {
			pro();
			return;
		}

        this.setState({ form }, () => {
            let form = this.state.form;
            form.tab = 'estvoice_tax';

            this.props.create('settings', form).then(resp => {
                /* if (resp.data.success) {
                    toast.success(ndpv.i18n.aUpd);
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
        const i18n = ndpv.i18n;
        return (
            <div className="pv-form-style-one">
                <div className="row">
                    <div className="col">
                        <label id="form-item_tax">{i18n.eachitem} {i18n.tax} {i18n.field}
                            {wage.length > 0 && <>
                                <ProLabel />
                            </>}
                        </label>
                        <div className="pv-field-switch pv-ml-10">
                            <label className='pv-switch'>
                                <input type='checkbox'
                                    id="form-item_tax"
                                    name='item_tax'
                                    checked={form.item_tax ? 'checked' : ''}
                                    onChange={this.handleChange}
                                />
                                <span className='pv-switch-slider pv-round'></span>
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
                        <label>{i18n.tax} {i18n.fields}</label>
                        <Taxonomy taxonomy='extra_amount' title={i18n.tax+' '+i18n.field} extra_amount_type='tax' tax_cal />
                    </div>
                    <div className="col">
                    </div>
                </div>  
            </div>
        );
    }
} 