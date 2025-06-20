# VectorWeave: Weather RAG

A sophisticated AI-powered weather agent
built with TypeScript that combines
conversational AI with vector-based retrieval augmented generation (RAG), allowing users to query weather information
through natural language.

## 🌟 Features

- **Weather Information Retrieval**: Get current weather data for any city using natural language queries
- **Vector Embeddings**: Uses Gemini's embedding-001 model to convert text into vectors
- **RAG System**: Implements Retrieval Augmented Generation for improved context awareness
- **Conversational Memory**: Remembers previous interactions. It uses vector search and message storage

  **Short-term memory(MongoDBStore)** (last 5 messages)

  **Long-term memory(MongoDBVector)** (semantic recall using vector search)

- **Semantic Search**: Finds semantically similar past queries using vector similarity

## 🛠️ Tech Stack

- **TypeScript**: Statically typed JavaScript for better developer experience

- **Mastra Framework**: For building the AI agent with tool usage
- **MongoDB**: For vector database and conversation storage
- **Google Gemini**: For text embeddings
- **Mongoose**: ODM for MongoDB interaction
- **Axios**: For making API requests to the weather service
- **Cosine Similarity**: For comparing vector embeddings

## 📁 Project Structure

```
src/
├── actions/
│   ├── Embedding.ts       # Text to vector conversion utilities
│   └── testEmbedding.ts   # Testing embedding functionality
├── agent/
│   └── weatherAgent.ts    # Core weather agent implementation
├── config/
│   └── db.ts              # MongoDB connection configuration
├── controllers/
│   ├── aiembed.ts         # AI embedding controller
│   ├── cosine_similar.ts  # Vector similarity functions
│   └── semantic_search.ts # MongoDB vector search implementation
├── models/
│   └── embed_model.ts     # Mongoose schema for embedding storage
├── tools/
│   └── weatherApi.ts      # Weather API integration
├── workflows/
│   └── weatherTool.ts     # Weather tool for the agent to use
├── index_mastra.ts        # Main entry point using Mastra
├── index.ts               # Alternative entry point
└── testEmbed.ts           # Standalone embedding test utility
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16+)
- pnpm (or npm/yarn)
- MongoDB Atlas account (for vector database)
- Google API key for Gemini AI
- Weather API key (weatherapi.com)

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/yourusername/BasicWeatherAgent.git
   cd BasicWeatherAgent
   ```

2. Install dependencies

   ```bash
   pnpm install
   ```

3. Set up environment variables
   ```bash
   cp .env.example .env
   ```
4. Fill in your API keys in the `.env` file
   ```
   GOOGLE_API_KEY=your_gemini_api_key_here
   MONGODB_URI=your_mongodb_connection_string_here
   WEATHER_API_KEY=your_weather_api_key_here
   ```

### Running the Application

Start the development server:

```bash
pnpm run dev
```

Build for production:

```bash
pnpm run build
```

Run the production build:

```bash
pnpm start
```

## 💬 Usage

Once the application is running, you can start asking questions about the weather:

```
You: What's the weather like in New York today?
=== Weather Agent Response ===
According to current data, the temperature in New York is 72°F (22°C) with partly cloudy conditions. Humidity is at 65% with a gentle breeze of 8 mph from the southwest.

You: Should I take an umbrella?
=== Weather Agent Response ===
Based on the current forecast for New York, there's no precipitation expected in the immediate future, so you likely don't need an umbrella today. However, it's partly cloudy, so conditions could change later.
```

## 🧠 RAG System Architecture

The Retrieval Augmented Generation (RAG) system works as follows:

1. **User Query Embedding**: The user's question is converted to a vector using Gemini's embedding model
2. **Vector Storage**: Embeddings are stored in MongoDB's vector collection
3. **Semantic Search**: When a new query comes in, the system finds similar past queries
4. **Context Enhancement**: The agent uses retrieved similar questions to enhance its understanding
5. **API Integration**: Weather data is fetched from weatherapi.com based on identified locations
6. **Response Generation**: The agent combines context, retrieved information, and weather data

## 📊 Vector Search

The system uses MongoDB Atlas Vector Search with the following capabilities:

- 768-dimensional embeddings
- Cosine similarity for semantic matching
- Threshold-based filtering (similarity > 0.3)
- Role-based filtering (separating user and assistant messages)

## 🧪 Testing Embeddings

Test the embedding functionality:

```bash
npx ts-node src/actions/testEmbedding.ts
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---
