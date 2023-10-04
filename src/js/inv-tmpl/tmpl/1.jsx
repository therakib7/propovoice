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
import Style from '../scss/1.scoped.scss'

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
            <div className="pv-inv-one">
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
            </div>
        </div >
    )
} 