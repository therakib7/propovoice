import React, { Component } from 'react';
import pro from 'block/pro-alert';
import api from 'api';
import ProLabel from 'block/pro-alert/label';
import { toast } from 'react-toastify';
import AppContext from 'context/app-context';
import Spinner from 'block/preloader/spinner';

export default class License extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            form: null,
            currentTab: this.props.tab,
            list: [],
            singleForm: [],
            leadField: {
                '': 'Not Asign',
                first_name: 'Name',
                org_name: 'Org Name',
                email: 'Email',
                mobile: 'Mobile',
                web: 'Web',
                source_id: 'Source', //tax
                level_id: 'Level', //tax 
                budget: 'Budget',
                currency: 'Currency',
                desc: 'Description'
            }
        };
    }

    static contextType = AppContext;

    componentDidMount() {
        this.getList()
    }

    getList = () => {
        this.setState({ loading: true });
        this.props.getAll('intg-form').then(resp => {
            if (resp.data.success) {
                this.setState({ list: resp.data.data, loading: false });
            }
        })
    };

    getSingleList = (slug) => {
        this.setState({ loading: true });
        this.props.getAll('forms', 'form=' + slug).then(resp => {
            if (resp.data.success) {
                this.setState({ singleForm: resp.data.data, loading: false });
            }
        })
    };

    addCurrentTab = (item) => {

        if (!item.active) {
            toast.error('This plugin is not Install or Activated yet');
            return;
        }

        const slug = item.slug;
        this.setState({ currentTab: item })
        this.props.onChange('form', slug, false)
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
        
        api.edit('forms', form[i].id, form[i]).then(resp => {
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
                                            {item.title}
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
                                                <div className='pv-table-wrap'>
                                                    <table className='pv-table'>
                                                        <thead>
                                                            <tr>
                                                                <th>
                                                                </th>
                                                                <th>
                                                                    Form Field
                                                                </th>
                                                                <th>
                                                                    {i18n.lead + ' ' + i18n.fields}
                                                                </th>
                                                                <th>
                                                                </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {item.fields.map((sitem, si) => (
                                                                <tr key={si}>
                                                                    <td>
                                                                    </td>
                                                                    <td>
                                                                        {sitem.label}
                                                                    </td>
                                                                    <td>
                                                                        <select
                                                                            style={{ lineHeight: '106%' }}
                                                                            name="lead_field"
                                                                            value={sitem.value}
                                                                            onChange={(e) => this.handleChange(e, i, si)}
                                                                        >
                                                                            {Object.entries(leadField).map((t, k) => <option key={k} value={t[0]}>{t[1]}</option>)}
                                                                        </select>
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