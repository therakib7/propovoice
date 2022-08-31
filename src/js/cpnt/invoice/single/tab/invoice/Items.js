import React, { useRef, useCallback, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

import Item from './Item'
import ItemLabel from './sidebar/ItemLabel'
import styles from './scss/Items.module.scss'

export default (props) => {
    const [label, setLabel] = useState(false);

    const showLabel = () => {
        if (label) {
            setLabel(false);
        } else {
            setLabel(true);
        }
    };

    const handleDragEnd = (result) => {

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
            props.items,
            result.source.index,
            result.destination.index
        )

        // call parent handler with new state representation
        props.reorderHandler(Items)
    }

    const { items, item_label, labelChange, item_tax, addHandler, reorderHandler, ...functions } = props
    const i18n = ndpv.i18n;
    const { desc, qty, price, tax, amount } = item_label;
    return (
        <>
            {label && <ItemLabel item_label={item_label} item_tax={item_tax} close={showLabel} labelChange={labelChange} />}
            <div className="pv-info-table-wrap">
                <div className="pv-info-table-content">
                    <table className="pv-table pv-info-table">
                        <thead className='pv-cursor-pointer' onClick={() => showLabel()}>
                            <tr>
                                <th style={{ width: 'auto' }}>{desc}</th>
                                <th style={{ width: '125px' }}>{qty}</th>
                                <th style={{ width: '105px' }}>{price} (USD)</th>
                                {item_tax && <th style={{ width: '125px' }}>{tax}</th>}
                                <th style={{ width: '90px' }}>{amount}</th>
                                <th></th>
                            </tr>
                        </thead>
                        <DragDropContext onDragEnd={handleDragEnd}>
                            <Droppable droppableId="droppable">
                                {(provided, snapshot) => (
                                    <tbody
                                        ref={provided.innerRef}
                                        className={snapshot.isDraggingOver ? styles.listDraggingOver : ''}
                                    >
                                        {props.items.map((item, i) => (
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
                                                            item_tax={item_tax}
                                                            tax={item.tax}
                                                            tax_type={item.tax_type}
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

                    <button className="pv-btn pv-btn-medium pv-bg-stroke pv-bg-hover-stroke pv-bg-shadow" style={{ justifyContent: 'center' }}
                        onClick={addHandler}
                    >
                        <svg
                            width={15}
                            height={14}
                            viewBox="0 1 12 10"
                            fill="none"
                            
                        >
                            <path
                                d="M1.875 6h8.25M6 1.875v8.25"
                                stroke="#2D3748"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        {i18n.add} {i18n.item}
                    </button>
                </div>
            </div>
        </>
    )
} 