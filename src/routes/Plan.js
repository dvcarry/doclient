// import React, { useEffect } from 'react';

import { Sidebar } from '../components/Sidebar/Sidebar'
import { Header } from '../components/Header/Header'
import { Score } from '../components/Score/Score'

import './routes.css'
import { useSelector } from 'react-redux';
import { selectTasks } from '../app/taskReducer';
import { Tasks } from '../components/Tasks/Tasks';
import { PLANS } from '../config/domain';
import { useState } from 'react';



export const Plan = () => {

    const { tasks, plan, filtertype, search } = useSelector(selectTasks)




    // const planTasks = tasks.filter(task => task.plan === plan)
    let planTasks

    if (filtertype === 'plan') {
        planTasks = tasks.filter(task => task.plan === plan)
    } else if (filtertype === 'balance') {
        planTasks = tasks
        .filter(task => task.balance === plan && task.plan !== 'done')
        .sort((a, b) => PLANS.indexOf(a.plan) - PLANS.indexOf(b.plan))
    }

    if (search !== '') {
        planTasks = tasks.filter(task => task.name.toLowerCase().includes(search.toLowerCase()))
    }

    const todayTasks = tasks.filter(task => task.plan === 'today')

    return (
        <div className='grid'>
            <Sidebar />
            <div>
                <Header />
                <div className='grid_worksection'>
                    <div className='section'>
                        <Tasks planTasks={planTasks} plan={plan} />
                    </div>
                    <div className='section'>
                        <Score tasks={tasks} />
                    </div>
                </div>
            </div>
        </div>
    )
}