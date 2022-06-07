import React from 'react';
import { DatePicker, Select, Button, Radio, Switch } from 'antd';
import moment from 'moment';
import TextareaAutosize from 'react-textarea-autosize';
import { useDispatch, useSelector } from 'react-redux';

import { ParentTask } from '../ParentTask/ParentTask';
import { Do } from '../Do/Do';
import { changeCurrentTask, selectTasks } from '../../app/taskReducer';
import { deleteTaskThunk, saveTaskThunk } from '../../app/thunks';
import { getDateFromConstant } from '../../config/helpers';
import { DATE_CONSTANTS } from '../../config/domain';

import './ModalForm.css'



export const TaskForm = () => {

    const { Option } = Select;
    const { currentTask, tasks, isFetching } = useSelector(selectTasks)

    const dispatch = useDispatch()

    const handleChangeName = e => {
        changeCurrentTask('name', e.target.value)
        dispatch(changeCurrentTask({ type: 'name', value: e.target.value }))
    }

    const handleChangeType = (value) => {
        dispatch(changeCurrentTask({ type: 'type', value: value.target.value }))
    }

    const handleChangeImportant = value => {
    console.log("🚀 ~ file: TaskForm.js ~ line 35 ~ handleChangeImportant ~ value", value)
        dispatch(changeCurrentTask({ type: 'important', value }))
    }

    const handleChangeBalance = (value) => {
        dispatch(changeCurrentTask({ type: 'balance', value }))
    }

    const handleChangeDate = (date, dateString) => {
        dispatch(changeCurrentTask({ type: 'date', value: dateString }))
    }

    const setDateFromConstants = (dateConstant) => {
        const date = getDateFromConstant(dateConstant)
        dispatch(changeCurrentTask({ type: 'date', value: date }))
    }

    // const keyPressHandler = e => {
    //     if (e.keyCode === 13 && e.ctrlKey) {
    //         setIsSubtask(true)
    //     }
    // }

    const deleteHandler = () => {
        dispatch(deleteTaskThunk(currentTask.id))
    }

    const saveCurrentTask = () => {
        if (currentTask.balance) {
            dispatch(saveTaskThunk(currentTask))
        }      
    }


    const parentTasks = tasks.find(task => task.id === currentTask.child)


    return (
        <div>
            <ParentTask
                name={currentTask.parentname}
                id={currentTask.parentid}
            />

            <div>
                <div className='flex'>
                    <Do task={currentTask} />
                    <TextareaAutosize
                        className='input_name'
                        value={currentTask.name}
                        onChange={handleChangeName}
                    />
                </div>
            </div>
            <div className='input_block'>

                <div className='input_div'>
                    <div>Тип задачи</div>
                    <Radio.Group onChange={handleChangeType} value={currentTask.type}>
                        <Radio value={"задача"}>задача</Radio>
                        <Radio value={"проект"}>проект</Radio>
                    </Radio.Group>
                </div>

                <div className='input_div'>
                    <div>Сфера жизни</div>
                    <Select
                        onChange={handleChangeBalance}
                        value={currentTask.balance}
                        style={{ width: 200 }}
                        size='large'
                    >
                        <Option value="работа">работа</Option>
                        <Option value="проект">проект</Option>
                        <Option value="развитие">развитие</Option>
                        <Option value="семья">семья</Option>
                        <Option value="здоровье">здоровье</Option>
                        <Option value="быт">быт</Option>
                        <Option value="отдых">отдых</Option>
                    </Select>
                </div>
            </div>

            <div className='input_block'>
                <div className='input_div'>
                    <div>Цель</div>
                    <Switch defaultChecked={currentTask.goal} onChange={value => handleChangeType(value, 'goal')} />
                </div>
                <div className='input_div'>
                    <div>Важно</div>
                    <Switch defaultChecked={currentTask.important} onChange={handleChangeImportant} />
                </div>
            </div>
            {
                currentTask.type !== 'проект'
                    ? <div className='input_block'>
                        <div className='input_div'>
                            <div>Дата</div>
                            <DatePicker
                                // value={currentTask.date ? moment(currentTask.date, 'YYYY-MM-DD') : null}
                                value={currentTask.date ? moment(currentTask.date) : null}
                                onChange={handleChangeDate}
                                style={{ width: 200 }}
                                size='large'
                            />
                            <div>
                                {
                                    DATE_CONSTANTS.map(item => <span key={item.eng} className='date_constant' onClick={() => setDateFromConstants(item.eng)}>{item.ru}</span>)
                                }
                            </div>
                        </div>
                    </div>
                    : null
            }

            <div className='button_block'>
                <Button
                    onClick={saveCurrentTask}
                    loading={isFetching}
                >
                    Сохранить
                </Button>
                <Button
                    onClick={deleteHandler}
                    loading={isFetching}
                >
                    Удалить
                </Button>
            </div>
        </div>
    )
}