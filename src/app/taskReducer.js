import { createSlice } from "@reduxjs/toolkit"
import arrayMove from 'array-move';
import { API } from '../api/tasks'



export const tasksSlice = createSlice({
    name: 'tasks',
    initialState: {
        isFetching: false,
        tasks: [],
        todaytasks: [],
        projects: [],
        today: [],
        doneTasks: [],
        week: [],
        plan: 'today',
        filtertype: 'plan',
        currentTask: null,
        modalIsOpen: false,
        typeOfModal: 'new',
        date: '',
        isplan: false,
        search: ''
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
        saveTask: (state, action) => {
            const newTasks = state.tasks.map(task => {
                if (task.id === state.currentTask.id) {
                    if (state.currentTask.date) {
                        return {
                            ...state.currentTask,
                            plan: 'plan'
                        }
                    } else {
                        return {
                            ...state.currentTask,
                        }
                    }
                } else {
                    return task
                }
            })
            state.tasks = newTasks
        },
        addTask: (state, action) => {
            state.tasks = [...state.tasks, action.payload]
        },
        deleteTask: (state, action) => {
            const newTasks = state.tasks.filter(task => task.id !== state.currentTask.id)
            state.tasks = newTasks
        },
        setProjects: (state, action) => {
            state.projects = action.payload
        },
        upTask: (state, action) => {
            const newTasks = state.tasks.map(task => {
                if (task.plan === 'today') {
                    if ((task.index + 1) === action.payload.index) {
                        return { ...task, index: task.index + 1 }
                    } else if (task.id === action.payload.task_id) {
                        return { ...task, index: task.index - 1 }
                    } else {
                        return task
                    }
                } else {
                    return task
                }
            })
                .sort((a, b) => a.index > b.index ? 1 : -1)

            state.tasks = newTasks
            // state.projects = action.payload
        },




        setPlan: (state, action) => {
            state.plan = action.payload.plan
            state.filtertype = action.payload.filtertype
        },

        setWeek: (state, action) => {
            state.week = action.payload
        },
        // addTask: (state, action) => {
        //     state.tasks.all = [...state.tasks.all, action.payload]
        //     state.tasks.inbox = [...state.tasks.inbox, action.payload]
        // },
        // saveTask: (state, action) => {
        //     const { id, plan } = state.currentTask
        //     const oldTask = state.tasks.find(task => task.id === id)
        //     if (oldTask.plan !== plan) {
        //         const oldTasks = state.tasks[oldTask.plan].filter(task => task.id !== state.currentTask.id)
        //         const newAllTasks = state.tasks.all.map(task => task.id === state.currentTask.id ? { ...state.currentTask } : task)
        //         const newPlanTasks = [...state.tasks[plan], { ...state.currentTask }]
        //         state.tasks = {
        //             ...state.tasks,
        //             [oldTask.plan]: oldTasks,
        //             [plan]: newPlanTasks,
        //             all: newAllTasks
        //         }
        //     } else {
        //         const newAllTasks = state.tasks.all.map(task => task.id === state.currentTask.id ? { ...state.currentTask } : task)
        //         const newPlanTasks = state.tasks[plan].map(task => task.id === state.currentTask.id ? { ...state.currentTask } : task)
        //         state.tasks = {
        //             ...state.tasks,
        //             [plan]: newPlanTasks,
        //             all: newAllTasks
        //         }
        //     }
        // },
        // deleteTask: (state, action) => {

        //     const { id, plan } = state.currentTask

        //     const newTasks = state.tasks.all.filter(task => task.id !== id)
        //     const newPlanTasks = state.tasks[plan].filter(task => task.id !== id)


        //     // state.tasks = newTasks
        //     state.tasks = {
        //         ...state.tasks,
        //         all: newTasks,
        //         [plan]: newPlanTasks,
        //     }
        // },
        doTask: (state, action) => {
            const doneTask = state.tasks.find(task => task.id === action.payload)
            const newPlanTasks = state.tasks.filter(task => task.id !== action.payload)
            const newTodayTasks = state.todaytasks.filter(task => task.id !== action.payload)
            const newPlanTasksWithNewIndexes = newPlanTasks.length > 0 ? newPlanTasks.map(item => item.index > doneTask.index ? { ...item, index: item.index - 1 } : item) : newPlanTasks
            state.tasks = newPlanTasksWithNewIndexes
            state.todaytasks = newTodayTasks
            state.doneTasks = [...state.doneTasks, { ...doneTask, done: true, plan: 'done' }]
            // state.tasks = newTasksWithNewIndexes
            // state.doneTasks = [...state.doneTasks, { ...doneTask, done: true, plan: 'done' }]
            // state.tasks = {
            //     ...state.tasks,
            //     // [state.plan]: newPlanTasksWithNewIndexes,
            //     // done: [...state.tasks.done, { ...doneTask, done: true, plan: 'done' }],
            //     // all: state.tasks.all.map(task => task.id === action.payload ? { ...doneTask, done: true, plan: 'done' } : task)
            // }



            // открыть родителя если это была подзадача
            const parentTask = state.tasks.find(task => task.id === doneTask.child)
            if (parentTask) {
                state.modalIsOpen = true
                state.typeOfModal = 'edit'
                const subtasks = state.tasks.filter(task => task.child === parentTask.id && !task.done)

                state.currentTask = { ...parentTask, subtasks: subtasks }
            } else {
                state.modalIsOpen = false
            }
            // const parentTask = state.tasks.find(task => task.id === doneTask.child)
            // if (parentTask && state.tasks.filter(task => task.done === false && task.child === parentTask.id).length === 0) {
            //     state.modalIsOpen = true
            //     state.typeOfModal = 'edit'
            //     const subtasks = state.tasks.filter(task => task.child === parentTask.id && !task.done)
            //     state.currentTask = { ...parentTask, subtasks: subtasks }
            // } else {
            //     state.modalIsOpen = false
            // }
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
        },
        changePlan: (state, action) => {

            const { task_id, oldPlan, newPlan, oldIndex, newIndex } = action.payload;

            if (oldPlan === newPlan) {
                const newTasks = arrayMove(state.tasks[oldPlan], oldIndex, newIndex)
                state.tasks[oldPlan] = newTasks
                // const newTasks = state.taskss[oldPlan].map(task => task.id === task_id ? {...task, plan: newPlan} : task)
            }

            // const newTasks = state.tasks.map(task => task.id === task_id ? {...task, plan: newPlan} : task)

            // state.tasks = newTasks


            // const newTasks = state.tasks.map(task => {
            //     if (task.plan === oldPlan) {

            //         if (task.index > oldIndex) {

            //             const newI = task.index - 1

            //             return {
            //                 ...task,
            //                 index: newI
            //             }
            //         } else if (task.index === oldIndex) {
            //             console.log(task)
            //             return { ...task, plan: newPlan, index: newIndex }
            //         } else {
            //             return task
            //         }
            //     } else if (task.plan === newPlan) {
            //         if (task.index >= newIndex) {

            //             const newI = task.index + 1

            //             return {
            //                 ...task,
            //                 index: newI
            //             }
            //         } else {
            //             return task
            //         }
            //     } else {
            //         return task
            //     }
            // })
            // // const changedTask = newTasks.map(task => task.id === task_id ? { ...task, plan: newPlan, index: newIndex } : task)
            // const sortedTasks = newTasks.sort((a, b) => a.index - b.index)
            // state.tasks = sortedTasks
        },
    },
});


// actions

export const { toggleFetching,
    setTasks, addTask, deleteTask, saveTask, doTask,
    setPlanTasks, setTodayTasks,
    setPlan,
    setProjects,
    upTask,
    setCurrentTask, changeCurrentTask,
    addSubtask,
    setModal, closeModal,
    setCurrentDay, setCurrentPlan,
    setSearch,
    changePlan,
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

export const getTodayTasksThunk = () => dispatch => {
    console.log('getthunk')
    dispatch(toggleFetching())
    return API.getTodayTasks()
        .then(response => {
            dispatch(setTodayTasks(response))
            dispatch(toggleFetching())
            return response
        })
}

export const getProjectsThunk = () => dispatch => {
    dispatch(toggleFetching())
    return API.getProjects()
        .then(response => {
            dispatch(setProjects(response))
            dispatch(toggleFetching())
            return response
        })
}

export const getProjectThunk = (project_id) => dispatch => {
    dispatch(toggleFetching())
    return API.getProject(project_id)
        .then(response => {
            dispatch(toggleFetching())
            return response
        })
}

// export const getPlanTasksThunk = () => dispatch => {
//     dispatch(toggleFetching())
//     return API.getPlanTasks()
//         .then(response => {
//             dispatch(setPlanTasks(response))
//             dispatch(toggleFetching())
//             return response
//         })
// }

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

export const upTaskThunk = (index, task_id) => dispatch => {
    dispatch(toggleFetching())
    API.up(index, task_id)
        .then(response => {
            dispatch(upTask({index, task_id}))
            dispatch(toggleFetching())
        })
}




export const getPlanThunk = (date) => dispatch => {
    dispatch(toggleFetching())
    API.getTodayPlan()
        .then(response => {
            dispatch(setCurrentDay(date))
            dispatch(setCurrentPlan(response))
            dispatch(toggleFetching())
        })
}

export const addPlanThunk = () => dispatch => {
    dispatch(toggleFetching())
    API.addTodayPlan()
        .then(response => {
            dispatch(setCurrentDay(response.date))
            dispatch(setCurrentPlan(true))
            dispatch(toggleFetching())
        })
}

export const changePlanThunk = (task_id, oldPlan, newPlan, oldIndex, newIndex) => dispatch => {
    dispatch(toggleFetching())
    API.changePlan(task_id, oldPlan, newPlan, oldIndex, newIndex)
        .then(response => {
            console.log('change')
            dispatch(changePlan({ task_id, oldPlan, newPlan, oldIndex, newIndex }))
            // dispatch(setCurrentPlan(true))
            dispatch(toggleFetching())
        })
}




export default tasksSlice.reducer;