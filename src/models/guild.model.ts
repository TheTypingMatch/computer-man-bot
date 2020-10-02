import * as mongoose from 'mongoose';

const guildSchema = new mongoose.Schema({
    guildId: {
        type: String,
        required: true,
        unique: true,
    },
    ignoredXpChannels: {
        type: Array,
        required: false,
        default: [],
    }
});

const Guild = mongoose.model('Guild', guildSchema);

export { Guild };
