import React, { useEffect, useState } from 'react';
import { sortableContainer } from 'react-sortable-hoc';
import arrayMove from 'array-move';
import { Switch } from 'antd';

import './Tasks.css'

import { taskFilter } from '../../config/domain';

import Task from '../Task/Task';
import { API } from '../../api/tasks';




const SortableContainer = sortableContainer(({ children }) => {
    return <div>{children}</div>;
});



export const Tasks = ({
    planTasks,
    plan
}) => {

    const [tasks, setTasks] = useState(planTasks);
    const [filter, setFilter] = useState(taskFilter[0])
    const [parentFilter, setParentFilter] = useState(true)

    const sortHandler = async ({ oldIndex, newIndex }) => {
        setTasks(tasks => arrayMove(tasks, oldIndex, newIndex))
        await API.reindex(plan, oldIndex, newIndex)
    }

    let currentTasks = tasks
    if (filter !== taskFilter[0]) {
        console.log('filter')
        currentTasks = currentTasks.filter(task => task.type === filter)
        console.log("🚀 ~ file: Tasks.js ~ line 42 ~ currentTasks", currentTasks)
    }

    if (parentFilter) {
        currentTasks = currentTasks.filter(task => !task.isparent)
    }

    useEffect(() => {
        setTasks(planTasks)
    }, [planTasks])


    return (
        <div>
            <div className='tasks_filter'>
                <div>
                    {
                        taskFilter.map(item => {
                            const classes = ['tasks_filter_item']
                            if (item === filter) {
                                classes.push('active')
                            }
                            return (
                                <span
                                    className={classes.join(' ')}
                                    onClick={() => setFilter(item)}
                                    key={item}
                                >
                                    {item.toUpperCase()}
                                </span>
                            )
                        })
                    }
                </div>
                <Switch defaultChecked onChange={() => setParentFilter(!parentFilter)} />

            </div>
            <SortableContainer
                onSortEnd={sortHandler}
                useDragHandle
            >
                {currentTasks.map((task, index) => (
                    <Task key={task.id} index={index} value={task} />
                ))}
            </SortableContainer>


        </div>
    )
}