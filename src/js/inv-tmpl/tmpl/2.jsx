import { useEffect } from "react";
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
import Style from '../scss/2.scoped.scss'

export default (props) => {

    useEffect(() => {
        props.isPrvwLoad();
    }, []);

    const { id, num, path, top_sections, items, sections, item_tax, item_label, attach, sign, date, due_date } = props.data.invoice;
    const { fromData, toData, status } = props.data;
    const i18n = ndpv.i18n;
    let title = (path == 'invoice') ? i18n.inv : i18n.est;
    let titleNo = (path == 'invoice') ? i18n.invNo : i18n.estNo;
    const nNum = num ? num : props.data.prefix + id;
    return (
        <div className="pv-inv" style={{ height: props.height }}>
            <Seal status={status} invoice={props.data.invoice} />
            <div className="pv-inv-two">
                <div className="pv-inv-top-shape">
                    <svg viewBox="0 0 595 69" fill="none" >
                        <path d="M595 29.2L575.167 22.6C555.333 16 515.667 2.80004 476 7.21378C436.333 11.4625 396.667 33.7375 357 33.6138C317.333 33.7375 277.667 10.0762 238 -3C219.166 -9.32618 198.87 -10.7301 178.5 -10.5162C155.968 -10.2796 133.347 -7.36757 112.514 -0.499996C72.8471 12.8237 39.6666 37.8625 19.8333 53.4137L0 68.8L6.01468e-06 1.38921e-06L19.8333 3.12309e-06C39.6667 4.85698e-06 72.8471 -0.5 112.514 -0.499996C152.18 -0.499993 198.333 -3 238 -3C277.667 -3 308.614 -1.61374 348.28 -1.61374C387.947 -1.61373 427.614 -1.61373 467.28 -1.61373C506.947 -1.61372 555.333 -1.61374 575.167 -1.61374L595 -1.61372L595 29.2Z" />
                    </svg>
                </div>
                <div className="pv-inv-body">
                    <div className="pv-inv-header">
                        <div className="pv-inv-from">
                            {fromData && fromData.logo &&
                                <div className="pv-inv-from-logo">
                                    <img src={fromData.logo.src} alt="" />
                                </div>}
                            <From data={fromData} />

                            <div className="pv-inv-from-date">
                                <p>{titleNo}: <span>{id ? nNum : ''}</span></p>
                                <div className="pv-inv-from-time">
                                    <p>{i18n.date}: <span>{date && <Moment format={ndpv.date_format}>{date}</Moment>}</span></p>
                                    <p>{i18n.due_date}: <span>{due_date && <Moment format={ndpv.date_format}>{due_date}</Moment>}</span></p>
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
                    {items && <Items {...props} items={items} item_tax={item_tax} item_label={item_label} />}
                    <div className="pv-inv-account">
                        <Payment {...props} />
                        <Total inv={props.data.invoice} />
                    </div>
                    {sections && <Section data={sections} />}
                    {sign && <Sign data={sign} />}
                </div>

                <div className="pv-inv-footer-shape">
                    <svg viewBox="0 0 595 93" fill="none" >
                        <path d="M0 39.6L19.8333 46.2C39.6667 52.8 79.3333 66 119 61.5862C158.667 57.3375 198.333 35.0625 238 35.1862C277.667 35.0625 317.333 57.3375 357 70.4137C396.667 83.7375 436.333 87.8625 476 74.7862C515.667 61.4625 555.333 30.9375 575.167 15.3862L595 0V118.8H575.167C555.333 118.8 515.667 118.8 476 118.8C436.333 118.8 396.667 118.8 357 118.8C317.333 118.8 277.667 118.8 238 118.8C198.333 118.8 158.667 118.8 119 118.8C79.3333 118.8 39.6667 118.8 19.8333 118.8H0L0 39.6Z" />
                    </svg>
                </div>
            </div>
        </div>
    )
} 