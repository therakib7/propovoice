import React, { Component } from 'react'; 

import Items from '../Items' 
import Note from '../Note' 
import Group from '../Group';

export default class One extends Component {
    constructor(props) {
        super(props);  
    }   

    componentDidMount() { 
    } 

    render() { 
        const { items, note, group } = this.props.data; 
        // console.log(this.props.data)
        return (
            <>  
                {items && <Items data={items} />}  
                <div className='mb-10'></div>
                {note && <Note data={note} />}  
                {group && <Group data={group} />}
            </>
        );
    }
} 