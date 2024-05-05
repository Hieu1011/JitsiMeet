const mongoose = require('mongoose');

const meetingShema = new mongoose.Schema(
    {
        hostId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },

        roomId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Room',
            required: true
        },

        title: {
            type: String,
            required: true
        },

        desc: {
            type: String,
            required: true
        },

        startTime: {
            type: Date,
            required: true
        },

        endTime: {
            type: Date,
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

module.exports = mongoose.model('Meeting', meetingShema)