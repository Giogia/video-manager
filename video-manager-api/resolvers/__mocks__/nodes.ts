import { Node, NodeModel } from '../../schema/node'

export const parentNode: Node = {
    id: '0',
    name: 'Parent',
    path: 'parent',
    parent: ''
}

export const newParentNode: Node = {
    id: '1',
    name: 'New Parent',
    path: 'newparent',
    parent: '',
}

export const node: Node = {
    id: '2',
    name: 'Dir',
    path: 'dir',
    parent: 'parent'
}

export const siblingNode: Node = {
    id: '3',
    name: 'Sibling',
    path: 'sibling',
    parent: 'parent'
}

export const childNode: Node = {
    id: '4',
    name: 'Child',
    path: 'child',
    parent: 'dir'
}

export const siblingChildNode: Node = {
    id: '5',
    name: 'Sibling Child',
    path: 'siblingchild',
    parent: 'sibling'
}


export async function addNode({ id, name, path, parent }: Node) {

    const parentNode = await NodeModel.findOne({
        path: parent
    })

    const node = await new NodeModel({
        id,
        name,
        path,
        parent: parentNode?.id || ''
    })

    await node.save()
}

export async function findNode({ path }: Node) {
    return NodeModel.findOne({
        path
    })
}

export async function deleteNodes() {
    await NodeModel.deleteMany()
}

export async function dropCollection() {
    await NodeModel.collection.drop()
}