const Room = require('../models/Room.js')

const createRoom = async (req, res) => {
    try {
        const {roomName, creatorId, avatar, desc} = req.body;

        if (!roomName || !creatorId || !avatar || !desc) {
            return res.status(400).json({ error: 'Missing parameter' });
        }

        const newRoom = new Room({
            hostId: creatorId,
            title: roomName,
            avatar,
            desc,
            meetings: [],
            participants: [
                {
                    userId: creatorId,
                }
            ],
            pendingUsers: []
        })

        await newRoom.save()

        res.json({ 
            success: true,
            message: 'Room created successfully!' 
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'Error creating room!',
            error: err.message
        });
    }
}

const getAllRooms = async (req, res) => {
    try {
        const rooms = await Room.find()

        res.json(rooms);
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'Cannot get rooms!',
            error: err.message
        }); 
    }
}

const joinRoom = async (req, res) => {
    try {
        const {userId, roomId} = req.body

        const room = await Room.findById(roomId)
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'Cannot join room!',
            error: err.message
        }); 
    }
} 

module.exports = {createRoom, getAllRooms}
