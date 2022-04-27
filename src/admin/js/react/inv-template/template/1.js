import React, { Component } from 'react';
import Moment from 'react-moment';

import From from '../From';
import To from '../To';
import Payment from '../Payment';
import Total from '../Total';
import Items from '../Items'
import Note from '../Note'
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
        const { id, items, note, sections, attach, sign, date, due_date } = this.props.data.invoice;
        const { fromData, toData, status } = this.props.data;
        let title = this.props.data.title;
        return (
            <div className="pi-inv" style={{ height: this.props.height }}>
                <Seal status={status} />
                <div className="pi-inv-one">
                    <div className="pi-body">
                        <div className="pi-hedear">
                            <div className="pi-from">

                                {fromData && fromData.logo &&
                                    <div className="pi-from-logo">
                                        <img src={fromData.logo.src} alt="" />
                                    </div>}

                                <From data={fromData} />
                                <div className="pi-from-date">
                                    <p>{title} No: <span>{id ? (title == 'Invoice' ? 'Inv' : 'Est') + id : ''}</span></p>

                                    <div className="pi-from-time">
                                        <p>Date:<span> <Moment format="YYYY-MM-DD">{date}</Moment></span></p>
                                        <p>Due Date:<span> <Moment format="YYYY-MM-DD">{due_date}</Moment></span></p>
                                    </div>
                                </div>
                            </div>

                            <div className="pi-to">
                                <div className="pi-inv-title">
                                    <h2>{title}</h2>
                                </div>
                                <To data={toData} />
                            </div>
                        </div>

                        {items && <Items data={items} />}

                        <div className="pi-bank-info">
                            <Payment {...this.props} />
                            <Total {...this.props} />
                        </div>

                        <div className="pi-note-wrap">
                            <div className="pi-note-term">
                                {note && <Note data={note} />}
                                {sections && <Section data={sections} />}
                            </div>
                            {sign && <Sign data={sign} />}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
} 