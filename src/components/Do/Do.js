import { Spin } from 'antd';
import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { doTaskThunk, selectTasks } from '../../app/taskReducer';

import './Do.css'


export const Do = ({ task }) => {

    const dispatch = useDispatch()

    const [current, setCurrent] = useState(false)

    const { isFetching } = useSelector(selectTasks)

    const doneHandler = () => {
        dispatch(doTaskThunk(task.id, task.index, task.plan))
    }

    return (
        <>
        {
            (isFetching && current)
            ? <Spin />
            : <div
                className='docheck'
                onClick={doneHandler}
            />
        }
        </>

        // <div
        //     className='docheck'
        //     onClick={doneHandler}
        // />
    )
}