import React, { useEffect } from 'react';

// import './Tasks.css'


import { useDispatch, useSelector } from 'react-redux';
import { selectTasks } from '../app/taskReducer';
import { getProjectsThunk } from '../app/thunks';
import { BALANCE } from '../config/domain';
import { Project } from '../components/Project/Project';




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
                                    <Project
                                        key={task.id}
                                        index={index}
                                        value={task}
                                        childname={task.childname}
                                        childdate={task.childdate}
                                    />
                                ))
                            }
                        </div>
                    )
                })
            }
        </div>
    )
}