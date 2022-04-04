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
            <> 
                <table className="pi-info-table">
                    <thead>
                        <tr >
                            <th>Name &amp; Details </th>
                            <th>Unit</th>
                            <th>
                                Rate <span>USD ($)</span>
                            </th>
                            <th>Amount</th>
                            <th></th>
                        </tr>
                    </thead>
                    <DragDropContext onDragEnd={this.handleDragEnd}>
                        <Droppable droppableId="droppable">
                            {(provided, snapshot) => (
                                <tbody
                                    ref={provided.innerRef}
                                    className={snapshot.isDraggingOver ? styles.listDraggingOver : ''}
                                >
                                    {this.props.items.map((item, i) => (
                                        <Draggable key={item.id} draggableId={item.id} index={i}>
                                            {(provided, snapshot) => (
                                                <tr
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
                                                        qty_type={item.qty_type} 
                                                        price={item.price}
                                                        {...functions}
                                                    />
                                                </tr>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </tbody>
                            )}
                        </Droppable>
                    </DragDropContext>  
                </table> 

                <button className="pi-btn pi-bg-air-white pi-bg-hover-blue pi-hover-color-white"
                onClick={addHandler}  
                >
                    <svg
                        width={10}
                        height={10}
                        viewBox="0 0 10 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M5 0C5.26522 0 5.51957 0.105357 5.70711 0.292893C5.89464 0.48043 6 0.734784 6 1V4H9C9.26522 4 9.51957 4.10536 9.70711 4.29289C9.89464 4.48043 10 4.73478 10 5C10 5.26522 9.89464 5.51957 9.70711 5.70711C9.51957 5.89464 9.26522 6 9 6H6V9C6 9.26522 5.89464 9.51957 5.70711 9.70711C5.51957 9.89464 5.26522 10 5 10C4.73478 10 4.48043 9.89464 4.29289 9.70711C4.10536 9.51957 4 9.26522 4 9V6H1C0.734784 6 0.48043 5.89464 0.292893 5.70711C0.105357 5.51957 0 5.26522 0 5C0 4.73478 0.105357 4.48043 0.292893 4.29289C0.48043 4.10536 0.734784 4 1 4H4V1C4 0.734784 4.10536 0.48043 4.29289 0.292893C4.48043 0.105357 4.73478 0 5 0Z"
                            fill="#2D3748"
                        />
                    </svg>
                    &nbsp;Add New Item
                </button>

            </> 
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
