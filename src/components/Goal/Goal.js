import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectTasks, setModal } from '../../redux/taskReducer';
import { getProjectThunk } from '../../redux/thunks';

import { Action } from '../Action/Action';

import './Goal.css'


export const Goal = ({ name, description, balance }) => {

    const dispatch = useDispatch()

    const { filtertype } = useSelector(selectTasks)

    const openProject = async () => {
        // const task = await dispatch(getProjectThunk(value.id))        
    }

    return (
        <div
            className='goal'
            // onClick={() => dispatch(setModal({ typeOfModal: 'edit', currentTask: value }))}
            // onClick={openProject}
        >            
            <div className='goal_name'>{name}</div>
            <div className='goal_description'>{description}</div>
        </div>
    )
}