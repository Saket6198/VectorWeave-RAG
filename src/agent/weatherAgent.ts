import { Agent } from "@mastra/core/agent";
import { Memory } from "@mastra/memory";
import { google } from "@ai-sdk/google";
import { getWeatherTool } from "../workflows/weatherTool";
import { MongoDBVector, MongoDBStore } from "@mastra/mongodb";
import dotenv from "dotenv";
dotenv.config();

const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
  throw new Error("MONGODB_URI environment variable is not set.");
}

const vectorStore = new MongoDBVector({
  uri: mongoUri,
  dbName: "mastra",
});

const store = new MongoDBStore({
  url: mongoUri,
  dbName: "mastra",
});

// Initialize the agent asynchronously
async function initializeAgent() {
  await vectorStore.connect();

  await vectorStore.createIndex({
    indexName: "embeds",
    dimension: 768,
    metric: "cosine",
  });

  // Create Memory instance with proper configuration
  const memory = new Memory({
    vector: vectorStore,
    storage: store,
    options: {
      lastMessages: 5,
      semanticRecall: {
        topK: 1,
        messageRange: { before: 0, after: 0 },
      },
    },
    embedder: google.textEmbeddingModel("text-embedding-004")
  });

  return new Agent({
  name: "Weather Agent",
  instructions: `
    You are a weather assistant that MUST use tools to get weather information.
    
    IMPORTANT: You have access to a tool called "getWeatherInfo" that fetches current weather data.
    
    When asked about weather:
    1. ALWAYS call the getWeatherInfo tool first
    2. Extract the city name from the user's question
    3. Pass the city name to the getWeatherInfo tool
    4. Wait for the tool response and then provide the weather information
    
    NEVER refuse a weather request - you have the getWeatherInfo tool available to get current weather data.
    NEVER say you cannot provide weather information - use the tool!
    Also you have been given the conversation history, so you can refer to previous messages if needed.
  `,
  model: google('gemini-2.0-flash-lite'),
  tools: {
    getWeatherInfo: getWeatherTool,
  },
  memory: memory,
});
}

// Export a promise that resolves to the agent
export const weatherAgent = initializeAgent();