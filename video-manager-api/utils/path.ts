import { join, sep } from "path"
import { encodeName } from "./name"

/**
 * Checks if the specified path represents the root node.
 * @param path - The path to check.
 * @param name - The name of the node (optional).
 * @returns `true` if the path represents the root node, `false` otherwise.
 */
export function isRoot(path: string, name?: string | undefined): boolean {
   return (
      !name &&
      path === sep
   )
}

/**
 * Combines the specified path and name to create a new path.
 * @param path - The base path.
 * @param name - The name to append to the path.
 * @returns The combined path.
 */
export function combinePath(path: string, name: string | undefined): string {
   return name ?
      join(path, encodeName(name)) :
      path
}

/**
 * Destructures the specified path into an array of directory names.
 * @param path - The path to destructure.
 * @returns An array of directory names in reverse order.
 */
export function destructurePath(path: string): string[] {
   return decodeURI(path)
      .split(sep)
      .reverse()
}
