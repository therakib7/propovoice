import React, { useState } from "react";
import { Svg } from 'block/icon';

export default function Modal({ title, children }) {

    // const isVisible = visible ?? false;
    const [showModal, setShowModal] = useState(true);

    return <>
        {showModal && <div className="pv-overlay pv-show">
            <div className="pv-modal-content">
                {/* header */}
                <div className="pv-modal-header" >
                    <h2 className="pv-modal-title pv-text-center">{title ?? 'Modal title'}</h2>
                    <span className="pv-close" onClick={() => setShowModal(false)}>
                        <Svg name="x" style="blue" />
                    </span>
                </div >
                <div className="pv-content" style={{ paddingBottom: "30px", textAlign: "left" }}>

                    <div>
                        {children}
                    </div>

                </div>
                <div style={{ padding: "0 50px 30px" }}></div>
            </div>
        </div>
        }
    </>
}