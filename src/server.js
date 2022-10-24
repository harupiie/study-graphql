import { ApolloServer, PubSub } from "apollo-server";
import { PrismaClient } from "@prisma/client";
import { getUserId } from "./utils.js";
import Query from "./resolvers/Query.js";
import Mutation from "./resolvers/Mutation.js";
import Subscription from "./resolvers/Subscription.js";
import User from "./resolvers/User.js";
import Post from "./resolvers/Post.js";
import Like from "./resolvers/Like.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const prisma = new PrismaClient();
const pubsub = new PubSub();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const resolvers = {
  Query,
  Mutation,
  Subscription,
  User,
  Post,
  Like,
};

const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf-8"),
  resolvers,
  context: ({ req }) => {
    return {
      ...req,
      prisma,
      pubsub,
      userId: req && req.headers.authorization ? getUserId(req) : null,
    };
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
