require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@as-integrations/express5');
const mongoose = require('mongoose');
const cors = require('cors');
const { json } = require('body-parser');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

async function startServer() {
    const app = express();
    
    const server = new ApolloServer({
        typeDefs,
        resolvers,
    });

    await server.start();

    app.use(
        '/graphql',
        cors(),
        json(),
        expressMiddleware(server, {
            context: async ({ req }) => ({ req }),
        }),
    );

    const PORT = process.env.PORT || 4000;
    
    mongoose.connect(process.env.MONGODB_URI)
      .then(() => console.log("✅ MongoDB Connected"))
      .catch(err => console.error(err));

    app.listen(PORT, () => {
        console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
    });
}

startServer();