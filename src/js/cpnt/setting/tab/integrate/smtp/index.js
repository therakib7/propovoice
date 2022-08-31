import React, { Component } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import pro from 'block/pro-alert';
import ProLabel from 'block/pro-alert/label';
import { toast } from 'react-toastify';
import AppContext from 'context/app-context';
import Spinner from 'block/preloader/spinner';

//form
import Other from './form/Other';
import Sendinblue from './form/Sendinblue';

export default class Main extends Component {
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
        this.getList()
    }

    getList = () => { 
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

        if ( !slug ) { 

            let form = {
                tab: 'smtp_default'
            }; 
            this.props.create('settings', form).then(resp => {
                if (resp.data.success) {
                    toast.success(this.context.CrudMsg.update);
                    this.getList();
                } else {
                    resp.data.data.forEach(function (value, index, array) {
                        toast.error(value);
                    });
                }
            })
            return;
        }

        this.setState({ currentTab: slug, formModal: true })
        this.props.onChange('smtp', slug, false)
    };

    close = () => {
        this.setState({ formModal: false, currentTab: '' });
        this.getList();
    }

    render() {
        const { loading, currentTab, list, singleList, leadField } = this.state;
        const i18n = ndpv.i18n;
        return (
            <>
                {loading ? <Spinner /> : <>
                    {!currentTab && <div className="pv-intg-list">
                        {list.map((item, i) => (
                            <div key={i} className="pv-intg-item" onClick={() => this.addCurrentTab(item)}>
                                {item.active && <div className="pv-checked">
                                    <svg
                                        width={12}
                                        height={11}
                                        
                                        viewBox="3.4 5.6 17.6 13.4"
                                        xmlSpace="preserve"
                                    >
                                        <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
                                    </svg>
                                </div>}
                                <img src={item.img} style={{ maxWidth: '150px', maxHeight: '50px' }} />
                                <h4>
                                    {item.name} {item.pro && wage.length > 0 && <ProLabel />}
                                </h4>
                            </div>
                        ))}
                    </div>}

                    {currentTab == 'other' && this.state.formModal && <Other
                        {...this.props} 
                        close={this.close}
                    />}

                    {currentTab == 'sendinblue' && this.state.formModal && <Sendinblue
                        {...this.props} 
                        close={this.close}
                    />}

                </>}
            </>
        );
    }
} 