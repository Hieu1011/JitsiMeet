import axios from 'axios'

const MONGO_BASE_URL = 'http://192.168.188.108:9000/api/v1'

export const mongoAPI = axios.create({
    baseURL: MONGO_BASE_URL
})