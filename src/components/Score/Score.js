import React from 'react';
import moment from 'moment';
import { Statistic, Card, Row, Col } from 'antd';

import { RELAX_FOR_HOUR, START_TIME_IN_MINUTES } from '../../config/domain';
import { getTimeFromMins } from '../../config/helpers';

import './Score.css'

export const Score = ({ tasks }) => {

    const todayWorkTime = tasks.reduce((acc, cur) => acc + cur.period, 0)

    const todayWorkRelaxTimeMinutes = todayWorkTime + Math.ceil(todayWorkTime / 60) * RELAX_FOR_HOUR
    const todayWorkRelaxTimeHours = getTimeFromMins(todayWorkRelaxTimeMinutes)
    const startTime = getTimeFromMins(START_TIME_IN_MINUTES)
    const endOfDay = getTimeFromMins(START_TIME_IN_MINUTES + todayWorkRelaxTimeMinutes)

    return (
        <>
            <div className='score_heading'>
                РЕЗУЛЬТАТЫ
            </div>
            <Row gutter={[16, 16]}>
                <Col span={12}>
                    <Card>
                        <Statistic
                            title="Осталось рабочего времени"
                            value={getTimeFromMins(todayWorkTime)}
                            precision={2}
                            valueStyle={{ color: '#3f8600' }}
                        />
                    </Card>
                </Col>
                <Col span={12}>
                    <Card>
                        <Statistic
                            title="Конец рабочего времени"
                            value={moment().add(todayWorkRelaxTimeMinutes, 'minutes').format('HH-mm')}
                            precision={2}
                            valueStyle={{ color: '#cf1322' }}
                        />
                    </Card>
                </Col>
                <Col span={12}>
                    <Card>
                        <Statistic
                            title="Осталось задач"
                            value={tasks.length}
                            // precision={2}
                            valueStyle={{ color: '#3f8600' }}
                        />
                    </Card>
                </Col>
            </Row>
        </>
    )
}