import { PipelineStage } from "mongoose"

import { Node, NodeInput, NodeModel, NodeUpdate } from "../schema/node"
import { destructurePath, isRoot } from "./path"

/**
 * Adds a new node with the specified name, parent, and data.
 * @param name - The name of the node.
 * @param parent - The parent of the node.
 * @param data - The data associated with the node.
 * @returns A Promise that resolves to the newly created node.
 */
export async function addNode({ name, parent, data }: NodeInput) {

   return new NodeModel({
      id: Date.now(),
      name,
      parent,
      data
   })
}

/**
 * Edits a node identified by the specified path with the provided update.
 * @param path - The path of the node to edit.
 * @param update - The update to apply to the node.
 * @returns A Promise that resolves when the node is successfully updated.
 */
export async function editNode(path: string, update: NodeUpdate) {

   const [directory, parent] = destructurePath(path)

   return NodeModel.updateOne(
      {
         name: directory,
         parent: await findInParents(parent)
      },
      update
   )
}

/**
 * Removes a node and its children identified by the specified parent.
 * @param parent - The parent of the node to remove.
 * @returns A Promise that resolves when the node and its children are successfully removed.
 */
export async function removeNode(parent: string) {

   const childrenNodes = await findChildren(parent)

   const ids = childrenNodes.reduce((ids, { id, children = [] }) => ([
      ...ids,
      ...children.map(({ id }) => id),
      id
   ]), [parent])

   return NodeModel.deleteMany({
      id: { $in: ids }
   })
}

/**
 * Finds the parent nodes that match the specified parent name.
 * @param parent - The parent name to search for.
 * @returns A Promise that resolves to an object representing the matching parent nodes.
 */
export async function findInParents(parent: string) {

   return parent && {
      $in: await NodeModel.distinct("id", {
         name: parent
      })
   }
}

/**
 * Finds a node identified by the specified path.
 * @param path - The path of the node to find.
 * @returns A Promise that resolves to the found node or null if not found.
 */
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

/**
 * Finds nodes that match the provided search criteria.
 * @param options - The search criteria for finding nodes.
 * @returns A Promise that resolves to an array of the found nodes.
 */
export async function findNodes({ path, ...node }: Record<string, string | { $regex: RegExp }>): Promise<Node[]> {

   const [parent] = destructurePath(path as string)

   return NodeModel.find({
      ...node,
      parent: await findInParents(parent)
   })
}

/**
 * Finds the children nodes of the specified parent with optional graph lookup options.
 * @param parent - The parent node ID.
 * @param options - Optional graph lookup options.
 * @returns A Promise that resolves to an array of the found children nodes.
 */
export async function findChildren(parent: string, options: Partial<PipelineStage.GraphLookup["$graphLookup"]> = {}): Promise<Node[]> {

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
            depthField: "depth",
            ...options
         }
      }
   ])
}