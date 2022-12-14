import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TextareaAutosize from 'react-textarea-autosize';
import { Button } from 'antd';

import { selectTasks } from '../../redux/taskReducer';
import { addTaskThunk } from '../../redux/tasksThunks';

import './ModalForm.css'

export const ModalNew = () => {

    const [name, setName] = useState('')

    const { currentTask, isFetching } = useSelector(selectTasks)

    const dispatch = useDispatch()

    const saveKeyHandler = event => {
        if (event.charCode === 13) {
            event.preventDefault();
            if (name !== '') {
                dispatch(addTaskThunk({ ...currentTask, name: name }))
            }
        }
    }

    const saveHandler = () => {
        if (name !== '') {
            dispatch(addTaskThunk({ ...currentTask, name: name }))
        }
    }

    return (
        <div
            onKeyPress={saveKeyHandler}
        >
            <TextareaAutosize
                value={name}
                className='inputtext inputtext-name'
                onChange={e => setName(e.target.value)}
                autoFocus
            />
            {/* <input
                value={name}
                className='input_name'
                onChange={e => setName(e.target.value)}
                autoFocus
            /> */}
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