import { GridFSBucketReadStreamOptions, GridFSBucketWriteStreamOptions, GridFSFile } from "mongodb"

import { Node } from "../schema/node"
import { loadBucket } from "./database"
import { findChildren } from "./node"

/**
 * Uploads a file to the GridFS bucket with the specified ID and options.
 * @param id - The ID of the file.
 * @param options - The options for the GridFS bucket write stream (optional).
 * @returns The write stream for uploading the file.
 */
export function uploadFile(id: string, options?: GridFSBucketWriteStreamOptions) {
   return loadBucket()
      .openUploadStream(id, options)
}

/**
 * Streams a file from the GridFS bucket with the specified ID and options.
 * @param id - The ID of the file.
 * @param options - The options for the GridFS bucket read stream (optional).
 * @returns The read stream for streaming the file.
 */
export function streamFile(id: string, options?: GridFSBucketReadStreamOptions) {
   return loadBucket()
      .openDownloadStreamByName(id, options)
}

/**
 * Finds a file in the GridFS bucket with the specified ID.
 * @param id - The ID of the file.
 * @returns A Promise that resolves to the found GridFS file.
 */
export async function findFile(id: string): Promise<GridFSFile> {
   return loadBucket()
      .find({ filename: id })
      .toArray()
      .then(([file]) => file || {})
}

/**
 * Finds multiple files in the GridFS bucket based on the provided nodes.
 * @param nodes - The nodes representing the files.
 * @returns A Promise that resolves to an array of the found GridFS files.
 */
export async function findFiles(nodes: Node[]): Promise<GridFSFile[]> {
   return loadBucket()
      .find({ filename: { $in: getFileIds(nodes) } })
      .toArray()
}

/**
 * Removes a file from the GridFS bucket with the specified ID.
 * @param id - The ID of the file to remove.
 * @returns A Promise that resolves when the file is successfully removed.
 */
export async function removeFile(id: string) {

   const { _id } = await findFile(id)

   return loadBucket()
      .delete(_id)
}

/**
 * Removes all files associated with a parent node from the GridFS bucket.
 * @param parent - The ID of the parent node.
 * @returns A Promise that resolves when all files are successfully removed.
 */
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

/**
 * Retrieves the file IDs from the provided nodes.
 * @param nodes - The nodes representing the files.
 * @returns An array of file IDs.
 */
export function getFileIds(nodes: Node[]): string[] {
   return nodes
      .filter(({ data }) => data)
      .map(({ data }) => data!)
}

/**
 * Retrieves the size of a file from the provided GridFS files and file ID.
 * @param files - The GridFS files to search.
 * @param id - The ID of the file.
 * @returns The size of the file in bytes.
 */
export function getFileSize(files: GridFSFile[], id: string): number {
   return files
      .find(({ filename }) => filename === id)
      ?.length || 0
}
