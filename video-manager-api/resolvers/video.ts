import { Arg, Mutation, Query, Resolver } from "type-graphql"

import { Video, VideoInput, VideoModel } from "../schema/video"

@Resolver(() => Video)
export class VideoResolver {

    @Query(() => [Video])
    async getVideos(): Promise<Video[]> {
        return await VideoModel.find({})
    }

    @Query(() => Video)
    async getVideo(@Arg("id") id: number): Promise<Video | null | undefined> {
        return await VideoModel.findOne({ "id": id })
    }
}