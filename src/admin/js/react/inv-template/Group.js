import React, { Component } from 'react'
import PropTypes from 'prop-types' 

class Group extends Component { 

    constructor(props) {
        super(props);  
    } 

    render = () => { 

        const groups = this.props.data; 

        return (
            <div className="pi-terms">  
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
                        <div key={group_index}>
                            <h4>{group_single.label}:</h4>
                            <ul>
                                    {group_single.items.map( (item, list_index) => { 
                                        return (
                                            <li key={list_index}> 
                                                {item.text}
                                            </li>
                                        );
                                    })} 
                            </ul>
                        </div>
                    );
                })} 
            </div>
        )
    }
}

Group.propTypes = { 
    title: PropTypes.string, 
}

export default Group


