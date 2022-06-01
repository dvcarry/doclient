import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Select } from 'antd';

import { selectTasks, getProjectsThunk, changeCurrentTask, getProjectThunk, setModal } from '../../app/taskReducer';
import './ParentTask.css'


export const ParentTask = ({ id, name }) => {

    const [isParent, setIsParent] = useState(false)
    const { projects, isFetching } = useSelector(selectTasks)

    const dispatch = useDispatch()

    const startChooseParent = async () => {
        if (projects.length === 0) {
            dispatch(getProjectsThunk())
        }
        setIsParent(true)
    }

    const handleChangeType = (value) => {
        dispatch(changeCurrentTask({ type: 'child', value }))
    }

    const clickHandler = async () => {
        const task = await dispatch(getProjectThunk(id))
        dispatch(setModal({typeOfModal: 'edit', currentTask: task})) 
    }

    const { Option } = Select;

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
            <a
                onClick={startChooseParent}
            >
                Добавить родителя
            </a>)
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
}
// export const ParentTask = ({ task }) => {

//     const dispacth = useDispatch()

//     const clickHandler = () => {
//         dispacth(setModal({typeOfModal: 'edit', currentTask: task}))
//     }

//     return (
//         <>
//             <div
//                 className='parenttask'
//                 onClick={clickHandler}

//             >
//                 {task.name}
//             </div>
//         </>
//     )
// }