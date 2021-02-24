import React from 'react';
import './Header.css'
import { Button } from '../Button/Button'
import { CURRENT_TASK } from '../../config/domain'
import { useDispatch } from 'react-redux';
import { setModal } from '../../app/taskReducer';
import { NavLink } from 'react-router-dom';

export const Header = () => {

    const dispatch = useDispatch()

    return (
        <div className='header'>
            <Button
                title='Создать задачу'
                click={() => dispatch(setModal({ typeOfModal: 'new', currentTask: CURRENT_TASK }))}
            />
            <div className='header_section'>
                <NavLink to='/focus'>Фокус</NavLink>
            </div>
        </div>
    )
}