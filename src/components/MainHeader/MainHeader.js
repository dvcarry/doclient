import { NavLink } from 'react-router-dom';

import './MainHeader.css'


export const MainHeader = () => {

    return (
        <div className='mainheader'>
            <div>
                <NavLink className='mainheader_item' to='/projects'>Проекты</NavLink>                
                <NavLink className='mainheader_item' to='/tasks'>Общее планирование</NavLink>
                <NavLink className='mainheader_item' to='/today'>Планирование дня</NavLink>
                <NavLink className='mainheader_item' to='/do'>Выполнение</NavLink>
            </div>
        </div>
    )
}