import React, { Component } from 'react';
import pro from 'block/pro-alert';
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
                currency: 'USD',
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
        let form = [...this.state.singleForm];
        form[i].form = this.state.currentTab.slug;

        const newFields = form[i].fields.map(({ label, ...rest }) => {
            return rest;
        });
        form[i].fields = newFields;

        this.props.update('forms', form[i].id, form[i]).then(resp => {
            if (resp.data.success) {
                toast.success('Successfully updated'); //TODO: translation
            } else {
                resp.data.data.forEach(function (value, index, array) {
                    toast.error(value);
                });
            }
        });
    }

    render() {
        const { loading, currentTab, list, singleForm, leadField } = this.state;
        const i18n = ndpi.i18n;
        return (
            <>
                {loading ? <Spinner /> : <>
                    {!currentTab && <div className="pi-intg-list">
                        {list.map((item, i) => (
                            <div key={i} className="pi-intg-item" onClick={() => this.addCurrentTab(item)}>
                                <img src={item.img} style={{ width: (item.slug == 'gravity_forms' ? '150px' : '80px') }} />
                                <h4>
                                    {item.name} {item.pro && wage.length > 0 && <ProLabel />}
                                </h4>
                            </div>
                        ))}
                    </div>}

                    {currentTab && <div className="pi-intg-single">
                        <h4 className='pi-title-medium pi-mb-15' style={{ textTransform: 'capitalize' }}>{currentTab.name}</h4>
                        <div className="pi-accordion-wrapper pi-mt-15">
                            <ul>
                                {singleForm.map((item, i) => (
                                    <li key={i}>
                                        <input type="checkbox" defaultChecked="checked" />
                                        <i />
                                        <h3 className='pi-title-small'>
                                            {item.title}
                                            {wage.length > 0 && <ProLabel />}
                                            <span className="pi-field-switch-content">
                                                <label className="pi-field-switch pi-field-switch-big">
                                                    <input type='checkbox'
                                                        name='active'
                                                        checked={item.active ? 'checked' : ''}
                                                        onChange={(e) => this.handleChange(e, i)}
                                                    />
                                                    <span className="pi-switch-slider pi-round" />
                                                </label>
                                            </span>
                                        </h3>

                                        <div>
                                            <form onSubmit={(e) => this.handleSubmit(e, i)} className="pi-form-style-one">
                                                <div className='pi-table-wrap'>
                                                    <table className='pi-table'>
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
                                                        <button type='submit' className="pi-btn pi-bg-blue pi-bg-hover-blue pi-color-white">
                                                            {i18n.save} {wage.length > 0 && <ProLabel blueBtn />}
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