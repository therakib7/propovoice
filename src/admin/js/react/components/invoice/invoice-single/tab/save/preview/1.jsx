import React, { Component } from 'react'; 

import Items from '../Items' 
import Note from '../Note' 
import Group from '../Group';
import From from '../From';
import To from '../To';
import Total from '../Total';

export default class One extends Component {
    /* constructor(props) {
        super(props);  
    }   

    componentDidMount() { 
    } */ 

    render() { 
        const { items, note, group } = this.props.data.invoice; 
        const { fromData, toData } = this.props.data; 
        return (
            <>  
                <div className="flex justify-between mb-5">
                    <div className=""> 
                        <div className="">
                            <From data={fromData} /> 
                        </div> 
                    </div>
                    <div className=""></div>
                    <div className=""> 
                        Bill To:
                        <div className="">
                            <To data={toData} /> 
                        </div> 
                    </div>
                </div> 

                {items && <Items data={items} />}  
                <Total {...this.props} />
                <div className='mb-10'></div>
                {note && <Note data={note} />}  
                {group && <Group data={group} />}
            </>
        );
    }
} 