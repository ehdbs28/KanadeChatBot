import { Client, GatewayIntentBits } from "discord.js"
import { config } from "./config"
import { log } from "./log"
import { MessageHandler } from "./messageHandler";

let client: Client;
const messageHandler = new MessageHandler();

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
        messageHandler.handle(msg);
    });

    client.on("error", err => {
        log.error(err);
    });

    await client.login(config.BOT_TOKEN);

    log.info(`Logged in as ${client.user?.tag}`);
})();