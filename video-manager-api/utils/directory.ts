import { GridFSFile } from "mongodb"

import { Node } from "../schema/node"
import { Directory, Child } from "../schema/directory"
import { findFiles, getFileSize } from "./file"
import { findNode, findChildren } from "./node"
import { combinePath } from "./path"

/**
 * Calculates the maximum depth of nested "children" in the provided query string.
 * @param query - The query string to search for "children" occurrences.
 * @returns The maximum depth of nested "children" or 0 if no "children" occurrences are found.
 */
export function getMaxDepth(query?: string): number {
   return query
      ?.match(/children/g)
      ?.slice(1, -1)
      .length || 0
}

/**
 * Sorts an array of children by name in ascending order.
 * @param children - The array of children to be sorted.
 * @returns The sorted array of children.
 */
export function sortByName(children: Child[]): Child[] {
   return children
      .sort((a, b) => a.name > b.name ? 1 : -1)
}

/**
 * Composes a child object for a given node, recursively generating child objects based on the specified maximum depth.
 * @param files - The array of GridFS files.
 * @param maxDepth - The maximum depth for generating child objects.
 * @param currentDepth - The current depth in the composition process (default: 0).
 * @param allChildren - All available children nodes (default: []).
 * @returns An asynchronous function that composes a child object for a given node.
 */
export function composeChild(
   files: GridFSFile[],
   maxDepth: number,
   currentDepth = 0,
   allChildren: Node[] = []
) {
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
               children: currentDepth > maxDepth ? [] :
                  await Promise
                     .all(
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
                     )
                     .then(sortByName)
            }
      }
   }
}

/**
 * Composes a directory object with its children based on the specified path and optional query.
 * @param path - The path of the directory.
 * @param query - The optional query string for determining the maximum depth of nested "children".
 * @returns A Promise that resolves to the composed directory object or null if the directory is not found.
 */
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
            children: await Promise
               .all(children.map(composeChild(files, maxDepth)))
               .then(sortByName)
         }
      }
      return null
   } catch (e) {
      return null
   }
}
