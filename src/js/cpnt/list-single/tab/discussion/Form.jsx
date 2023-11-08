import React, { Component } from 'react';

import Upload from 'block/field/upload';
import pro from "block/pro-alert";
import ProLabel from "block/pro-alert/label";

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

        if (wage.length > 0) {
            pro();
            return;
        }

        const buttonClicked = e.nativeEvent.submitter;
        let newForm = { ...this.state.form }

        if (newForm.attach_ids.length > 0) {
            newForm.attach_ids = newForm.attach_ids.map(item => item.id);
        }

        if (buttonClicked) {
            newForm.receiver_type = (buttonClicked.id === 'ndpv-client') ? 1 : 2;
        } else {
            newForm.receiver_type = 2;
        }

        this.props.handleSubmit(newForm, 'new');
        this.setState({
            form: {
                id: null,
                tab_id: this.props.tab_id,
                text: '',
                receiver_type: null,
                attach_ids: [],
            }
        });
    }

    handleAttachChange = (data, del = false) => {
        let form = { ...this.state.form }
        if (del) {
            const newArray = form.attach_ids.filter(item => item.id !== data);
            form.attach_ids = newArray;
        } else {
            form.attach_ids.push(data);
        }

        this.setState({ form })
    }

    render() {
        const { i18n, caps } = ndpv;
        const form = this.state.form;
        const attach_ids = form.attach_ids;
        const path = this.props.path;

        const isClient = caps.includes("ndpv_client_role");

        const taskMod = this.props.taskMod;

        return (
            <div className="pv-chat-history" style={{ padding: (taskMod ? 20 : 0) }}>
                <form onSubmit={this.handleSubmit} className="pv-textarea">

                    <textarea
                        id="field-text"
                        type="text"
                        required
                        name="text"
                        value={this.state.form.text}
                        placeholder={taskMod ? i18n.write_comment : i18n.write_msg}
                        onChange={this.handleChange}
                        onKeyPress={e => {
                            if (e.key === 'Enter') {
                                this.handleSubmit(e)
                            }
                        }}
                        rows={4}
                    />
                    <div className="pv-button-content">

                        <Upload key={attach_ids} data={attach_ids} changeHandler={this.handleAttachChange} multiple clipOnly />

                        <div className="pv-button">
                            {!isClient && path == 'project' && <button type='submit' id='ndpv-team' className="pv-btn pv-btn-medium pv-bg-stroke pv-bg-hover-shadow pv-mr-10">
                                {i18n.send_team}
                            </button>}

                            {path == 'project' && <button type='submit' id='ndpv-client' className="pv-btn pv-btn-medium pv-bg-blue pv-bg-hover-blue pv-color-white pv-bg-shadow">
                                {isClient ? i18n.send : i18n.reply_client}
                            </button>}

                            {!isClient && path != 'project' && <button type='submit' id='ndpv-team' className="pv-btn pv-btn-medium pv-bg-blue pv-bg-hover-blue pv-color-white pv-bg-shadow">
                                {taskMod ? i18n.comment : i18n.send} <ProLabel blueBtn />
                            </button>}
                        </div>
                    </div>

                </form>
            </div>
        );
    }
}

export default Form;
