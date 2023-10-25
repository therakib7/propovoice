import React from "react";
import { Svg } from 'block/icon';

/**
 * ==================================================================
 *
 * The code is defining a React functional component called "Modal". 
 * It takes in four props: "title",
 * "children", "setVisibility", and "visibility".
 * @param {string} title - title of the modal
 * @param {JSX.Element} children - child component for the modal
 * @param {Function} setVisiblity - state function for parent component
 * @param {boolean} visibility - state variable for parent component
 * 
 * @example for state which will pass through this component : 
 * const [visibility, setVisiblity] = useState(false)
 * 
 * @use : <Modal setVisibility={setVisibility} visibility={visibility}>Modal content</Modal>
 * ===================================================================
 */

export default function Modal({
    title,
    children,
    visibility,
    setVisibility
}) {

    return <>
        {visibility && <div className="pv-overlay pv-show">
            <div className="pv-modal-content">
                {/* header */}
                <div className="pv-modal-header" >
                    <h2 style={{textAlign:'left'}} className="pv-modal-title pv-text-center">
                        {title ?? 'Modal title'}
                    </h2>
                    <span className="pv-close" onClick={() => setVisibility(false)}>
                        <Svg name="x" style="blue" />
                    </span>
                </div >

                <div className="" style={{ paddingBottom: "30px", textAlign: "left" }}>

                    <div>
                        {children}
                    </div>

                </div>

            </div>
        </div>
        }
    </>
}