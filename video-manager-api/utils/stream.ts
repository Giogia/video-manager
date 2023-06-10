import { log } from "console"
import { Request, Response } from "express"

import { findFile, streamFile } from "./file"

/**
 * Retrieves the range values for a video file based on the specified range header.
 * @param id - The ID of the video file.
 * @param range - The range header value specifying the desired byte range (optional).
 * @returns An object containing the start, end, length, and contentType of the video file.
 */
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

/**
 * Streams a video file to the response based on the specified ID and range header.
 * @param req - The request object.
 * @param res - The response object.
 */
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

            streamFile(id, { start, end })
               .pipe(res)
               .on("error", error => log(error))
         }
      }
      streamFile(id)
         .pipe(res)
         .on("error", error => log(error))
   }
   catch (e) {
      log(`Cannot stream video ${id}. \n\n ${e}`)
   }
}
