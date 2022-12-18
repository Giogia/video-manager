import "reflect-metadata"

import express from 'express'
import mongoose from 'mongoose'

import { buildSchema } from 'type-graphql'
import { createYoga } from 'graphql-yoga'

import { DirectoryResolver } from '../resolvers/directory'
import { VideoResolver } from '../resolvers/video'

async function loadDB() {
   await mongoose.connect(process.env.MONGO_DB_URL!)
}

async function start() {
   const app = express()

   const schema = await buildSchema({
      resolvers: [DirectoryResolver, VideoResolver],
      emitSchemaFile: true,
   })

   app.use('/graphql', createYoga({
      schema,
      graphiql: { title: 'API Playground' }
   }))

   app.listen(4000, () => {
      loadDB()
   })
}

start()