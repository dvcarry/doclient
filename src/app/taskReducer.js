import { createSlice } from "@reduxjs/toolkit"
import { API } from '../api/tasks'



export const tasksSlice = createSlice({
    name: 'tasks',
    initialState: {
        isFetching: false,
        tasks: [],
        doneTasks: [],
        plan: 'today',
        filtertype: 'plan',
        currentTask: null,
        modalIsOpen: false,
        typeOfModal: 'new'
    },
    reducers: {
        toggleFetching: state => {
            state.isFetching = !state.isFetching
        },
        setTasks: (state, action) => {
            state.tasks = action.payload
        },
        setPlan: (state, action) => {
            state.plan = action.payload.plan
            state.filtertype = action.payload.filtertype
        },
        addTask: (state, action) => {
            state.tasks = [...state.tasks, action.payload]
        },
        saveTask: (state, action) => {
            const newTasks = state.tasks.map(task => task.id === state.currentTask.id ? { ...state.currentTask } : task)
            state.tasks = newTasks
        },
        deleteTask: (state, action) => {
            const newTasks = state.tasks.filter(task => task.id !== action.payload)
            state.tasks = newTasks
        },
        doTask: (state, action) => {
            const doneTask = state.tasks.find(task => task.id === action.payload)
            const newTasks = state.tasks.filter(task => task.id !== action.payload)
            const newTasksWithNewIndexes = newTasks.length > 0 ? newTasks.map(item => item.index > doneTask.index ? { ...item, index: item.index - 1 } : item) : newTasks
            state.tasks = newTasksWithNewIndexes
            state.doneTasks = [...state.doneTasks, { ...doneTask, done: true, plan: 'done' }]


            // открыть родителя если это была последняя подзадача
            const parentTask = state.tasks.find(task => task.id === doneTask.child)
            if (parentTask && state.tasks.filter(task => task.done === false && task.child === parentTask.id).length === 0) {
                state.modalIsOpen = true
                state.typeOfModal = 'edit'
                const subtasks = state.tasks.filter(task => task.child === parentTask.id && !task.done)
                state.currentTask = { ...parentTask, subtasks: subtasks }
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
            const subtasks = state.tasks.filter(task => task.child === action.payload.currentTask.id && !task.done)
            state.currentTask = { ...action.payload.currentTask, subtasks: subtasks }
        },
        closeModal: state => {
            state.modalIsOpen = false
        },
        changeCurrentTask: (state, action) => {
            state.currentTask = { ...state.currentTask, [action.payload.type]: action.payload.value }
        },
        addSubtask: (state, action) => {
            state.tasks = [...state.tasks, action.payload]
            state.currentTask.subtasks = [...state.currentTask.subtasks, action.payload]
        },
    },
});


// actions

export const { toggleFetching,
    setTasks, addTask, deleteTask, saveTask, doTask,
    setPlan,
    setCurrentTask, changeCurrentTask,
    addSubtask,
    setModal, closeModal
} = tasksSlice.actions;


// selects

export const selectTasks = state => state.state


// thunk

export const getTasksThunk = () => dispatch => {
    dispatch(toggleFetching())
    return API.getTasks()
        .then(response => {
            dispatch(setTasks(response))
            dispatch(toggleFetching())
            return response
        })
}

export const addTaskThunk = (newTask) => dispatch => {
    dispatch(toggleFetching())
    API.addTask(newTask)
        .then(response => {
            dispatch(addTask(response))
            dispatch(toggleFetching())
            dispatch(closeModal())
        })
}

export const saveTaskThunk = (task) => dispatch => {
    dispatch(toggleFetching())
    API.editTask(task)
        .then(response => {
            dispatch(saveTask())
            dispatch(toggleFetching())
            dispatch(closeModal())
        })
}

export const doTaskThunk = (id, index, plan) => dispatch => {
    dispatch(toggleFetching())
    API.do(id, index, plan)
        .then(response => {
            dispatch(doTask(id))
            dispatch(toggleFetching())
            // dispatch(closeModal())
        })
}

export const deleteTaskThunk = (task_id) => dispatch => {
    dispatch(toggleFetching())
    API.deleteTask(task_id)
        .then(response => {
            dispatch(deleteTask(task_id))
            dispatch(toggleFetching())
            dispatch(closeModal())
        })
}

export const addSubtaskThunk = (newTask) => dispatch => {
    dispatch(toggleFetching())
    API.addTask(newTask)
        .then(response => {
            dispatch(addSubtask(response))
            dispatch(toggleFetching())
        })
}


export default tasksSlice.reducer;