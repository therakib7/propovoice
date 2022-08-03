import React, { Component } from 'react';

import ColorPicker from 'block/color-picker';

class Style extends Component {
    constructor(props) {
        super(props);          
    }
     
    handleChange = ( val ) => { 
        let style = { ...this.props.data.style }
		style.primary_color = val;

        this.props.handleChange(style);
    }; 
     

    render() {
        const color = this.props.data.style.primary_color;
        return (
            <li className="pi-edit-style">
                <input type="checkbox" defaultChecked="checked" />
                <i />
                <h3>Edit Style</h3>
                <div className="pi-edit-content">
                    <h4>Edit Color</h4>   
                    <ColorPicker color={color} onChange={this.handleChange} /> 
                </div>
                
            </li>
        );
    }
}

export default Style;
