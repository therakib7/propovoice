import React, { Component } from 'react';
import pro from 'block/pro-alert';
import ProLabel from 'block/pro-alert/label';
import { toast } from 'react-toastify';
import AppContext from 'context/app-context'; 
import Spinner from 'block/preloader/spinner';

//form
import Sendinblue from './form/Sendinblue';

export default class License extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            formModal: false,
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

        const slug = item.slug;
        this.setState({ currentTab: slug })
        this.props.onChange('smtp', slug, false) 
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

        if (wage.length > 0) {
            pro();
            return;
        }
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
                     
                    {currentTab == 'sendinblue' && this.state.formModal && <Sendinblue   
                        close={ () => this.setState({ formModal: false }) }
                    />}
 
                </>}
            </>
        );
    }
} 