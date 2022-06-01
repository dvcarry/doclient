import React from 'react';
import { Card } from '../Card/Card';
// import './Column.css'

export const TaskList = ({ tasks }) => {

    return (
        <div>
               {
                   tasks.map(task => <Card title={task.name} />)
               }
        </div>
    )
}