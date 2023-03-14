import { join, resolve } from "path"
import { formatName } from "./name"

export const ROOT = "/"
export const SEPARATOR = "/"

export const currentPath = resolve

export function isRoot(path: string, name?: string | undefined): boolean {
   return (
      !name &&
      path === ROOT
   )
}

export function combinePath(path: string, name: string | undefined): string {
   return name ?
      join(path, formatName(name)) :
      path
}


export function destructurePath(path: string): string[] {
   return path
      .split(SEPARATOR)
      .reverse()
}