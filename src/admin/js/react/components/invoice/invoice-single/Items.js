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
            <div className={styles.lineItems}>
                <div className={`${styles.gridTable}`}>

                    <div className={`${styles.row} ${styles.header}`}>
                        <div>#</div>
                        <div>Name &amp; Details</div>
                        {/* <div>Description</div> */}
                        <div>Qty</div>
                        <div>Price</div>
                        <div>Total</div>
                        <div></div>
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
                                                        key={i + item.id} index={i} name={item.name}
                                                        desc={item.desc} quantity={item.quantity} price={item.price}
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

                </div>

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
