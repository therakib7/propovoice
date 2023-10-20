import { useEffect, useState } from 'react';

import ProLabel from 'block/pro-alert/label';
import pro from 'block/pro-alert';

export default (props) => {
    const [templates, setTemplates] = useState([
        {
            id: 1,
            est_src: "estimate-1.png",
            inv_src: "invoice-1.png",
        },
        {
            id: 2,
            est_src: "estimate-2.png",
            inv_src: "invoice-2.png",
        },
        {
            id: 3,
            est_src: "estimate-3.png",
            inv_src: "invoice-3.png",
        },
        {
            id: 4,
            est_src: "estimate-4.png",
            inv_src: "invoice-4.png",
        },
        {
            id: 5,
            est_src: "estimate-5.png",
            inv_src: "invoice-5.png",
        },
        {
            id: 6,
            est_src: "estimate-6.png",
            inv_src: "invoice-6.png",
        },
        {
            id: 7,
            est_src: "estimate-7.png",
            inv_src: "invoice-7.png",
        },
        {
            id: 8,
            est_src: "estimate-8.png",
            inv_src: "invoice-8.png",
        }
    ]);

    useEffect(() => {
        if (!props.currentTemplate) {
            props.changeHandler(templates[0]);
        }
    }, []);

    const selectEntry = (data) => {
        if (wage.length > 0 && (data.pro)) {
            pro();
            return;
        }
        props.changeHandler(data, true);
    }

    const i18n = ndpv.i18n;

    const assetPath = ndpv.assetImgUri + 'tmpl/';
    return (
        <div id="pv-tab-template" className="pv-invoice-tab-content">
            <h2 className='pv-page-title'>{i18n.select} {i18n.tmpl}</h2>
            <div className="row pv-gap pv-margin-l-r">
                {templates.map((row, index) => {
                    return (
                        <div className="col-12 col-md-6 col-lg-3" key={index}>
                            <div className='pv-single-image-content'>
                                <img src={props.path == 'invoice' ? assetPath + row.inv_src : assetPath + row.est_src} className={'pv-single-image ' + (props.currentTemplate == row.id ? 'pv-active' : '')} />
                                {(props.currentTemplate != row.id) && <div className="pv-overflow-content">
                                    <a className="pv-btn pv-btn-medium pv-bg-blue pv-bg-hover-blue" onClick={() => selectEntry(row)}>{i18n.select} {row.pro && <ProLabel blueBtn />}</a>
                                    <a
                                        href={'https://propovoice.com/template/preview/inv' + row.id + '.html'}
                                        target="_blank"
                                        className="pv-btn pv-btn-medium pv-bg-stroke pv-bg-hover-stroke pv-bg-shadow"
                                    >{i18n.full_prv}</a>
                                </div>}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
} 