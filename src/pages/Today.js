import 'moment/locale/ru';


import { Task } from '../components/Task/Task';
import { useSelector } from 'react-redux';
import { selectTasks } from '../redux/taskReducer';
import { filterTodayTasks } from '../config/helpers';
import { TASK_TYPES } from '../config/domain';



export const Today = () => {

    const { tasks, doneTasks } = useSelector(selectTasks)

    const todaytasks = filterTodayTasks(tasks)

    return (
        <div>
            <div className='plantask_div'>
                <h3>СЕГОДНЯ</h3>
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