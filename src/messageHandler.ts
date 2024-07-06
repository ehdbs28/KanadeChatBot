import { Client, Message } from "discord.js"
import { log } from "./log"
import { config } from "./config";

export class MessageHandler {
    private client: Client;

    public Handling(msg: Message) {
        if(msg.author.bot || msg.channelId != config.CHAT_CHANNEL_ID) {
            return;
        }


    }

    constructor(client: Client) {
        this.client = client;
    }
}