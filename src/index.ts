import { connectDb } from "./config/db";
import { weatherAgent } from "./agent/weatherAgent";
import readlineSync from "readline-sync";
import { AiEmbed } from "./controllers/aiembed";
import EmbedModel from "./models/embed_model";
import { semanticSearch } from "./controllers/semantic_search";



async function Chatting(){
  while(true){
    try{
      const question = await readlineSync.question('You: ');
      
      const queryembedded = await AiEmbed(question);
      
      const relevant = await semanticSearch(queryembedded);

      if(relevant){
        console.log(`\n📚 Retrieved from memory:\n"${relevant?.text}"`);
      }
      const context = (relevant?.text) ? (`Past Context Data: ${relevant.text}\n\nUser: ${question}`) : question;
      const response = await weatherAgent.generate(context);
      console.log("\n=== Weather Agent Response ===\n");
      console.log(response.text);
      
      await EmbedModel.create({
        text: question,
        role: "user",
        embedding: queryembedded,
      });
      await EmbedModel.create({
        text: response.text,
        role: "assistant",
      });

      // console.log(testData);

      console.log(); // Empty line for readability
    }catch (err: any) {
      console.error("❌ An error occurred:", err.message);
      console.log("Please try again.\n");
    }
  }
}

async function main() {
  console.log("🌤️ Welcome to Weather Chat!\n");
  connectDb()
    .then(() => console.log("✅ Connected to the database successfully."))
    .catch((err) =>
      console.error("❌ Database connection failed:", err.message)
    );
  await Chatting();
  
}

main();
