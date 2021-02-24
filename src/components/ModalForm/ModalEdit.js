import React, { useState } from 'react';
import {
    DatePicker,
    Select
} from 'antd';
import moment from 'moment';
import TextareaAutosize from 'react-textarea-autosize';


import { Button } from '../Button/Button';
import { ParentTask } from '../ParentTask/ParentTask';
import { Subtask } from '../Subtask/Subtask';

import './ModalForm.css'
import { SubtaskEdit } from '../Subtask/SubtaskEdit';
import { useDispatch, useSelector } from 'react-redux';
import { changeCurrentTask, deleteTaskThunk, saveTaskThunk, selectTasks } from '../../app/taskReducer';
import { Do } from '../Do/Do';

export const ModalEdit = () => {

    const { Option } = Select;
    const { currentTask, tasks } = useSelector(selectTasks)

    const dispatch = useDispatch()

    const [isSubtask, setIsSubtask] = useState(false)

    const handleChangeName = e => {
        changeCurrentTask('name', e.target.value)
        dispatch(changeCurrentTask({ type: 'name', value: e.target.value }))
    }

    const handleChangeType = (value, option) => {
        dispatch(changeCurrentTask({ type: option, value: value }))
    }

    const handleChangeDate = (date, dateString) => {
    console.log("🚀 ~ file: ModalEdit.js ~ line 39 ~ handleChangeDate ~ dateString", dateString)
        
        dispatch(changeCurrentTask({ type: 'date', value: dateString }))
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
        dispatch(saveTaskThunk(currentTask))
    }

    const parentTasks = tasks.find(task => task.id === currentTask.child)


    return (
        <div
        // tabIndex="0"
        // onKeyPress={keyPressHandler}
        // onKeyDown={keyPressHandler}
        >
            {
                currentTask.childname ? <ParentTask task={parentTasks} /> : null
            }
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

            <div className='input_div'>
                <div>Тип задачи</div>
                <Select onChange={value => handleChangeType(value, 'type')} value={currentTask.type}>
                    <Option value="задача">задача</Option>
                    <Option value="привычка">привычка</Option>
                    <Option value="другое">другое</Option>
                </Select>
            </div>

            <div className='input_div'>
                <div>Сфера жизни</div>
                <Select onChange={value => handleChangeType(value, 'balance')} value={currentTask.balance}>
                    <Option value="работа">работа</Option>
                    <Option value="проект">проект</Option>
                    <Option value="развитие">развитие</Option>
                    <Option value="семья">семья</Option>
                    <Option value="здоровье">здоровье</Option>
                    <Option value="быт">быт</Option>
                    <Option value="отдых">отдых</Option>
                </Select>
            </div>

            <div className='input_div'>
                <div>Необходимое время</div>
                <Select onChange={value => handleChangeType(value, 'period')} value={currentTask.period}>
                    <Option value="5">5</Option>
                    <Option value="15">15</Option>
                    <Option value="30">30</Option>
                    <Option value="45">45</Option>
                    <Option value="60">60</Option>
                    <Option value="90">90</Option>
                    <Option value="120">120</Option>
                    <Option value="180">180</Option>
                    <Option value="240">240</Option>
                </Select>
            </div>

            <div className='input_div'>
                <div>Цель</div>
                <Select onChange={value => handleChangeType(value, 'goal')} value={currentTask.goal}>
                    <Option value={true}>Да</Option>
                    <Option value={false}>Нет</Option>
                </Select>
            </div>

            <div className='input_div'>
                <div>Действие</div>
                <Select onChange={value => handleChangeType(value, 'action')} value={currentTask.action}>
                    <Option value="do">do</Option>
                    <Option value="wait">wait</Option>
                    <Option value="go">go</Option>
                    <Option value="call">call</Option>
                </Select>
            </div>

            <div className='input_div'>
                <div>План выполнить</div>
                <Select onChange={value => handleChangeType(value, 'plan')} value={currentTask.plan}>
                    <Option value="inbox">inbox</Option>
                    <Option value="today">today</Option>
                    <Option value="upcoming">upcoming</Option>
                    <Option value="later">later</Option>
                </Select>
            </div>

            <div className='input_div'>
                <div>Повторяющаяся</div>
                <Select onChange={value => handleChangeType(value, 'repeat')} value={currentTask.repeat}>
                    <Option value={false}>нет</Option>
                    <Option value={true}>да</Option>
                </Select>
            </div>
            {
                currentTask.repeat
                    ? <div className='input_div'>
                        <div>Повторяющаяся</div>
                        <Select onChange={value => handleChangeType(value, 'repeatday')} value={currentTask.repeatday}>
                            <Option value={1}>1</Option>
                            <Option value={2}>2</Option>
                            <Option value={3}>3</Option>
                            <Option value={30}>30</Option>
                        </Select>
                    </div>
                    : null
            }
            <div className='input_div'>
                <div>Дата</div>
                <DatePicker
                    // value={currentTask.date ? moment(currentTask.date, 'YYYY-MM-DD') : null}
                    value={currentTask.date ? moment(currentTask.date) : null}
                    onChange={handleChangeDate}
                />
            </div>

            <div className='subtask_block'>
                <div>Подзадачи</div>
                <div
                    onClick={() => setIsSubtask(true)}
                    className='subtask_button'
                >
                    +
            </div>

            </div>
            {
                currentTask.subtasks.length > 0 ?
                    currentTask.subtasks.map(subtask => (
                        <Subtask
                            task={subtask}
                            key={subtask.id}
                            // name={subtask.name}
                            // id={subtask.id}
                            // change={handleChangeSubtaskName}
                        />))
                    : null
            }
            {
                isSubtask ? <SubtaskEdit close={() => setIsSubtask(false)} goal={currentTask.goal} balance={currentTask.balance} child={currentTask.id} /> : null
            }
            <div className='button_block'>
                <Button
                    title='Сохранить'
                    click={saveCurrentTask}
                />
                <Button
                    title='Удалить'
                    click={deleteHandler}
                />
            </div>
        </div>
    )
}