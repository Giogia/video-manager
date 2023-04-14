import { GridFSBucketReadStreamOptions, GridFSFile } from "mongodb"

import { Node } from "../schema/node"
import { loadBucket } from "./database"

export function uploadFile(id: string) {
   return loadBucket()
      .openUploadStream(id)
}

export function streamFile(id: string, options: GridFSBucketReadStreamOptions) {
   return loadBucket()
      .openDownloadStreamByName(id, options)
}

export async function findFile(id: string): Promise<GridFSFile> {
   return loadBucket()
      .find({ filename: id })
      .toArray()
      .then(([file]) => file || {})
}

export async function findFiles(nodes: Node[]): Promise<GridFSFile[]> {
   return loadBucket()
      .find({
         filename: {
            $in: nodes
               .filter(({ data }) => data)
               .map(({ data }) => data!)
         }
      })
      .toArray()
}

export async function removeFile(id: string) {

   const { _id } = await findFile(id)

   return loadBucket()
      .delete(_id)
}

export async function getRangeValues(id: string, range = "bytes=0-") {

   const [{ chunkSize, length }] = await findFile(id)

   const [start, end] = range
      .replace("bytes=", "")
      .split("-")
      .map(n => Number(n))

   return {
      start,
      end: end || Math.min(start + chunkSize, length - 1),
      chunkSize,
      length
   }
}

export function getFileSize(files: GridFSFile[], id: string): number {
   return files
      .find(({ filename }) => filename === id)
      ?.length || 0
}