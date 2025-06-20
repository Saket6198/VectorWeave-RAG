import mongoose from 'mongoose';

export const semanticSearch = async (queryEmbedding: number[]) => {
    const result = await mongoose.connection.db?.collection('embeds').aggregate([
    {
      $vectorSearch: {
        index: "vector_index", 
        path: "embedding",     
        queryVector: queryEmbedding,
        numCandidates: 100,
        limit: 1,
        similarity: "cosine",
        filter: {
            role: "user"
        }  
      },
    },
    {
      $project: {
        text: 1,
        role: 1,
        createdAt: 1,
        score: { $meta: "vectorSearchScore" }
      }
    }
  ]).toArray();
    const top = result?.[0];
    if(top && top.score > 0.30){
        return result[0];
  }
  return null;
}
