import { Spin } from 'antd';
import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { selectTasks } from '../../redux/taskReducer';
import { doTaskThunk } from '../../redux/tasksThunks';

import './Do.css'


export const Do = ({ task }) => {

    const dispatch = useDispatch()

    const [current, setCurrent] = useState(false)

    const { isFetching } = useSelector(selectTasks)

    const doneHandler = async () => {
        await dispatch(doTaskThunk(task.id))
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