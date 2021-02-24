import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectTasks, setPlan } from '../../app/taskReducer';
import { BALANCE } from '../../config/domain';
import { SidebarItem } from '../SidebarItem/SidebarItem';
import './Sidebar.css'

const plans = ['inbox', 'today', 'upcoming', 'later', 'done']

export const Sidebar = () => {

    const { plan, tasks } = useSelector(selectTasks)
    const dispatch = useDispatch()

    return (
        <div className='sidebar'>
            <div className='logo'>

            </div>
            <div className='sidebar_block'>
                {
                    plans.map(item => {

                        const amount = tasks.filter(task => task.plan === item).length

                        return (
                            <SidebarItem
                                name={item}
                                key={item}
                                active={plan === item}
                                // click={() => dispatch(setPlan(item))}
                                click={() => dispatch(setPlan({ plan: item, filtertype: 'plan' }))}
                                amount={amount}
                            />
                        )
                    })
                }
            </div >
            <div className='sidebar_block'>
                {
                    BALANCE.map(item => {

                        const amount = tasks.filter(task => task.balance === item).length

                        return (
                            <SidebarItem
                                name={item}
                                key={item}
                                active={plan === item}
                                click={() => dispatch(setPlan({ plan: item, filtertype: 'balance' }))}
                                amount={amount}
                            />
                        )
                    })
                }
            </div>

            <div>

            </div>
        </div>
    )
}