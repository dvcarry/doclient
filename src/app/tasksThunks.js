import { API } from "../api/tasks"
import { saveTask, toggleFetching, deleteTask, setProject, closeModal, setError, setTasks, setTask, setDoneTasks } from "./taskReducer"
import axios from '../config/axios'



export const getTasksThunk = () => async dispatch => {    
    try {
        dispatch(toggleFetching())
        const { data } = await axios.get('tasks')
        dispatch(setTasks(data))
    } catch (error) {
        dispatch(setError(error.response.statusText))
    } 
}

export const getTaskThunk = (id) => async dispatch => {
    try {
        dispatch(toggleFetching())
        const { data } = await axios.get('tasks/' + id)
        dispatch(setTask(data))
    } catch (error) {
        dispatch(setError(error.response.statusText))
    } 
}

export const getDoneTasksThunk = () => async dispatch => {
    try {
        dispatch(toggleFetching())
        const { data } = await axios.get('tasks/done')
        dispatch(setDoneTasks(data))
    } catch (error) {
        dispatch(setError(error.response.statusText))
    } 
}









export const saveTaskThunk = (task) => dispatch => {
    dispatch(toggleFetching())
    API.editTask(task)
        .then(response => {
            dispatch(saveTask())
        })
}

export const deleteTaskThunk = (task_id, parent) => async dispatch => {
    dispatch(toggleFetching())
    await API.deleteTask(task_id)
    dispatch(deleteTask(task_id))
    if (parent) {
        const project = await API.project.getProject(parent)
        dispatch(setProject(project))
    } else {
        dispatch(closeModal())
        dispatch(toggleFetching())
    }
}