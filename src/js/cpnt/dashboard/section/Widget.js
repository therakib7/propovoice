
import { lazy, useState, Suspense } from "react"

const RequestForm = lazy(() => import('./Request'));

export default ({ title, desc, btnTxt, btnUrl, contact, bgColor, children }) => {
    const [request, setRequest] = useState(false);

    return (
        <div className="pi-widget">
            {request && <Suspense fallback={<Spinner />}>
                <RequestForm />
            </Suspense>}

            <span className="widget-icon" style={{ background: '#' + bgColor }}>
                {children}
            </span>
            <h3
                className="pi-title-medium pi-mb-20"
                style={{ fontWeight: 700, fontSize: 20 }}
            >
                {title}
            </h3>
            <p className="pi-mb-30" style={{ color: "#718096" }}>
                {desc}
            </p>
            <a className="pi-btn pi-bg-blue pi-bg-hover-blue" href={btnUrl}>{btnTxt}</a>
            {contact && <a
                href="https://nurency.com/contact"
                className="pi-btn pi-bg-stroke pi-border-gray pi-bg-hover-stroke"
                style={{ color: "#4C6FFF", marginTop: 5 }}
            >
                Contact With Us
            </a>}
        </div>
    );
} 