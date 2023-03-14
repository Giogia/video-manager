import { GraphQLError } from "graphql"
import { Arg, Mutation, Resolver } from "type-graphql"
import { createWriteStream, statSync } from "fs"
import { join } from "path"

import { Directory } from "../schema/directory"
import { Video, VideoInput } from "../schema/video"
import { composeDirectory } from "../utils/directory"
import { addNode, findNode } from "../utils/node"
import { combinePath, currentPath } from "../utils/path"

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
}