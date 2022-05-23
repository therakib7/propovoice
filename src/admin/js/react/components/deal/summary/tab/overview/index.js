import React, { Component } from 'react'; 

export default class Overview extends Component {
    state = {
        // deals: []
        data: '', 
    };

    componentDidMount() {
        // this.getLists();
    }

    getLists = () => {
        Helper.getAll()
            .then(resp => {
                this.setState({ deals: resp.data.data });
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