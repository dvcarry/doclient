import { createSlice } from "@reduxjs/toolkit"
import { CURRENT_TASK, MODAL_TYPES } from "../config/domain";




export const tasksSlice = createSlice({
    name: 'tasks',
    initialState: {
        goals: [],
        tasks: [],
        projects: [],
        currentTask: null,
        isFetching: false,
        modalIsOpen: false,
        typeOfModal: 'new',
        todaytasks: [],
        doneTasks: [],
        daytext: false,
        error: '',
        breaks: 0,
        focus: null
    },
    reducers: {
        toggleFetching: state => {
            state.isFetching = !state.isFetching
        },
        setTasks: (state, action) => {
            state.tasks = action.payload
            state.isFetching = false
        },
        // setTodayTasks: (state, action) => {
        //     state.todaytasks = action.payload
        //     // state.doneTasks = action.payload.doneTasks
        // },
        setDoneTasks: (state, action) => {
            state.doneTasks = action.payload
        },
        setDay: (state, action) => {
            if (action.payload) {
                state.daytext = true
                state.isFetching = false
                state.modalIsOpen = false
            }
        },
        saveTask: (state) => {
            const newTasks = state.tasks.map(task => task.id === state.currentTask.id ? ({ ...state.currentTask }) : task)
            state.tasks = newTasks
            state.isFetching = false
            state.modalIsOpen = false
        },
        addTask: (state, action) => {
            state.tasks = [...state.tasks, action.payload]
            state.isFetching = false
            state.modalIsOpen = false
        },
        deleteTask: (state, action) => {
            const newTasks = state.tasks.filter(task => task.id !== state.currentTask.id)
            state.tasks = newTasks
        },
        deleteProject: (state, action) => {
            const newProjects = state.projects.filter(project => project.id !== action.payload)
            state.projects = newProjects
        },
        setProjects: (state, action) => {
            state.projects = action.payload
        },
        setPlan: (state, action) => {
            state.plan = action.payload.plan
            state.filtertype = action.payload.filtertype
        },
        setWeek: (state, action) => {
            state.week = action.payload
        },
        doTask: (state, action) => {

            const { id, parent } = action.payload
            const task = state.tasks.find(task => task.id === id)
            const newTasks = state.tasks.filter(task => task.id !== id)
            state.tasks = newTasks
            state.doneTasks = [...state.doneTasks, task]

            // открыть родителя если это была подзадача
            // const parentTask = state.tasks.find(task => task.id === parent)

            if (action.payload.parent.hasParent) {
                state.modalIsOpen = true
                state.typeOfModal = MODAL_TYPES.project
                state.currentTask = action.payload.parent.project
            } else {
                state.modalIsOpen = false
            }
            state.breaks = state.breaks + 1
            state.isFetching = false
        },
        setCurrentTask: (state, action) => {
            state.currentTask = action.payload
        },
        setModal: (state, action) => {
            state.modalIsOpen = true
            state.typeOfModal = action.payload.typeOfModal
            // const subtasks = state.tasks.filter(task => task.child === action.payload.currentTask.id && !task.done)
            // state.currentTask = { ...action.payload.currentTask, subtasks: subtasks }
        },
        openNewTask: (state, action) => {
            state.modalIsOpen = true
            state.typeOfModal = MODAL_TYPES.new
            state.currentTask = CURRENT_TASK
        },
        setProject: (state, action) => {
            state.modalIsOpen = true
            state.typeOfModal = MODAL_TYPES.project
            state.currentTask = action.payload
            state.isFetching = false
        },
        changeToProject: (state, action) => {
            state.modalIsOpen = true
            state.typeOfModal = MODAL_TYPES.project
            state.currentTask = action.payload
            const newTasks = state.tasks.filter(task => task.id !== action.payload.id)
            state.tasks = newTasks
            const newProjects = [...state.projects, action.payload]
            state.projects = newProjects
            state.isFetching = false
        },
        setTask: (state, action) => {
            state.modalIsOpen = true
            state.typeOfModal = MODAL_TYPES.task
            state.currentTask = action.payload
            state.isFetching = false
        },
        changeTask: (state, action) => {
            const newTasks = state.tasks.map(task => task.id === action.payload.id ? {...task, ...action.payload} : task)
            state.tasks = newTasks
            if (action.payload.donedate) {
                const newDoneTasks = state.doneTasks.filter(task => task.id !== action.payload.id)
                state.doneTasks = newDoneTasks
            }
            state.isFetching = false
        },
        closeModal: state => {
            state.modalIsOpen = false
        },
        changeCurrentTask: (state, action) => {
            state.currentTask = { ...state.currentTask, [action.payload.type]: action.payload.value }
            const newTasks = state.tasks.map(task => task.id === state.currentTask.id ? { ...task, [action.payload.type]: action.payload.value } : task)
            state.tasks = newTasks
        },
        addSubtask: (state, action) => {
            state.tasks = [...state.tasks, action.payload]
            // state.tasks[action.payload.plan] = [...state.tasks[action.payload.plan], action.payload]
            state.currentTask.subtasks = [...state.currentTask.subtasks, action.payload]
            state.isFetching = false
        },
        setCurrentDay: (state, action) => {
            state.date = action.payload
        },
        setCurrentPlan: (state, action) => {
            state.isplan = action.payload
        },
        setSearch: (state, action) => {
            state.search = action.payload
        },
        setGoals: (state, action) => {
            state.goals = action.payload
            state.isFetching = false
        },
        setError: (state, action) => {
            state.error = action.payload
            state.isFetching = false
        },
        resetBreaks: (state, action) => {
            state.breaks = 0
        },
        setFocus: (state, action) => {
            state.focus = action.payload
        },
    },
});


// actions

export const { toggleFetching,
    setTasks, addTask, deleteTask, saveTask, doTask, changeToProject,
    setPlanTasks, setTodayTasks, setDoneTasks,
    setProjects, deleteProject, setProject,
    setCurrentTask, changeCurrentTask,
    addSubtask,
    openNewTask,
    setModal, closeModal,
    setDay,
    setTask, changeTask,
    setGoals,
    setError,
    resetBreaks,
    setFocus,
} = tasksSlice.actions;


export const selectTasks = state => state


export default tasksSlice.reducer;