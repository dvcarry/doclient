import React, { useState } from 'react';
import { DatePicker, Select } from 'antd';
import moment from 'moment';
import TextareaAutosize from 'react-textarea-autosize';
import { useDispatch, useSelector } from 'react-redux';
import { sortableContainer } from 'react-sortable-hoc';

import { Button } from '../Button/Button';
import { ParentTask } from '../ParentTask/ParentTask';
import Subtask from '../Subtask/Subtask';
import { SubtaskEdit } from '../Subtask/SubtaskEdit';
import { Do } from '../Do/Do';

import { changeCurrentTask, deleteTaskThunk, saveTaskThunk, selectTasks } from '../../app/taskReducer';

import './ModalForm.css'


const SortableContainer = sortableContainer(({ children }) => {
    return <div>{children}</div>;
});


export const ModalEdit = () => {

    const today = new Date()


    const { Option } = Select;
    const { currentTask, tasks, isplan } = useSelector(selectTasks)
    console.log("🚀 ~ file: ModalEdit.js ~ line 31 ~ ModalEdit ~ currentTask", currentTask)

    const dispatch = useDispatch()

    const [isSubtask, setIsSubtask] = useState(false)
    const [isParent, setIsParent] = useState(false)

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

    const sortHandler = async ({ oldIndex, newIndex }) => {
        // setTasks(tasks => arrayMove(tasks, oldIndex, newIndex))
        // await API.reindex(plan, oldIndex, newIndex)
    }

    const parentTasks = tasks.find(task => task.id === currentTask.child)


    return (
        <div
        // tabIndex="0"
        // onKeyPress={keyPressHandler}
        // onKeyDown={keyPressHandler}
        >
            {
                currentTask.childname
                    ? <ParentTask task={parentTasks} />
                    : !isParent
                        ? <a onClick={() => setIsParent(true)}>Добавить родителя</a>
                        : <Select
                            showSearch
                            style={{ width: '100%' }}
                            onChange={value => handleChangeType(value, 'child')} value={currentTask.child}
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            filterSort={(optionA, optionB) =>
                                optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                            }
                        >
                            {
                                tasks.map(task => <Option value={task.id}>{task.name}</Option>)
                            }
                        </Select>
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
                    <Option value="проект">проект</Option>
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
                <div>Цель</div>
                <Select onChange={value => handleChangeType(value, 'goal')} value={currentTask.goal}>
                    <Option value={true}>Да</Option>
                    <Option value={false}>Нет</Option>
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

            {
                currentTask.type !== 'проект'
                    ? <>
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
                            <div>Действие</div>
                            <Select onChange={value => handleChangeType(value, 'action')} value={currentTask.action}>
                                <Option value="do">do</Option>
                                <Option value="wait">wait</Option>
                                <Option value="go">go</Option>
                                <Option value="call">call</Option>
                            </Select>
                        </div>
                        <div className='input_div'>
                            <div>Повторяющаяся</div>
                            <Select onChange={value => handleChangeType(value, 'repeat')} value={currentTask.repeat}>
                                <Option value={false}>нет</Option>
                                <Option value={true}>да</Option>
                            </Select>
                        </div>
                        <div className='input_div'>
                            <div>Дата</div>
                            <DatePicker
                                // value={currentTask.date ? moment(currentTask.date, 'YYYY-MM-DD') : null}
                                value={currentTask.date ? moment(currentTask.date) : null}
                                onChange={handleChangeDate}
                            />
                        </div>
                    </>
                    : null
            }
            {
                currentTask.plan === 'today' && isplan
                    ? <div className='input_div'>
                        <div>Почему дополняешь план?</div>
                        <TextareaAutosize />
                    </div>
                    : null
            }
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

            <div className='subtask_block'>
                <div>Подзадачи</div>
                <div
                    onClick={() => setIsSubtask(true)}
                    className='subtask_button'
                >
                    +
            </div>

            </div>
            {/* {
                currentTask.subtasks.length > 0 ?
                    currentTask.subtasks.map(subtask => (
                        <Subtask
                            task={subtask}
                            key={subtask.id}
                        />))
                    : null
            } */}
            <SortableContainer
                onSortEnd={sortHandler}
                useDragHandle
            >
                {currentTask.subtasks.map((subtask, index) => (
                    <Subtask
                        task={subtask}
                        key={subtask.id}
                        index={index}
                    />
                ))}
            </SortableContainer>
            {
                isSubtask
                    ? <SubtaskEdit
                        close={() => setIsSubtask(false)}
                        goal={currentTask.goal}
                        balance={currentTask.balance}
                        child={currentTask.id}
                        plan={currentTask.plan}
                    />
                    : null
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