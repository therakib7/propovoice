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
        this.getFormList()
    }

    getFormList = () => {
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
        this.setState({ currentTab: slug })
        this.props.onChange('form', slug, false)
        this.getSingleList(slug)
    };

    handleChange = (e, i, si = null ) => { 
        let singleForm = [...this.state.singleForm]
        const target = e.target;
        const name = target.name;
        const value = target.type === 'checkbox' ? target.checked : target.value; 
        
        if ( name == 'active' ) {
            singleForm[i].active = value;
            this.setState({ singleForm })
        } else {
            singleForm[i].fields[si].value = value;
            this.setState({ singleForm })
        } 
    } 

    handleSubmit = (e, i) => {
        e.preventDefault();
        console.log(i);
        if (wage.length > 0) {
            pro();
            return;
        }
        return;
        let form = { ...this.state.form }
        form.tab = 'license';
        this.setState({ loading: true });
        this.props.create('pro-settings', form).then(resp => {
            let data = resp.data.data;
            if (resp.data.success) {
                toast.success(data.msg);

            } else {
                data.forEach(function (value, index, array) {
                    toast.error(value);
                });
            }
            this.setState({ loading: false });
        });
    }

    render() {
        const { loading, currentTab, list, singleForm, leadField } = this.state;
        const i18n = ndpi.i18n;
        return (
            <>
                {loading ? <Spinner /> : <>
                    {!currentTab && <div className="row pi-intg-list">
                        {list.map((item, i) => (
                            <div className="col-md-4" key={i}>
                                <div className="pi-intg-item">
                                    <h4 onClick={() => this.addCurrentTab(item)}>
                                        {item.name} {item.pro && wage.length > 0 && <ProLabel />}
                                    </h4>
                                </div>
                            </div>
                        ))}
                    </div>}

                    {currentTab && <div className="pi-intg-single">
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
                                                                            style={{lineHeight: '105%'}}
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