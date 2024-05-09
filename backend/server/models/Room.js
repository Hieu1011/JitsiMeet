const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema(
    {
        hostId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },

        title: {
            type: String,
            required: true
        },

        avatar: {
            type: String,
            required: true 
        },

        desc: {
            type: String,
            required: true 
        },

        meetings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Meeting' }],

        participants: [
            {
                userId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User',
                    required: true
                },

                joinedAt: {
                    type: Date,
                    default: Date.now
                }
            }
        ],

        pendingUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
    }
)

module.exports = mongoose.model('Room', roomSchema)