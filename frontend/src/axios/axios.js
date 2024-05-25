import axios from 'axios'

const MONGO_BASE_URL = 'http://192.168.1.55:9000/api/v1'

export const mongoAPI = axios.create({
    baseURL: MONGO_BASE_URL
})