import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { setModal } from '../../app/taskReducer'
import './Subtask.css'


export const Subtask = ({ task, change }) => {

    const [input, setInput] = useState(task.name)
    const dispatch = useDispatch()


    const handleBlur = () => {
        if (input !== '') {
            change(task.id, input)
        }
    }

    return (
        <div className='subtask'>
            <input
                className='subtask_input'
                value={input}
                onChange={e => setInput(e.target.value)}
                onBlur={handleBlur}
                autoFocus={task.name === ''}
            />
            <div className='subtask_info'>
                <span className='subtask_plan'>{task.plan}</span>
                <span
                    className='subtask_go'
                    onClick={() => dispatch(setModal({ typeOfModal: 'edit', currentTask: task }))}
                >
                    {'>'}
                </span>
            </div>

        </div>
    );
};