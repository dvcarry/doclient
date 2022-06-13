import { setError, setDay, toggleFetching } from "./taskReducer"
import axios from '../config/axios'


export const getDayThunk = () => async dispatch => {
    try {
        dispatch(toggleFetching())
        const { data } = await axios.get('days')
        dispatch(setDay(data))
    } catch (error) {
        dispatch(setError(error.response.statusText))
    }
}

export const addDayTextThunk = (text) => async dispatch => {
    try {
        dispatch(toggleFetching())
        const { data } = await axios.post('days', { text })
        dispatch(setDay(data))
    } catch (error) {
        dispatch(setError(error.response.statusText))
    }




    // dispatch(toggleFetching())
    // await API.days.addDayText(text)
    // dispatch(setDay(true))
    // dispatch(closeModal())
    // dispatch(toggleFetching())
}
