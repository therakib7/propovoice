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
import Style from '../scss/4.scoped.scss'

export default class Four extends Component {
    constructor(props) {
        super(props);

        this.state = {
            old_value: ''
        }
    }

    componentDidMount() {
        document.documentElement.style.setProperty('--pi-inv-primary', this.props.data.invoice.style.primary_color);

        this.props.isPreviewLoaded();
    }

    componentDidUpdate() {
        let value = JSON.stringify(this.props.data.invoice);
        if (value != this.state.old_value) {
            this.setState({ old_value: value });
            this.props.isPreviewLoaded();
        }
    }

    render() {
        const { id, items, note, group, attach, sign, date, due_date } = this.props.data.invoice;
        const { fromData, toData } = this.props.data;
        let title = this.props.data.invoice.path == 'invoice' ? 'Invoice' : 'Estimate';
        return (
            <div className="pi-inv ">
                <div className="pi-inv-four">
                    <div className="pi-body">
                        <div className="pi-hedear">
                            <div className="pi-from">
                                {fromData && fromData.logo &&
                                <div className="pi-from-logo pi-bg-one">
                                    <img src={fromData.logo.src} alt="" />
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
                                <div className="pi-inv-title">
                                    <h2>{title}</h2>
                                </div>
                                <div className="pi-to-bg pi-bg-4th">
                                    <To data={toData} />
                                </div>
                            </div>
                        </div>

                        <div className="pi-items-table">
                            <table>
                                <thead>
                                    <tr>
                                        <th className="pi-bg-one">SL</th>
                                        <th className="pi-bg-one">Item Description</th>
                                        <th className="pi-bg-4th">Unit</th>
                                        <th className="pi-bg-two">Rate</th>
                                        <th className="pi-bg-4th">Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>01.</td>
                                        <td>
                                            Saas Landing page design <br />
                                            <span>Designed a saas landing page for a local client</span>
                                        </td>
                                        <td>5 pages</td>
                                        <td>
                                            10$ <br />
                                            <span> (Fixed price)</span>
                                        </td>
                                        <td>10$</td>
                                    </tr>
                                    <tr>
                                        <td>02.</td>
                                        <td>
                                            Saas Landing page design <br />
                                            <span>
                                                Designed a saas landing page for a local <br /> client for his
                                                business
                                            </span>
                                        </td>
                                        <td>5 pages</td>
                                        <td>
                                            10$ <br />
                                            <span> (Fixed price)</span>
                                        </td>
                                        <td>10$</td>
                                    </tr>
                                    <tr>
                                        <td>03.</td>
                                        <td>
                                            Saas Landing page design <br />
                                            <span>Designed a saas landing page for a local client</span>
                                        </td>
                                        <td>5 pages</td>
                                        <td>
                                            10$ <br />
                                            <span> (Fixed price)</span>
                                        </td>
                                        <td>10$</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

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
                    <div className="pi-footer-shape">
                        <div className="pi-shape1 pi-bg-one" />
                        <div className="pi-shape2 pi-bg-one" />
                        <div className="pi-shape3 pi-bg-one" />
                    </div>
                </div>
            </div>
        );
    }
} 