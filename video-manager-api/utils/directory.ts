import { Directory } from "../schema/directory"
import { combinePath } from "./path"
import { findNode, findChildren } from "./node"

export function composeChild(root: string) {

    return ({ id, name, children = [] }: Omit<Directory, 'path'>): Directory => {

        const path = combinePath(root, name)

        return {
            id,
            path,
            name,
            children: children.map(composeChild(path))
        }
    }
}

export async function composeDirectory (path: string): Promise<Directory | null> {
    try {
        const node = await findNode(path)

        if (node) {

            const { id, name } = node

            const children = await findChildren(id, {
                maxDepth: 0
            })

            return {
                id: id || 'root',
                path,
                name,
                children: children.map(composeChild(path))
            }
        }
        return null
    }
    catch (e) {
        return null
    }
}