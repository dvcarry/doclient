import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectTasks } from '../app/taskReducer';
import { getTasksThunk } from '../app/thunks';
import { Task } from '../components/Task/Task';
import { TASK_TYPES } from '../config/domain';
import { filterTodayTasks, getDatesForPeriod } from '../config/helpers';

import './routes.css'



export const Tasks = () => {

    const { tasks, filtertype, search } = useSelector(selectTasks)
    const dispatch = useDispatch()


    // if (search !== '') {
    //     planTasks = tasks.filter(task => task.name.toLowerCase().includes(search.toLowerCase()))
    // }

    const dates = getDatesForPeriod(14)

    // const todayTasks = tasks.filter(task => moment(task.date) <= today)
    const todayTasks = filterTodayTasks(tasks)
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