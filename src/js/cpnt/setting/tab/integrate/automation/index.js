import React, { Component, Suspense, lazy, useRef, useCallback, useState } from 'react';
import pro from 'block/pro-alert';
import api from 'api'; 
import ProLabel from 'block/pro-alert/label';
const List = lazy(() => import('./list'));
import { toast } from 'react-toastify';
import AppContext from 'context/app-context';
import Spinner from 'block/preloader/spinner'; 

export default class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,  
            currentTab: this.props.tab,
            list: [
                {
                    name: "Zapier",
                    slug: "zapier",
                    img: "https://cdn.cdnlogo.com/logos/z/75/zapier.svg",
                    pro: true,
                },
                {
                    name: "Pabbly",
                    slug: "pabbly",
                    img: "https://www.pabbly.com/wp-content/uploads/2021/02/p-logo.png",
                    pro: true,
                },
                {
                    name: "Slack",
                    slug: "slack",
                    img: "https://cdn.cdnlogo.com/logos/s/55/slack.svg",
                    pro: true,
                },
                {
                    name: "Web Hook",
                    slug: "web-hook",
                    img: "https://cdn.cdnlogo.com/logos/w/82/webhooks.svg",
                    pro: true,
                },
            ], 
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
        this.props.onChange('automation', slug, false);
    };  

    render() {
        const { loading, currentTab, list } = this.state;
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

                    { currentTab && <div className="pv-intg-single">
                        {/* <h4 className='pv-title-medium pv-mb-15' style={{ textTransform: 'capitalize' }}>{currentTab.name}</h4> */}
                        <Suspense fallback={<Spinner />}>
                            <List item={currentTab} />
                        </Suspense> 
                    </div>} 
                </>}
            </>
        );
    }
} 