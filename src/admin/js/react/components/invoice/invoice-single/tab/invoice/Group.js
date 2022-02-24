import React, { Component } from 'react'
import PropTypes from 'prop-types' 

class Group extends Component { 

    constructor(props) {
        super(props); 

        this.state = {
            edit: false,
            groups: [
                {
                    label: 'Terms',
                    list_type: 'letter',
                    items: [ {  text: '' } ]
                }
            ], 
        };
    }

    componentDidUpdate() {   
        if ( ! this.state.edit && this.props.data ) { 
            this.setState({ edit: true, groups: this.props.data });
        }
	}

    handleGroupInfo = (index) => (e) => {
        const { name, value } = e.target;
		let items = this.state.groups[index]; 
        items[name] = value;  
        let groups = this.state.groups;
        this.setState({ groups: groups });
        this.handlePros();
	}

    handleChange = (group_index, list_index) => (e) => {
        const { name, value } = e.target;
		let items = this.state.groups[group_index].items.map((item, i) => { 
			if (list_index !== i) return item;
			return { ...item, [name]: value }
		}); 

        this.state.groups[group_index].items = items; 
        let groups = this.state.groups;
        this.setState({ groups: groups }); 
        this.handlePros();
	}

    addGroup = () => {
        let groups = this.state.groups;
        groups.push({
            label: 'Terms',
            list_type: 'letter',
            items: [ {  text: '' } ]
        });  
        this.setState({ groups: groups }); 
    }; 

    addList = (index) => {
        let items = this.state.groups[index].items; 
        items.push( {  text: '' } );  
        let groups = this.state.groups;
        this.setState({ groups: groups });
    };  

    handlePros = () => {
        this.props.changeHandler( this.state.groups );
    };  

    render = () => { 

        const { groups } = this.state; 

        return (
            <div className='ncpi-invoice-groups'>  
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
                                    <input type="text" id={group_index+'-group-label'} onChange={ this.handleGroupInfo(group_index) } name="label" value={group_single.label} className='w-auto border-none focus:border' />

                                    <label htmlFor={group_index+'-group-label'}>
                                        <span><i className="dashicons dashicons-edit-page pt-1"></i></span>
                                    </label>
                                </div>

                                <div className="">
                                    <span className='font-medium'>List Type:</span>
                                    <input id={group_index+'-list-letter'} onChange={ this.handleGroupInfo(group_index) } name="list_type" value="letter" className='w-auto min-w-0 mr-1 ml-5' type="radio" />
                                    <label htmlFor={group_index+'-list-letter'}>1. Letter</label>

                                    <input id={group_index+'-list-text'} onChange={ this.handleGroupInfo(group_index) } name="list_type" value="text" className='w-auto min-w-0 mr-1 ml-5' type="radio" />
                                    <label htmlFor={group_index+'-list-text'}>a. Text</label>

                                    <input id={group_index+'-list-dot'} onChange={ this.handleGroupInfo(group_index) }  name="list_type" value="dot" className='w-auto min-w-0 mr-1 ml-5' type="radio" />
                                    <label htmlFor={group_index+'-list-dot'}>●. Dot</label>
                                </div>
                            </div>

                            <div className='ncpi-invoice-group-items p-3 rounded border bg-slate-50'>
                                
                                <ul className={list_class+' px-5'}>
                                    {group_single.items.map( (item, list_index) => { 
                                        return (
                                            <li key={list_index}> 
                                                <input className='appearance-none border-0 bg-transparent focus:outline-none' 
                                                type="text" 
                                                name="text" 
                                                value={item.text} 
                                                onChange={ this.handleChange(group_index, list_index) } />
                                            </li>
                                        );
                                    })} 
                                </ul>
                                <button onClick={() => this.addList(group_index)} className="bg-slate-200 hover:bg-slate-300 text-gray-700 font-medium text-base py-1 px-3 rounded my-3 ml-1"><span className="dashicons dashicons-plus pt-1"></span> Add Item</button>
                            </div> 
                        </div>
                    );
                })}
                <button onClick={() => this.addGroup()} className="bg-slate-200 hover:bg-slate-300 text-gray-700 font-medium text-base py-1 px-3 rounded my-3 ml-1"><span className="dashicons dashicons-plus pt-1"></span> Add Group</button>
            </div>
        )
    }
}

Group.propTypes = { 
    title: PropTypes.string, 
}

export default Group


