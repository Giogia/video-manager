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
   url?: string

   @prop()
   size?: number
}

export class NodeInput implements Pick<Node, "name" | "parent"> {
   name!: string

   parent!: string

   url?: string

   size?: number
}

export class NodeUpdate implements Partial<NodeInput> {
   name?: string

   parent?: string
}

export const NodeModel = getModelForClass(Node)