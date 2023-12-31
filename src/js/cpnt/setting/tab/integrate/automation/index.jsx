import React, { Component, Suspense, lazy, useRef, useCallback, useState } from 'react';
import pro from 'block/pro-alert';
import api from 'api';
import ProLabel from 'block/pro-alert/label';
const List = lazy(() => import('./list'));
import { toast } from 'react-toastify';
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
                    name: "Make",
                    slug: "make",
                    img: "https://images.ctfassets.net/qqlj6g4ee76j/4cnzmtI7JDKdedi00k5llA/230c63de09f8a2fa59f1e0f136794109/Frame.svg",
                    pro: true,
                },
                {
                    name: "Albato",
                    slug: "albato",
                    img: "https://albato.com/_next/static/media/Logo.e59ec163.svg",
                    pro: true,
                },
                {
                    name: "Integrately",
                    slug: "integrately",
                    img: "https://integrately.com/images/integrately-logo.svg",
                    pro: true,
                },
                {
                    name: "Uncanny Automator",
                    slug: "automator",
                    img: "https://automator.wpenginepowered.com/wp-content/uploads/2022/09/uncanny-automator-vertical-logo.svg",
                    pro: true,
                },
                {
                    name: "Flowmattic",
                    slug: "flowmattic",
                    img: "https://du7m7sbzce8rk.cloudfront.net/wp-content/uploads/2022/01/flowmattic-logo.svg",
                    pro: true,
                },
                {
                    name: "Webhook",
                    slug: "webhook",
                    img: "https://cdn.cdnlogo.com/logos/w/82/webhooks.svg",
                    pro: true,
                },
            ],
        };
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
                                <img src={item.img} style={{ width: (item.slug == 'gravity_forms' || item.slug == 'flowmattic' ? '150px' : '80px') }} />
                                <h4>
                                    {item.name} {item.pro && wage.length > 0 && <ProLabel />}
                                </h4>
                            </div>
                        ))}
                    </div>}

                    {currentTab && <div className="pv-intg-single">
                        <Suspense fallback={<Spinner />}>
                            <List item={currentTab} />
                        </Suspense>
                    </div>}
                </>}
            </>
        );
    }
} 