import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

import Item from './Item' 
import styles from './scss/Items.module.scss' 

class Items extends Component {

    handleDragEnd = (result) => {

        if (!result.destination) return

        // helper function to reorder result (src: react-beautiful-dnd docs)
        const reorder = (list, startIndex, endIndex) => {
            const result = Array.from(list)
            const [removed] = result.splice(startIndex, 1)
            result.splice(endIndex, 0, removed)
            return result
        }

        // perform reorder
        const Items = reorder(
            this.props.items,
            result.source.index,
            result.destination.index
        )

        // call parent handler with new state representation
        this.props.reorderHandler(Items)

    }

    render = () => {

        const { items, addHandler, reorderHandler, ...functions } = this.props

        return ( 
            <div className=''>
                <div className="flex gap-3 border-b py-2 items-start">
                    <div className="px-1 w-5">
                        <p className="text-gray-800 uppercase tracking-wide text-sm font-bold">
                        SL
                        </p>
                    </div>
                    <div className="flex-1 px-1">
                        <p className="text-gray-800 uppercase tracking-wide text-sm font-bold">
                        Description
                        </p>
                    </div>
                    <div className="px-1 w-20">
                        <p className="text-gray-800 uppercase tracking-wide text-sm font-bold">
                        Units
                        </p>
                    </div>
                    <div className="px-1 w-32">
                        <p className="leading-none">
                        <span className="block uppercase tracking-wide text-sm font-bold text-gray-800">
                            Unit Price
                        </span>
                        <span className="font-medium text-xs text-gray-500">USD ($)</span>
                        </p>
                    </div>
                    <div className="px-1 w-32">
                        <p className="leading-none">
                        <span className="block uppercase tracking-wide text-sm font-bold text-gray-800">
                            Amount
                        </span>
                        <span className="font-medium text-xs text-gray-500"></span>
                        </p>
                    </div>
                    <div className="px-1 w-10 text-center"></div>
                </div> 
                 
                <DragDropContext onDragEnd={this.handleDragEnd}>
                    <Droppable droppableId="droppable">
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                className={snapshot.isDraggingOver ? styles.listDraggingOver : ''}
                            >
                                {this.props.items.map((item, i) => (
                                    <Draggable key={item.id} draggableId={item.id} index={i}>
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={provided.draggableProps.style}
                                                className={snapshot.isDragging ? styles.listItemDragging : ''}
                                            >
                                                <Item
                                                    style={{ color: 'red' }}
                                                    key={i + item.id} 
                                                    index={i} 
                                                    name={item.name}
                                                    desc={item.desc} 
                                                    qty={item.qty} 
                                                    price={item.price}
                                                    {...functions}
                                                />
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>  

                <div> 
                    <button onClick={addHandler} className="bg-slate-300 w-full align-center py-2 text-gray-900 font-medium" type="button">
                        <span className="dashicons dashicons-insert pt-1"></span> Add Item
                    </button>
                </div>

            </div> 
        )
    }
}

Items.propTypes = {
    items: PropTypes.array.isRequired,
    currencyFormatter: PropTypes.func.isRequired,
    addHandler: PropTypes.func.isRequired,
    changeHandler: PropTypes.func.isRequired,
    focusHandler: PropTypes.func.isRequired,
    deleteHandler: PropTypes.func.isRequired,
    reorderHandler: PropTypes.func.isRequired,
}

export default Items
