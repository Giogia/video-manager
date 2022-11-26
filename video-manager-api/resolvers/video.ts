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
        return await VideoModel.findOne({"id": id})
    }

    @Mutation(() => Video)
    async createVideo(@Arg("input") input: VideoInput): Promise<Video> {

        const video = new VideoModel({
            ...input,
            id: await VideoModel.countDocuments({}) + 1,
            seconds: 0
        } as Video)

        await video.save()
            
        return video
    }

    @Mutation(() => Video)
    async updateVideo(
        @Arg("id") id: number,
        @Arg("input") input: VideoInput
    ): Promise<Video> {
        const updatedVideo = await VideoModel.findOneAndUpdate({"id": id}, input)
        
        if (!updatedVideo) throw new Error("Video not found")

        await updatedVideo.save()

        return updatedVideo
    }
}