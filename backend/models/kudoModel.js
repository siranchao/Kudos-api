const mongoose = require('mongoose')

const kudoSchema = mongoose.Schema(
    {
        sender: {
            type: String,
            required: true,
        },
        receiver: {
            type: Array,
            required: true,
        },
        likes: {
            type: Number,
            default: 0,
        },
        kudoGif: {
            type: String,
            default: "",
        },
        message: {
            type: String,
            required: [true, 'Please add a kudo message']
        },
        people: {
            type: Array,
            default: []
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Kudo', kudoSchema)