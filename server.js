// ****************************JAVASCRIPT LIBRARIES******************************

// *****************************EXTERNAL LIBRARIES*******************************
const { ApolloServer } = require('apollo-server-express');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const express = require('express');
const {merge} = require('lodash');
const cors = require('cors');
require('dotenv').config();
// ********************************OWN LIBRARIES*********************************
const connectionDB = require('./db/db');
const courseModel = require('./models/course');
const courseTypesDefs = require("./types/courseTypes");
const courseResolvers = require("./resolvers/courseResolvers");
// ******************************************************************************
// Conectar a la base de datos
connectionDB(process.env.MONGODB_URL);

// Crear una instancia de Express
const app = express();

// Definir el esquema de GraphQL con typeDefs y resolvers
const typeDefs = `
    type Alert {
        message: String
    }

    type Query {
        _ : Boolean
    }

    type Mutation {
        _ : Boolean
    }
`;

const resolver = {};

// Crear el esquema de GraphQL con typeDefs y resolvers
const schema = makeExecutableSchema({
    typeDefs: [typeDefs, courseTypesDefs],
    resolvers: merge(resolver, courseResolvers.resolvers),
});

// Crear una instancia de ApolloServer
const server = new ApolloServer({ schema });

// Iniciar el servidor de Apollo
server.start().then(() => {
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    // Aplicar el middleware de ApolloServer a la ruta /graphql
    server.applyMiddleware({ app: app, path: '/graphql' });

    // Iniciar el servidor de Express y escuchar las peticiones HTTP
    app.listen(process.env.PORT, () => {
        console.log(`Server started on port ${process.env.PORT}`);
    });
}).catch((error) => {
    console.error('Error starting Apollo Server:', error);
});