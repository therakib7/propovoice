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
import Style from '../scss/8.scoped.scss'

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
            <div className="pv-inv-eight">
                <div className="pv-inv-body">
                    <div className="pv-inv-title">
                        <h2>{title}</h2>
                    </div>
                    <div className="pv-inv-header">
                        <div className="pv-inv-head">
                            <div className="pv-inv-from-logo">
                                {fromData && fromData.logo &&
                                    <img src={fromData.logo.src} alt="" />
                                }
                            </div>
                            <div className="pv-inv-from">
                                <From data={fromData} />
                            </div>
                        </div>
                        <div className="pv-inv-shapes" />
                        <div className="pv-inv-address">
                            <div className="pv-inv-to">
                                <To data={toData} />
                            </div>
                            <div className="pv-inv-from-date">
                                <p>{title} No: <span>{id ? (title == 'Invoice' ? 'Inv' : 'Est') + id : ''}</span></p>
                                <p>{i18n.date}<span> <Moment format="YYYY-MM-DD">{date}</Moment></span></p>
                                <p>{i18n.due} {i18n.date}<span> <Moment format="YYYY-MM-DD">{due_date}</Moment></span></p>
                            </div>
                        </div>
                    </div>
                    <div className="pv-inv-item-wrap">
                        {top_sections && <Section data={top_sections} top />}
                        {items && <Items data={items} item_tax={item_tax} item_label={item_label} />}

                        <div className="pv-inv-account">
                            <Payment {...props} />
                            <Total {...props} />
                        </div>
                        {sections && <Section data={sections} />}
                        {sign && <Sign data={sign} />}
                    </div>
                </div>
            </div>

        </div>
    )
} 