import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { addSubtaskThunk } from '../../redux/tasksThunks';
import { CURRENT_TASK } from '../../config/domain';

import './Subtask.css'


export const SubtaskEdit = ({ name = '', close, goal, balance, parent }) => {

    const [input, setInput] = useState(name)

    const dispatch = useDispatch()

    const saveKeyHandler = event => {
        if (event.charCode === 13) {
            dispatch(addSubtaskThunk({...CURRENT_TASK, goal, balance, parent, name: input}))
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