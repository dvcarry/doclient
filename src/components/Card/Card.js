import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import './Card.css'

export const Card = ({ task, index }) => {

    return (
        <Draggable draggableId={task.id.toString()} index={index}>
            {
                provided => (
                    <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        className='kanban_card'
                    >
                        <div>{task.childname}</div>
                        <div className='card_name'>{task.name}</div>
                        <div>
                            <span className='card_tag'>{task.period}</span>
                            <span className='card_tag'>{task.balance}</span>
                        </div>
                    </div>
                )
            }

        </Draggable>

    )
}