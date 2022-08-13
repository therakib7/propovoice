import React, { Component } from 'react';

import { toast } from 'react-toastify';

class Share extends Component {
    constructor(props) {
        super(props);
        this.state = {
            client_url: '',
        }
        this.client_url = React.createRef();
    }

    componentDidMount() {
        let data = this.props.data;
        if (data.fromData == null || data.toData == null) {
            toast.error('First fill up necessary information, From content tab');
            return;
        }

        let invoice_id = this.props.data.invoice.id;
        let invoice_token = this.props.data.invoice.token;
        let url = this.props.path == 'invoice' ? ndpi.invoice_page_url : ndpi.estimate_page_url;

        //replace text with id and token
        let result = url.replace('invoice_id', invoice_id);
        let client_url = result.replace('invoice_token', invoice_token);

        this.setState({ client_url });
    }

    copyToClipboard = (e) => {
        this.client_url.select();
        document.execCommand('copy'); //TODO: Deprecated https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand
        // This is just personal preference.
        // I prefer to not show the whole text area selected. 
        e.target.focus();
        toast.success('Copied!');
    };

    render() {

        let path = this.props.path;
        let path_title = path == 'invoice' ? 'Invoice' : 'Estimate';

        return (
            <div className="pi-overlay pi-show">
                <div className="pi-modal-content pi-modal-style-three pi-modal-medium">

                    <div className="pi-modal-header">
                        <h2 className="pi-modal-title pi-text-center">Share {path_title}</h2>
                        <span className="pi-close" onClick={() => this.props.close()}>
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
                    </div>

                    <div className="pi-content">
                        <div className="pi-form-style-one">
                            <div className="row">
                                <div className="col-lg">
                                    <div className="pi-field-copy">
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={this.state.client_url}
                                            ref={(client_url) => this.client_url = client_url}
                                            readOnly
                                        />
                                        <span className="pi-copy" onClick={this.copyToClipboard}>Copy</span>
                                    </div>
                                </div>
                            </div>
                            <div className="pi-field-share">
                                <a href="https://web.whatsapp.com" target="_blank" className="pi-social-icon">
                                    <span className="pi-whatsapp" style={{ background: "#E9FBEF" }}>
                                        <svg
                                            width={40}
                                            height={40}
                                            viewBox="0 0 42 42"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M11.0516 36.2279L11.7338 36.577C14.5765 38.322 17.7601 39.1363 20.9439 39.1363C30.9498 39.1363 39.1365 30.7602 39.1365 20.5227C39.1365 15.6367 37.2034 10.8669 33.7924 7.37679C30.3813 3.88668 25.833 1.90906 20.9439 1.90906C10.938 1.90906 2.75117 10.2852 2.86494 20.6391C2.86494 24.129 3.88827 27.5029 5.59377 30.4111L6.04855 31.1093L4.22944 37.9731L11.0516 36.2279Z"
                                                fill="#00E676"
                                            />
                                            <path
                                                d="M35.9345 6.12972C32.0435 2.15683 26.6648 0 21.1716 0C9.49874 0 0.114514 9.42159 0.228864 20.8864C0.228864 24.5189 1.25883 28.0379 2.97555 31.2162L0 42L11.1008 39.1621C14.1907 40.865 17.6238 41.6596 21.0573 41.6596C32.6158 41.6596 42 32.2378 42 20.7732C42 15.2109 39.8256 9.98919 35.9347 6.12972H35.9345ZM21.1716 38.1407C18.0817 38.1407 14.9918 37.3462 12.3596 35.757L11.673 35.4164L5.03549 37.1191L6.75205 30.6489L6.29432 29.9677C1.25883 21.9084 3.66215 11.2378 11.9019 6.24314C20.1416 1.24863 30.7847 3.63246 35.8202 11.8054C40.8555 19.9784 38.4522 30.5352 30.2126 35.5299C27.5803 37.2325 24.376 38.1405 21.1716 38.1405V38.1407ZM31.2424 25.5408L29.9836 24.9732C29.9836 24.9732 28.1527 24.1786 27.0082 23.611C26.8937 23.611 26.7793 23.4974 26.6648 23.4974C26.3214 23.4974 26.0926 23.611 25.8637 23.7246C25.8637 23.7246 25.7494 23.838 24.1472 25.6542C24.0326 25.8813 23.8038 25.9948 23.5749 25.9948H23.4604C23.3461 25.9948 23.1172 25.8813 23.0027 25.7678L22.4304 25.5408C21.1716 24.9732 20.0273 24.292 19.1117 23.384C18.8828 23.157 18.5394 22.93 18.3106 22.703C17.5095 21.9084 16.7084 21.0002 16.1363 19.9785L16.0218 19.7515C15.9074 19.6379 15.9074 19.5245 15.7929 19.2975C15.7929 19.0705 15.7929 18.8435 15.9074 18.7299C15.9074 18.7299 16.3651 18.1623 16.7084 17.8219C16.9374 17.5947 17.0517 17.2543 17.2806 17.0273C17.5095 16.6867 17.624 16.2327 17.5095 15.8921C17.3951 15.3245 16.0218 12.2596 15.6786 11.5786C15.4495 11.238 15.2208 11.1246 14.8774 11.011H13.6186C13.3896 11.011 13.1609 11.1246 12.9319 11.1246L12.8173 11.238C12.5885 11.3516 12.3596 11.5786 12.1308 11.692C11.9019 11.9192 11.7874 12.146 11.5585 12.3732C10.7574 13.3948 10.2997 14.6434 10.2997 15.8921C10.2997 16.8001 10.5285 17.7083 10.8719 18.5029L10.9864 18.8435C12.0164 21.0002 13.3896 22.93 15.2208 24.6326L15.6786 25.0866C16.0218 25.4272 16.3651 25.6542 16.594 25.9947C18.9973 28.0381 21.7438 29.5137 24.8338 30.3083C25.1771 30.4217 25.6349 30.4217 25.9782 30.5353H27.1226C27.6948 30.5353 28.3814 30.3083 28.8393 30.0813C29.1825 29.8543 29.4114 29.8543 29.6402 29.6273L29.8692 29.4001C30.0981 29.1731 30.327 29.0597 30.5558 28.8327C30.7847 28.6057 31.0136 28.3787 31.1281 28.1515C31.3569 27.6975 31.4713 27.1299 31.5858 26.5624V25.7678C31.5858 25.7678 31.4713 25.6542 31.2424 25.5408Z"
                                                fill="white"
                                            />
                                        </svg>
                                    </span>
                                    <p>Whatsapp</p>
                                </a>
                                <a href="https://messenger.com" target="_blank" className="pi-social-icon">
                                    <span
                                        className="pi-messenger"
                                        style={{ background: "rgba(0, 123, 255, 0.1)" }}
                                    >
                                        <svg
                                            width={35}
                                            height={40}
                                            viewBox="0 0 44 44"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M22 0C9.592 0 0 9.08634 0 21.3408C0 27.743 2.618 33.3092 6.908 37.1154C7.26 37.4014 7.48 37.8854 7.502 38.3694L7.612 42.2856C7.7 43.5396 8.954 44.3537 10.098 43.8476L14.454 41.9336C14.828 41.8016 15.246 41.7356 15.62 41.8016C17.6 42.3956 19.8 42.6816 22 42.6816C34.408 42.6816 44 33.5953 44 21.3408C44 9.08634 34.408 0 22 0ZM35.2 16.4126L28.754 26.687C27.72 28.2931 25.52 28.7111 23.98 27.501L18.832 23.6949C18.6035 23.5235 18.3256 23.4309 18.04 23.4309C17.7544 23.4309 17.4765 23.5235 17.248 23.6949L10.296 28.9751C9.372 29.7011 8.162 28.6011 8.8 27.589L15.246 17.3146C16.28 15.7086 18.48 15.2906 20.02 16.4346L25.168 20.3068C25.3965 20.4781 25.6744 20.5708 25.96 20.5708C26.2456 20.5708 26.5235 20.4781 26.752 20.3068L33.704 15.0266C34.628 14.3005 35.838 15.4006 35.2 16.4126Z"
                                                fill="#007BFF"
                                            />
                                        </svg>
                                    </span>
                                    <p>Messenger</p>
                                </a>
                                <a href="https://web.telegram.org/z/" target="_blank" className="pi-social-icon">
                                    <span
                                        className="pi-telegrame"
                                        style={{ background: "rgba(64, 179, 224, 0.08)" }}
                                    >
                                        <svg
                                            width={35}
                                            height={35}
                                            viewBox="0 0 41 36"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M40.0308 2.13324L33.7792 33.6521C33.7792 33.6521 32.905 35.838 30.5007 34.7888L16.0747 23.7288L10.8291 21.1935L1.99868 18.2207C1.99868 18.2207 0.643519 17.74 0.512269 16.6908C0.381019 15.6416 2.04243 15.0734 2.04243 15.0734L37.1452 1.30309C37.1452 1.30309 40.0305 0.0354299 40.0305 2.13379"
                                                fill="#40B3E0"
                                            />
                                            <path
                                                d="M14.9657 33.2976C14.9657 33.2976 14.5446 33.2582 14.0196 31.5968C13.4954 29.9357 10.8286 21.1928 10.8286 21.1928L32.0304 7.72875C32.0304 7.72875 33.2546 6.98555 33.2108 7.72875C33.2108 7.72875 33.4293 7.86 32.7733 8.47195C32.1179 9.08418 16.1183 23.4662 16.1183 23.4662"
                                                fill="#1F97C6"
                                            />
                                        </svg>
                                    </span>
                                    <p>Telegrame</p>
                                </a>
                                <a href="https://web.skype.com/" target="_blank" className="pi-social-icon">
                                    <span
                                        className="pi-skype"
                                        style={{ background: "rgba(0, 175, 240, 0.08)" }}
                                    >
                                        <svg
                                            width={35}
                                            height={35}
                                            viewBox="0 0 42 45"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M40.5134 24.5059C40.5001 24.5799 40.4908 24.6548 40.4768 24.7288L40.405 24.3046C40.4444 24.3707 40.4768 24.4393 40.5134 24.5059C40.7322 23.3172 40.8428 22.1111 40.844 20.9023C40.844 18.2187 40.3198 15.615 39.2843 13.1641C38.2851 10.7965 36.8558 8.67024 35.0334 6.84475C33.2136 5.01926 31.091 3.58634 28.7305 2.58495C26.2861 1.54821 23.6888 1.02277 21.0116 1.02277C19.75 1.02277 18.4861 1.1415 17.2563 1.37816C17.2536 1.37882 17.2504 1.37882 17.2469 1.37948C17.3161 1.41615 17.386 1.44888 17.4538 1.48687L17.0367 1.42141C17.1066 1.40826 17.1772 1.39345 17.2469 1.37948C15.5597 0.480218 13.6618 0 11.741 0C8.60508 0 5.65638 1.22406 3.43875 3.4477C1.22177 5.67068 0 8.62633 0 11.7699C0.00106457 13.7668 0.509448 15.7306 1.47722 17.476C1.48985 17.404 1.49855 17.3313 1.51249 17.2592L1.58435 17.676C1.54711 17.6107 1.51446 17.5426 1.47722 17.476C1.27983 18.6074 1.17993 19.7537 1.17862 20.9023C1.17862 23.5866 1.7028 26.1896 2.73837 28.6412C3.73603 31.0094 5.16616 33.1342 6.9866 34.9597C8.80901 36.7854 10.9289 38.2203 13.292 39.219C15.7365 40.2577 18.3345 40.7838 21.0116 40.7838C22.177 40.7838 23.3449 40.6771 24.4849 40.4745C24.4184 40.4372 24.3506 40.4031 24.2827 40.3638L24.7065 40.4385C24.6333 40.4524 24.5593 40.4612 24.4849 40.4745C26.2466 41.474 28.2366 41.9996 30.261 42C33.3964 42 36.3436 40.7777 38.5612 38.5536C40.7794 36.3319 42 33.3756 42 30.232C41.9989 28.2276 41.4872 26.2565 40.5134 24.5059ZM21.0907 33.0776C14.0451 33.0776 10.8929 29.6053 10.8929 27.0031C10.8929 25.6681 11.876 24.7327 13.2308 24.7327C16.246 24.7327 15.465 29.0726 21.0907 29.0726C23.9708 29.0726 25.5611 27.505 25.5611 25.9009C25.5611 24.9361 25.0863 23.8665 23.1899 23.3978L16.923 21.8297C11.876 20.5609 10.96 17.826 10.96 15.255C10.96 9.91716 15.9738 7.91291 20.6824 7.91291C25.0197 7.91291 30.1327 10.3158 30.1327 13.5181C30.1327 14.8904 28.9474 15.6883 27.593 15.6883C25.0197 15.6883 25.4933 12.1179 20.31 12.1179C17.7378 12.1179 16.3131 13.2856 16.3131 14.9563C16.3131 16.6239 18.3445 17.1566 20.1083 17.5592L24.747 18.5913C29.828 19.7261 31.1164 22.6998 31.1164 25.5007C31.1164 29.8386 27.7946 33.0776 21.0907 33.0776ZM24.2827 40.3638C24.3506 40.4031 24.4184 40.4372 24.4849 40.4745C24.5593 40.4612 24.6333 40.4524 24.7065 40.4385L24.2827 40.3638ZM40.4768 24.7288C40.4908 24.6548 40.5001 24.5799 40.5134 24.5059C40.4768 24.4393 40.4444 24.3707 40.405 24.3046L40.4768 24.7288ZM1.51249 17.2592C1.49855 17.3313 1.48985 17.404 1.47722 17.476C1.51446 17.5426 1.54711 17.6107 1.58435 17.676L1.51249 17.2592ZM17.4538 1.48687C17.386 1.44888 17.3161 1.41615 17.2469 1.37948C17.1772 1.39345 17.1066 1.40826 17.0367 1.42141L17.4538 1.48687Z"
                                                fill="#00AFF0"
                                            />
                                        </svg>
                                    </span>
                                    <p>Skype</p>
                                </a>
                            </div>
                            {/* ./ pi-form-contnet */}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Share;
