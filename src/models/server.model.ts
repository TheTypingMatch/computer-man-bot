import * as mongoose from 'mongoose';

const serverSchema = new mongoose.Schema({
    leaderboard: {
        type: Array,
        required: false,
        default: []
    }
});

const Server = mongoose.model('Server', serverSchema);

export { Server };
