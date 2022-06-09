import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TextareaAutosize from 'react-textarea-autosize';
import { Button } from 'antd';

import { selectTasks } from '../../app/taskReducer';
import { addDayTextThunk, addTaskThunk } from '../../app/thunks';

import './ModalForm.css'

export const DayNew = () => {

    const [text, setText] = useState('')

    const { currentTask, isFetching } = useSelector(selectTasks)

    const dispatch = useDispatch()

    const saveKeyHandler = event => {
        if (event.charCode === 13 && event.ctrlKey) {
            if (text !== '') {
                dispatch(addDayTextThunk(text))
            }
        }
    }

    const saveHandler = () => {
        if (text !== '') {
            dispatch(addDayTextThunk(text))
        }
    }

    return (
        <div
            onKeyPress={saveKeyHandler}
        >
            <TextareaAutosize
                value={text}
                className='input_name'
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