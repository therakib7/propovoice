import { useEffect, useState } from 'react';

export default (props) => {
    const [templates, setTemplates] = useState([
        {
            id: 1,
            est_src: "https://i.imgur.com/hVetkjH.jpg",
            inv_src: "https://i.imgur.com/hVetkjH.jpg",
        },
        {
            id: 2,
            est_src: "https://i.imgur.com/9VBRMK4.jpg",
            inv_src: "https://i.imgur.com/9VBRMK4.jpg",
        },
        {
            id: 3,
            est_src: "https://i.imgur.com/O9h6AJc.jpg",
            inv_src: "https://i.imgur.com/O9h6AJc.jpg",
        },
        {
            id: 4,
            est_src: "https://i.imgur.com/bHNRyId.jpg",
            inv_src: "https://i.imgur.com/bHNRyId.jpg",
        }
    ]);

    useEffect(() => {
        if (!props.currentTemplate) {
            props.changeHandler(templates[0]);
        }
    }, []);

    const selectEntry = (data) => {
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
                                    <a className="pv-btn pv-btn-medium pv-bg-blue pv-bg-hover-blue" onClick={() => selectEntry(row)}>{i18n.select}</a>
                                    <a
                                        href={'https://appux.co/ncpi/preview/inv' + row.id + '.html'}
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