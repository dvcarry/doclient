import 'moment/locale/ru';
import { Alert } from 'antd';

import { Task } from '../components/Task/Task';
import { useSelector } from 'react-redux';
import { selectTasks } from '../redux/taskReducer';
import { filterTodayTasks } from '../config/helpers';
import { TASK_TYPES } from '../config/domain';
import { Breaks } from '../components/Breaks/Breaks';



export const Today = () => {

    const { tasks, doneTasks, focus, breaks } = useSelector(selectTasks)

    const todaytasks = filterTodayTasks(tasks)

    const focusTask = todaytasks.find((task) => task.id === focus)

    return (
        <div>
            {
                breaks > 0 && <Breaks breaks={breaks} />
            }
            {
                focusTask ? <div className='block'>
                    <h3>ФОКУС</h3>
                    <Task
                        value={focusTask}
                        type={TASK_TYPES.plan}
                    />
                </div>
                    : <div className='block'>
                        <Alert
                            message="Выбери фокусную задачу"
                            type="warning"
                            showIcon
                        />
                    </div>
            }
            <div className='block'>
                <h3>СЕГОДНЯ</h3>
                {
                    todaytasks.map((task, index) => (
                        <Task
                            key={task.id}
                            index={index}
                            value={task}
                            type={TASK_TYPES.today}
                        />
                    ))
                }
            </div>
            {
                doneTasks.length > 0
                    ? <div className='block'>
                        <h3>ВЫПОЛНЕНО</h3>
                        {
                            doneTasks.map((task, index) => (
                                <Task
                                    key={task.id}
                                    index={index}
                                    value={task}
                                    type={TASK_TYPES.done}
                                />
                            ))
                        }
                    </div>
                    : null
            }
        </div>
    )
}