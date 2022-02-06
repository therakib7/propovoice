import React, { Component } from 'react'; 

export default class Receipt extends Component {
    state = {
        // clients: []
        data: '', 
    };

    componentDidMount() {
        // this.getLists();
    }

    getLists = () => {
        Helper.getAll()
            .then(resp => {
                this.setState({ clients: resp.data.data });
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