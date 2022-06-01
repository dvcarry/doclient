import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectTasks, getTasksThunk } from '../app/taskReducer';
import { Task } from '../components/Task/Task';
import { TASK_TYPES } from '../config/domain';
import { getDatesForPeriod } from '../config/helpers';

import './routes.css'



export const Plan = () => {

    const { tasks, filtertype, search } = useSelector(selectTasks)
    const dispatch = useDispatch()

    // if (search !== '') {
    //     planTasks = tasks.filter(task => task.name.toLowerCase().includes(search.toLowerCase()))
    // }

    const dates = getDatesForPeriod(14)

    const todayTasks = tasks.filter(task => task.plan === 'today')
    const inboxTasks = tasks.filter(task => !task.date)
    const otherTasks = tasks.filter(task => task.date && task.plan !== 'today')

    useEffect(() => {
        const getTasks = async () => {
            dispatch(getTasksThunk())
        }
        getTasks()
    }, [])

    return (
        <>
            <div className='plantask_div'>
                <div className='plantask_date'>Инбокс</div>
                {
                    inboxTasks.map((task, index) => (
                        <Task
                            key={task.id}
                            index={index}
                            value={task}
                            type={TASK_TYPES.plan}
                        />
                    ))
                }
            </div>
            <div className='plantask_div'>
                <div className='plantask_date'>СЕГОДНЯ</div>
                {
                    todayTasks.map((task, index) => (
                        <Task
                            key={task.id}
                            index={index}
                            value={task}
                            type={TASK_TYPES.plan}
                        />
                    ))
                }
            </div>
            {
                dates.map((date, index) => {
                    const tasksForDate = otherTasks.filter(task => task.date === date.raw)

                    return (
                        <div className='plantask_div' key={index}>
                            <div className='plantask_date'>{date.show}</div>
                            {
                                tasksForDate.map((task, index) => (
                                    <Task
                                        key={task.id}
                                        index={index}
                                        value={task}
                                        type={TASK_TYPES.plan}
                                    />
                                ))
                            }
                        </div>
                    )
                })
            }
        </>
    )
}