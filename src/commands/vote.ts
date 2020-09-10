import { MessageEmbed } from 'discord.js';
import { colors, version } from '../config/config';

export default async (msg, client, args) => {
    const voteEmbed = new MessageEmbed()
        .setColor(colors.green)
        .setAuthor('Vote', msg.author.avatarURL())
        .setTimestamp(new Date())
        .setFooter(`Computer Man v${version}`)
        .setDescription('Vote [**here**](https://top.gg/servers/650827847941881860/vote).');
    
    return msg.channel.send(voteEmbed);
};
