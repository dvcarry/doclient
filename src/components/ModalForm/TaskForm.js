import React from 'react';
import { DatePicker, Select, Button, Radio, Switch } from 'antd';
import moment from 'moment';
import TextareaAutosize from 'react-textarea-autosize';
import { useDispatch, useSelector } from 'react-redux';

import { ParentTask } from '../ParentTask/ParentTask';
import { Do } from '../Do/Do';
import { InputName } from '../../components/InputName/InputName';
import { changeCurrentTask, selectTasks, setProject } from '../../redux/taskReducer';
import { deleteTaskThunk, saveTaskThunk, changeToProjectThunk, changeCurrentTaskThunk } from '../../redux/tasksThunks';
import { getDateFromConstant } from '../../config/helpers';
import { DATE_CONSTANTS } from '../../config/domain';

import './ModalForm.css'



export const TaskForm = () => {

    const { Option } = Select;
    const { currentTask, isFetching } = useSelector(selectTasks)

    const dispatch = useDispatch()

    // const handleChangeName = (e, type) => {
    //     console.log("🚀 ~ file: TaskForm.js ~ line 29 ~ handleChangeName ~ e", e, type)
    //     dispatch(changeCurrentTaskThunk(currentTask.id, { name: e.target.value }))
    //     // changeCurrentTask('name', e.target.value)
    //     // dispatch(changeCurrentTask({ type: 'name', value: e.target.value }))
    // }

    const handleChangeData = (value, type) => {
        console.log("🚀 ~ file: TaskForm.js ~ line 31 ~ handleChangeData ~ type", value)
        dispatch(changeCurrentTaskThunk(currentTask.id, { [type]: value }))
        // if (value.target) {
        //     dispatch(changeCurrentTask({ type, value: value.target.value }))
        // } else {
        //     dispatch(changeCurrentTask({ type, value }))
        // }
        
    }

    const changeToProject = () => {
        dispatch(changeToProjectThunk(currentTask.id))
    }

    const handleChangeDate = (date, dateString) => {
        // dispatch(changeCurrentTask({ type: 'date', value: dateString }))
        dispatch(changeCurrentTaskThunk(currentTask.id, { date: dateString }))
    }

    const setDateFromConstants = (dateConstant) => {
        const date = getDateFromConstant(dateConstant)
        dispatch(changeCurrentTaskThunk(currentTask.id, { date }))
        // dispatch(changeCurrentTask({ type: 'date', value: date }))
    }

    // const keyPressHandler = e => {
    //     if (e.keyCode === 13 && e.ctrlKey) {
    //         setIsSubtask(true)
    //     }
    // }

    const deleteHandler = () => {
        dispatch(deleteTaskThunk(currentTask.id, currentTask.parent))
    }

    const saveCurrentTask = () => {
        if (!currentTask.balance && currentTask.child === 0) {
            return
        }
        dispatch(saveTaskThunk(currentTask))
    }

    const ImportantBlock = (
        <div className='input_div'>
            <div>Важно</div>
            <Switch defaultChecked={currentTask.important} onChange={value => handleChangeData(value, 'important')} />
        </div>
    )

    const ActionBlock = (
        <div className='input_div'>
            <div>Жду</div>
            <Switch defaultChecked={currentTask.wait} onChange={value => handleChangeData(value, 'wait')} />
        </div>
    )

    const DateBlock = (
        <div className='input_div'>
            <div>Дата</div>
            <DatePicker
                value={currentTask.date ? moment(currentTask.date) : null}
                onChange={handleChangeDate}
                style={{ width: 200 }}
                size='large'
            />
            <div>
                {
                    DATE_CONSTANTS.map(item => (
                        <span
                            key={item.eng}
                            className='date_constant'
                            onClick={() => setDateFromConstants(item.eng)}
                        >
                            {item.ru}
                        </span>))
                }
            </div>
        </div>
    )

    const BalanceBlock = (
        <div className='input_div'>
            <div>Сфера жизни</div>
            <Select
                onChange={value => handleChangeData(value, 'balance')}
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
    )

    const PlannedTask = (
        <div className='input_block'>
            {DateBlock}
            <div className='input_block'>
                {ImportantBlock}
                {ActionBlock}
            </div>

        </div>
    )

    const NotPlannedTask = (
        <>
            <div className='input_block'>
                {BalanceBlock}
                {ImportantBlock}
            </div>
            {DateBlock}
        </>
    )


    return (
        <div>
            <ParentTask
                name={currentTask.parentname}
                parent={currentTask.parentid}
                id={currentTask.id}
            />
            <div>
                <div className='flex'>
                    <Do task={currentTask} />
                    {/* <TextareaAutosize
                        className='inputtext inputtext-name'
                        value={currentTask.name}
                        onChange={handleChangeName}
                    /> */}
                    <InputName />
                </div>
            </div>
            {currentTask.parentid ? PlannedTask : NotPlannedTask}



            {/* {
                currentTask.date
                    ? <div className='input_block'>
                        <div className='input_div'>
                            <div>Дата</div>
                            <DatePicker
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
                        <div className='input_div'>
                            <div>Важно</div>
                            <Switch defaultChecked={currentTask.important} onChange={value => handleChangeData(value, 'important')} />
                        </div>
                    </div>
                    : <>
                        <div className='input_block'>
                            <div className='input_div'>
                                <div>Тип задачи</div>
                                <Radio.Group onChange={changeToProject} value={currentTask.type}>
                                    <Radio value={"задача"}>задача</Radio>
                                    <Radio value={"проект"}>проект</Radio>
                                </Radio.Group>
                            </div>

                            <div className='input_div'>
                                <div>Сфера жизни</div>
                                <Select
                                    onChange={value => handleChangeData(value, 'balance')}
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
                                <Switch defaultChecked={currentTask.goal} onChange={value => handleChangeData(value, 'goal')} />
                            </div>
                            <div className='input_div'>
                                <div>Важно</div>
                                <Switch defaultChecked={currentTask.important} onChange={value => handleChangeData(value, 'important')} />
                            </div>
                        </div>

                        <div className='input_block'>
                            <div className='input_div'>
                                <div>Дата</div>
                                <DatePicker
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
                    </>
            } */}

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