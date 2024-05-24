import axios from 'axios'

const MONGO_BASE_URL = 'http://172.20.10.13:9000/api/v1'

export const mongoAPI = axios.create({
    baseURL: MONGO_BASE_URL
})