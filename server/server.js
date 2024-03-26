const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const typeDefs = require('./schemas/typeDefs');
const resolvers = require('./schemas/resolvers');
const { authMiddleware } = require('./utils/auth');
const db = require('./config/connection');
const { createServer } = require('http');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { SubscriptionServer } = require('subscriptions-transport-ws');
const { execute, subscribe } = require('graphql');
const path = require('path');

const PORT = process.env.PORT || 3001;
const app = express();
const httpServer = createServer(app);

// app.get('/admin-dashboard', authMiddleware.isAdmin, (req, res) => {
//     res.send('Admin dashboard');
// });

// app.get('/teacher-dashboard', authMiddleware.isTeacher, (req, res) => {
//     res.send('Teacher dashboard');
// });

// app.get('/parent-dashboard', authMiddleware.isParent, (req, res) => {
//     res.send('Parent dashboard');
// });

// app.get('/student-dashboard', authMiddleware.isStudent, (req, res) => {
//     res.send('Student dashboard');
// });

const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
    context: authMiddleware,
});

const subscriptionServer = SubscriptionServer.create(
    { schema, execute, subscribe },
    { server: httpServer, path: '/graphql'}
);

const server = new ApolloServer({ 
    schema,
    plugins: [
        {
            async serverWillStart() {
                return {
                    async drainServer(){
                        subscriptionServer.close();
                    }
                }
            }
        }
    ]
});

app.use(express.urlencoded({extended: true}));
app.use(express.json());

// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static(path.join(__dirname, '../my-edurec-app/build')));
// }
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../my-edurec-app/build/index.html'));
// });

const startApolloServer = async () => {
    await server.start();
    server.applyMiddleware({app});

    db.once('open', () => {
        httpServer.listen(PORT, () => {
            console.log(`API server running on port ${PORT}!`);
            console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`)
        })
    })
}

startApolloServer();