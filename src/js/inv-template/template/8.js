import React, { Component } from 'react';
import Moment from 'react-moment';

import From from '../From';
import Items from '../Items';
import Payment from '../Payment';
import To from '../To';
import Total from '../Total';

import Seal from '../Seal';
import Section from '../Section';
import Sign from '../Sign';

//style
import Style from '../scss/8.scoped.scss'

export default class Seven extends Component {
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
        const i18n = ndpi.i18n;
        return (
            <div className="pi-inv" style={{ height: this.props.height }}>
                <Seal status={status} />
                <div className="pi-inv-eight">
                    <div className="pi-inv-body">
                        <div className="pi-inv-title">
                            <h2>{title}</h2>
                        </div>
                        <div className="pi-inv-header">
                            <div className="pi-inv-head">
                                <div className="pi-inv-from-logo">
                                    {fromData && fromData.logo &&
                                        <img src={fromData.logo.src} alt="" />
                                    }
                                </div>
                                <div className="pi-inv-from">
                                    <From data={fromData} />
                                </div>
                            </div>
                            <div className="pi-inv-shapes" />
                            <div className="pi-inv-address">
                                <div className="pi-inv-to">
                                    <To data={toData} />
                                </div>
                                <div className="pi-inv-from-date">
                                    <p>{title} No: <span>{id ? (title == 'Invoice' ? 'Inv' : 'Est') + id : ''}</span></p>
                                    <p>{i18n.date}<span> <Moment format="YYYY-MM-DD">{date}</Moment></span></p>
                                    <p>{i18n.due} {i18n.date}<span> <Moment format="YYYY-MM-DD">{due_date}</Moment></span></p>
                                </div>
                            </div>
                        </div>
                        <div className="pi-inv-item-wrap">
                            {top_sections && <Section data={top_sections} top />} 
                            {items && <Items data={items} item_tax={item_tax} item_label={item_label} />}

                            <div className="pi-inv-account">
                                <Payment {...this.props} />
                                <Total {...this.props} />
                            </div>
                            {sections && <Section data={sections} />}
                            {sign && <Sign data={sign} />}
                        </div>
                    </div>
                </div>

            </div>


        );
    }
} 