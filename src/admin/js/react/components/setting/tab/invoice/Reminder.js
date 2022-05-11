import React, { Component } from 'react'; 

export default class Reminder extends Component {
    constructor(props) {
        super(props);

        this.initialState = { 
            subject: `{company_name} sent you a reminder of {module_name} #{id}`, 
            msg: `Hi <b>{client_name}</b>,
Please find attached {module} #{id}. Due Date was {due_date}.

{module} No: #{id}
{module} Date: {due}
Due Date: {due_date}
Due Amount: {amount}

Thank you for your business.

Regards,
{company_name}` 
        };

        this.state = {
            form: this.initialState
        };
    }

    handleChange = e => {
        const { name, value } = e.target;
        this.setState({ form: { ...this.state.form, [name]: value } });
    } 

    componentDidUpdate() {
        //condition added to stop multiple rendering
        if (this.props.modalType == 'edit') {
            
            if (this.state.form.id != this.props.data.id) {
                this.setState({ form: this.props.data });
            }
        } else {
            if (this.state.form.id != null) {
                this.setState({ form: this.initialState });
            }
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        // this.props.handleSubmit(this.state.form);
        //this.setState({ form: this.initialState });
    } 

    handleLogoChange = (data, type = null) => { 
		let form = { ...this.state.form }
		form.logo = data;
		this.setState({ form })
	}

    render() {
        return (
            <form onSubmit={this.handleSubmit} style={{maxWidth: '600px'}} className="pi-form-style-one">

                <div className="row">
                    <div className="col">
                        <label htmlFor="form-subject">
                            Subject
                        </label>
                        <input
                            id="form-subject"
                            type="text"
                            required
                            name="subject"
                            value={this.state.form.subject}
                            onChange={this.handleChange}
                        />
                        <p className='pi-field-desc'><b>Variable:</b> {'{id}'}, {'{module}'}, {'{company_name}'}, </p>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <label htmlFor="form-msg">Message</label>
                        <textarea
                            id="form-msg" 
                            required
                            rows={9}
                            name="msg"
                            value={this.state.form.msg}
                            onChange={this.handleChange}
                        />
                        <p className='pi-field-desc'><b>Variable:</b> {'{id}'}, {'{module}'}, {'{client_name}'}, {'{date}'}, {'{due_date}'}, {'{amount}'}, {'{company_name}'},</p>
                    </div>
                </div> 

                <div className="row" style={{marginTop: '10px'}}>
                    <div className="col">
                        <button className="pi-btn pi-bg-blue pi-bg-hover-blue">
                            Save
                        </button> 
                    </div>
                </div> 
            </form>
        );
    }
} 