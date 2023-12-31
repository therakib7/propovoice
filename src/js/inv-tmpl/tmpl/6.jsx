import { useEffect } from "react";
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
            <div className="pv-inv-six">
                <div className="pv-inv-body">
                    <div className="pv-inv-header">
                        <div className="pv-inv-head">
                            <div className="pv-inv-from-logo">
                                {fromData && fromData.logo &&
                                    <img src={fromData.logo.src} alt="" />
                                }
                            </div>
                            <div className="pv-inv-from-date">
                                <div className="pv-inv-title">
                                    <h2>{title}</h2>
                                </div>

                                <p>{titleNo}: <span>{id ? nNum : ''}</span></p>
                                <p>{i18n.date}: <span>{date && <Moment format={ndpv.date_format}>{date}</Moment>}</span></p>
                                <p>{i18n.due_date}: <span>{due_date && <Moment format={ndpv.date_format}>{due_date}</Moment>}</span></p>
                            </div>
                        </div>
                        <div className="pv-inv-shapes">
                            <div className="pv-inv-shape2">
                                <svg
                                    viewBox="0 0 209 7"
                                    fill="none"
                                >
                                    <path d="M0 0H209L203.5 7H0V0Z" fill="#2D3748" />
                                </svg>
                            </div>
                            <div className="pv-inv-shape1" />
                        </div>
                        <div className="pv-inv-address">
                            <div className="pv-inv-from">
                                <From data={fromData} />
                            </div>
                            <div className="pv-inv-to">
                                <To data={toData} />
                            </div>
                        </div>
                    </div>
                    <div className="pv-inv-item-wrap">
                        {top_sections && <Section data={top_sections} top />}
                        {items && <Items {...props} items={items} item_tax={item_tax} item_label={item_label} />}

                        <div className="pv-inv-account">
                            <Payment {...props} />
                            <Total inv={props.data.invoice} />
                        </div>
                        {sections && <Section data={sections} />}
                        {sign && <Sign data={sign} />}
                    </div>
                </div>
            </div>
        </div>
    )
} 