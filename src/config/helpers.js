import moment from 'moment';
import { DATE_CONSTANTS } from './domain';

export const getTimeFromMins = mins => {
    let hours = Math.trunc(mins/60);
    let minutes = mins % 60;
    return hours + '-' + minutes.toString().padStart(2, 0);
};

export const getDatesForPeriod = period => {
    const dates = []
    for (let i = 1; i < period; i++) {
        const date = moment().add(i, 'days')
        const dateObject = { raw: date.format('YYYY-MM-DD'), show: date.format('DD.MM dddd') }
        dates.push(dateObject)
        // onlyDates.push(date.format('YYYY-MM-DD'))
    }
    return dates
};


export const getDateFromConstant = date_constant => {
    const objectFromDateConstant = DATE_CONSTANTS.find(item => item.eng === date_constant)
    const days = objectFromDateConstant.days
    const today = moment()
    const result = today.add(days, 'days')
    const formatResult = moment(result).format('YYYY-MM-DD')
    return formatResult
};


export const filterTodayTasks = tasks => {
    const today = new Date()
    return tasks
    .filter(task => moment(task.date) <= today)
    .sort(task => task.important ? -1 : 1) 
}

export const getAuthToken = () => {
    const token = localStorage.getItem('do')
    return token
}