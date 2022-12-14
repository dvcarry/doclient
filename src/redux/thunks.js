// import { API } from '../api/tasks'
// import { toggleFetching, setProjects, setError, setTask, deleteProject, setTasks, closeModal, doTask, addTask, deleteTask, setDay, setTodayTasks, saveTask, addSubtask, setCurrentDay, changePlan, setModal, setProject, setDoneTasks, } from './taskReducer'




// export const getDayThunk = () => async dispatch => {
//     dispatch(toggleFetching())
//     const day = await API.days.getDay()
//     dispatch(setDay(day))
//     dispatch(toggleFetching())
// }


// export const getProjectsThunk = () => dispatch => {
//     dispatch(toggleFetching())
//     return API.project.getProjects()
//         .then(response => {
//             dispatch(setProjects(response))
//             dispatch(toggleFetching())
//             return response
//         })
// }

// export const getProjectThunk = (project_id) => dispatch => {
//     dispatch(toggleFetching())
//     return API.project.getProject(project_id)
//         .then(response => {
//             dispatch(setProject(response))
//             return response
//         })
// }

// export const deleteProjectThunk = (project_id) => dispatch => {
//     dispatch(toggleFetching())
//     return API.deleteTask(project_id)
//         .then(response => {
//             dispatch(deleteProject(project_id))
//             dispatch(toggleFetching())
//             dispatch(closeModal())
//         })
// }










// export const getTaskThunk = (id) => dispatch => {
//     dispatch(toggleFetching())
//     return API.getTask(id)
//         .then(response => {
//             dispatch(setTasks(response))
//             dispatch(toggleFetching())
//             return response
//         })
// }

// export const getTodayTasksThunk = () => async dispatch => {
//     dispatch(toggleFetching())
//     const todayTasks = await API.getTodayTasks()
//     const doneTasks = await API.getDoneTasks()
//     dispatch(setTodayTasks(todayTasks))
//     dispatch(setDoneTasks(doneTasks))
//     dispatch(toggleFetching())
// }

// export const getDoneTasksThunk = () => async dispatch => {
//     dispatch(toggleFetching())
//     const doneTasks = await API.getDoneTasks()
//     dispatch(setDoneTasks(doneTasks))
//     dispatch(toggleFetching())
// }


// export const addDayTextThunk = (text) => async dispatch => {
//     dispatch(toggleFetching())
//     await API.days.addDayText(text)
//     dispatch(setDay(true))
//     dispatch(closeModal())
//     dispatch(toggleFetching())
// }
// export const getTodayTasksThunk = () => dispatch => {
//     console.log('getthunk')
//     dispatch(toggleFetching())
//     return API.getTodayTasks()
//         .then(response => {
//             dispatch(setTodayTasks(response))
//             dispatch(toggleFetching())
//             return response
//         })
// }



// export const getPlanTasksThunk = () => dispatch => {
//     dispatch(toggleFetching())
//     return API.getPlanTasks()
//         .then(response => {
//             dispatch(setPlanTasks(response))
//             dispatch(toggleFetching())
//             return response
//         })
// }

// export const addTaskThunk = (newTask) => dispatch => {
//     dispatch(toggleFetching())
//     API.addTask(newTask)
//         .then(response => {
//             dispatch(addTask(response))
//             dispatch(toggleFetching())
//             dispatch(closeModal())
//         })
// }



// export const doTaskThunk = (id, index, plan) => dispatch => {
//     dispatch(toggleFetching())
//     API.do(id, index, plan)
//         .then(response => {
//             dispatch(doTask(id))
//             dispatch(toggleFetching())
//             // dispatch(closeModal())
//         })
// }

// export const doTaskThunk = (id) => dispatch => {
//     dispatch(toggleFetching())
//     API.do(id)
//         .then(response => {
//             dispatch(doTask({ id, parent: response }))
//             dispatch(toggleFetching())
//             // dispatch(closeModal())
//         })
// }


// export const deleteTaskThunk = (task_id) => dispatch => {
//     dispatch(toggleFetching())
//     API.deleteTask(task_id)
//         .then(response => {
//             dispatch(deleteTask(task_id))
//             dispatch(toggleFetching())
//             dispatch(closeModal())
//         })
// }

// export const addSubtaskThunk = (newTask) => dispatch => {
//     dispatch(toggleFetching())
//     API.addTask(newTask)
//         .then(response => {
//             dispatch(addSubtask(response))
//             dispatch(toggleFetching())
//         })
// }

// export const upTaskThunk = (index, task_id) => dispatch => {
//     dispatch(toggleFetching())
//     API.up(index, task_id)
//         .then(response => {
//             dispatch(upTask({ index, task_id }))
//             dispatch(toggleFetching())
//         })
// }




// export const getPlanThunk = (date) => dispatch => {
//     dispatch(toggleFetching())
//     API.getTodayPlan()
//         .then(response => {
//             dispatch(setCurrentDay(date))
//             dispatch(setCurrentPlan(response))
//             dispatch(toggleFetching())
//         })
// }

// export const addPlanThunk = () => dispatch => {
//     dispatch(toggleFetching())
//     API.addTodayPlan()
//         .then(response => {
//             dispatch(setCurrentDay(response.date))
//             dispatch(setCurrentPlan(true))
//             dispatch(toggleFetching())
//         })
// }

// export const changePlanThunk = (task_id, oldPlan, newPlan, oldIndex, newIndex) => dispatch => {
//     dispatch(toggleFetching())
//     API.changePlan(task_id, oldPlan, newPlan, oldIndex, newIndex)
//         .then(response => {
//             console.log('change')
//             dispatch(changePlan({ task_id, oldPlan, newPlan, oldIndex, newIndex }))
//             // dispatch(setCurrentPlan(true))
//             dispatch(toggleFetching())
//         })
// }