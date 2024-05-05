const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema(
    {
        roomName: {
            type: String,
            required: true
        },

        participants: [
            {
                userId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User',
                    required: true
                },

                joinedAt: {
                    type: Date,
                    required: true,
                    default: Date.now
                }
            }
        ]
    }
)

module.exports = mongoose.model('Room', roomSchema)