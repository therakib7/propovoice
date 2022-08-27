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
import Style from '../scss/1.scoped.scss'

export default class One extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        document.documentElement.style.setProperty('--pv-inv-primary', this.props.data.invoice.style.primary_color);
        this.props.isPreviewLoaded();
    }

    render() {
        const { id, top_sections, items, sections, item_tax, item_label, attach, sign, date, due_date } = this.props.data.invoice;
        const { fromData, toData, status } = this.props.data;
        let title = this.props.data.title;
        const i18n = ndpv.i18n;
        return (
            <div className="pv-inv" style={{ height: this.props.height }}>
                <Seal status={status} />
                <div className="pv-inv-one">
                    <div className="pv-inv-body">
                        <div className="pv-inv-header">
                            <div className="pv-inv-from">
                                {fromData && fromData.logo &&
                                    <div className="pv-inv-from-logo">
                                        <img src={fromData.logo.src} alt="" />
                                    </div>}

                                <From data={fromData} />

                                <div className="pv-inv-from-date">
                                    <p>{title} No: <span>{id ? (title == 'Invoice' ? 'Inv' : 'Est') + id : ''}</span></p>

                                    <div className="pv-inv-from-time">
                                        <p>{i18n.date}<span> <Moment format="YYYY-MM-DD">{date}</Moment></span></p>
                                        <p>{i18n.due} {i18n.date}<span> <Moment format="YYYY-MM-DD">{due_date}</Moment></span></p>
                                    </div>
                                </div>
                            </div>

                            <div className="pv-inv-to">
                                <div className="pv-inv-title">
                                    <h2>{title}</h2>
                                </div>
                                <To data={toData} />
                            </div>
                        </div>
                        
                        {top_sections && <Section data={top_sections} top />} 
                        {items && <Items data={items} item_tax={item_tax} item_label={item_label} />}

                        <div className="pv-inv-account">
                            <Payment {...this.props} />
                            <Total {...this.props} />
                        </div>
                        {sections && <Section data={sections} />}
                        {sign && <Sign data={sign} />}
                    </div>
                </div>
            </div>
        );
    }
} 