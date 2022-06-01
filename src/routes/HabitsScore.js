import { useEffect } from 'react';
import { Table } from 'antd';

import { BALANCE, PLANS } from '../config/domain'
import { useDispatch, useSelector } from 'react-redux';
import { getHabitsScoreThunk, selectHabits } from '../app/habitsReducer';




const columns = [
    {
        title: 'Привычка',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Процент',
        dataIndex: 'percent',
        key: 'percent',
        sorter: (a, b) => a.percent - b.percent,
    },
    {
      title: 'Выполнено',
      dataIndex: 'done',
      key: 'done',
      sorter: (a, b) => a.done - b.done,
    },
];


export const HabitsScore = () => {

    const dispatch = useDispatch()

    const { habitsScore } = useSelector(selectHabits)

    useEffect(() => {
        const getHabitsScore = async () => {
            dispatch(getHabitsScoreThunk())
        }
        getHabitsScore()
    }, [])


    return (
        <div className='plan_section'>
            <Table
                dataSource={habitsScore}
                columns={columns}
                pagination={{ position: ['none'], pageSize: 50 }}
            />

        </div>

    )
}