import { Directory } from "../schema/directory"
import { combinePath } from "./path"
import { findNode, findChildren } from "./node"

export function composeChild({ id, name, children = [] }: Omit<Directory, 'path'>): Directory {
    return {
        id,
        name,
        children: children.map(composeChild)
    }
}

export async function composeDirectory(path: string): Promise<Directory | null> {
    try {
        const node = await findNode(path)

        if (node) {

            const { id, name } = node

            const children = await findChildren(id, {
                maxDepth: 0
            })

            return {
                id: id || 'root',
                name,
                children: children.map(composeChild)
            }
        }
        return null
    }
    catch (e) {
        return null
    }
}