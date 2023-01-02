import { join } from 'path'

export const combinePath = (path: string, name: string | undefined) => (
    name ?
        join(path, name.replaceAll(" ", "").toLowerCase()) :
        path
)