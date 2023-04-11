import { GraphQLError } from "graphql"
import { YogaInitialContext } from "graphql-yoga"
import { Arg, Ctx, Mutation, Resolver } from "type-graphql"

import { Directory } from "../schema/directory"
import { Video, VideoInput } from "../schema/video"
import { composeDirectory } from "../utils/directory"
import { addNode, editNode, findNode, removeNode } from "../utils/node"
import { combinePath, currentPath, isRoot } from "../utils/path"
import { uploadFile } from "../utils/file"

@Resolver(() => Video)
export class VideoResolver {

   @Mutation(() => Directory)
   async uploadVideo(@Arg("input") { path, video }: VideoInput, @Ctx() context: YogaInitialContext): Promise<Directory | null> {

      try {
         const parentNode = await findNode(path)

         if (!parentNode) throw new GraphQLError(`Directory ${path} does not exists.`)

         const { filename, createReadStream } = await video

         const id = Date.now().toString()

         const uploadStream = uploadFile(id)
         const readStream = createReadStream()

         await new Promise(resolve => readStream.pipe(uploadStream)
            .on("close", resolve)
            .on("error", () => {
               throw new GraphQLError("Cannot save uploaded video.")
            })
         )

         const node = await addNode({
            parent: parentNode.id!,
            name: filename,
            data: id
         })

         await node.save().catch(() => {
            throw new GraphQLError(`Video ${filename} already exists.`)
         })
      }
      catch (e) {
         throw new GraphQLError(`Cannot upload video in directory ${path}. \n\n ${e}`)
      }

      try {
         const directory = await composeDirectory(path, context?.params?.query)

         if (!directory) throw new GraphQLError("Directory does not exists.")

         return directory
      }
      catch (e) {
         throw new GraphQLError(`Cannot return directory ${path}. \n\n ${e}`)
      }
   }

   @Mutation(() => Directory)
   async renameVideo(
      @Arg("input") { path, name }: VideoInput,
      @Arg("name") newName: string,
      @Ctx() context: YogaInitialContext
   ): Promise<Directory | null> {

      const videoPath = combinePath(path, name)

      try {
         const { matchedCount } = await editNode(videoPath, { name: newName }).catch(() => {
            throw new GraphQLError(`Video ${newName} already exists.`)
         })

         if (matchedCount == 0) throw new GraphQLError("Video does not exists.")

         return composeDirectory(path, context?.params?.query)
      }
      catch (e) {
         throw new GraphQLError(`Cannot rename video ${videoPath}. \n\n ${e}`)
      }
   }

   @Mutation(() => Directory)
   async removeVideo(@Arg("input") { path, name }: VideoInput, @Ctx() context: YogaInitialContext): Promise<Directory | null> {

      const videoPath = combinePath(path, name)
      const filePath = join(currentPath(), "./uploads", name!)

      try {
         if (!isRoot(path, name)) {
            const node = await findNode(videoPath)

            if (!node) throw new GraphQLError("Video does not exists.")

            await unlink(filePath, (err) => {
               if (err) throw new GraphQLError("Cannot remove video file.")
            })

            const { id } = node

            await removeNode(id)

            return composeDirectory(path, context?.params?.query)
         }
         throw new GraphQLError("Directory is root.")
      }
      catch (e) {
         throw new GraphQLError(`Cannot remove directory ${videoPath}. \n\n ${e}`)
      }
   }
}