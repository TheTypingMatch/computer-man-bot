import { MessageEmbed } from 'discord.js';
import { colors, version } from '../config/config';
import { User } from '../models/user.model';

export default async (msg, client, args) => {
    if (msg.channel.id !== "650837119895601155") return;
    
    try {
        const isUnregistered = msg.member.roles.cache.some(r => r.name === "unregistered");
        const memberRole = msg.guild.roles.cache.find(role => role.name === "Member");
        const unregisteredRole = msg.guild.roles.cache.find(role => role.name === 'unregistered');
        
        if (!isUnregistered) {
            msg.channel.send('An error ocurrred.')
            throw Error('Unable to register.');
        }

        msg.member.roles.add(memberRole);
        msg.member.roles.remove(unregisteredRole);

        const verifyEmbed = new MessageEmbed()
            .setColor(colors.green)
            .setAuthor(`${msg.author.username}`, msg.author.avatarURL())
            .setTimestamp(new Date())
            .setFooter(`Computer Man v${version}`)
            .setDescription(`**${msg.author.username}** has been verified.`);
        
        return msg.channel.send(verifyEmbed);
    } 
    
    catch (err) {
        client.logger.error(err);
    }
};
