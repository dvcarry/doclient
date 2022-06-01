import React, { useState } from 'react';
import { Select } from 'antd';

import { useDispatch, useSelector } from 'react-redux';
import { addHabitsHistoryThunk, deleteHabitsHistoryThunk, selectHabits, setValues } from '../../app/habitsReducer';

import './Habit.css'

const { Option } = Select;


export const Habit = ({ id, name, type, value }) => {

    const dispatch = useDispatch()


    const { isFetching, values, date } = useSelector(selectHabits)

    const changeHandler = value => {
        if (value) {
            dispatch(addHabitsHistoryThunk(id, value, date))
        } else {
            dispatch(deleteHabitsHistoryThunk(id, date))
        }
    }

    const valuesForOptions = values
        .filter(item => item.habit_id === id)
        .map(item => item.name)


    return (
        <div
            className='habit'
        >
            <div>
                {name}
            </div>
            <div>
                <Select
                    mode={type === 'multi' ? "multiple" : null}
                    style={{ width: '250px' }}
                    onChange={changeHandler}
                    value={value}
                    allowClear
                    key={value}
                >
                    {
                        valuesForOptions.map(item => <Option key={item}>{item}</Option>)
                    }
                </Select>
            </div>
        </div>
    )
}