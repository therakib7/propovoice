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
import Style from '../scss/3.scoped.scss'

export default (props) => {

    useEffect(() => {
        props.isPrvwLoad();
    }, []);

    const { id, top_sections, items, sections, item_tax, item_label, attach, sign, date, due_date } = props.data.invoice;
    const { fromData, toData, status } = props.data;
    let title = props.data.title;
    const i18n = ndpv.i18n;
    return (
        <div className="pv-inv" style={{ height: props.height }}>
            <Seal status={status} />
            <div className="pv-inv-three">
                <div className="pv-inv-body">
                    <div className="pv-inv-top-shape">
                        <div className="pv-inv-shape1">
                            <svg width="165" height="19" viewBox="0 0 165 19" fill="none" >
                                <path d="M0 0L8.30517e-07 19L142.676 19L165 -7.21238e-06L0 0Z" />
                            </svg>
                        </div>
                        <div className="pv-inv-shape2">
                            <svg width="19" height="165" viewBox="0 0 19 165" fill="none" >
                                <path d="M0 0H19V142.676L0 165V0Z" />
                            </svg>

                        </div>
                        <div className="pv-inv-shape3">
                            <svg width="33" height="33" viewBox="0 0 33 33" fill="none" >
                                <circle cx="16.5" cy="16.5" r="16.5" />
                            </svg>

                        </div>
                    </div>
                    <div className="pv-inv-title">
                        <h2>{title}</h2>
                    </div>
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
                            <To data={toData} />
                        </div>
                    </div>

                    {top_sections && <Section data={top_sections} top />}
                    {items && <Items data={items} item_tax={item_tax} item_label={item_label} />}

                    <div className="pv-inv-account">
                        <Payment {...props} />
                        <Total {...props} />
                    </div>
                    {sections && <Section data={sections} />}
                    {sign && <Sign data={sign} />}
                </div>
                <div className="pv-inv-top-shape pv-inv-footer-shape">
                    <div className="pv-inv-shape1">
                        <svg width="165" height="19" viewBox="0 0 165 19" fill="none" >
                            <path d="M0 0L8.30517e-07 19L142.676 19L165 -7.21238e-06L0 0Z" />
                        </svg>
                    </div>
                    <div className="pv-inv-shape2">
                        <svg width="19" height="165" viewBox="0 0 19 165" fill="none" >
                            <path d="M0 0H19V142.676L0 165V0Z" />
                        </svg>

                    </div>
                    <div className="pv-inv-shape3">
                        <svg width="33" height="33" viewBox="0 0 33 33" fill="none" >
                            <circle cx="16.5" cy="16.5" r="16.5" />
                        </svg>

                    </div>
                </div>
            </div>
        </div>
    )
} 