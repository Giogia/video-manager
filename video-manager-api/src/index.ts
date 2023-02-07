import "reflect-metadata"

import express from 'express'

import { buildSchema } from 'type-graphql'
import { createYoga } from 'graphql-yoga'

import { DirectoryResolver } from '../resolvers/directory'
import { VideoResolver } from '../resolvers/video'
import { loadDatabase } from "../utils/database"

async function start() {
   const app = express()

   const schema = await buildSchema({
      resolvers: [DirectoryResolver, VideoResolver],
      emitSchemaFile: true,
   })

   app.use('/graphql', createYoga({
      schema,
      graphiql: { title: 'API Documentation' }
   }))

   app.listen(4000, () => {
      loadDatabase()
   })
}

start()