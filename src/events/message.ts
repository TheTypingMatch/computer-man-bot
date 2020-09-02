import { User } from '../models/user.model';
import { run } from '../commands';
import { userInfo } from 'os';
import { MessageEmbed } from 'discord.js';
import { colors, version } from '../config/config';

const reward = async (client, msg, user: any) => {
    let { lastReward, discordId } = user;
    let now = new Date().getTime();
    let xpReward = Math.floor(Math.random() * 15 + 10);
    let newXP = user.xp + xpReward;
    let requiredXP = Math.floor(((10 * (user.level ** 1.5)) + 250));
    let isLevelUp = (user.xpProgress + xpReward > requiredXP)
    let isWithinCooldown = (now - lastReward > 60000);

    if (isLevelUp && isWithinCooldown) {
        let levelUpEmbed = new MessageEmbed()
            .setColor(colors.green)
            .setDescription(`You leveled up to level **${user.level + 1}**!`)
            .setAuthor(user.name, msg.author.avatarURL());

        msg.channel.send(levelUpEmbed);
        client.logger.log(`${user.name} leveled up to LVL ${user.level + 1}`);

        if ((user.level + 1) % 5 === 0 && user.level < 100) {
            let lvlRole = msg.guild.roles.cache.find(role => role.name === `LVL ${user.level + 1}`);
            msg.member.roles.add(lvlRole);
        }
    }

    if (isWithinCooldown) {
        client.logger.log(`${user.name} earned ${xpReward}XP`);
        await User.updateOne({ discordId }, {
            lastReward: now,
            xp: newXP,
            messages: user.messages + 1,
            level: (isLevelUp) ? user.level + 1 : user.level,
            xpProgress: (isLevelUp) 
                ? requiredXP - user.xpProgress + xpReward
                : user.xpProgress + xpReward 
        });
    }
}

const createUser = async msg => {
    const userCount = await User.find();
    let newUser = new User({
        date: new Date(),
        name: msg.author.username,
        discordId: msg.author.id,
        lastReward: new Date().getTime(),
        rank: userCount.length + 1
    });

    return await newUser.save();
}

module.exports = async (client: any, msg: any) => {
    const { content, author } = msg;
    const { logger, msgCooldowns, config } = client;
    const userId: string = author.id;

    if (author.bot) return;
        
    const user = await User.findOne({ discordId: userId });

    if (user && user.name !== author.username) {
        const updatedName: { name: string } = { name: author.username };

        User.updateOne({ discordId: userId }, updatedName, err => {
            if (err) {
                return logger.error(err);
            }

            return logger.log(`Updated username ${user.name} to ${author.username}`, 'ready');
        });
    }

    // Handle command arguments
    const args: string[] = content.slice(config.prefix.length).trim().split(/ +/g);
    const cmd: string = args.shift().toLowerCase();

    if (!content.startsWith(config.prefix)) {
        return await (user) ? reward(client, msg, user) : createUser(msg);
    }

    // Command handler
    run(cmd, msg, client, args);
};
