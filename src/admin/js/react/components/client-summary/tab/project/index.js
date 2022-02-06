import React, { Component } from 'react'; 

export default class Project extends Component {
    state = {
        // clients: []
        data: '', 
    };

    componentDidMount() {
        // this.getLists();
        // console.log('from project')
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

                Project content

            </div>
        );
    }
}