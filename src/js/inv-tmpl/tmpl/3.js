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

    const { id, num, path, top_sections, items, sections, item_tax, item_label, attach, sign, date, due_date } = props.data.invoice;
    const { fromData, toData, status } = props.data;
    const i18n = ndpv.i18n;
    let title = (path == 'invoice') ? i18n.inv : i18n.est;
    let titleNo = (path == 'invoice') ? i18n.invNo : i18n.estNo;
    const nNum = num ? num : props.data.prefix + id;
    return (
        <div className="pv-inv" style={{ height: props.height }}>
            <Seal status={status} invoice={props.data.invoice} />
            <div className="pv-inv-three">
                <div className="pv-inv-body">
                    <div className="pv-inv-top-shape">
                        <svg
                            width={182}
                            height={183}
                            viewBox="0 0 182 183"
                            fill="none"
                        >
                            <path d="M0 13H19V160L0 183V13Z" fill="#E2E8F0" />
                            <path d="M0 0H19V142.676L0 165V0Z" />
                            <path d="M12 0L12 19L159 19L182 -7.43094e-06L12 0Z" fill="#E2E8F0" />
                            <path d="M0 0L8.30517e-07 19L142.676 19L165 -7.21238e-06L0 0Z" />
                            <circle cx="16.5" cy="16.5" r="16.5" />
                        </svg>

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
                                <p>{titleNo}: <span>{id ? nNum : ''}</span></p>
                                <div className="pv-inv-from-time">
                                    <p>{i18n.date}: <span><Moment format={ndpv.date_format}>{date}</Moment></span></p>
                                    <p>{i18n.dueDate}: <span><Moment format={ndpv.date_format}>{due_date}</Moment></span></p>
                                </div>
                            </div>
                        </div>
                        <div className="pv-inv-to">
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
                <div className="pv-inv-top-shape pv-inv-footer-shape">
                    <svg
                        width={182}
                        height={183}
                        viewBox="0 0 182 183"
                        fill="none"
                    >
                        <path d="M0 13H19V160L0 183V13Z" fill="#E2E8F0" />
                        <path d="M0 0H19V142.676L0 165V0Z" />
                        <path d="M12 0L12 19L159 19L182 -7.43094e-06L12 0Z" fill="#E2E8F0" />
                        <path d="M0 0L8.30517e-07 19L142.676 19L165 -7.21238e-06L0 0Z" />
                        <circle cx="16.5" cy="16.5" r="16.5" />
                    </svg>
                </div>
            </div>
        </div>
    )
} 