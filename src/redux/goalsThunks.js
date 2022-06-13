import { setError, setGoals, toggleFetching } from "./taskReducer"
import axios from '../config/axios'



export const getGoalsThunk = () => async dispatch => {
    try {
        dispatch(toggleFetching())
        const { data } = await axios.get('goals')
        dispatch(setGoals(data))
    } catch (error) {
        dispatch(setError(error.response.statusText))
    }
}