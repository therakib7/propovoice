import React, { Component } from 'react'; 

export default class One extends Component {
    constructor(props) {
        super(props);         

        this.state = { 
            preloader: true, 
        }; 
    }   

    componentDidMount() { 
    } 

    render() { 
        return (
            <>
                Preview One
            </>
        );
    }
} 