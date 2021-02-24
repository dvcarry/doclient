import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SortableElement, sortableHandle } from 'react-sortable-hoc';
import moment from 'moment';

import { selectTasks, setModal } from '../../app/taskReducer';
import { Do } from '../Do/Do';
// import { TasksContext } from '../../hooks/useTasks';
import './index.css'
import { Action } from '../Action/Action';

// export const Task = ({ name, clickDone, id, type, period, balance, children, goal, today }) => {


const DragHandle = sortableHandle(() => <span className='draghandler'>:::</span>);


export const Task = ({ value }) => {

    const dispatch = useDispatch()

    const today = new Date()

    const { filtertype } = useSelector(selectTasks)

    let classes = ['task_name']
    if (value.goal) {
        classes.push('goal')
    }

    let dateClasses = ['task_tag']
    if (moment(today).isSame(new Date(value.date), 'day')) {
        dateClasses.push('day_today')
    }    
    if (moment(today).isAfter(new Date(value.date), 'day')) {
        dateClasses.push('day_yesterday')
    }    

    return (
        <div
            className='task'
        >
            <div className='task_left'>
                <div className='task_tools'>
                    <Action type={value.action} />
                    <DragHandle />
                    <Do task={value} />
                </div>
                <div
                    className='task_name'
                    onClick={() => dispatch(setModal({ typeOfModal: 'edit', currentTask: value }))}
                >
                    <span
                        className={classes.join(' ')}
                    >
                        {value.name}
                    </span>
                    {
                        value.childname
                            ? <span className='task_children'>
                                {`<  ${value.childname}`}
                            </span>
                            : null
                    }
                </div>
            </div>

            <div className='task_right'>
                <div>
                    <span className='task_tag'>
                        {value.period}
                    </span>
                    {
                        filtertype === 'plan' ? <span className='task_tag'>{value.balance}</span> : <span className='task_tag'>{value.plan}</span>
                    }

                    <span className={dateClasses.join(' ')}>
                        {
                            value.date ? moment(value.date).format('DD.MM') : null
                        }
                    </span>
                </div>
            </div>
        </div>
    )
}

export default SortableElement(Task)