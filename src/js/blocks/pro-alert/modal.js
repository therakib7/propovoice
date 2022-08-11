import { useRef, useCallback } from 'react';
import useClickOutside from 'block/outside-click';

const ProModal = () => {

    const myRef = useRef(); 
    const close = useCallback(() => {
        // hide()
    }, []);
    useClickOutside(myRef, close); 

    const hide = () => {
        document.getElementById('pi-pro-alert').style.display = 'none';
    };
    
    return (
        <div id="pi-pro-alert" className="pi-overlay" style={{display: 'none'}}>
            <div className="pi-modal-content pi-modal-style-two pi-modal-small" ref={myRef}> 
                <div className="pi-modal-header">
                    <span className="pi-close" onClick={() => hide()}>
                        <svg
                            width={25}
                            height={25}
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M12.5 3.5L3.5 12.5"
                                stroke="#718096"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M12.5 12.5L3.5 3.5"
                                stroke="#718096"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </span>
                    <h2 className="pi-modal-title">Pro Features</h2>
                </div>

                <div className="pi-content">
                    <div className="pi-form-style-one">
                        <div className="row">
                            <div className="col-md">
                                <p>This is pro features, You need to upgrade to pro to use this field</p> 
                                <a 
                                    href='https://propovoice.com/pricing'
                                    className='pi-btn pi-btn-medium pi-bg-blue pi-bg-hover-blue pi-bg-shadow pi-color-white'
                                    target='_blank'
                                    onClick={() => hide()}
                                >Upgrade to pro</a>
                            </div>
                        </div> 
                         
                    </div>
                </div>

                <div className="pi-modal-footer"> 
                </div>
            </div>
        </div>
    );
};

export default ProModal;
