import "reflect-metadata"

import express from "express"

import { buildSchema } from "type-graphql"
import { createYoga } from "graphql-yoga"

import { DirectoryResolver } from "../resolvers/directory"
import { VideoResolver } from "../resolvers/video"
import { loadDatabase } from "../utils/database"
import { getRangeValues, streamFile } from "../utils/file"
import { graphqlUploadExpress } from "../utils/upload"

async function start() {

   const app = express()

   const schema = await buildSchema({
      resolvers: [DirectoryResolver, VideoResolver],
      emitSchemaFile: true,
   })

   app.use(graphqlUploadExpress({
      // maxFileSize: 1000000,
      maxFiles: 1
   }))

   app.use("/graphql", createYoga({
      schema,
      graphiql: { title: "API Documentation" }
   }))

   app.get("/videos/:id", async (req, res) => {

      const { params, headers } = req

      const { id } = params
      const { range } = headers

      try {
         if (range) {

            const { start, end, length, contentType } = await getRangeValues(id, range)
            
            if (end < length) {

               res.writeHead(206, {
                  "Content-Range": `bytes ${start}-${end}/${length}`,
                  "Accept-Ranges": "bytes",
                  "Content-Length": end - start,
                  "Content-Type": contentType,
               })

               streamFile(id, { start, end }).pipe(res)
            }
         }
         streamFile(id).pipe(res)
      }
      catch (e) {
         console.log(e)
      }
   })

   app.listen(4000, () => {
      loadDatabase()
   })
}

start()