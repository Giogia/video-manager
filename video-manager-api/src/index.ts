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

      const { start, end, chunkSize, length } = await getRangeValues(id, range)

      res.writeHead(206, {
         "Content-Range": `bytes ${start}-${end}/${length}`,
         "Accept-Ranges": "bytes",
         "Content-Length": chunkSize,
         "Content-Type": "video/mp4",
      })

      streamFile(id, { start, end })
         .on("error", (err) => {
            console.error(`Error while streaming file: ${err}`)
            res.sendStatus(500)
         })
         .pipe(res)
   })

   app.listen(4000, () => {
      loadDatabase()
   })
}

start()