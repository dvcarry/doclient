import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Select } from 'antd';

import { selectTasks, changeCurrentTask } from '../../redux/taskReducer';
import { getProjectsThunk, getProjectThunk } from '../../redux/projectsThunks';
import { addToProjectThunk, changeToProjectThunk } from '../../redux/tasksThunks';

import './ParentTask.css'

const { Option } = Select;


export const ParentTask = ({ parent, name, id }) => {

    const [isParent, setIsParent] = useState(false)
    const { projects, isFetching } = useSelector(selectTasks)

    const dispatch = useDispatch()

    const startChooseParent = async () => {
        if (projects.length === 0) {
            dispatch(getProjectsThunk())
        }
        setIsParent(true)
    }

    const handleChangeType = (value, values) => {
        dispatch(addToProjectThunk(id, value))
        // dispatch(changeCurrentTask({ type: 'parentid', value: values.value }))
        dispatch(changeCurrentTask({ type: 'parent', value: values.value }))
        dispatch(changeCurrentTask({ type: 'parentname', value: values.children }))
        const project = projects.find(project => project.id === value)
        dispatch(changeCurrentTask({ type: 'balance', value: project.balance }))
        dispatch(changeCurrentTask({ type: 'goal', value: project.goal }))
    }

    const clickHandler = () => {
        dispatch(getProjectThunk(parent))
    }
    
    const changeToProject = () => {
        dispatch(changeToProjectThunk(id))
    }

    if (isParent) {
        return (
            <Select
                showSearch
                style={{ width: '100%' }}
                // onChange={value => handleChangeType(value, 'child')} value={currentTask.child}
                onChange={handleChangeType}
                // value={currentTask.child}
                filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
            >
                {
                    projects.map(task => <Option value={task.id}>{task.name}</Option>)
                }
            </Select>
        )
    }

    if (!name) {
        return (
            <div
            className='parenttask'>
                <a onClick={startChooseParent}>Добавить родителя</a>
                <a onClick={changeToProject}>Сделать проектом</a>
            </div>
        )
    }

    return (
        <>
            <div
                className='parenttask'
                onClick={clickHandler}
            >
                {name}
            </div>
        </>
    )
};