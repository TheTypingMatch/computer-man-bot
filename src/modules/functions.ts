import { User } from '../models/user.model';
import { Server } from '../models/server.model';
import { Console } from 'console';

const getTopTen = (arr: any[]) => arr.slice(0, 10);

// The sort type is the property of users that the function sorts by
const sortUsers = (users: any[], sortType: string) => {
    return users.sort((a, b) => {
        return (a[sortType] < b[sortType]) ? 1 : (
            (b[sortType] < a[sortType]) ? -1 : 0
        );
    });
};

const functions = (client: any) => {
    const { cooldowns } = client.config;

    setInterval(client.refreshActivity = () => {
        client.user.setPresence({ 
            activity: {
                type: 'WATCHING', 
                name: `${client.users.cache.size} users`
            }, 
            status: 'online'
        });
        client.logger.ready('Done updating presence.');
    }, 5 * 60 * 1000);

    setInterval(client.refreshXPSystem = async () => {
        const allUsers = await User.find();
        const sortedUsers = sortUsers(allUsers, 'xp');

        const server = await Server.findOne({ __v: 0 });
        if (!server) {
            const newServer = new Server();
            await newServer.save();
        } else {
            let topUsers = getTopTen(sortedUsers);
            Server.updateOne({ __v: 0 }, {
                leaderboard: [...topUsers]
            }, err => {
                if (err) {
                    return client.logger.error('Unable to update leaderboard.');
                }
                return client.logger.ready('Succesfully updated leaderboard.')
            });
        }

        let rank = 1;
        for (let user of sortedUsers) {
            const { discordId } = user;
            await User.updateOne({ discordId: discordId }, { rank: rank }, err => {
                if (err) {
                    client.logger.error('Unable to update user rank.');
                }
            });
            rank += 1;
        }
    }, 60 * 1000);
};

export { functions };
