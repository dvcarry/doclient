import { Switch, Input } from 'antd';
import { NavLink } from 'react-router-dom';


import './Header.css'
import { Button } from '../Button/Button'
import { CURRENT_TASK } from '../../config/domain'
import { useDispatch, useSelector } from 'react-redux';
import { addPlanThunk, selectTasks, setModal, setSearch } from '../../app/taskReducer';

const { Search } = Input;


export const Header = () => {

    const dispatch = useDispatch()

    const { isplan } = useSelector(selectTasks)

    const changeSwitch = () => {
        if (!isplan) {
            dispatch(addPlanThunk())
        }
    }

    const onSearch = value => {
        dispatch(setSearch(value))
    }

    return (
        <div className='header'>

                <Switch
                    checked={isplan}
                    checkedChildren="Есть план"
                    unCheckedChildren="Нет Плана"
                    className='switch'
                    onChange={changeSwitch}
                />
                <Search
                    onSearch={onSearch}
                    enterButton
                    allowClear
                    style={{ width: 400 }}
                />


                {/* <div>
                    {
                        isplan ? 'Спланировано' : 'НЕ СПЛАНИРОВАНО'
                    }
                </div> */}
                {/* <div className='header_section'>
                    <NavLink to='/focus'>Фокус</NavLink>
                </div> */}
            <Button
                title='Создать задачу'
                click={() => dispatch(setModal({ typeOfModal: 'new', currentTask: CURRENT_TASK }))}
            />
        </div>
    )
}