const Room = require('../models/Room.js')

const createRoom = async (req, res) => {
    try {
        const {roomName, creator} = req.body;

        if (!roomName || !creator) {
            return res.status(400).json({ error: 'Missing parameter' });
        }

        const newRoom = new Room({
            roomName,
            participants: [
                {
                    
                }
            ]
        })
    }
    catch (err) {

    }
}
