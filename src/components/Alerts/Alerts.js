import { useSelector, useDispatch } from 'react-redux';
import { Alert } from 'antd';

import { selectTasks, setModal } from '../../redux/taskReducer';
import { MODAL_TYPES } from '../../config/domain';



export const Alerts = () => {

    const { tasks, breaks, failures } = useSelector(selectTasks)
    console.log("🚀 ~ file: Alerts.js ~ line 12 ~ Alerts ~ failures", failures)

    const dispatch = useDispatch()

    const openModal = () => {
        dispatch(setModal({typeOfModal: MODAL_TYPES.failures}))
    }

    return (
        <div>
            {
                failures.length > 0 && (
                    <div className='block' onClick={openModal}>
                        <Alert
                            message="ПРОСРОЧЕННЫЕ ЗАДАЧИ"
                            description="Объясни, почему ты не выполнил задачи. Это очень важно."
                            type="error"
                            showIcon
                        />
                    </div>
                )
            }
        </div>
    )
}