import React from 'react';

import { useDispatch } from 'react-redux';
import { doTaskThunk } from '../../app/taskReducer';

import './Do.css'


export const Do = ({ task }) => {

    const dispatch = useDispatch()

    const doneHandler = () => {
        dispatch(doTaskThunk(task.id, task.index, task.plan))
    }

    return (
        <div
            className='docheck'
            onClick={doneHandler}
        />
    )
}