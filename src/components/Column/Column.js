import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { Card } from '../Card/Card';
import { TaskList } from '../TaskList/TaskList';
import './Column.css'

export const Column = ({ title, column, tasks }) => {
    if (title === 'today') {
        console.log('olumn', tasks)
    }
    

    return (
        <div className='column'>
            <div>{title}</div>
            <Droppable droppableId={column}>
                {
                    provided => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            {
                                tasks.map((task, index) => <Card key={task.id} task={task} index={index}/>)
                            }
                            {
                                provided.placeholder
                            }
                        </div>
                    )
                }

            </Droppable>

        </div>
    )
}