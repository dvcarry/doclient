import { useSelector } from 'react-redux';

import { selectTasks } from '../redux/taskReducer';
import { BALANCE } from '../config/domain';
import { Project } from '../components/Project/Project';
import { useState } from 'react';




export const Projects = () => {

    const [filter, setFilter] = useState(BALANCE[0])

    const { projects } = useSelector(selectTasks)

    // if (projects.length === 0) return null

    const navClickHandler = event => {
        setFilter(event.target.textContent.toLowerCase())
    }



    const filteredProjects = projects.filter(project => project.balance === filter)

    return (
        <div>
            <div className='block'>
                {
                    BALANCE.map(item => (
                        <span
                            className={`nav${filter === item ? ' nav-active' : ''}`}
                            onClick={navClickHandler}
                            key={item}
                        >
                            {item.toUpperCase()}
                        </span>)
                    )
                }
            </div>

            {
                filteredProjects.map(project => {
                    return (
                        <Project
                            key={project.id}
                            // index={index}
                            value={project}
                            childname={project.childname}
                            childdate={project.childdate}
                        />
                    )
                })
            }
            {/* {
                BALANCE.map(item => {
                    const tasks = projects.filter(task => task.balance === item)
                    return (
                        <div className='block' key={item}>
                            <h3>{item.toUpperCase()}</h3>
                            {
                                tasks.map((task, index) => (
                                    <Project
                                        key={task.id}
                                        index={index}
                                        value={task}
                                        childname={task.childname}
                                        childdate={task.childdate}
                                    />
                                ))
                            }
                        </div>
                    )
                })
            } */}
        </div>
    )
}