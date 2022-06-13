import { useDispatch, useSelector } from 'react-redux';
import { selectTasks,changeCurrentTask, setModal } from '../../app/taskReducer';
import { getProjectsThunk, getProjectThunk } from '../../app/thunks';
// import { selectTasks, getProjectsThunk, changeCurrentTask, getProjectThunk, setModal } from '../../app/taskReducer';



export const useCurrentTask = () => {

    const dispatch = useDispatch()

    const openProject = async (id) => {
        const task = await dispatch(getProjectThunk(id))
        // dispatch(setModal({ typeOfModal: 'edit', currentTask: task }))
    }

    return {
        openProject
    }

}