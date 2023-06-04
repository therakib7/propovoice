import React, { Component } from 'react';

class Form extends Component {
    constructor(props) {
        super(props);

        this.initState = {
            id: null,
            tab_id: this.props.tab_id,
            text: '',
            receiver_type: null,
            attach_ids: [],
        };

        this.state = {
            form: this.initState
        };
    }

    handleChange = e => {
        const target = e.target;
        const name = target.name;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({ form: { ...this.state.form, [name]: value } });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const buttonClicked = e.nativeEvent.submitter;
        let form = { ...this.state.form }
        form.receiver_type = (buttonClicked.id === 'ndpv-client') ? 1 : 2;


        this.props.handleSubmit(form, 'new');
        this.setState({ form: this.initState });
    }

    render() {
        const { i18n, caps } = ndpv;
        const isClient = caps.includes("ndpv_client_role");
        return (
            <div className="pv-chat-history">
                <form onSubmit={this.handleSubmit} className="pv-textarea">
                    {/* <div className="pv-tab-buttons-group pv-text-right">

                        <div className="pv-activity-field">
                            <input
                                id="field-text"
                                type="text"
                                required
                                name="text"
                                value={this.state.form.text}
                                placeholder='Write your message'
                                onChange={this.handleChange}
                            />
                        </div>

                        <button className="pv-btn pv-btn-medium pv-bg-stroke pv-bg-hover-shadow pv-mr-10">
                            Send to team
                        </button>

                        <button className="pv-btn pv-btn-medium pv-bg-blue pv-bg-hover-blue pv-bg-shadow">
                            Reply to client
                        </button>
                    </div> */}
                    <textarea
                        id="field-text"
                        type="text"
                        required
                        name="text"
                        value={this.state.form.text}
                        placeholder='Write your message'
                        onChange={this.handleChange}
                        rows={4}
                    />
                    <div className="pv-button-content">
                        <span className="pv-paper-clip">
                            <svg
                                width={15}
                                height={16}
                                viewBox="0 0 15 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M10.5001 4.24894L3.99228 10.8661C3.77683 11.1039 3.66107 11.4154 3.66897 11.7362C3.67687 12.057 3.80782 12.3624 4.03471 12.5893C4.2616 12.8162 4.56705 12.9472 4.88783 12.9551C5.2086 12.963 5.52013 12.8472 5.75791 12.6318L13.5157 4.76457C13.9466 4.28901 14.1781 3.66595 14.1623 3.0244C14.1465 2.38286 13.8846 1.77195 13.4309 1.31817C12.9771 0.864391 12.3662 0.602491 11.7246 0.586696C11.0831 0.5709 10.46 0.802418 9.98447 1.23332L2.22666 9.10051C1.52425 9.80292 1.12964 10.7556 1.12964 11.7489C1.12964 12.7423 1.52425 13.695 2.22666 14.3974C2.92907 15.0998 3.88174 15.4944 4.8751 15.4944C5.86845 15.4944 6.82112 15.0998 7.52353 14.3974L13.9376 7.99894"
                                    stroke="#2D3748"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </span>
                        <div className="pv-button">
                            {!isClient && <button type='submit' id='ndpv-team' className="pv-btn pv-btn-medium pv-bg-stroke pv-bg-hover-shadow pv-mr-10">
                                Send to Team
                            </button>}
                            <button type='submit' id='ndpv-client' className="pv-btn pv-btn-medium pv-bg-blue pv-bg-hover-blue pv-color-white pv-bg-shadow">
                                {isClient ? 'Send' : 'Reply to Client'}
                            </button>
                        </div>
                    </div>

                </form>
            </div>
        );
    }
}

export default Form;
