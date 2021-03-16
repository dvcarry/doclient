import axios from 'axios'

axios.defaults.baseURL = 'http://82.146.40.11:5002/api/';

export const API = {
    async getTasks() {
        try {
            const { data } = await axios.get('tasks')
            return data
        } catch (error) {
            console.log(error)
        }
    },
    async getDoneTasks() {
        try {
            const { data } = await axios.get('tasks/done')
            return data
        } catch (error) {
            console.log(error)
        }
    },
    async addTask(task) {
        try {
            const { data } = await axios.post('tasks', task)
            return data
        } catch (error) {
            console.log(error)
        }
    },
    async editTask(task) {
        try {
            const { data } = await axios.put('tasks', task)
            return data
        } catch (error) {
            console.log(error)
        }
    },
    async deleteTask(task_id) {

        try {
            const { data } = await axios.delete('tasks/' + task_id)
            return data
        } catch (error) {
            console.log(error)
        }
    },
    async reindex(plan, oldIndex, newIndex) {
        try {
            await axios.put('tasks/reindex', {plan, oldIndex, newIndex})
            // return data
        } catch (error) {
            console.log(error)
        }
    },
    async do(id, index, plan) {
        try {
            await axios.put('tasks/do', {id, index, plan})
            // return data
        } catch (error) {
            console.log(error)
        }
    },
    async getTodayPlan() {
        try {
            const { data } = await axios.get('days')
            return data
        } catch (error) {
            console.log(error)
        }
    },
    async addTodayPlan() {
        try {
            const { data } = await axios.post('days')
            return data
        } catch (error) {
            console.log(error)
        }
    },
}