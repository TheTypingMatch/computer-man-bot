import { Message, MessageEmbed } from 'discord.js';
import { colors } from '../../config/config';
import { Guild } from '../../models/guild.model';

const notFoundEmbed = new MessageEmbed()
    .setColor(colors.yellow)
    .setAuthor('Channel Not Found');

export default async (msg: Message, client, args) => {
    const channelId = (args[0]) ? args[0].replace(/<|#|!|>/g, '') : msg.channel.id;
    const channel = msg.guild.channels.cache.get(channelId);
    if (!channel) {
        return msg.channel.send(notFoundEmbed);
    }

    const guildInfo = await Guild.findOne({ guildId: msg.guild.id });
    const { ignoredXpChannels } = guildInfo;

    let ignored = true;
    if (ignoredXpChannels.includes(channelId)) {
        // Unignore
        ignoredXpChannels.splice(ignoredXpChannels.indexOf(channelId), 1);
        ignored = false;
    } else {
        // Ignore
        ignoredXpChannels.push(channelId);
    }

    await Guild.updateOne({ guildId: msg.guild.id }, {
        ignoredXpChannels,
    });

    return msg.channel.send(`Successfully ${ignored ? 'ignored' : 'unignored'} <#${channelId}> channel for XP rewards.`);
};
