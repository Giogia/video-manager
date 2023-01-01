import { join } from 'path'

export const isRoot = (path: string, name: string | undefined) => (!name && path === '/')

export const combinePath = (path: string, name: string | undefined) => (
    name ?
        join(path, name.replaceAll(" ", "").toLowerCase()) :
        path
)

export const startsWith = (path: string, addRoot = true) => new RegExp(
    `^${path}${addRoot || path == '/' ? '' : '/'}`
)