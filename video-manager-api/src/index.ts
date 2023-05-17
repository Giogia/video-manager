import "reflect-metadata"

import express from "express"

import { buildSchema } from "type-graphql"
import { createYoga } from "graphql-yoga"

import { DirectoryResolver } from "../resolvers/directory"
import { VideoResolver } from "../resolvers/video"
import { graphqlUploadExpress } from "../utils/upload"
import { loadDatabase } from "../utils/database"
import { streamVideo } from "../utils/stream"

/**
 * Starts the application by setting up the necessary configurations, 
 * routes, and listening on the specified port.
 * @returns A Promise that resolves when the application has started successfully.
 */
async function start() {

   const app = express()

   // Build the GraphQL schema
   const schema = await buildSchema({
      resolvers: [DirectoryResolver, VideoResolver],
      emitSchemaFile: true,
   })

   // Enable file uploads
   app.use(graphqlUploadExpress({
      // maxFileSize: 1000000,
      maxFiles: 10
   }))

   // Set up the Yoga server and GraphiQL
   app.use("/graphql", createYoga({
      schema,
      graphiql: { title: "API Documentation" }
   }))

   // Set up the route for streaming videos
   app.get("/videos/:id", streamVideo)

   // Start the server and load the database
   app.listen(4000, loadDatabase)
}

// Start the server
start()