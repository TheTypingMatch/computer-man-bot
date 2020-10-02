import { Message } from 'discord.js';
import { Guild } from '../../models/guild.model';

export default async (msg: Message, client, args) => {
    const guildInfo = await Guild.findOne({ guildId: msg.guild.id });

    if (guildInfo === null) {
        const guild =  new Guild({
            guildId: msg.guild.id,
            ignoredXpChannels: [],
        });

        await guild.save();

        return msg.channel.send('Initialized server.');
    } else {
        return msg.channel.send('Server already initialized.');
    }
};
