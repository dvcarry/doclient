import React from 'react';
import 'moment/locale/ru';
// import './Tasks.css'


import { Task } from '../components/Task/Task';
import { useDispatch, useSelector } from 'react-redux';
import { selectTasks } from '../app/taskReducer';
import { getPlanTasksThunk, getTasksThunk, getTodayTasksThunk } from '../app/thunks';
import { filterTodayTasks } from '../config/helpers';








export const Today = () => {

    const { tasks } = useSelector(selectTasks)

    // const dispatch = useDispatch()

    // useEffect(() => {
    //     const getTasks = async () => {
    //         // await dispatch(getTasksThunk())
    //         await dispatch(getTodayTasksThunk())
    //     }
    //     getTasks()
    // }, [])

    const todaytasks = filterTodayTasks(tasks)


    return (
        <div>           
            <div className='plantask_div'>
                <div className='plantask_date'>СЕГОДНЯ</div>
                {
                    todaytasks.map((task, index) => (
                        <Task
                            key={task.id}
                            index={index}
                            value={task}
                        />
                    ))
                }
            </div>       
        </div>
    )
}