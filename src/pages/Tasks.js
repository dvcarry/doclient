import { useSelector } from 'react-redux';

import { selectTasks } from '../redux/taskReducer';
import { Task } from '../components/Task/Task';
import { TASK_TYPES } from '../config/domain';
import { filterTodayTasks, getDatesForPeriod } from '../config/helpers';



export const Tasks = () => {

    const { tasks } = useSelector(selectTasks)

    const dates = getDatesForPeriod(14)

    const todayTasks = filterTodayTasks(tasks)
    const inboxTasks = tasks.filter(task => !task.date)
    const otherTasks = tasks.filter(task => task.date && task.plan !== 'today')

    return (
        <>
            <div className='block'>
                <h3>Инбокс</h3>
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
            <div className='block'>
                <h3>СЕГОДНЯ</h3>
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
                        <div className='block' key={index}>
                            <h3>{date.show}</h3>
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