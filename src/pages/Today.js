import { useState } from 'react';
import 'moment/locale/ru';
import { Alert } from 'antd';
import { useSelector } from 'react-redux';

import { Task } from '../components/Task/Task';
import { selectTasks } from '../redux/taskReducer';
import { filterTodayTasks } from '../config/helpers';
import { TASK_TYPES } from '../config/domain';
import { Breaks } from '../components/Breaks/Breaks';
import { BALANCE } from '../config/domain';


const ALL = 'все'

export const Today = () => {

    const [filter, setFilter] = useState(ALL)
    const { tasks, doneTasks, focus, breaks } = useSelector(selectTasks)

    const todaytasks = filterTodayTasks(tasks)
    const focusTask = todaytasks.find((task) => task.id === focus)

    const navClickHandler = event => {
        setFilter(event.target.textContent.toLowerCase())
    }

    const filteredBalance = [...new Set(todaytasks.map(task => task.balance))]
    const balance = [ALL, ...filteredBalance]

    const filteredTasks = filter === ALL ? todaytasks : todaytasks.filter(task => task.balance === filter)
    const filteredDoneTasks = filter === ALL ? doneTasks : doneTasks.filter(task => task.balance === filter)


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
                            type="info"
                            showIcon
                        />
                    </div>
            }
            <div className='block'>
                {
                    // [ALL, ...BALANCE].map(item => (
                    balance.map(item => (
                        <span
                            className={`nav${filter === item ? ' nav-active' : ''}`}
                            onClick={navClickHandler}
                            key={item}
                        >
                            {item.toUpperCase()}
                        </span>)
                    )
                }
            </div>
            <div className='block'>
                {
                    filteredTasks.map((task, index) => (
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
                filteredDoneTasks.length > 0
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