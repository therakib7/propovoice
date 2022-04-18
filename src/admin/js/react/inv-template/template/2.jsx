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
import Style from '../scss/2.scoped.scss'

export default class Two extends Component {
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
            <div className="pi-inv">
                <Seal status={status} />
                {/* <style>
                    :root {
                        --pi-inv-primary: this.props.data.invoice.style.primary_color;
                    }
                </style> */}
                <div className="pi-inv-two">
                    <div className="pi-top-shape">
                        <svg viewBox="0 0 595 69" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M595 29.2L575.167 22.6C555.333 16 515.667 2.80004 476 7.21378C436.333 11.4625 396.667 33.7375 357 33.6138C317.333 33.7375 277.667 10.0762 238 -3C219.166 -9.32618 198.87 -10.7301 178.5 -10.5162C155.968 -10.2796 133.347 -7.36757 112.514 -0.499996C72.8471 12.8237 39.6666 37.8625 19.8333 53.4137L0 68.8L6.01468e-06 1.38921e-06L19.8333 3.12309e-06C39.6667 4.85698e-06 72.8471 -0.5 112.514 -0.499996C152.18 -0.499993 198.333 -3 238 -3C277.667 -3 308.614 -1.61374 348.28 -1.61374C387.947 -1.61373 427.614 -1.61373 467.28 -1.61373C506.947 -1.61372 555.333 -1.61374 575.167 -1.61374L595 -1.61372L595 29.2Z" />
                        </svg>
                    </div>
                    <div className="pi-body">
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

                            {sign && <Sign data={sign} />}
                        </div>
                    </div>
                    <div className="pi-footer-shape">
                        <svg viewBox="0 0 595 93" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 39.6L19.8333 46.2C39.6667 52.8 79.3333 66 119 61.5862C158.667 57.3375 198.333 35.0625 238 35.1862C277.667 35.0625 317.333 57.3375 357 70.4137C396.667 83.7375 436.333 87.8625 476 74.7862C515.667 61.4625 555.333 30.9375 575.167 15.3862L595 0V118.8H575.167C555.333 118.8 515.667 118.8 476 118.8C436.333 118.8 396.667 118.8 357 118.8C317.333 118.8 277.667 118.8 238 118.8C198.333 118.8 158.667 118.8 119 118.8C79.3333 118.8 39.6667 118.8 19.8333 118.8H0L0 39.6Z" />
                        </svg>
                    </div>
                </div>
            </div>
        );
    }
} 