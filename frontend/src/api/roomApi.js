import { mongoAPI } from "../axios/axios"

export const createRoom = async (roomName, creatorId, avatar, desc) => {
    try {
        await mongoAPI.post('/createRoom', {
            roomName,
            creatorId,
            avatar,
            desc
        })
    }
    catch (err) {
        console.log(err.response.data)
        throw err
    }
}

export const getAllRooms = async () => {
    try {
        const response = await mongoAPI.get('/getAllRooms')

        return response.data
    }
    catch (err) {
        console.log(err.response)
        throw err
    }
}

export const joinRoom = async (userId, roomId) => {
    try {
        await mongoAPI.post('/joinRoom', {
            userId,
            roomId
        })
    }
    catch (err) {
        console.log(err.response)
        throw err
    }
}

export const approveUser = async (userId, roomId) => {
    try {
        await mongoAPI.post('/approveUser', {
            userId,
            roomId
        })

    }
    catch (err) {
        console.log(err.response)
        throw err
    }
}

export const rejectUser = async (userId, roomId) => {
    try {
        await mongoAPI.post('/rejectUser', {
            userId,
            roomId
        })

    }
    catch (err) {
        console.log(err.response)
        throw err
    }
}

export const inviteToRoom = async (email, roomId) => {
    try {
        await mongoAPI.post('/inviteToRoom', {
            email,
            roomId
        })

    }
    catch (err) {
        console.log(err.response)
        throw err
    }
}

export const leaveRoom = async (userId, roomId) => {
    try {
        await mongoAPI.post('/leaveRoom', {
            userId,
            roomId
        })

    }
    catch (err) {
        console.log(err.response)
        throw err
    }
}

export const getRoomMembers = async (roomId) => {
    try {
        const response = await mongoAPI.get('/getRoomMembers', {
            params: {
                roomId
            }
        })

        return response.data
    }
    catch (err) {
        console.log(err.response.data)
        throw err
    }
}

export const getRoomRequests = async (roomId) => {
    try {
        const response = await mongoAPI.get('/getRoomRequests', {
            params: {
                roomId
            }
        })

        return response.data
    }
    catch (err) {
        console.log(err.response.data)
        throw err
    }
}

export const deleteRoom = async (roomId) => {
    try {
        await mongoAPI.post('/deleteRoom', {
            roomId
        })

    }
    catch (err) {
        console.log(err.response.data)
        throw err
    }
}


