import { Message } from "discord.js";
import { log } from "./log";
import { config } from "./config";
import OpenAIApi from "openai";

export class MessageHandler {
    private ai: OpenAIApi;
    private threadId: string | null;

    constructor() {
        this.ai = new OpenAIApi({
            apiKey: config.OPENAI_API_KEY,            
        });
        this.threadId = null;
    }

    public async handle(msg: Message) {
        if (msg.author.bot || msg.channelId != config.CHAT_CHANNEL_ID || !msg.content) {
            return;
        }

        try {
            log.info(`[${msg.author.displayName}]: ${msg.content}`);

            if (!this.threadId) {
                this.threadId = await this.createThread();
            }

            await this.sendMessageToAssistant(msg.content);

            const run = await this.createRun();
            await this.waitRun(run);

            const response = await this.receiveMessage();
            const receivedContent = response.data[0].content[0] as OpenAIApi.Beta.Threads.TextContentBlock;
            const text = receivedContent.text.value;

            msg.channel.send(text);

            log.info(`[카나데]: ${text}`);
        } catch (err) {
            log.error(err);
        }
    }

    private async createThread(): Promise<string> {
        const response = await this.ai.beta.threads.create();
        return response.id;
    }

    private async sendMessageToAssistant(content: string) {
        await this.ai.beta.threads.messages.create(this.threadId as string, {
            role: "user",
            content,
        });
    }

    private async createRun() {
        const response = await this.ai.beta.threads.runs.create(this.threadId as string, {
            assistant_id: config.OPENAI_ASSISTANT_ID as string,
        });
        return response;
    }

    private async waitRun(run: OpenAIApi.Beta.Threads.Run) {
        let currentRun = run;
        while (currentRun.status === "queued" || currentRun.status === "in_progress") {
            currentRun = await this.ai.beta.threads.runs.retrieve(this.threadId as string, currentRun.id);
            await new Promise((resolve) => setTimeout(resolve, 100));
        }
        return currentRun;
    }

    private async receiveMessage() {
        const response = await this.ai.beta.threads.messages.list(this.threadId as string);
        return response;
    }
}