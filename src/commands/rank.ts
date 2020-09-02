import { MessageEmbed } from 'discord.js';
import { colors, version } from '../config/config';
import { User } from '../models/user.model';

const insertCommas = (n: string | number) => n.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')

const notFoundEmbed = new MessageEmbed()
    .setColor(colors.yellow)
    .setAuthor('User Not Found');

export default async (msg, client, args) => {
    const userId = (args[0]) ? args[0].replace(/<|@|!|>/g, '') : msg.author.id;
    const user = await User.findOne({ discordId: userId });
    if (!user) {
        return msg.channel.send(notFoundEmbed);
    }

    const xpGoal = Math.floor(((10 * (user.level ** 1.5)) + 250));
    const statsEmbed = new MessageEmbed()
        .setColor(colors.green)
        .setAuthor(`${user.name}'s Stats`, msg.author.avatarURL())
        .setTimestamp(new Date())
        .setThumbnail(msg.guild.iconURL())
        .setFooter(`Computer Man v${version}`)
        .addField('XP', `**${insertCommas(user.xp)}** (${insertCommas(user.xpProgress)}/${insertCommas(xpGoal)})`, true)
        .addField('Level', `**${user.level}**`, true)
        .addField('\u200b', '\u200b', true)
        .addField('Messages', `${insertCommas(user.messages)}`, true)
        .addField('Rank', `#**${insertCommas(user.rank)}**`, true)
        .addField('\u200b', '\u200b', true);

    // name, xp, xp left until next level, level, message count, rank

    return msg.channel.send(statsEmbed);
};
