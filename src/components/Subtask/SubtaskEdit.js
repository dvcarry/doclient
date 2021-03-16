import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { addSubtaskThunk } from '../../app/taskReducer';
import { CURRENT_TASK } from '../../config/domain';

import './Subtask.css'


export const SubtaskEdit = ({ name = '', close, goal, balance, child, plan }) => {

    const [input, setInput] = useState(name)

    const dispatch = useDispatch()

    const saveKeyHandler = event => {
        if (event.charCode === 13) {
            dispatch(addSubtaskThunk({...CURRENT_TASK, goal: goal, balance: balance, child: child, name: input, plan: plan}))
            close()
        }
    }

    return (
        <div className='subtask'>
            <input
                className='subtask_input'
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyPress={saveKeyHandler}
                autoFocus={name === ''}
            />
        </div>
    );
};