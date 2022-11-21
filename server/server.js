// TODO from README - `server.js`: Implement the Apollo Server and apply it to the Express server as middleware.

const express = require('express');

// CODE REFERENCE: MERN/01-Activities/26-Stu_Resolver-Context/Unsolved/server/server.js
const { ApolloServer } = require('apollo-server-express');
const { authMiddleware } = require('./utils/auth');
const { typeDefs, resolvers } = require('./schemas');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

const path = require('path');
const db = require('./config/connection');

// testing without below after comparing it against other code
// const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3001;

// testing for extended: false after comparing it against other code
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// testing without below after comparing it against other code
// app.use(routes);

// CODE REFERENCE: MERN/01-Activities/26-Stu_Resolver-Context/Unsolved/server/server.js

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    })
  })
};

// Call the async function to start the server
startApolloServer(typeDefs, resolvers);
