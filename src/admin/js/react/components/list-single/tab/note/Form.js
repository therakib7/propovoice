import React, { Component } from 'react'; 

class Form extends Component {
    constructor(props) {
        super(props); 

        this.initialState = {
            id: null,
            tab_id: this.props.tab_id,
            text: '',
            desc: '',
            priority: '',
            date: false
        };

        this.state = {
            form: this.initialState
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
        this.props.handleSubmit(this.state.form);
        this.setState({ form: this.initialState });
    } 

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="">
                <div className="pi-tab-buttons-group"> 

                    <div className="pi-activity-field">
                        <input
                            id="field-text"
                            type="text"
                            required
                            name="text"
                            value={this.state.form.text}
                            placeholder='Write your note'
                            onChange={this.handleChange}
                        />
                    </div>
 
                    <button className="pi-btn pi-btn-medium pi-bg-blue pi-bg-hover-blue pi-bg-shadow">
                        Save
                    </button>
                </div>
            </form>

        );
    }
}

export default Form;
