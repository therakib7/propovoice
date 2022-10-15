import React, { Component } from 'react';
import pro from 'block/pro-alert';
import api from 'api';
import ProLabel from 'block/pro-alert/label';
import { toast } from 'react-toastify';
import AppContext from 'context/app-context';
import Spinner from 'block/preloader/spinner';

export default class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            form: null,
            currentTab: this.props.tab,
            list: [
                {
                    name: "Zapier",
                    slug: "zapier",
                    img: "https://cdn.cdnlogo.com/logos/z/75/zapier.svg", 
                    pro: true,
                },
                {
                    name: "Web Hook",
                    slug: "web-hook",
                    img: "https://cdn.cdnlogo.com/logos/w/82/webhooks.svg", 
                    pro: true,
                },
            ],
            singleForm: [],
            leadField: {
                lead_new: 'Lead New',
                lead_edit: 'Lead Update',
                lead_del: 'Lead Delete',
                deal_new: 'Deal New',
                deal_edit: 'Deal Update',
                deal_del: 'Deal Delete',
                est_new: 'Estimate New',
                est_edit: 'Estimate Update',
                est_del: 'Estimate Delete',
                inv_new: 'Invoice New',
                inv_edit: 'Invoice Update',
                inv_del: 'Invoice Delete',
            }
        };
    }

    static contextType = AppContext;

    componentDidMount() { 
    } 

    getSingleList = (slug) => {
        this.setState({ loading: true });
        this.props.getAll('webhooks', 'webhook=' + slug).then(resp => {
            if (resp.data.success) {
                this.setState({ singleForm: resp.data.data, loading: false });
            }
        })
    };

    addCurrentTab = (item) => { 

        const slug = item.slug;
        this.setState({ currentTab: item })
        this.props.onChange('webhook', slug, false)
        this.getSingleList(slug)
    };

    handleChange = (e, i, si = null) => {
        let singleForm = [...this.state.singleForm]
        const target = e.target;
        const name = target.name;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        if (name == 'active') {
            if (wage.length > 0) {
                pro();
                return;
            }
            singleForm[i].active = value;
            this.setState({ singleForm }, () => {
                this.submitFormData(i);
            })
        } else {
            singleForm[i].fields[si].value = value;
            this.setState({ singleForm })
        }
    }

    handleSubmit = (e, i) => {
        e.preventDefault();
        if (wage.length > 0) {
            pro();
            return;
        }

        this.submitFormData(i);
    }

    submitFormData = (i) => {
        let form = JSON.parse(JSON.stringify(this.state.singleForm));
        form[i].form = this.state.currentTab.slug;
        const newFields = form[i].fields.map(({ label, ...rest }) => {
            return rest;
        });
        form[i].fields = newFields;

        api.edit('webhooks', form[i].id, form[i]).then(resp => {
            if (resp.data.success) {
                toast.success(ndpv.i18n.aUpd);
            } else {
                resp.data.data.forEach(function (value, index, array) {
                    toast.error(value);
                });
            }
        });
    }

    render() {
        const { loading, currentTab, list, singleForm, leadField } = this.state;
        const i18n = ndpv.i18n;
        return (
            <>
                {loading ? <Spinner /> : <>
                    {!currentTab && <div className="pv-intg-list">
                        {list.map((item, i) => (
                            <div key={i} className="pv-intg-item" onClick={() => this.addCurrentTab(item)}>
                                <img src={item.img} style={{ width: (item.slug == 'gravity_forms' ? '150px' : '80px') }} />
                                <h4>
                                    {item.name} {item.pro && wage.length > 0 && <ProLabel />}
                                </h4>
                            </div>
                        ))}
                    </div>}

                    {currentTab && <div className="pv-intg-single">
                        <h4 className='pv-title-medium pv-mb-15' style={{ textTransform: 'capitalize' }}>{currentTab.name}</h4>
                        <div className="pv-accordion-wrapper pv-mt-15">
                            <ul>
                                {singleForm.map((item, i) => (
                                    <li key={i}>
                                        <input type="checkbox" defaultChecked="checked" />
                                        <i />
                                        <h3 className='pv-title-small'>
                                            {item.name}
                                            <ProLabel />
                                            <span className="pv-field-switch-content">
                                                <label className="pv-field-switch pv-field-switch-big">
                                                    <input type='checkbox'
                                                        name='active'
                                                        checked={item.active ? 'checked' : ''}
                                                        onChange={(e) => this.handleChange(e, i)}
                                                    />
                                                    <span className="pv-switch-slider pv-round" />
                                                </label>
                                            </span>
                                        </h3>

                                        <div>
                                            <form onSubmit={(e) => this.handleSubmit(e, i)} className="pv-form-style-one">
                                                <div className="row">
                                                    <div className="col-md">
                                                        <label htmlFor="name">{i18n.name}</label>

                                                        <input
                                                            id="name"
                                                            type="text"
                                                            required
                                                            name="name"
                                                            value={item.name}
                                                            onChange={this.handleChange}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="col-md">
                                                        <label htmlFor="webhook_url">Webhook URL</label> 
                                                        <input
                                                            id="webhook_url"
                                                            type="text"
                                                            required
                                                            name="name"
                                                            value={item.name}
                                                            onChange={this.handleChange}
                                                        />
                                                    </div>
                                                </div>

                                                <div className='pv-table-wrap'>
                                                    <table className='pv-table'>
                                                        <thead>
                                                            <tr>
                                                                <th>
                                                                </th>
                                                                <th>
                                                                    Action
                                                                </th>
                                                                <th>
                                                                    <input type='checkbox' /> Active
                                                                </th>
                                                                <th>
                                                                </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {Object.entries(leadField).map((t, k) => (
                                                                <tr key={k}>
                                                                    <td>
                                                                    </td>
                                                                    <td>
                                                                        {t[1]}
                                                                    </td>
                                                                    <td>
                                                                        <input type='checkbox' />
                                                                        {/* <select
                                                                            style={{ lineHeight: '106%' }}
                                                                            name="lead_field"
                                                                            value={sitem.value}
                                                                            onChange={(e) => this.handleChange(e, i, si)}
                                                                        >
                                                                            {Object.entries(leadField).map((t, k) => <option key={k} value={t[0]}>{t[1]}</option>)}
                                                                        </select> */}
                                                                    </td>
                                                                    <td>
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>

                                                <div className="row">
                                                    <div className="col" style={{ textAlign: 'center', marginTop: 35 }}>
                                                        <button type='submit' className="pv-btn pv-bg-blue pv-bg-hover-blue pv-color-white">
                                                            {i18n.save} <ProLabel blueBtn />
                                                        </button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>}
                </>}
            </>
        );
    }
} 