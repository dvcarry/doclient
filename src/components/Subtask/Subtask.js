import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { getTaskThunk } from '../../redux/tasksThunks';
import { MODAL_TYPES } from '../../config/domain';
import './Subtask.css'

// const DragHandle = sortableHandle(() => <span className='draghandler'>:::</span>);


export const Subtask = ({ task, change }) => {

    const [input, setInput] = useState(task.name)
    const dispatch = useDispatch()

    const clickHandler = () => {
        dispatch(getTaskThunk(task.id))
    }


    const handleBlur = () => {
        if (input !== '') {
            change(task.id, input)
        }
    }

    let dateFormat = ''
    if (task.date) {
        const dateFormatArray = task.date.split('-')
        dateFormat = dateFormatArray[2] + '.' + dateFormatArray[1]
    }


    return (
        <div
            className='subtask'
            onClick={clickHandler}
        >
            {/* <DragHandle /> */}
            <span>
                {task.name}
            </span>
            {/* <input
                className='subtask_input'
                value={input}
                onChange={e => setInput(e.target.value)}
                onBlur={handleBlur}
                autoFocus={task.name === ''}
            /> */}
            <div className='subtask_info'>
                <span className='subtask_plan'>{dateFormat}</span>
            </div>

        </div>
    );
};

// export default SortableElement(Subtask)