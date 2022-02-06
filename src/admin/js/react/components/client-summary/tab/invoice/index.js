import React, { Component } from 'react'; 

export default class Invoice extends Component {
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
                Invoice content
            </div>
        );
    }
} 