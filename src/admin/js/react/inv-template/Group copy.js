import React, { Component } from 'react'
import PropTypes from 'prop-types' 

class Group extends Component { 

    constructor(props) {
        super(props);  
    } 

    render = () => { 

        const groups = this.props.data; 

        return (
            <>  
                {groups.map( (group_single, group_index) => { 
                    let list_class = null;
                    if ( group_single.list_type == 'letter' ) {
                        list_class = 'list-decimal';
                    } else if ( group_single.list_type == 'text' ) {
                        list_class = 'list-letter';
                    } else if ( group_single.list_type == 'dot' ) {
                        list_class = 'list-disc';
                    }

                    return (
                        <div className='ncpi-invoice-group' key={group_index}> 
                            <div className='flex justify-between my-3'>
                                <div className=''>
                                    
                                </div> 
                            </div>

                            <div className='ncpi-invoice-group-items p-3 rounded border bg-slate-100'> 
                                <ul className={list_class+' px-5'}>
                                    
                                </ul> 
                            </div> 
                        </div> 
                    );
                })} 
            </>
        )
    }
}

Group.propTypes = { 
    title: PropTypes.string, 
}

export default Group


