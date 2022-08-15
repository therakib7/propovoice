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
import Style from '../scss/6.scoped.scss'

export default class six extends Component {
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
                <div className="pi-inv-six">
                    <div className="pi-inv-body">
                        <div className="pi-inv-header">
                            <div className="pi-inv-head">
                                <div className="pi-inv-from-logo">
                                    {fromData && fromData.logo &&
                                        <img src={fromData.logo.src} alt="" />
                                    }
                                </div>
                                <div className="pi-inv-from-date">
                                    <div className="pi-inv-title">
                                        <h2>{title}</h2>
                                    </div>
                                    <p>{title} No: <span>{id ? (title == 'Invoice' ? 'Inv' : 'Est') + id : ''}</span></p>
                                    <p>Date:<span> <Moment format="YYYY-MM-DD">{date}</Moment></span></p>
                                    <p>Due Date:<span> <Moment format="YYYY-MM-DD">{due_date}</Moment></span></p>
                                </div>
                            </div>
                            <div className="pi-inv-shapes">
                                <div className="pi-inv-shape2">
                                    <svg
                                        viewBox="0 0 209 7"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M0 0H209L203.5 7H0V0Z" fill="#2D3748" />
                                    </svg>
                                </div>
                                <div className="pi-inv-shape1" />
                            </div>
                            <div className="pi-inv-address">
                                <div className="pi-inv-from">
                                    <From data={fromData} />
                                </div>
                                <div className="pi-inv-to">
                                    <To data={toData} />
                                </div>
                            </div>
                        </div>
                        <div className="pi-inv-item-wrap">
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