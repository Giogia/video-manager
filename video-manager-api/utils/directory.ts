import { Directory, Child } from "../schema/directory"
import { findNode, findChildren } from "./node"

export function composeChild({ id, name, url, size, children = [] }: any): Child {
   return {
      id,
      name,
      ...url ?
         { url, size } :
         { children: children.map(composeChild) }
   }
}

export async function composeDirectory(path: string): Promise<Directory | null> {
   try {
      const node = await findNode(path)

      if (node) {

         const { id, name } = node

         const children = await findChildren(id, {
            maxDepth: 0
         })

         return {
            id: id || "root",
            name,
            children: children.map(composeChild)
         }
      }
      return null
   }
   catch (e) {
      return null
   }
}