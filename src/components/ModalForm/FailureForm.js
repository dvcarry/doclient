import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TextareaAutosize from 'react-textarea-autosize';
import { Button } from 'antd';

import { selectTasks } from '../../redux/taskReducer';
// import { addTaskThunk } from '../../redux/thunks';
import { addDayTextThunk } from '../../redux/daysThunks';
import { addFailuresThunk } from '../../redux/tasksThunks';

import './ModalForm.css'

export const FailureForm = () => {

    const [text, setText] = useState('')

    const { failures, isFetching } = useSelector(selectTasks)

    const dispatch = useDispatch()

    const saveKeyHandler = event => {
        if (event.charCode === 13 && event.ctrlKey) {
            if (text !== '') {
                dispatch(addFailuresThunk(failures[0].id, text))
            }
        }
    }

    const saveHandler = () => {
        if (text !== '') {
            dispatch(addFailuresThunk(failures[0].id, text))
        }
    }

    return (
        <div
            onKeyPress={saveKeyHandler}
        >
            Почему не выполнил задачу
            <h2>{failures[0] && failures[0].name}</h2>
            <TextareaAutosize
                value={text}
                className='inputtext inputtext-day'
                onChange={e => setText(e.target.value)}
                autoFocus
            />
            <div className='button_block'>
                <Button
                    onClick={saveHandler}
                    loading={isFetching}
                >
                    Сохранить
                </Button>
            </div>
        </div>
    )
}