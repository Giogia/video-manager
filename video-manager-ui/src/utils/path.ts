import { join, sep } from 'path'

/**
 * Combines a path and a name to create a new path.
 * If the name is defined, it appends the encoded name to the path using the appropriate separator.
 * If the name is undefined, it returns the original path.
 * 
 * @param path - The base path.
 * @param name - The name to append to the path.
 * @returns The combined path.
 */
export const combinePath = (path: string, name: string | undefined) => (
   name ?
      join(path, encodeURI(name)) :
      path
)

/**
 * Destructures a path into an array of directory names.
 * It decodes the path, splits it using the separator, and reverses the resulting array.
 * 
 * @param path - The path to destructure.
 * @returns An array of directory names.
 */
export function destructurePath(path: string): string[] {
   return decodeURI(path)
      .split(sep)
      .reverse()
}