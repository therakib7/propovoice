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
        this.props.handleSubmit(this.state.form, 'new');
        this.setState({ form: this.initialState });
    } 

    render() {
        const i18n = ndpv.i18n;
        return (
            <form onSubmit={this.handleSubmit} className="">
                <div className="pv-tab-buttons-group pv-text-right"> 

                    <div className="pv-activity-field">
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
 
                    <button className="pv-btn pv-btn-medium pv-bg-blue pv-bg-hover-blue pv-bg-shadow">
                        {i18n.save}
                    </button>
                </div>
            </form>

        );
    }
}

export default Form;
