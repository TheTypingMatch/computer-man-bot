import * as mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    date: {
        type: Object,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    discordId: {
        type: String,
        required: true,
        unique: true
    },
    xp: {
        type: Number,
        required: false,
        default: 0
    },
    xpProgress: {
        type: Number,
        required: false,
        default: 0
    },
    level: {
        type: Number,
        required: false,
        default: 0
    },
    messages: {
        type: Number,
        required: false, 
        default: 0
    },
    lastReward: {
        type: Number,
        required: false
    },
    rank: {
        type: Number,
        required: false
    }
});

const User = mongoose.model('User', userSchema);

export { User };
