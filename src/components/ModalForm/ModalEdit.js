import React, { useState } from 'react';
import { DatePicker, Select, Button, Radio, Switch } from 'antd';
import moment from 'moment';
import TextareaAutosize from 'react-textarea-autosize';
import { useDispatch, useSelector } from 'react-redux';
import { sortableContainer } from 'react-sortable-hoc';

import { ParentTask } from '../ParentTask/ParentTask';
import { Subtask } from '../Subtask/Subtask';
import { SubtaskEdit } from '../Subtask/SubtaskEdit';
import { Do } from '../Do/Do';

import { changeCurrentTask, selectTasks } from '../../app/taskReducer';
import { deleteTaskThunk, saveTaskThunk } from '../../app/thunks';

import './ModalForm.css'
import { getDateFromConstant } from '../../config/helpers';
import { DATE_CONSTANTS } from '../../config/domain';


const SortableContainer = sortableContainer(({ children }) => {
    return <div>{children}</div>;
});


export const ModalEdit = () => {


    const { Option } = Select;
    const { currentTask, tasks, isplan, isFetching } = useSelector(selectTasks)

    const dispatch = useDispatch()

    const [isSubtask, setIsSubtask] = useState(false)

    const handleChangeName = e => {
        changeCurrentTask('name', e.target.value)
        dispatch(changeCurrentTask({ type: 'name', value: e.target.value }))
    }

    const handleChangeType = (value, option) => {
        console.log("🚀 ~ file: ModalEdit.js ~ line 43 ~ handleChangeType ~ value", value, option)
        dispatch(changeCurrentTask({ type: option, value }))
        // dispatch(changeCurrentTask({ type: option, value: value.target.value }))
    }

    const handleChangeDate = (date, dateString) => {
        console.log("🚀 ~ file: ModalEdit.js ~ line 39 ~ handleChangeDate ~ dateString", dateString)

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
        dispatch(deleteTaskThunk(currentTask.id, currentTask.child))
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
        <div>
            {
                currentTask.type !== 'проект'
                    ? <ParentTask
                        name={currentTask.parentname}
                        id={currentTask.parentid}
                    />
                    : null
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
            <div className='input_block'>
                <div className='input_div'>
                    <div>Тип задачи</div>
                    <Radio.Group onChange={value => handleChangeType(value, 'type')} value={currentTask.type}>
                        <Radio value={"задача"}>задача</Radio>
                        <Radio value={"проект"}>проект</Radio>
                    </Radio.Group>
                </div>

                <div className='input_div'>
                    <div>Сфера жизни</div>
                    <Select
                        onChange={value => handleChangeType(value, 'balance')}
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
                    {/* <Select
                        onChange={value => handleChangeType(value, 'goal')}
                        value={currentTask.goal}
                        style={{ width: 200 }}
                        size='large'
                    >
                        <Option value={true}>Да</Option>
                        <Option value={false}>Нет</Option>
                    </Select> */}
                    <Switch defaultChecked={currentTask.goal} onChange={value => handleChangeType(value, 'goal')} />
                </div>
                {
                    // currentTask.type !== 'проект'
                    //     ? <div className='input_div'>
                    //         <div>Действие</div>
                    //         <Select
                    //             onChange={value => handleChangeType(value, 'action')}
                    //             value={currentTask.action}
                    //             style={{ width: 200 }}
                    //             size='large'
                    //         >
                    //             <Option value="do">лягушка</Option>
                    //             {/* <Option value="wait">простая</Option>
                    //             <Option value="go">go</Option> */}
                    //             <Option value="call">простая</Option>
                    //         </Select>
                    //     </div>
                    //     : null
                }
                {/* <div className='input_div'>
                    <div>Действие</div>
                    <Select
                        onChange={value => handleChangeType(value, 'action')}
                        value={currentTask.action}
                        style={{ width: 200 }}
                        size='large'
                    >
                        <Option value="do">do</Option>
                        <Option value="wait">wait</Option>
                        <Option value="go">go</Option>
                        <Option value="call">call</Option>
                    </Select>
                </div> */}
            </div>
            {
                currentTask.type !== 'проект'
                    ? <div className='input_block'>
                        {/* <div className='input_div'>
                            <div>Необходимое время</div>
                            <Select
                                onChange={value => handleChangeType(value, 'period')}
                                value={currentTask.period}
                                style={{ width: 200 }}
                                size='large'
                            >
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
                        </div> */}
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

            {/* <div className='input_block'>
                <div className='input_div'>
                    <div>Необходимое время</div>
                    <Select
                        onChange={value => handleChangeType(value, 'period')}
                        value={currentTask.period}
                        style={{ width: 200 }}
                        size='large'
                    >
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
                    <div>Дата</div>
                    <DatePicker
                        // value={currentTask.date ? moment(currentTask.date, 'YYYY-MM-DD') : null}
                        value={currentTask.date ? moment(currentTask.date) : null}
                        onChange={handleChangeDate}
                        style={{ width: 200 }}
                        size='large'
                    />
                </div>
            </div> */}
            {/* {
                currentTask.type !== 'проект'
                    ? <div className='input_block'>
                        <div className='input_div'>
                            <div>Повторяющаяся</div>
                            <Select
                                onChange={value => handleChangeType(value, 'repeat')}
                                value={currentTask.repeat}
                                style={{ width: 200 }}
                                size='large'
                            >
                                <Option value={false}>нет</Option>
                                <Option value={true}>да</Option>
                            </Select>
                        </div>
                        {
                            currentTask.repeat
                                ? <div className='input_div'>
                                    <div>Повторяющаяся</div>
                                    <Select
                                        onChange={value => handleChangeType(value, 'repeatday')}
                                        value={currentTask.repeatday}
                                        style={{ width: 200 }}
                                        size='large'
                                    >
                                        <Option value={1}>1</Option>
                                        <Option value={2}>2</Option>
                                        <Option value={3}>3</Option>
                                        <Option value={7}>7</Option>
                                        <Option value={30}>30</Option>
                                    </Select>
                                </div>
                                : null
                        }
                    </div>
                    : null
            } */}

            {/* <div className='input_block'>
                <div className='input_div'>
                    <div>Повторяющаяся</div>
                    <Select
                        onChange={value => handleChangeType(value, 'repeat')}
                        value={currentTask.repeat}
                        style={{ width: 200 }}
                        size='large'
                    >
                        <Option value={false}>нет</Option>
                        <Option value={true}>да</Option>
                    </Select>
                </div>
                {
                    currentTask.repeat
                        ? <div className='input_div'>
                            <div>Повторяющаяся</div>
                            <Select
                                onChange={value => handleChangeType(value, 'repeatday')}
                                value={currentTask.repeatday}
                                style={{ width: 200 }}
                                size='large'
                            >
                                <Option value={1}>1</Option>
                                <Option value={2}>2</Option>
                                <Option value={3}>3</Option>
                                <Option value={30}>30</Option>
                            </Select>
                        </div>
                        : null
                }
            </div> */}


            {/* <div className='input_div'>
                <div>План выполнить</div>
                <Select
                    onChange={value => handleChangeType(value, 'plan')}
                    value={currentTask.plan}
                    style={{ width: '100%' }}
                    size='large'
                >
                    <Option value="inbox">inbox</Option>
                    <Option value="today">today</Option>
                    <Option value="week">week</Option>
                    <Option value="upcoming">upcoming</Option>
                    <Option value="later">later</Option>
                </Select>
            </div> */}




            {/* <div className='input_div'>
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
            } */}

            {
                currentTask.type === 'проект'
                    ? <>
                        <div className='subtask_block'>
                            <div>Подзадачи</div>
                            <div
                                onClick={() => setIsSubtask(true)}
                                className='subtask_button'
                            >
                                +
                            </div>
                        </div>

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
                                    plan='inbox'
                                />
                                : null
                        }
                    </>
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