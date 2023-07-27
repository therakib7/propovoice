
import { lazy, useState, Suspense } from "react"

// const RequestForm = lazy(() => import('./Request'));

export default ({ title, desc, btnTxt, btnUrl, contact, bgColor, children }) => {
    const [request, setRequest] = useState(false);

    return (
        <div className="pv-widget">
            {/* {request && <Suspense fallback={<Spinner />}>
                <RequestForm />
            </Suspense>} */}

            <span className="widget-icon" style={{ background: '#' + bgColor }}>
                {children}
            </span>
            <h3
                className="pv-title-medium pv-mb-20"
                style={{ fontWeight: 700, fontSize: 20 }}
            >
                {title}
            </h3>
            <p className="pv-mb-30" style={{ color: "#718096" }}>
                {desc}
            </p>
            <a className="pv-btn pv-bg-blue pv-bg-hover-blue pv-color-white" target='_blank' href={btnUrl}>{btnTxt}</a>
            {contact && <a
                target='_blank'
                href="https://propovoice.com/submit-a-ticket"
                className="pv-btn pv-bg-stroke pv-border-gray pv-bg-hover-stroke"
                style={{ color: "#4C6FFF", marginTop: 5 }}
            >
                {ndpv.i18n.conDesc}
            </a>}
        </div>
    );
} 