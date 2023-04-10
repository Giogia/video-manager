import { Node, NodeModel } from "../../schema/node"

export const parentNode: Node = {
   id: "0",
   name: "Parent",
   parent: ""
}

export const newParentNode: Node = {
   id: "1",
   name: "New Parent",
   parent: "",
}

export const node: Node = {
   id: "2",
   name: "Dir",
   parent: "Parent"
}

export const siblingNode: Node = {
   id: "3",
   name: "Sibling",
   parent: "Parent"
}

export const childNode: Node = {
   id: "4",
   name: "Child",
   parent: "Dir"
}

export const siblingChildNode: Node = {
   id: "5",
   name: "Sibling Child",
   parent: "Sibling"
}


export async function addNode({ id, name, parent, data }: Node) {

   const parentNode = await NodeModel.findOne({
      name: parent
   })

   const node = await new NodeModel({
      id,
      name,
      parent: parentNode?.id || "",
      data
   })

   await node.save()
}

export async function findNode({ name }: Node) {
   return NodeModel.findOne({
      name
   })
}

export async function deleteNodes() {
   await NodeModel.deleteMany()
}

export async function dropNodesCollection() {
   await NodeModel.collection.drop()
}