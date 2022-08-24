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
        this.setState({ currentTab: slug, formModal: true })
        this.props.onChange('smtp', slug, false)
    };
 
    close = () => {
        this.setState({ formModal: false, currentTab: '' })
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
                                <div className="pi-intg-item" onClick={() => this.addCurrentTab(item)}>
                                    <img src={item.img} style={{maxWidth: '150px', maxHeight: '22px'}} />
                                    <h4>
                                        {item.name} {item.pro && wage.length > 0 && <ProLabel />}
                                    </h4>
                                </div>
                            </div>
                        ))}
                    </div>}

                    {currentTab == 'sendinblue' && this.state.formModal && <Sendinblue
                        {...this.props}
                        close={this.close}
                    />}

                </>}
            </>
        );
    }
} 