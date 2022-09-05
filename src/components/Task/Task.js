import React from 'react';
import { useDispatch } from 'react-redux';
import moment from 'moment';

import { setCurrentTask, setModal, setFocus } from '../../redux/taskReducer';
import { Do } from '../Do/Do';
import { Action } from '../Action/Action';
import { TASK_TYPES } from '../../config/domain';

import './index.css'
import { changeSomeTaskThunk } from '../../redux/tasksThunks';


export const Task = ({ value, type }) => {

    const dispatch = useDispatch()

    const clickHandler = () => {
        dispatch(setModal({ typeOfModal: 'task' }))
        dispatch(setCurrentTask(value))
    }

    const makeYesterdayHandler = () => {
        const newDate = moment(value.donedate, 'YYYY-MM-DD').subtract(1, 'd').format('YYYY-MM-DD')
        dispatch(changeSomeTaskThunk(value.id, { donedate: newDate }))
    }

    const focusHandler = () => {
        dispatch(setFocus(value.id))
    }

    let taskClasses = ['task']
    if (type === TASK_TYPES.done) {
        taskClasses.push('task-done')
    }

    let classes = ['task_name']
    if (value.goal) {
        classes.push('task_goal')
    }

    // if (value.plan === 'today' && moment(today).isAfter(new Date(value.date), 'day')) {
    //     classes.push('goal')
    // }



    // if (value.type === 'проект') {
    //     classes.push('project')
    // }

    // let dateClasses = ['task_tag']
    // if (moment(today).isSame(new Date(value.date), 'day')) {
    //     dateClasses.push('day_today')
    // }
    // if (moment(today).isAfter(new Date(value.date), 'day')) {
    //     dateClasses.push('importantTag')
    // }

    // let periodClasses = ['task_tag']
    // if (value.period === 5) {
    //     periodClasses.push('importantTag')
    // }

    const daysBetweenFromToday = moment().diff(moment(value.date, 'YYYY-MM-DD'), 'days')

    return (
        <div
            className={taskClasses.join(' ')}
        >
            <div className='task_left'>
                <div className='task_tools'>
                    <Action important={value.important || value.goal} date={value.date} />
                    <Do task={value} />
                </div>
                <div
                    className='task_name'
                    onClick={clickHandler}
                >
                    <span
                        className={classes.join(' ')}
                    >
                        {value.name}
                    </span>
                    {
                        value.parentname
                            ? <span className='task_children'>
                                {`<  ${value.parentname}`}
                            </span>
                            : value.isparent
                                ? <span className='task_children'>{' >'}</span>
                                : null
                    }
                </div>
            </div>
            <div className='task_right'>
                <span className={!!daysBetweenFromToday ? 'task_tag task-overdue' : 'task_tag'}>{!!daysBetweenFromToday && daysBetweenFromToday}</span>
                {/* <span className='task_tag'>{value.balance}</span> */}
                {
                    type === 'today' && <span className='task_tag task-focus' onClick={focusHandler}>фокус</span>
                }
                {
                    type === 'done' && <span className='task_tag task-focus' onClick={makeYesterdayHandler}>вчера</span>
                }
                {/* <span className='task_tag'>{value.balance}</span> */}
            </div>
        </div>
    )
}

