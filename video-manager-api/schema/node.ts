import { prop, index, getModelForClass } from "@typegoose/typegoose"

@index({ parent: 1, name: 1 }, { unique: true })
export class Node {
   @prop()
   id!: string

   @prop()
   name!: string

   @prop()
   parent!: string

   @prop()
   data?: string
}

export class NodeInput implements Pick<Node, "name" | "parent"> {
   name!: string

   parent!: string

   data?: string
}

export class NodeUpdate implements Partial<NodeInput> {
   name?: string

   parent?: string
}

export const NodeModel = getModelForClass(Node)