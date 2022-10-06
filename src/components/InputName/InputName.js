import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectTasks, changeCurrentTask } from '../../redux/taskReducer';
import { changeCurrentTaskThunk } from '../../redux/tasksThunks';



export const InputName = () => {

    const [isChangedName, setIsChangedName] = useState(false)

    const dispatch = useDispatch()

    const { currentTask } = useSelector(selectTasks)

    const handleSaveName = () => {
        if (isChangedName) {
            dispatch(changeCurrentTaskThunk(currentTask.id, { name: currentTask.name }))
        }
    }

    const handleChangeName = (e) => {
        setIsChangedName(true)
        dispatch(changeCurrentTask({ name: e.target.value }))
    }

    return (
        <input 
        className='inputtext inputtext-name' 
        onChange={handleChangeName} 
        onBlur={handleSaveName}
        value={currentTask.name} 
        />
    )
};