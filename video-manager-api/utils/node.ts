import { PipelineStage } from "mongoose"

import { Node, NodeInput, NodeModel, NodeUpdate } from "../schema/node"
import { destructurePath, isRoot } from "./path"

export async function addNode({ name, parent, data }: NodeInput) {

   return new NodeModel({
      id: Date.now(),
      name,
      parent,
      data
   })
}

export async function editNode(path: string, update: NodeUpdate) {

   const [directory, parent] = destructurePath(path)

   return NodeModel.updateOne({
      name: directory,
      parent: await findInParents(parent)
   },
   update
   )
}

export async function removeNode(parent: string) {

   const childrenNodes = await findChildren(parent)

   const ids = childrenNodes.reduce((ids, { id, children }) => ([
      ...ids,
      ...children.map(({ id }: Node) => id),
      id
   ]), [parent])

   return NodeModel.deleteMany({
      id: { $in: ids }
   })
}

export async function findInParents(parent: string) {

   return parent && {
      $in: await NodeModel.distinct("id", {
         name: parent
      })
   }
}

export async function findNode(path: string): Promise<Node | null> {

   const [directory, parent] = destructurePath(path)

   if (isRoot(path)) return {
      id: "",
      name: directory,
      parent
   } as Node

   return NodeModel.findOne({
      name: directory,
      parent: await findInParents(parent)
   })
}

export async function findNodes({ path, ...node }: Record<string, string | { $regex: RegExp }>): Promise<Node[]> {

   const [parent] = destructurePath(path as string)

   return NodeModel.find({
      ...node,
      parent: await findInParents(parent)
   })
}

export async function findChildren(parent: string, options: Partial<PipelineStage.GraphLookup["$graphLookup"]> = {}) {

   return NodeModel.aggregate([
      {
         $match: { parent }
      },
      {
         $graphLookup: {
            from: "nodes",
            as: "children",
            startWith: "$id",
            connectFromField: "id",
            connectToField: "parent",
            ...options
         }
      }
   ])
}