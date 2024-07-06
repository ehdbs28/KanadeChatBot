import dotenv from "dotenv"

dotenv.config();

const { BOT_TOKEN, CHAT_CHANNEL_ID, OPENAI_API_KEY, OPENAI_ASSISTANT_ID } = process.env;

if(!BOT_TOKEN || !CHAT_CHANNEL_ID) {
    throw new Error("Missing environment variables");
}

export const config = {
    BOT_TOKEN,
    CHAT_CHANNEL_ID,
    OPENAI_API_KEY,
    OPENAI_ASSISTANT_ID
};