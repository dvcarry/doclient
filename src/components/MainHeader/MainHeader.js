import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { selectTasks, setModal } from '../../redux/taskReducer';
import { MODAL_TYPES } from '../../config/domain';

import './MainHeader.css'


export const MainHeader = () => {

    const { daytext } = useSelector(selectTasks)

    const dispatch = useDispatch()

    const openDayModal = () => {
        dispatch(setModal({typeOfModal: MODAL_TYPES.day}))
    }

    return (
        <div className='mainheader'>
            <div>
                <NavLink className='mainheader_item' to='/goals'>Цели</NavLink>
                <NavLink className='mainheader_item' to='/projects'>Проекты</NavLink>
                <NavLink className='mainheader_item' to='/tasks'>Общее планирование</NavLink>
                <NavLink className='mainheader_item' to='/today'>Планирование дня</NavLink>
                <NavLink className='mainheader_item' to='/do'>Выполнение</NavLink>
                {
                    daytext ? null : <span onClick={openDayModal}>Вступительное слово</span>
                }
                <span></span>
            </div>
        </div>
    )
}