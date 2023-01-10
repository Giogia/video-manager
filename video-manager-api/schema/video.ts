import { prop, index, getModelForClass } from "@typegoose/typegoose"
import { Field, ObjectType, InputType } from "type-graphql"

@index({ path: 1, name: 1 }, { unique: true })
@ObjectType()
export class Video {
    @Field()
    readonly id?: string

    @prop()
    @Field()
    path!: string

    @prop()
    @Field()
    name?: string

    @prop()
    @Field()
    url?: string

    @prop()
    @Field()
    size!: number

    @prop()
    @Field()
    duration!: number
}

@InputType()
export class VideoInput implements Pick<Video, "name" | "path"> {
    @Field()
    path!: string

    @Field({ nullable: true })
    name?: string
}

export const VideoModel = getModelForClass(Video)
