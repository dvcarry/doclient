import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SortableElement, sortableHandle } from 'react-sortable-hoc';
import moment from 'moment';

import { selectTasks, setCurrentTask, setModal,  } from '../../app/taskReducer';
// import { upTaskThunk } from '../../app/thunks';
import { Do } from '../Do/Do';
// import { TasksContext } from '../../hooks/useTasks';
import './index.css'
import { Action } from '../Action/Action';
import { TASK_TYPES } from '../../config/domain';

// export const Task = ({ name, clickDone, id, type, period, balance, children, goal, today }) => {


// const DragHandle = sortableHandle(() => <span className='draghandler'>:::</span>);


export const Task = ({ value, type }) => {

    const dispatch = useDispatch()

    const today = new Date()

    const { filtertype } = useSelector(selectTasks)

    // const upTask = () => {
    //     dispatch(upTaskThunk(value.index, value.id))
    // }


    const clickHandler = () => {
        dispatch(setModal({ typeOfModal: 'task'}))
        dispatch(setCurrentTask( value ))
    }

    let taskClasses = ['task']
    if (type === TASK_TYPES.done) {
        taskClasses.push('task-done')
    }

    let classes = ['task_name']
    if (value.goal) {
        classes.push('goal')
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

    return (
        <div
            className={taskClasses.join(' ')}            
        >
            <div className='task_left'>
                <div className='task_tools'>
                    <Action important={value.important} date={value.date}/>
                    <Do task={value} />
                </div>
                <div
                    className='task_name'
                    onClick={clickHandler}
                    // onClick={() => dispatch(setModal({ typeOfModal: 'task', currentTask: value }))}
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
                <div>
                    {/* <span className='task_tag'> */}
                    {/* <span className={periodClasses.join(' ')}>
                        {value.period}
                    </span> */}
                    <span className='task_tag'>{value.balance}</span>
                    {/* {
                        filtertype === 'plan' ? <span className='task_tag'>{value.balance}</span> : <span className='task_tag'>{value.plan}</span>
                    } */}

                    {/* <span className={dateClasses.join(' ')}>
                        {
                            value.date ? moment(value.date).format('DD.MM') : null
                        }
                    </span> */}
                    {/* {
                        type === TASK_TYPES.today
                            ? <span
                                // onClick={upTask}
                                className='task_up'>
                                &#8597;
                                </span>
                            : null
                    } */}
                </div>
            </div>
        </div>
    )
}

// export default SortableElement(Task)