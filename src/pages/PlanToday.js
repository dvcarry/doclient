import React, { useEffect, useState } from 'react';
import { sortableContainer } from 'react-sortable-hoc';
// import arrayMove from 'array-move';
import moment from 'moment';
import 'moment/locale/ru';

import { Switch } from 'antd';

// import './Tasks.css'


import { Task } from '../components/Task/Task';
import { API } from '../api/tasks';
import { useDispatch, useSelector } from 'react-redux';
import { changePlan, getPlanTasksThunk, getTasksThunk, getTodayTasksThunk, selectTasks } from '../app/taskReducer';




// const SortableContainer = sortableContainer(({ children }) => {
//     return <div>{children}</div>;
// });



export const PlanToday = () => {

    const { todaytasks } = useSelector(selectTasks)

    const dispatch = useDispatch()

    // const sortHandler = async ({ oldIndex, newIndex }) => {
    //     // dispatch(changePlan({ oldIndex, newIndex, oldPlan: plan, newPlan: plan }))
    //     // setTasks(tasks => arrayMove(tasks, oldIndex, newIndex))
    //     // await API.reindex(plan, oldIndex, newIndex)
    // }

    useEffect(() => {
        const getTasks = async () => {
            // await dispatch(getTasksThunk())
            await dispatch(getTodayTasksThunk())
        }
        getTasks()
    }, [])

    // const today = new Date()
    // const dates = []
    // const onlyDates = []
    // for (let i = 1; i < 14; i++) {
    //     const date = moment(today).add(i, 'days')
    //     const dateObject = { raw: date.format('YYYY-MM-DD'), show: date.format('DD.MM dddd') }
    //     dates.push(dateObject)
    //     onlyDates.push(date.format('YYYY-MM-DD'))
    // }

    // const onlyTasks = tasks.filter(task => task.type === 'задача')
    // const onlyPlanTasks = onlyTasks.filter(task => task.plan === 'plan')
    // const todayTasks = onlyTasks.filter(task => moment(task.date).isBefore(moment(today)))

    // const yesterdayTasks = onlyTasks.filter(task => moment(task.date).isBefore(moment(today).subtract(1, 'days')))
    // const todayTasks= onlyTasks.filter(task => moment(task.date).format('YYYY-MM-DD') === moment(today).format('YYYY-MM-DD'))
    // .sort((a, b) => a.index - b.index ? 1 : -1)

    // const otherTasks = onlyPlanTasks.filter(task => !onlyDates.includes(task.date))
    // const inboxTasks = onlyTasks.filter(task => task.plan === 'inbox')


    return (
        <div>            
            {/* <div className='plantask_div'>
                <div className='plantask_date'>Инбокс</div>
                {
                    inboxTasks.map((task, index) => (
                        <Task
                            key={task.id}
                            index={index}
                            value={task}
                        />
                    ))
                }
            </div> */}
            <div className='plantask_div'>
                <div className='plantask_date'>СЕГОДНЯ</div>
                {
                    todaytasks.map((task, index) => (
                        <Task
                            key={task.id}
                            index={index}
                            value={task}
                        />
                    ))
                }
            </div>
            
            
            {/* {
                dates.map(date => {
                    const tasksForDate = onlyTasks.filter(task => task.date === date.raw)

                    return (
                        <div className='plantask_div'>
                            <div className='plantask_date'>{date.show}</div>
                            {
                                tasksForDate.map((task, index) => (
                                    <Task
                                        key={task.id}
                                        index={index}
                                        value={task}
                                    />
                                ))
                            }
                        </div>
                    )
                })
            }
            <div className='plantask_div'>
                <div className='plantask_date'>Остальное</div>
                {
                    otherTasks.map((task, index) => (
                        <Task
                            key={task.id}
                            index={index}
                            value={task}
                        />
                    ))
                }
            </div> */}
        </div>
    )
}