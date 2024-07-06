import { Client, GatewayIntentBits, Interaction } from "discord.js"
import { Logger, ILogObj } from "tslog"
import { config } from "./config"

const log: Logger<ILogObj> = new Logger();
let client: Client;

(async () => {
    const intents = [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessages,
    ];

    client = new Client({
        intents: intents
    });

    client.on("messageCreate", msg => {
        msg.reply(msg.content);
    });

    client.on("error", err => {
        log.error(err);
    });

    await client.login(config.BOT_TOKEN);

    log.info(`Logged in as ${client.user?.tag}`);
})();