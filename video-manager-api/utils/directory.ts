import { GridFSFile } from "mongodb"

import { Node } from "../schema/node"
import { Directory, Child } from "../schema/directory"
import { findFiles, getFileSize } from "./file"
import { findNode, findChildren } from "./node"
import { combinePath } from "./path"

export function getMaxDepth(query?: string) {
   
   return query
      ?.match(/children/g)
      ?.slice(1, -1)
      .length || 0
}

export function composeChild(files: GridFSFile[], maxDepth: number, currentDepth = 0, allChildren: Node[] = []) {

   return async ({ id, name, data, children = [] }: Node): Promise<Child> => {

      const childNodes = children.length > 0 ? children : allChildren

      return {
         id,
         name,
         ...data ?
            {
               url: combinePath("/videos", data),
               size: getFileSize(files, data)
            } :
            {
               children: currentDepth <= maxDepth ?
                  await Promise.all(
                     childNodes
                        .filter(({ depth, parent }: Node) => (
                           depth === currentDepth &&
                           parent === id
                        ))
                        .map(composeChild(
                           await findFiles(childNodes),
                           maxDepth,
                           currentDepth + 1,
                           childNodes
                        ))
                  ) : []
            }
      }
   }
}

export async function composeDirectory(path: string, query?: string): Promise<Directory | null> {

   const maxDepth = getMaxDepth(query)

   try {
      const node = await findNode(path)

      if (node) {

         const { id, name } = node

         const children = await findChildren(id, { maxDepth })
         const files = await findFiles(children)

         return {
            id: id || "root",
            name,
            children: await Promise.all(
               children.map(composeChild(files, maxDepth))
            )
         }
      }
      return null
   }
   catch (e) {
      return null
   }
}