import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectTasks } from '../../redux/taskReducer';
import { getProjectThunk } from '../../redux/projectsThunks';

import { Action } from '../Action/Action';


export const Project = ({ value, type, childname, childdate }) => {

    const dispatch = useDispatch()

    const today = new Date()

    const { filtertype } = useSelector(selectTasks)

    const openProject = async () => {
        const task = await dispatch(getProjectThunk(value.id))        
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



    return (
        <div
            className='task'
            // onClick={() => dispatch(setModal({ typeOfModal: 'edit', currentTask: value }))}
            onClick={openProject}
        >
            <div className='task_left'>
                <div className='task_tools'>
                    <Action type={value.action} />
                </div>
                <div
                    className='task_name'
                // onClick={() => dispatch(setModal({ typeOfModal: 'edit', currentTask: value }))}
                >
                    <span
                        className={classes.join(' ')}
                    >
                        {value.name}
                    </span>
                </div>
                {
                    childname ? <span className='task_children'>{` > ${childname}`}</span> : null
                }

            </div>


            <div className='task_right'>
                <div>
                    <span className='task_tag'>{childdate}</span>
                </div>
            </div>
        </div>
    )
}