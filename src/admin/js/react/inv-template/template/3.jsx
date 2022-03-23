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
import Style from '../scss/3.scoped.scss'

export default class Three extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { id, items, note, group, attach, sign, date, due_date } = this.props.data.invoice;
        const { fromData, toData } = this.props.data;
        let title = this.props.data.invoice.path == 'invoice' ? 'Invoice' : 'Estimate';
        return (
            <div className="pi-inv ">
                <div className="pi-inv-three">
                    <div className="pi-body">
                        <div className="pi-top-shape">
                            <div className="pi-shape1" />
                            <div className="pi-shape2" />
                            <div className="pi-shape3" />
                        </div>
                        <div className="pi-inv-title">
                            <h2>invoice</h2>
                        </div>
                        <div className="pi-hedear">
                            <div className="pi-from">
                                {fromData && fromData.logo &&
                                <div className="pi-from-logo">
                                    <img src={fromData.logo.src}  alt="" />
                                </div>}
                                <From data={fromData} />
                                <div className="pi-from-date">
                                    <p>{title} No: <span>{id}</span></p>
                                    <div className="pi-from-time">
                                        <p>Date:<span> <Moment format="YYYY-MM-DD">{date}</Moment></span></p>
                                        <p>Due Date:<span> <Moment format="YYYY-MM-DD">{due_date}</Moment></span></p>
                                    </div>
                                </div>
                            </div>
                            <div className="pi-to">
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

                            {sign && <Sign data={sign} />}
                        </div>
                    </div>
                    <div className="pi-top-shape pi-footer-shape">
                        <div className="pi-shape1" />
                        <div className="pi-shape2" />
                        <div className="pi-shape3" />
                    </div>
                </div>
            </div> 
        );
    }
} 