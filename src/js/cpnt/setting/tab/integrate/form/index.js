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
            },
            customLeadField: []
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
                this.setState({ list: resp.data.data.form, customLeadField: resp.data.data.lead_field, loading: false });
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

        if (ndpv.isDemo) { toast.error(ndpv.demoMsg); return; }
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
        console.log(singleForm)
        const i18n = ndpv.i18n;
        let getFormSlug = (formName) => {
            let formList = {
                contact_form_7: 'contact-form-7',
                wpforms: 'wpforms',
                ninja_forms: 'ninja_form',
                fluent_forms: 'fluentform',
            }

            return formList[formName];

        }

        let copyEmbededCode = (form_id) => {
            let siteUrl = ndpv.siteUrl;
            let previewLink = siteUrl + `/propovoice-form/?type=${getFormSlug(currentTab.slug)}&id=${form_id}`;
            let embedingCode = `<div style="position: relative; width: 100%; height: 0; padding-top: 100.0000%;
                                    padding-bottom: 0;  margin-top: 1.6em; margin-bottom: 0.9em; overflow: hidden;
                                    will-change: transform;">
                                    <iframe loading="lazy" style="position: absolute; width: 100%; height: 100%; top: 0; left: 0; border: none; padding: 0;margin: 0;"
                                        src="${previewLink}" allowfullscreen="allowfullscreen" allow="fullscreen">
                                    </iframe>
                                </div>`;


            const textarea = document.createElement("textarea");
            textarea.value = embedingCode;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand("copy");
            document.body.removeChild(textarea);
            toast.success('Code copied')

        }
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
                                                                            {Object.entries(leadField).map((t, i) => <option key={i} value={t[0]}>{t[1]}</option>)}

                                                                            {this.state.customLeadField.map((item, i) => <option key={i} value={item.slug}>{item.label}</option>)}
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
                                                        <button onClick={() => copyEmbededCode(item.id)} type='button' style={{ marginLeft: 10 }} className="pv-btn pv-bg-blue pv-bg-hover-blue pv-color-white">
                                                            {i18n.copy_form_code} <ProLabel blueBtn />
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
