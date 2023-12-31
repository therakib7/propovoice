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
import Style from '../scss/4.scoped.scss'

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
            <div className="pv-inv-four">
                <div className="pv-inv-top-shape">
                    <svg
                        viewBox="0 0 595 117"
                        fill="none"
                    >
                        <path d="M595 117V0H431.187C475.3 15.874 554.243 51.495 592.739 113.272A68.804 68.804 0 01595 117z" />
                        <path d="M478.8 33.838a562.361 562.361 0 00-15.522-6.309c-1.595-.614-3.214-1.249-4.857-1.863a284.849 284.849 0 00-3.785-1.434 419.59 419.59 0 00-5.523-2.049 5.944 5.944 0 01-.548-.204c-2.5-.922-5.023-1.823-7.57-2.725a879.463 879.463 0 00-26.497-8.93 230.619 230.619 0 00-5.38-1.7c-1.262-.41-2.5-.8-3.762-1.189a556.549 556.549 0 00-7.166-2.191A1244.362 1244.362 0 00380.359 0H0v42.072S150.125 5.532 305.678 8.603c.285 0 .571.02.857.02 1.69.041 3.404.062 5.118.123 3.762.103 7.499.205 11.261.37 2.523.081 5.047.183 7.57.327 1.333.04 2.666.123 3.976.184 2.309.123 4.618.266 6.904.41 1.809.102 3.618.225 5.428.348 1.738.102 3.475.246 5.19.369 3.023.225 6.046.47 9.07.737 2.047.164 4.095.348 6.118.553 4.047.39 8.071.799 12.07 1.27 1.786.205 3.571.41 5.357.635.785.082 1.547.184 2.333.287 1.547.184 3.095.389 4.642.594a229.6 229.6 0 013.714.512c1.762.246 3.547.492 5.309.758 2.142.307 4.261.635 6.38.983 1.405.205 2.785.43 4.19.676 1.762.287 3.499.573 5.261.901 2.976.533 5.928 1.065 8.88 1.639a508.69 508.69 0 018.118 1.618c.214.041.452.102.667.143.285.062.595.123.881.185 1.404.307 2.785.594 4.166.921 2.095.451 4.19.922 6.261 1.434.143.02.262.041.405.082 1.309.308 2.595.615 3.904.943.214.04.405.102.619.163 2.381.574 4.761 1.188 7.118 1.803l.024.02c1.809.471 3.595.963 5.38 1.455 3.5.983 6.976 1.987 10.428 3.031 1.856.574 3.69 1.147 5.523 1.741z" />
                    </svg>
                </div>
                <div className="pv-inv-body">
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
                                    <p>{i18n.date}: <span>{date && <Moment format={ndpv.date_format}>{date}</Moment>}</span></p>
                                    <p>{i18n.due_date}: <span>{due_date && <Moment format={ndpv.date_format}>{due_date}</Moment>}</span></p>
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
                <div className="pv-inv-footer-shape">
                    <svg
                        viewBox="0 0 595 136"
                        fill="none"
                    >
                        <path d="M595 0v136H431.187C475.3 117.548 554.243 76.143 592.739 4.333A83.63 83.63 0 00595 0z" />
                        <path d="M478.8 96.667A520.456 520.456 0 01463.278 104c-1.595.714-3.214 1.452-4.857 2.167a259.519 259.519 0 01-3.785 1.666c-1.833.81-3.666 1.596-5.523 2.381a5.643 5.643 0 00-.548.238 557.224 557.224 0 01-7.57 3.167A798.138 798.138 0 01414.498 124c-1.786.69-3.571 1.333-5.38 1.976-1.262.476-2.5.929-3.762 1.381a510.738 510.738 0 01-7.166 2.548A1120.1 1120.1 0 01380.359 136H0V87.095S150.125 129.571 305.678 126c.285 0 .571-.024.857-.024 1.69-.047 3.404-.071 5.118-.143 3.762-.119 7.499-.238 11.261-.428 2.523-.096 5.047-.215 7.57-.381 1.333-.048 2.666-.143 3.976-.215 2.309-.142 4.618-.309 6.904-.476 1.809-.119 3.618-.262 5.428-.404 1.738-.12 3.475-.286 5.19-.429a592.47 592.47 0 009.07-.857c2.047-.191 4.095-.405 6.118-.643 4.047-.452 8.071-.929 12.07-1.476a409.98 409.98 0 005.357-.738c.785-.096 1.547-.215 2.333-.334 1.547-.214 3.095-.452 4.642-.69 1.238-.191 2.476-.381 3.714-.595 1.762-.286 3.547-.572 5.309-.881 2.142-.357 4.261-.738 6.38-1.143 1.405-.238 2.785-.5 4.19-.786 1.762-.333 3.499-.667 5.261-1.048a539.228 539.228 0 008.88-1.904 452.054 452.054 0 008.118-1.881c.214-.048.452-.119.667-.167.285-.071.595-.143.881-.214 1.404-.357 2.785-.691 4.166-1.072 2.095-.523 4.19-1.071 6.261-1.666.143-.024.262-.048.405-.096 1.309-.357 2.595-.714 3.904-1.095.214-.047.405-.119.619-.19a353.851 353.851 0 007.118-2.095l.024-.024a352.3 352.3 0 005.38-1.691c3.5-1.143 6.976-2.31 10.428-3.523 1.856-.667 3.69-1.334 5.523-2.024z" />
                    </svg>
                </div>
            </div>
        </div>
    )
} 