import { join } from 'path'

export const isRoot = (path: string, name: string) => (!name && path === '/')

export const combinePath = (path: string, name: string) => {

    return join(path, name.replaceAll(" ", "").toLowerCase())
}
