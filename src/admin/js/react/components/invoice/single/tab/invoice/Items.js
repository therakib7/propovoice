import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

import Item from './Item'
import styles from './scss/Items.module.scss'

class Items extends Component {

    handleDragEnd = (result) => {

        if (!result.destination) return

        //helper function to reorder result (src: react-beautiful-dnd docs)
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
                <div className="pi-info-table-wrap">
                    <div className="pi-info-table-content">
                        <table className="pi-table pi-info-table">
                            <thead>
                                <tr >
                                    <th>Title &amp; Description </th>
                                    <th>Quantity</th>
                                    <th>
                                        Rate (USD)
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
                                                                title={item.title}
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

                        <button className="pi-btn pi-btn-medium pi-bg-stroke pi-bg-hover-stroke pi-bg-shadow" style={{ justifyContent: 'center' }}
                            onClick={addHandler}
                        >
                            <svg
                                width={15}
                                height={14}
                                viewBox="0 1 12 10"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M1.875 6h8.25M6 1.875v8.25"
                                    stroke="#2D3748"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            Add Item
                        </button>
                    </div>
                </div>
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
