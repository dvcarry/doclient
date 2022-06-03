import axios from 'axios'

axios.defaults.baseURL = 'http://82.146.40.11:5002/api/';
// axios.defaults.baseURL = 'http://localhost:3006/api/';

export const API = {
    async getTasks() {
        try {
            const { data } = await axios.get('tasks/plan')
            return data
        } catch (error) {
            console.log(error)
        }
    },
    async getTodayTasks() {
        try {
            const { data } = await axios.get('tasks/today')
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
    async getProjects() {
        try {
            const { data } = await axios.get('projects')
            return data
        } catch (error) {
            console.log(error)
        }
    },
    async getProject(project_id) {
        try {
            const { data } = await axios.get('projects/' + project_id)
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
    async up(index, task_id) {
        try {
            await axios.put('tasks/up', {index, task_id})
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
    async changePlan(task_id, oldPlan, newPlan, oldIndex, newIndex) {
        try {
            const { data } = await axios.put('tasks/replan', {task_id, oldPlan, newPlan, oldIndex, newIndex})
            return data
        } catch (error) {
            console.log(error)
        }
    },
    async getWeek() {
        try {
            const { data } = await axios.get('tasks/week')
            return data
        } catch (error) {
            console.log(error)
        }
    },
    // async getPlanTasks() {
    //     try {
    //         const { data } = await axios.get('tasks/plan')
    //         return data
    //     } catch (error) {
    //         console.log(error)
    //     }
    // },
}