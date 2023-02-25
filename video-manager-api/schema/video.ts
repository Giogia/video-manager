import { prop, index, getModelForClass } from "@typegoose/typegoose"
import { Field, ObjectType, InputType } from "type-graphql"

import {GraphQLUpload, Upload} from '../utils/upload'

@index({ path: 1, name: 1 }, { unique: true })
@ObjectType()
export class Video {
    @Field()
    readonly id?: string

    @prop()
    @Field()
    name!: string

    @prop()
    @Field()
    url!: string

    @prop()
    @Field()
    size!: number
}
@InputType()
export class VideoInput implements Pick<Video, "name"> {
    @Field()
    path!: string

    @Field()
    name!: string

    @Field(() => GraphQLUpload)
    video!: Upload
}

export const VideoModel = getModelForClass(Video)
