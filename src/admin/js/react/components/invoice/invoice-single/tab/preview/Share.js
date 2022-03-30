import React, { Component } from 'react'; 

import Api from 'api/email';

class Share extends Component {
    constructor(props) {
        super(props); 
 
    } 

    render() {
        return (
            <>
                {this.props.show && (
                    <>  
                        <div className="pi-overlay pi-show">
                            <div className="pi-popup-content">
                                <div className="pi-modal-header">
                                    <h2 className="pi-modal-title pi-text-center">Share</h2>
                                    <span className="pi-close" onClick={() => this.props.close()}>×</span>
                                </div>

                                <div className="pi-content">
                                    <a href="skype:?chat">Skype</a>
                                </div>
                            </div> 
                        </div>
                    </>
                )
                }
            </>
        );
    }
}

export default Share;
