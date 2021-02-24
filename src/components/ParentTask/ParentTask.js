import React from 'react';
import { useDispatch } from 'react-redux';
import { setModal } from '../../app/taskReducer';
import './ParentTask.css'

export const ParentTask = ({ task }) => {


    const dispacth = useDispatch()

    const clickHandler = () => {
        dispacth(setModal({typeOfModal: 'edit', currentTask: task}))
    }

    return (
        <>
            <div
                className='parenttask'
                onClick={clickHandler}

            >
                {task.name}
            </div>
        </>
    )
}