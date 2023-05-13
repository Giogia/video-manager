import { GraphQLError } from "graphql"
import { YogaInitialContext } from "graphql-yoga"
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql"

import { Directory, DirectoryInput } from "../schema/directory"
import { composeDirectory } from "../utils/directory"
import { firstMissingName, startsWith } from "../utils/name"
import { addNode, findNode, findNodes, editNode, removeNode } from "../utils/node"
import { combinePath, isRoot } from "../utils/path"
@Resolver(() => Directory)
export class DirectoryResolver {
   /**
    * Query resolver that retrieves a directory.
    *
    * @param input - The input data containing the path and name of the directory to retrieve.
    * @param context - The context object containing additional information regarding the request (e.g. query depth).
    * 
    * @returns The retrieved directory.
    * 
    * @throws GraphQLError if the directory does not exist.
    */
   @Query(() => Directory)
   async getDirectory(

      @Arg("input") { path, name }: DirectoryInput,
      @Ctx() context: YogaInitialContext

   ): Promise<Directory> {

      const directoryPath = combinePath(path, name)

      try {
         const directory = await composeDirectory(directoryPath, context?.params?.query)

         if (!directory) throw new GraphQLError("Directory does not exist.")

         return directory
      }
      catch (e) {
         throw new GraphQLError(`Cannot return directory ${decodeURI(directoryPath)}. \n\n ${e}`)
      }
   }

   /**
    * Mutation resolver that adds a new directory.
    *
    * @param input - The input data containing the path and name of the directory to add.
    * @param context - The context object containing additional information regarding the request (e.g. query depth).
    * 
    * @returns The added directory or null if an error occurs.
    * 
    * @throws GraphQLError if the parent directory does not exist.
    * @throws GraphQLError if the directory to be added already exists.
    * @throws GraphQLError if the directory to be added is root.
    */
   @Mutation(() => Directory)
   async addDirectory(

      @Arg("input") { path, name }: DirectoryInput,
      @Ctx() context: YogaInitialContext

   ): Promise<Directory | null> {

      const directoryPath = combinePath(path, name)

      try {
         if (!isRoot(path, name)) {
            const parentNode = await findNode(path)

            if (!parentNode) throw new GraphQLError(`Directory ${decodeURI(path)} does not exist.`)

            const siblingNodes = await findNodes({
               path,
               name: { $regex: startsWith(name) }
            })

            const siblingNames = siblingNodes.map(({ name }) => name)

            const node = await addNode({
               parent: parentNode.id!,
               name: siblingNames.includes(name) ?
                  firstMissingName(name, siblingNames) :
                  name
            })

            await node.save().catch(() => {
               throw new GraphQLError("Directory already exists.")
            })

            return composeDirectory(path, context?.params?.query)
         }
         throw new GraphQLError("Directory is root.")
      }
      catch (e) {
         throw new GraphQLError(`Cannot add directory ${decodeURI(directoryPath)}. \n\n ${e}`)
      }
   }

   /**
    * Mutation resolver that moves a directory to a new path.
    *
    * @param input - The input data containing the current path and name of the directory to move.
    * @param newPath - The new path where the directory will be moved.
    * @param context - The context object containing additional information regarding the request (e.g. query depth).
    * 
    * @returns The moved directory or null if an error occurs.
    * 
    * @throws GraphQLError if the requested directory does not exist.
    * @throws GraphQLError if the target directory already exists.
    * @throws GraphQLError if the target directory does not exist.
    */
   @Mutation(() => Directory)
   async moveDirectory(

      @Arg("input") { path, name }: DirectoryInput,
      @Arg("path") newPath: string,
      @Ctx() context: YogaInitialContext

   ): Promise<Directory | null> {

      const directoryPath = combinePath(path, name)

      try {
         const newParentNode = await findNode(newPath)

         if (!newParentNode) throw new GraphQLError(`Directory ${newPath} does not exist.`)

         const update = {
            parent: newParentNode.id!
         }

         const { matchedCount, modifiedCount } = await editNode(directoryPath, update).catch(() => {
            throw new GraphQLError("Directory already exists.")
         })

         if (matchedCount == 0) throw new GraphQLError("Directory does not exist.")
         if (modifiedCount == 0) throw new GraphQLError(`Directory ${decodeURI(path)} does not exist.`)

         return composeDirectory(path, context?.params?.query)
      }
      catch (e) {
         throw new GraphQLError(`Cannot move directory ${decodeURI(directoryPath)}. \n\n ${e}`)
      }
   }

   /**
    * Mutation resolver that renames a directory.
    *
    * @param input - The input data containing the path and name of the directory to rename.
    * @param newName - The new name to assign to the directory.
    * @param context - The context object containing additional information regarding the request (e.g. query depth).
    * 
    * @returns The renamed directory or null if an error occurs.
    * 
    * @throws GraphQLError if the new name is empty.
    * @throws GraphQLError if the requested directory does not exist.
    * @throws GraphQLError if the target directory already exists.
    */
   @Mutation(() => Directory)
   async renameDirectory(

      @Arg("input") { path, name }: DirectoryInput,
      @Arg("name") newName: string,
      @Ctx() context: YogaInitialContext

   ): Promise<Directory | null> {

      const directoryPath = combinePath(path, name)

      try {
         if (newName) {

            const { matchedCount } = await editNode(directoryPath, { name: newName }).catch(() => {
               throw new GraphQLError(`Directory ${newName} already exists.`)
            })

            if (matchedCount == 0) throw new GraphQLError("Directory does not exist.")

            return composeDirectory(path, context?.params?.query)
         }
         throw new GraphQLError("Directory name cannot be empty.")
      }
      catch (e) {
         throw new GraphQLError(`Cannot rename directory ${decodeURI(directoryPath)}. \n\n ${e}`)
      }
   }

   /**
    * Mutation resolver that removes a directory.
    *
    * @param input - The input data containing the path and name of the directory to remove.
    * @param context - The context object containing additional information regarding the request (e.g. query depth).
    * 
    * @returns The removed directory or null if an error occurs.
    * 
    * @throws GraphQLError if the requested directory does not exist.
    * @throws GraphQLError if the requested directory is root.
    */
   @Mutation(() => Directory)
   async removeDirectory(

      @Arg("input") { path, name }: DirectoryInput,
      @Ctx() context: YogaInitialContext

   ): Promise<Directory | null> {

      const directoryPath = combinePath(path, name)

      try {
         if (!isRoot(path, name)) {

            const node = await findNode(directoryPath)

            if (!node) throw new GraphQLError("Directory does not exist.")

            const { id } = node

            await removeNode(id).catch(() => {
               throw new GraphQLError("Directory does not exist.")
            })

            return composeDirectory(path, context?.params?.query)
         }
         throw new GraphQLError("Directory is root.")
      }
      catch (e) {
         throw new GraphQLError(`Cannot remove directory ${decodeURI(directoryPath)}. \n\n ${e}`)
      }
   }
}