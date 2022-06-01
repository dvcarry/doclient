import { useDispatch, useSelector } from 'react-redux';
import { BarChart, Bar, Cell, XAxis, YAxis, Tooltip, Legend, PieChart, Pie } from 'recharts';
import { Statistic, Card, Progress } from 'antd';
import { useEffect } from 'react';

import { getHabitsAnalyzeThunk, selectHabits } from '../app/habitsReducer';
import './routes.css'


export const Analyze = () => {

    const dispatch = useDispatch()

    const { countHistory, averageCountPerMonth, totalToday, timeByCategory, totalSum } = useSelector(selectHabits)

    useEffect(() => {
        const getHabitsAnalyze = async () => {
            dispatch(getHabitsAnalyzeThunk())
        }
        getHabitsAnalyze()
    }, [])


    const level = Math.round(Math.sqrt(100*(2*totalSum + 25) + 50) / 100)
    // const levelPercent = totalSum % 1000 / 10
    const nextLevel = level + 1
    const expForLevel = Math.round((level*level+level)/2*100-(level*100))
    const expForNextLevel = Math.round((nextLevel*nextLevel+nextLevel)/2*100-(nextLevel*100))   
    const levelPercent = Math.round((totalSum - expForLevel) / (expForNextLevel - expForLevel) * 100)

    


    return (
        <div className='analyze_wrapper'>
            {/* <ResponsiveContainer width="100%" height="100%"> */}
            <div>
                <BarChart width={800} height={600} data={countHistory}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
            </div>
            <div>
                <Card>
                    <Statistic
                        title="Сегодня / Месяц"
                        value={`${totalToday} / ${averageCountPerMonth}`}
                        valueStyle={{ color: '#cf1322' }}
                    />
                </Card>
                <Card>
                    <Statistic
                        title="Уровень / Всего очков"
                        value={`${level} / ${totalSum}`}
                        valueStyle={{ color: '#cf1322' }}
                    />
                </Card>
                <div>
                    {level}
                    <Progress
                        percent={levelPercent}
                        strokeWidth={20}
                    />
                </div>

                <div>
                    <PieChart width={400} height={400}>
                        <Pie data={timeByCategory} dataKey="sum" cx="50%" cy="50%" outerRadius={60} fill="#8884d8" label />
                        <Tooltip />
                    </PieChart>
                </div>

            </div>


            {/* </ResponsiveContainer> */}
        </div >

    )
}