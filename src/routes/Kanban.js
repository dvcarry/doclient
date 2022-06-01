import { PLANS } from '../config/domain'
import { useDispatch, useSelector } from 'react-redux';
import { addPlanThunk, changePlan, changePlanThunk, selectTasks, setModal, setSearch } from '../app/taskReducer';
import { Column } from '../components/Column/Column'
import { DragDropContext } from 'react-beautiful-dnd';


export const Kanban = () => {

    const dispatch = useDispatch()

    const { tasks } = useSelector(selectTasks)

    const dragHandler = result => {
        console.log("🚀 ~ file: Kanban.js ~ line 16 ~ Kanban ~ result", result)
        const task_id = +result.draggableId
        const oldPlan = PLANS[+result.source.droppableId]
        const newPlan = PLANS[+result.destination.droppableId]
        const oldIndex = result.source.index
        const newIndex = result.destination.index
        // dispatch(changePlan({id: result.draggableId, plan: PLANS[+result.destination.droppableId]}))
        dispatch(changePlanThunk(task_id, oldPlan, newPlan, oldIndex, newIndex))
    

    }

    // const onlyTasks = tasks.filter(task => task.type !== 'проект')

    return (
        <DragDropContext
            onDragEnd={dragHandler}
        >
            <div className='kanban'>
                {
                    PLANS.map((item, index) => {
                        
                        const planTasks = tasks[item].filter(task => task.type !== 'проект')
                        // const planTasks = onlyTasks.filter(task => task.plan === item)
                        return (
                            <Column key={index} column={index.toString()} title={item} tasks={planTasks} />
                        )
                    })
                }
                {/* {
                    PLANS.map((item, index) => {
                        const planTasks = onlyTasks.filter(task => task.plan === item)
                        return (
                            <Column key={index} column={index.toString()} title={item} tasks={planTasks} />
                        )
                    })
                } */}
            </div>
        </DragDropContext>

    )
}