import { GraphQLError } from "graphql"
import { Arg, Mutation, Resolver } from "type-graphql"
import { createWriteStream, statSync, rename } from "fs"
import { join } from "path"

import { Directory } from "../schema/directory"
import { Video, VideoInput } from "../schema/video"
import { composeDirectory } from "../utils/directory"
import { addNode, editNode, findNode } from "../utils/node"
import { combinePath, currentPath } from "../utils/path"
import { formatName } from "../utils/name"

@Resolver(() => Video)
export class VideoResolver {

   @Mutation(() => Directory)
   async uploadVideo(@Arg("input") { path, video }: VideoInput): Promise<Directory | null> {

      const { filename, createReadStream } = await video

      const filePath = join(currentPath(), "./uploads", filename)

      await new Promise(res => createReadStream()
         .pipe(createWriteStream(filePath))
         .on("close", res)
         .on("error", () => {
            throw new GraphQLError("Cannot save uploaded video.")
         })
      )

      const { size } = statSync(filePath)

      const parentNode = await findNode(path)

      if (!parentNode) throw new GraphQLError(`Directory ${path} does not exists.`)

      const node = await addNode({
         parent: parentNode.id!,
         name: filename,
         url: combinePath("/videos", filename),
         size
      })

      node.save().catch(() => {
         throw new GraphQLError("Directory already exists.")
      })

      try {
         const directory = await composeDirectory(path)

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
      @Arg("name") newName: string
   ): Promise<Directory | null> {

      const directoryPath = combinePath(path, name)

      const update = {
         name: newName,
         path: formatName(newName)
      }

      const filePath = join(currentPath(), "./uploads", name!)
      const newFilePath = join(currentPath(), "./uploads", newName)

      try {
         await rename(filePath, newFilePath, (err) => {
            if (err) throw new GraphQLError("Video file does not exists.")
         })

         const { matchedCount } = await editNode(directoryPath, update).catch(() => {
            throw new GraphQLError("Video already exists.")
         })

         if (matchedCount == 0) throw new GraphQLError("Video does not exists.")

         return composeDirectory(path)
      }
      catch (e) {
         throw new GraphQLError(`Cannot rename video ${directoryPath}. \n\n ${e}`)
      }
   }
}