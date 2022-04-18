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
import Seal from '../Seal';

//style
import Style from '../scss/3.scoped.scss'

export default class Three extends Component {
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
        const { fromData, toData, status } = this.props.data;
        let title = this.props.data.title;
        return (
            <div className="pi-inv ">
                <Seal status={status} />
                <div className="pi-inv-three">
                    <div className="pi-body">
                        <div className="pi-top-shape">
                            <div className="pi-shape1">
                                <svg width="165" height="19" viewBox="0 0 165 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0 0L8.30517e-07 19L142.676 19L165 -7.21238e-06L0 0Z" />
                                </svg>
                            </div>
                            <div className="pi-shape2">
                                <svg width="19" height="165" viewBox="0 0 19 165" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0 0H19V142.676L0 165V0Z" />
                                </svg>

                            </div>
                            <div className="pi-shape3">
                                <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="16.5" cy="16.5" r="16.5" />
                                </svg>

                            </div>
                        </div>
                        <div className="pi-inv-title">
                            <h2>{title}</h2>
                        </div>
                        <div className="pi-hedear">
                            <div className="pi-from">
                                {fromData && fromData.logo &&
                                    <div className="pi-from-logo">
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
                        <div className="pi-shape1">
                            <svg width="165" height="19" viewBox="0 0 165 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 0L8.30517e-07 19L142.676 19L165 -7.21238e-06L0 0Z" />
                            </svg>
                        </div>
                        <div className="pi-shape2">
                            <svg width="19" height="165" viewBox="0 0 19 165" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 0H19V142.676L0 165V0Z" />
                            </svg>

                        </div>
                        <div className="pi-shape3">
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