import { createSlice } from "@reduxjs/toolkit"
import arrayMove from 'array-move';
import { CURRENT_TASK, MODAL_TYPES } from "../config/domain";




export const tasksSlice = createSlice({
    name: 'tasks',
    initialState: {
        tasks: [],
        projects: [],
        currentTask: null,
        isFetching: false,
        modalIsOpen: false,
        typeOfModal: 'new',
        todaytasks: [],
        doneTasks: [],
        daytext: false
        // today: [],
        
        // week: [],
        // plan: 'today',
        // filtertype: 'plan',
        
        
        
        // date: '',
        // isplan: false,
        // search: ''
    },
    reducers: {
        toggleFetching: state => {
            state.isFetching = !state.isFetching
        },
        setTasks: (state, action) => {
            state.tasks = action.payload
        },
        setTodayTasks: (state, action) => {
            state.todaytasks = action.payload
            // state.doneTasks = action.payload.doneTasks
        },
        setDoneTasks: (state, action) => {
            state.doneTasks = action.payload
        },
        setDay: (state, action) => {
            if (action.payload) {
                state.daytext = true
            }            
        },
        saveTask: (state, action) => {
            const newTasks = state.tasks.map(task => task.id === state.currentTask.id ? ({...state.currentTask}) : task)
            state.tasks = newTasks
        },
        addTask: (state, action) => {
            state.tasks = [...state.tasks, action.payload]
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
            state.typeOfModal = 'project'
            state.currentTask = action.payload
            state.isFetching = false
        },
        
        closeModal: state => {
            state.modalIsOpen = false
        },
        changeCurrentTask: (state, action) => {
            state.currentTask = { ...state.currentTask, [action.payload.type]: action.payload.value }
        },
        addSubtask: (state, action) => {
            state.tasks = [...state.tasks, action.payload]
            // state.tasks[action.payload.plan] = [...state.tasks[action.payload.plan], action.payload]
            state.currentTask.subtasks = [...state.currentTask.subtasks, action.payload]
        },
        setCurrentDay: (state, action) => {
            state.date = action.payload
        },
        setCurrentPlan: (state, action) => {
            state.isplan = action.payload
        },
        setSearch: (state, action) => {
            state.search = action.payload
        }
    },
});


// actions

export const { toggleFetching,
    setTasks, addTask, deleteTask, saveTask, doTask,
    setPlanTasks, setTodayTasks, setDoneTasks,
    setProjects, deleteProject, setProject,
    setCurrentTask, changeCurrentTask,
    addSubtask,
    openNewTask,
    setModal, closeModal,
    setDay,
    // setPlan,
    // upTask,
    // setCurrentDay, setCurrentPlan,
    // setSearch,
    // changePlan,    
} = tasksSlice.actions;



export const selectTasks = state => state


export default tasksSlice.reducer;