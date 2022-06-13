import { useSelector } from 'react-redux';

import { selectTasks } from '../redux/taskReducer';
import { Goal } from '../components/Goal/Goal';


export const Goals = () => {

    const { goals } = useSelector(selectTasks)

    // const navClickHandler = event => {
    //     setFilter(event.target.textContent.toLowerCase())
    // }

    return (
        <div>
            {
                goals.map(goal => {
                    return (
                        <Goal
                            key={goal.id}
                            // index={index}
                            name={goal.name}
                            description={goal.description}
                        />
                    )
                })
            }
        </div>
    )
}