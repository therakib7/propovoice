import React, { Component } from 'react'; 

export default class Overview extends Component {
    state = {
        // contacts: []
        data: '', 
    };

    componentDidMount() {
        // this.getLists();
    }

    getLists = () => {
        Helper.getAll()
            .then(resp => {
                this.setState({ contacts: resp.data.data });
            })
    }; 

    render() {
        return (
            <div className="ncpi-components"> 

                Overview content

            </div>
        );
    }
} 