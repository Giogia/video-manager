import { join } from 'path'

const ROOT = "/"
const SPACE = " "
const EMPTY = ""

export const isRoot = (path: string, name?: string | undefined) =>
    !name && path === ROOT

export const combinePath = (path: string, name: string | undefined) => (
    name ?
        join(path, name.replaceAll(SPACE, EMPTY).toLowerCase()) :
        path
)

export const replacePath = (path: string, oldPath: string, newPath: string) => (
    path.replace(oldPath, `${isRoot(newPath) ? EMPTY : newPath}${isRoot(oldPath) ? ROOT : EMPTY}`)
)

export const startsWith = (path: string, addRoot = false) => new RegExp(
    `^${path}${addRoot || isRoot(path) ? EMPTY : ROOT}`
)