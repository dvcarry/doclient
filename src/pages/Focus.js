import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';


import { selectTasks, setCurrentTask } from '../app/taskReducer';
import { getTasksThunk } from '../app/thunks';
import { Button } from '../components/Button/Button';
import { FocusTask } from '../components/FocusTask/FocusTask'


export const Focus = () => {

    const dispatch = useDispatch()
    const { tasks, currentTask, isFetching } = useSelector(selectTasks)

    const [time, setTime] = useState(0)

    // let timer = new moment.duration(1000).timer();

    // let timer = setInterval(setTime(time + 1), 1000);

    // const startTimer = () => {
    //     console.log(time)
    //     timer = setInterval(setTime(time + 1), 1000);
    // }


    useEffect(() => {

        const getTasks = async () => {
            const newTasks = await dispatch(getTasksThunk())
            const currentTask = newTasks.find(task => task.plan === 'today' && task.index === 0)
            if (currentTask) {
                dispatch(setCurrentTask(currentTask || null))
            } else {
                dispatch(setCurrentTask(null))
            }
        }
        getTasks()
    }, [tasks.length])

    if (isFetching) {
        return null
    }

    return (
        <div className='focus_mode'>
            {
                currentTask
                    ? <FocusTask />
                    : <div>Нет задач на сегодня</div>
            }
            {/* <Button
                title='Старт'
                // click={startTimer}
            /> */}
        </div>
    )
}