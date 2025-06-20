import { cosineSimilarity as cosineSimilarityFn } from "ai";

export const cosineSimilarity = async (
    vectorA: number[],
    vectorB: number[]
) => {
    console.log(cosineSimilarityFn(vectorA, vectorB));
}

async function test(){
    const vectorA = [1, 2, 3];
    const vectorB = [4, 5, 6];
    await cosineSimilarity(vectorA, vectorB);
    // Expected output: 0.9746318461970762
}
test();