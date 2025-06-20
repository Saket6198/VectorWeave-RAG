import { weatherAgent } from "./agent/weatherAgent";
import readlineSync from "readline-sync";
import dotenv from "dotenv";

dotenv.config();

async function chatting() {
  // Wait for the agent to be initialized
  const agent = await weatherAgent;
  
  // Generate a unique thread ID for this conversation session
  const threadId = `weather_chat_${Date.now()}`;
  const resourceId = "user_001"; // You can make this dynamic based on actual user

  while (true) {
    try {
      const question = readlineSync.question('You: ');
      
      // Exit condition
      if (question.toLowerCase() === 'exit' || question.toLowerCase() === 'quit') {
        console.log("👋 Goodbye! Thanks for using Weather Chat!");
        break;
      }

      console.log("\n=== Weather Agent Response ===\n");
      
      // Use the agent's generate method instead of stream for simpler handling
      const response = await agent.generate(question, {
        resourceId: resourceId,
        threadId: threadId,
      });

      console.log(response.text);
      console.log("\n"); // New line after response
      console.log(); // Empty line for readability
      
    } catch (err: any) {
      console.error("❌ An error occurred:", err.message);
      console.log("Please try again.\n");
    }
  }
}

async function main() {
  console.log("🌤️ Welcome to Weather Chat!");
  console.log("💡 Ask me about the weather in any city!");
  console.log("💬 Type 'exit' or 'quit' to end the conversation.\n");
  
  try {
    await chatting();
  } catch (error: any) {
    console.error("❌ Failed to start chat:", error.message);
  }
}

main().catch((error) => {
  console.error("❌ Application failed to start:", error);
  process.exit(1);
});