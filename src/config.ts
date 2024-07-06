import dotenv from "dotenv"

dotenv.config();

const { BOT_TOKEN, CHAT_CHANNEL_ID, OPEN_AI_API_KEY, OPEN_AI_API_PROJECT_ID } = process.env;

if(!BOT_TOKEN || !CHAT_CHANNEL_ID) {
    throw new Error("Missing environment variables");
}

export const config = {
    BOT_TOKEN,
    CHAT_CHANNEL_ID,
    OPEN_AI_API_KEY,
    OPEN_AI_API_PROJECT_ID
};