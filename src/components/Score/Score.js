import React from 'react';
import moment from 'moment';
import { Statistic, Card, Row, Col } from 'antd';

import { RELAX_FOR_HOUR, START_TIME_IN_MINUTES } from '../../config/domain';
import { getTimeFromMins } from '../../config/helpers';

import './Score.css'

export const Score = ({ tasks }) => {

    const todayTasks = tasks.filter(task => task.plan === 'today')

    const todayWorkTime = todayTasks.reduce((acc, cur) => acc + cur.period, 0)

    const todayWorkRelaxTimeMinutes = todayWorkTime + Math.ceil(todayWorkTime / 60) * RELAX_FOR_HOUR
    const todayWorkRelaxTimeHours = getTimeFromMins(todayWorkRelaxTimeMinutes)
    const startTime = getTimeFromMins(START_TIME_IN_MINUTES)
    const endOfDay = getTimeFromMins(START_TIME_IN_MINUTES + todayWorkRelaxTimeMinutes)

    const doneTasks = tasks.filter(task => task.plan === 'done')
    const doneTasksObject = doneTasks.length > 0 && doneTasks.reduce((acc, cur) => {
        acc[cur.balance] += cur.period
        return acc
    }, { работа: 0, проект: 0, здоровье: 0, отдых: 0, быт: 0, развитие: 0, семья: 0 })

    return (
        <>
            <div className='score_heading'>
                РЕЗУЛЬТАТЫ
            </div>
            <Row gutter={[16, 16]}>
                <Col span={12}>
                    <Card className='card'>
                        <Statistic
                            title="Осталось рабочего времени"
                            value={getTimeFromMins(todayWorkTime)}
                            precision={2}
                            valueStyle={{ color: '#3f8600' }}
                        />
                    </Card>
                </Col>
                <Col span={12}>
                    <Card className='card'>
                        <Statistic
                            title="Конец рабочего времени"
                            value={moment().add(todayWorkRelaxTimeMinutes, 'minutes').format('HH-mm')}
                            precision={2}
                            valueStyle={{ color: '#cf1322' }}
                        />
                    </Card>
                </Col>
                <Col span={12}>
                    <Card className='card'>
                        <Statistic
                            title="Осталось задач"
                            value={todayTasks.length}
                            // precision={2}
                            valueStyle={{ color: '#3f8600' }}
                        />
                    </Card>
                </Col>
                <Col span={12}>
                    <Card className='card'>
                        {
                            Object.entries(doneTasksObject)
                                .sort((a, b) => a[1] - b[1])
                                .map(item => (
                                    <div
                                        key={item[0]}
                                    >
                                        {`${item[0]}: ${item[1]}`}
                                    </div>
                                ))
                        }
                    </Card>
                </Col>
            </Row>
        </>
    )
}