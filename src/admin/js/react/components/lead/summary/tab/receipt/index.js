import React, { Component } from 'react'; 

export default class Receipt extends Component {
    state = {
        // leads: []
        data: '', 
    };

    componentDidMount() {
        // this.getLists();
    }

    getLists = () => {
        Helper.getAll()
            .then(resp => {
                this.setState({ leads: resp.data.data });
            })
    }; 
    
    render() {
        return (
            <div className="ncpi-components"> 
                Acknowledgement Receipt content
            </div>
        );
    }
}