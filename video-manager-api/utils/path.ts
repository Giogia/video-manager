import { join } from 'path'

export const combinePath = (path: string, name: string) => {

    return join(path, name.replace(" ", "").toLowerCase())
}
