import { MessageEmbed } from 'discord.js';
import { colors, version } from '../config/config';
import { Server } from '../models/server.model';

const createLeaderboard = stats => {
    let leaderboardString = '';

    if (!stats) {
        return 'N/A';
    }

    stats.forEach((user, index) => {
        const { level, messages, rank, name } = user;
        leaderboardString += `\n#${rank} • **${name}** (LVL ${level})`;
    });

    return leaderboardString || 'N/A';
};

export default async (msg, client, args) => {
    const serverInfo = await Server.findOne({ __v: 0 });
    const { leaderboard } = serverInfo;

    const lbEmbed = new MessageEmbed()
        .setColor(colors.green)
        .setAuthor('Leaderboard', msg.author.avatarURL())
        .setTimestamp(new Date())
        .setThumbnail(msg.guild.iconURL())
        .setFooter(`Computer Man v${version}`)
        .setDescription(createLeaderboard(leaderboard));

    return msg.channel.send(lbEmbed);
};
