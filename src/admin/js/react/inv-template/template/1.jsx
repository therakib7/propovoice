import React, { Component } from 'react';
import Moment from 'react-moment';

import From from '../From';
import To from '../To';
import Payment from '../Payment';
import Total from '../Total';
import Items from '../Items'
import Note from '../Note'
import Group from '../Group';
import Attach from '../Attach';
import Sign from '../Sign';

//style
import Style from '../scss/1.scoped.scss'

export default class One extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { id, items, note, group, attach, sign, date, due_date } = this.props.data.invoice;
        const { fromData, toData } = this.props.data;
        return (
            <div className="pi-inv">
                <div className="pi-inv-one">
                    <div className="pi-body">
                        <div className="pi-hedear">
                            <div className="pi-from">

                                <div className="pi-from-logo">
                                    <img src="assets/img/inv/fromlogo.png" alt="" />
                                </div>
                                <From data={fromData} />
                                <div className="pi-from-date">
                                    <p>
                                        Invoice No: <span>{id}</span>
                                    </p>

                                    <div className="pi-from-time">
                                        {/* TODO: use moment js */}
                                        <p>Date:<span> <Moment format="YYYY-MM-DD">{date}</Moment></span></p>
                                        <p>Due Date:<span> <Moment format="YYYY-MM-DD">{due_date}</Moment></span></p>
                                    </div>
                                </div>
                            </div>
                            <div className="pi-to">
                                <div className="pi-inv-title">
                                    <h2>invoice</h2>
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
                                {group && <Group data={group} />}
                            </div>
                            <div className="pi-sign">
                                <img src="assets/img/inv/sign.png" alt="" />
                                <div className="pi-border" />
                                <h4>Signature</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
} 