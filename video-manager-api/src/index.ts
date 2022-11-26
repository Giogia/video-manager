import "reflect-metadata"

import express from 'express'
import mongoose  from 'mongoose'

import { buildSchema } from "type-graphql"
import { graphqlHTTP } from 'express-graphql' 

import { VideoResolver } from '../resolvers/video'

async function loadDB(){
   await mongoose.connect(process.env.MONGO_DB_URL!)
}

async function start() {
   const app = express()

   const schema = await buildSchema({
      resolvers: [VideoResolver],
      emitSchemaFile: true,
   })

   app.use('/graphql', graphqlHTTP({
      schema, 
      graphiql:true
   }))
   
   app.listen(3000, () => {
      console.log('Listening on port 3000')
      loadDB()
   })
}

start()