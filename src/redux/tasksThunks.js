import { saveTask, toggleFetching, deleteTask, setFailures, doFailures, changeCurrentTask, changeToProject, setProject, closeModal, setError, setTasks, setTask, setDoneTasks, addTask, addSubtask, doTask, changeTask } from "./taskReducer"
import axios from '../config/axios'

export const getTasksThunk = () => async dispatch => {
    try {
        dispatch(toggleFetching())
        const { data } = await axios.get('tasks')
        dispatch(setTasks(data))
    } catch (error) {
        dispatch(setError(error.response.statusText))
    }
};

export const getTaskThunk = (id) => async dispatch => {
    try {
        dispatch(toggleFetching())
        const { data } = await axios.get('tasks/' + id)
        dispatch(setTask(data))
    } catch (error) {
        dispatch(setError(error.response.statusText))
    }
};

export const getDoneTasksThunk = () => async dispatch => {
    try {
        dispatch(toggleFetching())
        const { data } = await axios.get('tasks/done')
        dispatch(setDoneTasks(data))
    } catch (error) {
        dispatch(setError(error.response.statusText))
    }
};


export const saveTaskThunk = (task) => async dispatch => {
    try {
        dispatch(toggleFetching())
        await axios.put('tasks', task)
        dispatch(saveTask())
    } catch (error) {
        dispatch(setError(error.response.statusText))
    }
};


export const addTaskThunk = (newTask) => async dispatch => {
    try {
        dispatch(toggleFetching())
        const { data } = await axios.post('tasks', newTask)
        dispatch(addTask(data))
    } catch (error) {
        dispatch(setError(error.response.statusText))
    }
};

export const doTaskThunk = (id) => async dispatch => {
    try {
        dispatch(toggleFetching())
        const { data } = await axios.post('tasks/do', { id })
        dispatch(doTask({ id, parent: data }))
    } catch (error) {
        dispatch(setError(error.response.statusText))
    }
};


export const deleteTaskThunk = (task_id, parent) => async dispatch => {
    try {
        dispatch(toggleFetching())
        await axios.delete('tasks/' + task_id)
        dispatch(deleteTask(task_id))
        if (parent) {
            // const project = await API.project.getProject(parent)
            const { data } = await axios.get('projects/' + parent)
            dispatch(setProject(data))
        } else {
            dispatch(closeModal())
            dispatch(toggleFetching())
        }

    } catch (error) {
        dispatch(setError(error.response.statusText))
    }
};

export const changeToProjectThunk = (task_id) => async dispatch => {
    try {
        dispatch(toggleFetching())
        const { data } = await axios.put('tasks/toproject', { id: task_id })
        dispatch(changeToProject(data))
    } catch (error) {
        dispatch(setError(error.response.statusText))
    }
};

export const addToProjectThunk = (id, parent) => async dispatch => {
    try {
        dispatch(toggleFetching())
        const { data } = await axios.put('tasks/addtoproject', { id, parent })
        // dispatch(changeToProject(data))
    } catch (error) {
        dispatch(setError(error.response.statusText))
    }
};

export const changeSomeTaskThunk = (task_id, data) => async dispatch => {
    try {
        dispatch(toggleFetching())
        const dateWithId = { id: task_id, ...data }
        await axios.put('tasks/one', dateWithId)
        dispatch(changeTask(dateWithId))
    } catch (error) {
        dispatch(setError(error.response.statusText))
    }
};

export const changeCurrentTaskThunk = (task_id, data) => async dispatch => {
    try {
        dispatch(toggleFetching())
        const changedData = { id: task_id, ...data }
        await axios.put('tasks/one', changedData)
        dispatch(changeCurrentTask(data))
    } catch (error) {
        dispatch(setError(error.response.statusText))
    }
};

export const addSubtaskThunk = (newTask) => async dispatch => {

    try {
        dispatch(toggleFetching())
        const { data } = await axios.post('tasks', newTask)
        dispatch(addSubtask(data))
    } catch (error) {
        dispatch(setError(error.response.statusText))
    }
};


export const getFailuresThunk = () => async dispatch => {

    try {
        dispatch(toggleFetching())
        const { data } = await axios.get('failures')
        dispatch(setFailures(data))
    } catch (error) {
        dispatch(setError(error.response.statusText))
    }
};

export const addFailuresThunk = (task_id, description) => async dispatch => {

    try {
        dispatch(toggleFetching())
        const { data } = await axios.post('failures', { task_id, description })
        dispatch(doFailures(task_id))
    } catch (error) {
        dispatch(setError(error.response.statusText))
    }
};