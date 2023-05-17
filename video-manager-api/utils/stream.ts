import { log } from "console"
import { Request, Response } from "express"

import { findFile, streamFile } from "./file"

export async function getRangeValues(id: string, range = "bytes=0-") {

   const { chunkSize, length, contentType = "video/mp4" } = await findFile(id)

   const [start, end] = range
      .replace("bytes=", "")
      .split("-")
      .map(n => parseInt(n))

   return {
      start,
      end: end || Math.min(start + chunkSize, length),
      length,
      contentType
   }
}

export async function streamVideo(req: Request, res: Response) {

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
      log(`Cannot stream video ${id}. \n\n ${e}`)
   }
}