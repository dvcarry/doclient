import { setError, setProjects, toggleFetching, setProject, closeModal, deleteProject } from "./taskReducer"
import axios from '../config/axios'

export const getProjectsThunk = () => async dispatch => {
    try {
        dispatch(toggleFetching())
        const { data } = await axios.get('projects')
        dispatch(setProjects(data))
    } catch (error) {
        dispatch(setError(error.response.statusText))
    }
}

export const getProjectThunk = (project_id) => async dispatch => {
    try {
        dispatch(toggleFetching())
        const { data } = await axios.get('projects/' + project_id)
        dispatch(setProject(data))
    } catch (error) {
        dispatch(setError(error.response.statusText))
    }
}

export const deleteProjectThunk = (project_id) => async dispatch => {
    try {
        dispatch(toggleFetching())
        const { data } = await axios.delete('tasks/' + project_id)
        dispatch(deleteProject(project_id))
        dispatch(closeModal())
        dispatch(toggleFetching())
        // dispatch(setProject(data))
    } catch (error) {
        dispatch(setError(error.response.statusText))
    }
}

