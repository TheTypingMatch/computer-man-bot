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
        required: true
    },
    xp: {
        type: Number,
        required: false
    },
    level: {
        type: Number,
        required: false
    },
    messages: {
        type: Number,
        required: false
    }
});

const User = mongoose.model('User', userSchema);

export { User };
