import { join, sep } from "path"
import { encodeName } from "./name"

export function isRoot(path: string, name?: string | undefined): boolean {
   return (
      !name &&
      path === sep
   )
}

export function combinePath(path: string, name: string | undefined): string {
   return name ?
      join(path, encodeName(name)) :
      path
}

export function destructurePath(path: string): string[] {
   return decodeURI(path)
      .split(sep)
      .reverse()
}