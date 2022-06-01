import { createSlice } from "@reduxjs/toolkit"
import { API } from '../api/habits'
import moment from 'moment';


const today = moment(new Date()).format('YYYY-MM-DD')


export const habitsSlice = createSlice({
    name: 'habits',
    initialState: {
        isFetching: false,
        habits: [],
        values: [],
        categories: [],
        date: today,
        score: [],
        history: [],
        totalToday: 0,
        averageCountPerMonth: 0,
        timeByCategory: [],
        countHistory: [],
        habitsScore: [],
        totalSum: 0,
        gifts: []
    },
    reducers: {
        toggleFetching: state => {
            state.isFetching = !state.isFetching
        },
        setHabits: (state, action) => {
            state.habits = action.payload.habits
            state.values = action.payload.value
            state.score = action.payload.score
            state.categories = action.payload.categories
            state.history = action.payload.history
            state.totalToday = action.payload.totalToday
            state.countHistory = action.payload.countHistory
            state.averageCountPerMonth = action.payload.averageCountPerMonth
            state.timeByCategory = action.payload.timeByCategory
            state.totalSum = action.payload.totalSum
            state.gifts = action.payload.gifts
        },
        setValues: (state, action) => {
            let newHabits = []
            if (action.payload.value) {
                newHabits = state.habits.map(item => item.id === action.payload.habit_id ? { ...item, value: action.payload.value } : item)
            } else {
                newHabits = state.habits.map(item => item.id === action.payload.habit_id ? { ...item, value: [] } : item)
            }
            state.habits = newHabits
        },
        setDate: (state, action) => {
            state.date = action.payload
        },
        setHabitsScore: (state, action) => {
            state.habitsScore = action.payload
        },
        doGift: (state, action) => {
            const newGifts = state.gifts.filter(gift => gift.id !== action.payload)
            state.gifts = newGifts
        },
        setHabitsAnalyze: (state, action) => {
            state.habitsScore = action.payload
            state.categories = action.payload.categories
            state.history = action.payload.history
            state.totalToday = action.payload.totalToday
            state.countHistory = action.payload.countHistory
            state.averageCountPerMonth = action.payload.averageCountPerMonth
            state.timeByCategory = action.payload.timeByCategory
            state.totalSum = action.payload.totalSum
        },
        
    },
});


// actions

export const {
    toggleFetching,
    setHabits,
    setDate,
    setValues,
    setHabitsScore,
    setHabitsAnalyze,
    doGift
} = habitsSlice.actions;


// selects

export const selectHabits = state => state.habits


// thunk

export const getHabitsThunk = (date) => dispatch => {    
    dispatch(toggleFetching())
    return API.getHabits(date)
        .then(response => {
            dispatch(setHabits(response))
            dispatch(setDate(date))
            dispatch(toggleFetching())
            return response
        })
}

export const addHabitsHistoryThunk = (habit_id, value, date) => dispatch => {
    return API.addHabitsHistory(habit_id, value, date)
        .then(response => {
            dispatch(setValues({ habit_id, value }))
            return response
        })
}

export const deleteHabitsHistoryThunk = (habit_id, date) => dispatch => {
    return API.deleteHabitsHistory(habit_id, date)
        .then(response => {
            dispatch(setValues({ habit_id }))
            return response
        })
}

export const getHabitsScoreThunk = () => dispatch => {
    return API.getHabitsScore()
        .then(response => {
            dispatch(setHabitsScore(response))
            return response
        })
}

export const getHabitsAnalyzeThunk = () => dispatch => {
    return API.getHabitsAnalyze()
        .then(response => {
            dispatch(setHabitsAnalyze(response))
            return response
        })
}

export const doGiftThunk = (id) => dispatch => {
    return API.doGift(id)
        .then(response => {
            dispatch(doGift(id))
            return response
        })
}


export default habitsSlice.reducer;