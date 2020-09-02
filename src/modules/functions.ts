import { User } from '../models/user.model';

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
};

export { functions };
