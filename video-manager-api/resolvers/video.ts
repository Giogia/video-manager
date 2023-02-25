import { GraphQLError } from "graphql"
import { Arg, Mutation, Query, Resolver } from "type-graphql"
import { Directory } from "../schema/directory"

import { Video, VideoInput, VideoModel } from "../schema/video"
import { composeDirectory } from "../utils/directory"

@Resolver(() => Video)
export class VideoResolver {

    @Query(() => Video)
    async getVideo(@Arg("id") id: number): Promise<Video | null | undefined> {
        return await VideoModel.findOne({ "id": id })
    }

    @Mutation(() => Directory)
    async uploadVideo(@Arg("input") { path, name, video }: VideoInput): Promise<Directory | null> {

        const { filename, mimetype, createReadStream } = await video

        const stream = createReadStream()

        try {
            const directory = await composeDirectory(path)

            if (!directory) throw new GraphQLError('Directory does not exists.')

            return directory
        }
        catch (e) {
            throw new GraphQLError(`Cannot return directory ${path}. \n\n ${e}`)
        }
    }
}