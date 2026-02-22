require('dotenv').config(); 
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const { body, validationResult } = require('express-validator');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

async function startServer() {
    const app = express();
    
    // 1. Required to parse JSON bodies for express-validator 
    app.use(express.json()); 

    const server = new ApolloServer({ 
        typeDefs, 
        resolvers,
        formatError: (err) => {
            // Returns custom error messages to the client 
            return { message: err.message, status: err.extensions?.code };
        }
    });

    await server.start();

    // 2. Validation Middleware for Signup 
    app.use('/graphql', (req, res, next) => {
        // Only run validation if the operation is a 'signup' 
        if (req.body.query && req.body.query.includes('signup')) {
            const validations = [
                body('variables.email').isEmail().withMessage('Invalid email format'),
                body('variables.password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
            ];

            // Run validations manually to avoid stream conflicts
            Promise.all(validations.map(validation => validation.run(req))).then(() => {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    // Returns 400 error for your documentation screenshots
                    return res.status(400).json({ errors: errors.array() });
                }
                next();
            });
        } else {
            next();
        }
    });

    server.applyMiddleware({ app });

    const PORT = process.env.PORT || 4000;
    const MONGO_URI = process.env.MONGODB_URI;

    // 3. Database Connection
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