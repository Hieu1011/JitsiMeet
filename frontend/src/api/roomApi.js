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
    }
}

export const getAllRooms = async () => {
    try {
        const response = await mongoAPI.get('/getAllRooms')

        return response.data
    }
    catch (err) {
        console.log(err.response)
    }
}

