require('dotenv').config(); 
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

async function startServer() {
    const app = express();
    const server = new ApolloServer({ typeDefs, resolvers });

    await server.start();
    server.applyMiddleware({ app });

    const PORT = process.env.PORT || 4000;
    const MONGO_URI = process.env.MONGODB_URI;

    if (!MONGO_URI) {
        console.error("Error: MONGODB_URI is not defined in .env file");
        process.exit(1);
    }

    mongoose.connect(MONGO_URI)
      .then(() => console.log("✅ MongoDB Connected: comp3133_101205106_Assigment1"))
      .catch(err => console.error("❌ MongoDB Connection Error:", err));

    app.listen(PORT, () => {
        console.log(`🚀 Server running at http://localhost:${PORT}${server.graphqlPath}`);
    });
}

startServer();