import React, { useEffect, useState } from 'react';
import { Progress } from 'antd';

import './Tasks.css'


import { Task } from '../Task/Task';
import { API } from '../../api/tasks';
import { useDispatch, useSelector } from 'react-redux';
import { selectTasks } from '../../app/taskReducer';
import { getTodayTasksThunk } from '../../app/thunks';




export const DoTasks = () => {

    const { todaytasks, doneTasks } = useSelector(selectTasks)

    const dispatch = useDispatch()

    useEffect(() => {
        const getTasks = async () => {
            await dispatch(getTodayTasksThunk())
        }
        getTasks()
    }, [])

    const percent = Math.floor(doneTasks.length / (todaytasks.length + doneTasks.length) * 100)

    // if (!todaytasks[0]) return null

    return (
        <div>
            <div className='block'>
                <Progress
                    percent={percent}
                    strokeWidth={20}
                />
            </div>
            {
                !todaytasks[0]
                    ? <div>Отлично!</div>
                    : <Task
                        value={todaytasks[0]}
                    />
            }
        </div>
    )
}