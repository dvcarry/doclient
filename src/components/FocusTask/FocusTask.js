import { useSelector } from 'react-redux';
import { selectTasks } from '../../app/taskReducer';
import { Do } from '../Do/Do';

import './FocusTask.css'


export const FocusTask = () => {

    // const dispatch = useDispatch()

    const { currentTask } = useSelector(selectTasks)

    return (
        <div className='focustask'>
            <Do />
            <span className='focustask_heading'>{currentTask.name}</span>
            {
                currentTask.childname 
                ? <span>{` < ${currentTask.childname}`}</span> 
                : null
            }
        </div>
    )
}