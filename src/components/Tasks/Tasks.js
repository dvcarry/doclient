import React, { useEffect, useState } from 'react';
import { sortableContainer } from 'react-sortable-hoc';
import arrayMove from 'array-move';
import { Switch } from 'antd';

import './Tasks.css'

import { taskFilter } from '../../config/domain';

import { Task } from '../Task/Task';
import { API } from '../../api/tasks';
import { useDispatch, useSelector } from 'react-redux';
import { changePlan, selectTasks } from '../../app/taskReducer';




const SortableContainer = sortableContainer(({ children }) => {
    return <div>{children}</div>;
});



export const Tasks = () => {

    const { tasks, taskss, plan, filtertype } = useSelector(selectTasks)

    const dispatch = useDispatch()

    // const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState(taskFilter[0])
    // const [parentFilter, setParentFilter] = useState(true)

    const sortHandler = async ({ oldIndex, newIndex }) => {
        dispatch(changePlan({ oldIndex, newIndex, oldPlan: plan, newPlan: plan }))
        // setTasks(tasks => arrayMove(tasks, oldIndex, newIndex))
        await API.reindex(plan, oldIndex, newIndex)
    }

    let currentTasks = []

    if (tasks[plan]) {
        currentTasks = tasks[plan]
    }

    if (filter !== taskFilter[0]) {
        currentTasks = currentTasks.filter(task => task.type === filter)
    }

    if (filtertype === 'balance') {
        currentTasks = tasks.all.filter(task => task.balance === plan)
    }


    return (
        <div>
            <div className='tasks_filter'>
                {/* <div>
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
                </div> */}
                <div>
                    {
                        tasks.today.find(item => item.goal)
                            ? <span style={{ color: 'blue' }}>Задача есть</span>
                            : tasks.done.find(item => item.goal)
                                ? <span style={{ color: 'green' }}>Задача на день выполнена!</span>
                                : <span style={{ color: 'red' }}>Добавь задачу на день</span>
                    }
                </div>
            </div>
            <SortableContainer
                onSortEnd={sortHandler}
                useDragHandle
            >
                {currentTasks.map((task, index) => (
                    <Task
                        key={task.id}
                        index={index}
                        value={task}
                    />
                ))}
            </SortableContainer>


        </div>
    )
}