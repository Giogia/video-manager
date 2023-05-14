import { GridFSBucketReadStreamOptions, GridFSBucketWriteStreamOptions, GridFSFile } from "mongodb"

import { Node } from "../schema/node"
import { loadBucket } from "./database"
import { findChildren } from "./node"

export function uploadFile(id: string, options?: GridFSBucketWriteStreamOptions) {
   return loadBucket()
      .openUploadStream(id, options)
}

export function streamFile(id: string, options?: GridFSBucketReadStreamOptions) {
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
      .find({ filename: { $in: getFileIds(nodes) } })
      .toArray()
}

export async function removeFile(id: string) {

   const { _id } = await findFile(id)

   return loadBucket()
      .delete(_id)
}

export async function removeFiles(parent: string) {

   const childrenNodes = await findChildren(parent)

   const files = childrenNodes.reduce((ids, { data, children = [] }) => ([
      ...ids,
      ...data ? [data] : [],
      ...getFileIds(children)
   ]), [] as string[])

   return Promise.all(
      files.map(file => removeFile(file))
   )
}

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

export function getFileIds(nodes: Node[]): string[] {
   return nodes
      .filter(({ data }) => data)
      .map(({ data }) => data!)
}

export function getFileSize(files: GridFSFile[], id: string): number {
   return files
      .find(({ filename }) => filename === id)
      ?.length || 0
}