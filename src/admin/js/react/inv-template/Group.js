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
                    let list_style = 'decimal';
                    if ( group_single.list_type == 'letter' ) {
                        list_style = 'decimal';
                    } else if ( group_single.list_type == 'text' ) {
                        list_style = 'lower-alpha';
                    } else if ( group_single.list_type == 'dot' ) {
                        list_style = 'disc';
                    }

                    return ( 
                        <div key={group_index}>
                            <h4>{group_single.label}:</h4>
                            <ul style={ { listStyleType: list_style } }> 
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


