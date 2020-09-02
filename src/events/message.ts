import { User } from '../models/user.model';
import { run } from '../commands';

module.exports = async (client: any, msg: any) => {
    const { content, author } = msg;
    const { logger, msgCooldowns, config } = client;
    const userId: string = author.id;

    // Handle command arguments
    const args: string[] = content.slice(config.prefix.length).trim().split(/ +/g);
    const cmd: string = args.shift().toLowerCase();

    // Command handler
    run(cmd, msg, client, args);
};
