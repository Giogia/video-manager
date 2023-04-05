import { GridFSFile } from "mongodb"

import { Node } from "../schema/node"
import { loadBucket } from "./database"

export function uploadFile(id: string) {
   return loadBucket()
      .openUploadStream(id)
}

export function streamFile(id: string) {
   return loadBucket()
      .openDownloadStreamByName(id)
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

export function getFileSize(files: GridFSFile[], id: string) {
   return files
      .find(({ filename }) => filename === id)
      ?.length || 0
}