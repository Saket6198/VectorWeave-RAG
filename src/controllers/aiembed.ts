import {google} from '@ai-sdk/google';
import { embed } from 'ai';
import dotenv from 'dotenv';
dotenv.config();

const model = google.textEmbeddingModel('text-embedding-004');

export async function AiEmbed(text: string) {
    try{
        console.log(`Creating embedding for: "${text}"`);
        const { embedding } = await embed({
            model,
            value: text
        })
        // console.log("✅ Embedding generated successfully:");
        // console.log(embedding); // array of floats
        return embedding;
    }
    catch(err: any){
        console.error("❌ Error creating embedding:", err.message);
        throw err;
    }
}


// async function test(){
//     const test = "What's the weather like in New York today?";
//     await aiembed(test);

// }
// test();