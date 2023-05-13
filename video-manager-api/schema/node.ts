import { prop, index, getModelForClass, modelOptions } from "@typegoose/typegoose"

/**
 * Model options decorator.
 * 
 * Sets model options for the class.
 * In this case, it sets the `allowMixed` option to 0,
 * which throws an error if there are any properties in the documents
 * that are not defined in the model schema.
 */
@modelOptions({ options: { allowMixed: 0 } })
/**
 * Index decorator.
 * 
 * The index ensures that the combination
 * of `parent` and `name` values in the documents is unique.
 */
@index({ parent: 1, name: 1 }, { unique: true })
export class Node {
   /**
    * The unique identifier of the node.
    */
   @prop()
   id!: string

   /**
    * The name of the node.
    */
   @prop()
   name!: string

   /**
    * The identifier of the parent node.
    * It specifies the parent node of the current node.
    */
   @prop()
   parent!: string

   /**
    * The indentifier of the data node.
    * It specifies the data node associated with the current node.
    */
   @prop()
   data?: string

   /**
    * The depth of the node in the hierarchy of children nodes.
    * Used to retrieve nodes with the depth value obtained from the query.
    */
   @prop()
   depth?: number

   /**
    * The children nodes of the current node.
    * Only present while retrieving node data.
    */
   @prop()
   children?: Node[]
}

export class NodeInput implements Pick<Node, "name" | "parent"> {
   /**
    * The name of the new node.
    */
   name!: string

   /**
    * The identifier of the parent node.
    */
   parent!: string

   /**
    * The indentifier of the data node.
    */
   data?: string
}

export class NodeUpdate implements Partial<NodeInput> {
   /**
    * The name of the node to be updated.
    */
   name?: string

   /**
    * The identifier of the parent node.
    */
   parent?: string
}

export const NodeModel = getModelForClass(Node)