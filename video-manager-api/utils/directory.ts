import { GridFSFile } from "mongodb"

import { Directory, Child } from "../schema/directory"
import { findFiles, getFileSize } from "./file"
import { findNode, findChildren } from "./node"
import { combinePath } from "./path"

export function composeChild(files: GridFSFile[]) {
   return async ({ id, name, data, children = [] }: any): Promise<Child> => ({
      id,
      name,
      ...data ?
         {
            url: combinePath("/videos", data),
            size: getFileSize(files, data)
         } :
         {
            children: await Promise.all(
               children.map(composeChild(await findFiles(children)))
            )
         }
   })
}

export async function composeDirectory(path: string): Promise<Directory | null> {
   try {
      const node = await findNode(path)

      if (node) {

         const { id, name } = node

         const children = await findChildren(id, {
            maxDepth: 0
         })

         const files = await findFiles(children)

         return {
            id: id || "root",
            name,
            children: await Promise.all(
               children.map(composeChild(files))
            )
         }
      }
      return null
   }
   catch (e) {
      return null
   }
}