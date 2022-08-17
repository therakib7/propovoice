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
        document.documentElement.style.setProperty('--pi-inv-primary', this.props.data.invoice.style.primary_color);
        this.props.isPreviewLoaded();
    }

    render() {
        const { id, items, sections, item_tax, item_label, attach, sign, date, due_date } = this.props.data.invoice;
        const { fromData, toData, status } = this.props.data;
        let title = this.props.data.title;
        return (
            <div className="pi-inv" style={{ height: this.props.height }}>
                <Seal status={status} />
                <div className="pi-inv-one">
                    <div className="pi-inv-body">
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
                                <div className="pi-inv-title">
                                    <h2>{title}</h2>
                                </div>
                                <To data={toData} />
                            </div>
                        </div>

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
        );
    }
} 