import { useState } from 'react';
import { Select, Button, Switch } from 'antd';
import TextareaAutosize from 'react-textarea-autosize';
import { useDispatch, useSelector } from 'react-redux';

import { Subtask } from '../Subtask/Subtask';
import { SubtaskEdit } from '../Subtask/SubtaskEdit';
import { Do } from '../Do/Do';

import { changeCurrentTask, selectTasks } from '../../redux/taskReducer';
import { saveTaskThunk } from '../../redux/tasksThunks';
import { deleteProjectThunk } from '../../redux/projectsThunks';

import './ModalForm.css'




export const ProjectForm = () => {

    const { Option } = Select;
    const { currentTask, tasks, isFetching } = useSelector(selectTasks)

    const dispatch = useDispatch()

    const [isSubtask, setIsSubtask] = useState(false)

    const handleChangeName = e => {
        // changeCurrentTask('name', e.target.value)
        dispatch(changeCurrentTask({ type: 'name', value: e.target.value }))
    }

    const handleChangeType = (value, option) => {
        dispatch(changeCurrentTask({ type: option, value }))
    }


    // const keyPressHandler = e => {
    //     if (e.keyCode === 13 && e.ctrlKey) {
    //         setIsSubtask(true)
    //     }
    // }

    const deleteHandler = () => {
        dispatch(deleteProjectThunk(currentTask.id))
    }

    const saveCurrentTask = () => {
        if (currentTask.balance) {
            dispatch(saveTaskThunk(currentTask))
        }
    }

    // const sortHandler = async ({ oldIndex, newIndex }) => {
    //     // setTasks(tasks => arrayMove(tasks, oldIndex, newIndex))
    //     // await API.reindex(plan, oldIndex, newIndex)
    // }

    const parentTasks = tasks.find(task => task.id === currentTask.child)


    return (
        <div>
            <div>
                <div className='flex'>
                    <Do task={currentTask} />
                    <TextareaAutosize
                        className='inputtext inputtext-name'
                        value={currentTask.name}
                        onChange={handleChangeName}
                        onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault()}}
                    />
                </div>
            </div>
            <div className='input_block'>
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
                <div className='input_div'>
                    <div>Цель</div>
                    <Switch defaultChecked={currentTask.goal} onChange={value => handleChangeType(value, 'goal')} />
                </div>
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
                currentTask.subtasks.map((subtask, index) => (
                    <Subtask
                        task={subtask}
                        key={subtask.id}
                        index={index}
                    />
                ))
            }
            {
                isSubtask
                    ? <SubtaskEdit
                        close={() => setIsSubtask(false)}
                        goal={currentTask.goal}
                        balance={currentTask.balance}
                        parent={currentTask.id}
                    />
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