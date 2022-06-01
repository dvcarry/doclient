import React, { useEffect, useState } from 'react';
import { Switch } from 'antd';

import './Tasks.css'


import { Task } from '../Task/Task';
import { API } from '../../api/tasks';
import { useDispatch, useSelector } from 'react-redux';
import { getProjectsThunk, getTodayTasksThunk, selectTasks } from '../../app/taskReducer';
import { BALANCE } from '../../config/domain';




export const Projects = () => {

    const { projects } = useSelector(selectTasks)

    const dispatch = useDispatch()

    useEffect(() => {
        const getTasks = async () => {
            await dispatch(getProjectsThunk())
        }
        getTasks()
    }, [])

    if (projects.length === 0) return null

    return (
        <div>
            {
                BALANCE.map(item => {
                    const tasks = projects.filter(task => task.balance === item)
                    return (
                        <div className='plantask_div'>
                            <div className='plantask_date'>{item}</div>
                            {
                                tasks.map((task, index) => (
                                    <Task
                                        key={task.id}
                                        index={index}
                                        value={task}
                                    />
                                ))
                            }
                        </div>
                    )
                })
            }
            {/* {
                projects.map((task, index) => (
                    <Task
                        key={task.id}
                        index={index}
                        value={task}
                    />
                ))
            } */}
        </div>
    )
}