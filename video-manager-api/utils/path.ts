import { join } from 'path'

export const isRoot = (name: string, path: string) => (!name && path === '/')

export const combinePath = (path: string, name: string) => {

    return join(path, name.replace(" ", "").toLowerCase())
}
