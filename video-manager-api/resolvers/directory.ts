import { GraphQLError } from "graphql"
import { Arg, Mutation, Query, Resolver } from "type-graphql"

import { Directory, DirectoryInput } from "../schema/directory"
import { composeDirectory } from "../utils/directory"
import { increaseNumber, startsWith } from "../utils/name"
import { addNode, findNode, findNodes, editNode, removeNode } from "../utils/node"
import { combinePath, isRoot } from "../utils/path"
@Resolver(() => Directory)
export class DirectoryResolver {

   @Query(() => Directory)
   async getDirectory(@Arg("input") { path, name }: DirectoryInput): Promise<Directory> {

      const directoryPath = combinePath(path, name)

      try {
         const directory = await composeDirectory(directoryPath)

         if (!directory) throw new GraphQLError("Directory does not exists.")

         return directory
      }
      catch (e) {
         throw new GraphQLError(`Cannot return directory ${directoryPath}. \n\n ${e}`)
      }
   }

   @Mutation(() => Directory)
   async addDirectory(@Arg("input") { path, name }: DirectoryInput): Promise<Directory | null> {

      const directoryPath = combinePath(path, name)

      try {

         const parentNode = await findNode(path)

         if (!parentNode) throw new GraphQLError(`Directory ${path} does not exists.`)

         const siblingNodes = await findNodes({
            path,
            name: { $regex: startsWith(name) }
         })

         const existsInSiblings = siblingNodes.map(({ name }) => name).includes(name)

         const [lastAdded] = siblingNodes.slice(-1)

         const node = await addNode({
            parent: parentNode.id!,
            name: existsInSiblings ?
               increaseNumber(lastAdded.name) :
               name
         })

         await node.save().catch(() => {
            throw new GraphQLError("Directory already exists.")
         })

         return composeDirectory(path)
      }
      catch (e) {
         throw new GraphQLError(`Cannot add directory ${directoryPath}. \n\n ${e}`)
      }
   }

   @Mutation(() => Directory)
   async moveDirectory(
      @Arg("input") { path, name }: DirectoryInput,
      @Arg("path") newPath: string
   ): Promise<Directory | null> {

      const directoryPath = combinePath(path, name)

      try {
         const newParentNode = await findNode(newPath)

         if (!newParentNode) throw new GraphQLError(`Directory ${newPath} does not exists.`)

         const update = {
            parent: newParentNode.id!
         }

         const { matchedCount, modifiedCount } = await editNode(directoryPath, update).catch(() => {
            throw new GraphQLError("Directory already exists.")
         })

         if (matchedCount == 0) throw new GraphQLError("Directory does not exists.")
         if (modifiedCount == 0) throw new GraphQLError(`Directory ${path} does not exists.`)

         return composeDirectory(path)
      }
      catch (e) {
         throw new GraphQLError(`Cannot move directory ${directoryPath}. \n\n ${e}`)
      }
   }

   @Mutation(() => Directory)
   async renameDirectory(
      @Arg("input") { path, name }: DirectoryInput,
      @Arg("name") newName: string
   ): Promise<Directory | null> {

      const directoryPath = combinePath(path, name)

      try {
         const { matchedCount } = await editNode(directoryPath, { name: newName }).catch(() => {
            throw new GraphQLError(`Directory ${newName} already exists.`)
         })

         if (matchedCount == 0) throw new GraphQLError("Directory does not exists.")

         return composeDirectory(path)
      }
      catch (e) {
         throw new GraphQLError(`Cannot rename directory ${directoryPath}. \n\n ${e}`)
      }
   }

   @Mutation(() => Directory)
   async removeDirectory(@Arg("input") { path, name }: DirectoryInput): Promise<Directory | null> {

      const directoryPath = combinePath(path, name)

      try {
         if (!isRoot(path, name)) {
            const node = await findNode(directoryPath)

            if (!node) throw new GraphQLError("Directory does not exists.")

            const { id } = node

            await removeNode(id)

            return composeDirectory(path)
         }
         throw new GraphQLError("Directory is root.")
      }
      catch (e) {
         throw new GraphQLError(`Cannot remove directory ${directoryPath}. \n\n ${e}`)
      }
   }
}