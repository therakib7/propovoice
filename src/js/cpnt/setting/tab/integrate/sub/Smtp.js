import React, { Component } from 'react';
import pro from 'block/pro-alert';
import ProLabel from 'block/pro-alert/label';
import { toast } from 'react-toastify';
import AppContext from 'context/app-context';
import Moment from 'react-moment';
import Spinner from 'block/preloader/spinner';

export default class License extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            currentTab: this.props.tab,
            list: [],
            singleList: [],
            leadField: {
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
        this.props.getAll('intg-smtp').then(resp => {
            if (resp.data.success) {
                this.setState({ list: resp.data.data, loading: false });
            }
        })
    };

    getSingleList = (slug) => {
        this.setState({ loading: true });
        this.props.getAll('intg-smtp/' + slug).then(resp => {
            if (resp.data.success) {
                this.setState({ singleList: resp.data.data, loading: false });
            }
        })
    };

    addCurrentTab = (item) => { 

        if (item.pro && wage.length > 0) {
            pro();
            return;
        }

        const slug = item.slug;
        this.setState({ currentTab: slug })
        this.props.onChange('smtp', slug, false)
        this.getSingleList(slug)
    };

    handleChange = (e) => {
        let form = { ...this.state.form }
        const target = e.target;
        const name = target.name;
        const value = target.value
        form[name] = value;

        this.setState({ form })
    }

    handleSubmit = (e) => {
        e.preventDefault();

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
        const { loading, currentTab, list, singleList, leadField } = this.state;
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
                                {singleList.map((item, i) => (
                                    <li key={i}>
                                        <input type="checkbox" defaultChecked="checked" />
                                        <i />
                                        <h3 className='pi-title-small'>
                                            {item.title}
                                            <span className="pi-field-switch-content">
                                                <label className="pi-field-switch pi-field-switch-big">
                                                    <input type='checkbox'
                                                        id="recurring-status"
                                                        name='status'
                                                    />
                                                    <span className="pi-switch-slider pi-round" />
                                                </label>
                                            </span>
                                        </h3>

                                        <div>
                                            <div className="pi-form-style-one">
                                                <div className='pi-table-wrap'>
                                                    <table className='pi-table'>
                                                        <thead>
                                                            <tr>
                                                                <th>
                                                                </th>
                                                                <th>
                                                                    Form Fields
                                                                </th>
                                                                <th>
                                                                    Lead Field
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
                                                                        <select name="lead_field" onChange={this.handleChange}>
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
                                                        <button type='submit' className="pi-btn pi-bg-blue pi-bg-hover-blue pi-btn-big pi-color-white">
                                                            {i18n.save}
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
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