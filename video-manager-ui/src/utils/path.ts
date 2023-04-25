import { join, sep } from 'path'

export const combinePath = (path: string, name: string | undefined) => (
   name ?
      join(path, encodeURI(name)) :
      path
)

export function destructurePath(path: string): string[] {
   return decodeURI(path)
      .split(sep)
      .reverse()
}