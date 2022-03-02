import React, { Component } from 'react'; 

import From from '../From';
import To from '../To';
import Total from '../Total';
import Items from '../Items' 
import Note from '../Note' 
import Group from '../Group'; 
import Attachments from '../Attachments';
import Signature from '../Signature';

//style
import Style from '../scss/1.scss'

export default class One extends Component {
    constructor(props) {
        super(props);  
    }    

    render() { 
        const { items, note, group, attachments, signature } = this.props.data.invoice; 
        const { fromData, toData } = this.props.data; 
        return (
            <div className=''>  
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
                {attachments && <Attachments data={attachments} />}
                {signature && <Signature data={signature} />}
            </div>
        );
    }
} 