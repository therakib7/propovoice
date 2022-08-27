import React, { Component } from 'react';
import Moment from 'react-moment';

import From from '../From';
import To from '../To';
import Payment from '../Payment';
import Total from '../Total';
import Items from '../Items'

import Section from '../Section';
import Attach from '../Attach';
import Sign from '../Sign';
import Seal from '../Seal';

//style
import Style from '../scss/3.scoped.scss'

export default class Three extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        document.documentElement.style.setProperty('--pi-inv-primary', this.props.data.invoice.style.primary_color);

        this.props.isPreviewLoaded();
    }

    render() {
        const { id, top_sections, items, sections, item_tax, item_label, attach, sign, date, due_date } = this.props.data.invoice;
        const { fromData, toData, status } = this.props.data;
        let title = this.props.data.title;
        const i18n = ndpv.i18n;
        return (
            <div className="pi-inv" style={{ height: this.props.height }}>
                <Seal status={status} />
                <div className="pi-inv-three">
                    <div className="pi-inv-body">
                        <div className="pi-inv-top-shape">
                            <div className="pi-inv-shape1">
                                <svg width="165" height="19" viewBox="0 0 165 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0 0L8.30517e-07 19L142.676 19L165 -7.21238e-06L0 0Z" />
                                </svg>
                            </div>
                            <div className="pi-inv-shape2">
                                <svg width="19" height="165" viewBox="0 0 19 165" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0 0H19V142.676L0 165V0Z" />
                                </svg>

                            </div>
                            <div className="pi-inv-shape3">
                                <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="16.5" cy="16.5" r="16.5" />
                                </svg>

                            </div>
                        </div>
                        <div className="pi-inv-title">
                            <h2>{title}</h2>
                        </div>
                        <div className="pi-inv-header">
                            <div className="pi-inv-from">
                                {fromData && fromData.logo &&
                                    <div className="pi-inv-from-logo">
                                        <img src={fromData.logo.src} alt="" />
                                    </div>}
                                <From data={fromData} />
                                <div className="pi-inv-from-date">
                                    <p>{title} No: <span>{id ? (title == 'Invoice' ? 'Inv' : 'Est') + id : ''}</span></p>
                                    <div className="pi-inv-from-time">
                                        <p>{i18n.date}<span> <Moment format="YYYY-MM-DD">{date}</Moment></span></p>
                                        <p>{i18n.due} {i18n.date}<span> <Moment format="YYYY-MM-DD">{due_date}</Moment></span></p>
                                    </div>
                                </div>
                            </div>
                            <div className="pi-inv-to">
                                <To data={toData} />
                            </div>
                        </div>
                        
                        {top_sections && <Section data={top_sections} top />} 
                        {items && <Items data={items} item_tax={item_tax} item_label={item_label} />}

                        <div className="pi-inv-account">
                            <Payment {...this.props} />
                            <Total {...this.props} />
                        </div>
                        {sections && <Section data={sections} />}
                        {sign && <Sign data={sign} />}
                    </div>
                    <div className="pi-inv-top-shape pi-inv-footer-shape">
                        <div className="pi-inv-shape1">
                            <svg width="165" height="19" viewBox="0 0 165 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 0L8.30517e-07 19L142.676 19L165 -7.21238e-06L0 0Z" />
                            </svg>
                        </div>
                        <div className="pi-inv-shape2">
                            <svg width="19" height="165" viewBox="0 0 19 165" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 0H19V142.676L0 165V0Z" />
                            </svg>

                        </div>
                        <div className="pi-inv-shape3">
                            <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="16.5" cy="16.5" r="16.5" />
                            </svg>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
} 