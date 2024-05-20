import { mongoAPI } from "../axios/axios"

export const register = async (email, phone, password, username) => {
    try {
        const registerResponse = await mongoAPI.post('/register', {
            email,
            phone,
            password,
            username
        })

        return registerResponse
    }
    catch (err) {
        console.log(err)
        throw err
    }
}

export const login = async (email, password) => {
    try {
        const loginResponse = await mongoAPI.post('/login', {
            email,
            password
        })

        return loginResponse
    }
    catch (err) {
        console.log(err.response.data)
        throw err
    }
}