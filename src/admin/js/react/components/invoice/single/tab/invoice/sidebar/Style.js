import React, { Component } from 'react';
 
import ColorPicker from 'block/color-picker';

class Style extends Component {
    constructor(props) {
        super(props);
    }

    handleChange = (val) => {
        let style = { ...this.props.data.style }
        style.primary_color = val;

        this.props.handleChange(style);
    };


    render() {
        const color = this.props.data.style.primary_color;
        return (
            <div className="pi-form-style-one pi-edit">
                <div className="row">
                    <div className="col-12">
                        <label htmlFor="name">Edit clolor</label> 
                        <ColorPicker color={color} onChange={this.handleChange} />
                    </div>
                </div> 
            </div> 
        );
    }
}

export default Style;
