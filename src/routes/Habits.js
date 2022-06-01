import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { Statistic, Card, Switch, Progress } from 'antd';
import { BarChart, Bar, Cell, XAxis, YAxis, Tooltip, Legend, PieChart, Pie } from 'recharts';


import { doGiftThunk, getHabitsThunk, selectHabits, setDate } from '../app/habitsReducer';
import { Habit } from '../components/Habit/Habit';
import { Fail } from '../components/Fails/Fail';


const DAY_PERIODS = ['утро', 'день', 'вечер']


export const Habits = () => {

    // const [mode, setMode] = useState(true)
    const [doneMode, setDoneMode] = useState(false)

    const dispatch = useDispatch()
    const { habits, date, score, averageCountPerMonth, totalToday, totalSum, countHistory, gifts } = useSelector(selectHabits)

    useEffect(() => {
        const getHabits = async () => {
            await dispatch(getHabitsThunk(date))
        }
        getHabits()
    }, [date])


    const changeDate = arrow => {
        const today = moment(new Date()).format('YYYY-MM-DD')
        if (today === date && arrow === -1) {
            return
        }
        const newDate = moment(date).subtract(arrow, 'd').format('YYYY-MM-DD')
        dispatch(setDate(newDate))
    }

    const totalScore = score.length > 0 && score.reduce((acc, cur) => acc + cur.days, 0)

    const doGift = async id => {
        await dispatch(doGiftThunk(id))
    }


    // let scoreForDisplay = score

    // if (!mode) {
    //     scoreForDisplay = [...score].sort((a, b) => b.total - a.total)
    // }
    const BASE = 10
    const level = Math.round(Math.sqrt(BASE * (2 * totalSum + BASE / 4) + BASE / 2) / BASE)
    // const levelPercent = totalSum % 1000 / 10
    const nextLevel = level + 1
    const expForLevel = Math.round((level * level + level) / 2 * BASE - (level * BASE))
    const expForNextLevel = Math.round((nextLevel * nextLevel + nextLevel) / 2 * BASE - (nextLevel * BASE))
    const levelPercent = Math.round((totalSum - expForLevel) / (expForNextLevel - expForLevel) * 100)
    console.log(totalSum, expForLevel, expForNextLevel, expForLevel, expForLevel)
    const habitsWithMode = doneMode ? habits.filter(habit => habit.value.length === 0) : habits


    return (
        <div className='habit_mode'>
            <div>
                <div className='block'>
                    <div className='flex_around'>
                        <div className='habit_date'>
                            <span
                                className='datechange'
                                onClick={() => changeDate(1)}
                            >
                                {'<'}
                            </span>
                            <span>{date}</span>
                            <span
                                className='datechange'
                                onClick={() => changeDate(-1)}
                            >
                                {'>'}
                            </span>
                        </div>
                        <Switch
                            // defaultChecked
                            onChange={() => setDoneMode(!doneMode)}
                        />
                    </div>
                </div>
                <div className='block'>
                    <Card>
                        <Statistic
                            title="Сегодня / Месяц"
                            value={`${totalToday} / ${averageCountPerMonth}`}
                            valueStyle={{ color: '#cf1322' }}
                        />
                    </Card>
                </div>
                <div className='block'>
                    <Card>
                        <Statistic
                            title="Уровень / Всего очков"
                            value={`${level} / ${totalSum}`}
                            valueStyle={{ color: '#cf1322' }}
                        />
                    </Card>
                </div>
                <div className='block'>
                    <Progress
                        percent={levelPercent}
                        strokeWidth={20}
                    />
                </div>
                <div className='block'>
                    {
                        gifts.length > 0 ? gifts.map(gift => <div className='gift' onClick={() => doGift(gift.id)}>&#9749; {gift.name}</div>) : null
                    }
                </div>
                <div className='block'>
                    {
                        totalToday < averageCountPerMonth ? <div className='message'>СТАРАЙСЯ, САМУРАЙ</div> : null
                    }
                </div>



                {/* <div>
                    <BarChart
                        width={300}
                        height={180}
                        data={countHistory}
                    >
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="value" fill="#8884d8" />
                    </BarChart>
                </div> */}




            </div>
            <div>
                {/* {
                    DAY_PERIODS.map(period => {

                        let habitsFromPeriod = []

                        if (doneMode) {
                            habitsFromPeriod = habits.filter(habit => habit.period === period && habit.value.length === 0)
                        } else {
                            habitsFromPeriod = habits.filter(habit => habit.period === period)
                        }

                        // const habitsFromCategory = habits.filter(habit => habit.category === category && habit.value.length === 0)

                        if (habitsFromPeriod.length > 0) {
                            return (
                                <div key={period} className='category_div'>
                                    <div key={period} className='category_title'>{period}</div>
                                    <div>
                                        {
                                            habitsFromPeriod.map(habit => (
                                                <Habit
                                                    key={habit.id}
                                                    {...habit}
                                                />
                                            ))
                                        }
                                    </div>
                                </div>
                            )
                        }


                    })
                } */}



                {
                    habitsWithMode.map(habit => (
                        <Habit
                            key={habit.id}
                            {...habit}
                        />
                    ))
                }



            </div>
            <div>
                <Card>
                    <Statistic
                        title="Штрафы"
                        value={totalScore}
                        valueStyle={{ color: '#cf1322' }}
                    />
                </Card>
                {
                    score.map(item => <Fail key={item.id} {...item} value={item.days} />)
                }
            </div>



        </div>
    )
}