import axios from 'axios'

// axios.defaults.baseURL = 'http://82.146.40.11:5002/api/';
// axios.defaults.baseURL = 'http://localhost:3006/api/';

export const API = {
    async getHabits(date) {
        try {
            const { data } = await axios.get('habits/' + date)
            return data
        } catch (error) {
            console.log(error)
        }
    },
    async addHabitsHistory(habit_id, value, date) {
        try {
            const { data } = await axios.post('habits/history', { habit_id, value, date })
            return data
        } catch (error) {
            console.log(error)
        }
    },
    async deleteHabitsHistory(habit_id, date) {
        try {
            const { data } = await axios.delete(`habits/history/${habit_id}/${date}`)
            return data
        } catch (error) {
            console.log(error)
        }
    },
    async getHabitsScore() {
        try {
            const { data } = await axios.get('habits/score')
            return data
        } catch (error) {
            console.log(error)
        }
    },
    async doGift(id) {
        try {
            const { data } = await axios.put('gifts/' + id)
            return data
        } catch (error) {
            console.log(error)
        }
    },
}