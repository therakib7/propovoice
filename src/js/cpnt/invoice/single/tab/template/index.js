import { useEffect, useState } from 'react';

import ProLabel from 'block/pro-alert/label';
import pro from 'block/pro-alert';

export default (props) => {
    const [templates, setTemplates] = useState([
        {
            id: 1,
            est_src: "https://i.imgur.com/3F9QVs5.png",
            inv_src: "https://i.imgur.com/qcNMVlu.png",
        },
        {
            id: 2,
            est_src: "https://i.imgur.com/W7QDHol.png",
            inv_src: "https://i.imgur.com/9HjqPbG.png",
        },
        {
            id: 3,
            est_src: "https://i.imgur.com/x4XkIol.png",
            inv_src: "https://i.imgur.com/BtYY1Rm.png",
        },
        {
            id: 4,
            est_src: "https://i.imgur.com/qNU51PK.png",
            inv_src: "https://i.imgur.com/vQFsDNR.png",
        },
        {
            id: 5,
            pro: true,
            est_src: "https://i.imgur.com/ra60QyF.png",
            inv_src: "https://i.imgur.com/8I6gNrg.png",
        },
        {
            id: 6,
            pro: true,
            est_src: "https://i.imgur.com/mfesVzN.png",
            inv_src: "https://i.imgur.com/OFq1zs8.png",
        },
        {
            id: 7,
            pro: true,
            est_src: "https://i.imgur.com/YpIokrt.png",
            inv_src: "https://i.imgur.com/rdJ59VG.png",
        },
        {
            id: 8,
            pro: true,
            est_src: "https://i.imgur.com/AreTVLr.png",
            inv_src: "https://i.imgur.com/fN2h2jD.png",
        },
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
    return (
        <div id="pv-tab-template" className="pv-invoice-tab-content">
            <h2 className='pv-page-title'>{i18n.select} {i18n.tmpl}</h2>
            <div className="row pv-gap pv-margin-l-r">
                {templates.map((row, index) => {
                    return (
                        <div className="col-12 col-md-6 col-lg-3" key={index}>
                            <div className='pv-single-image-content'>
                                <img src={props.path == 'invoice' ? row.inv_src : row.est_src} className={'pv-single-image ' + (props.currentTemplate == row.id ? 'pv-active' : '')} />
                                {(props.currentTemplate != row.id) && <div className="pv-overflow-content">
                                    <a className="pv-btn pv-btn-medium pv-bg-blue pv-bg-hover-blue" onClick={() => selectEntry(row)}>{i18n.select} {row.pro && <ProLabel blueBtn />}</a>
                                    <a
                                        href={'https://propovoice.com/template/preview/inv' + row.id + '.html'}
                                        target="_blank"
                                        className="pv-btn pv-btn-medium pv-bg-stroke pv-bg-hover-stroke pv-bg-shadow"
                                    >{i18n.full} {i18n.prv}</a>
                                </div>}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
} 