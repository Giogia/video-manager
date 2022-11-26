import { prop as Property, getModelForClass } from "@typegoose/typegoose"
import { Field, ObjectType, InputType } from "type-graphql"

@ObjectType()
export class Video {
    @Property()
    @Field()
    id!: number

    @Property()
    @Field()
    name!: string

    @Property()
    @Field()
    seconds!: number
}

@InputType()
export class VideoInput implements Pick<Video, "name" | "seconds"> {
    @Field({nullable: true})
    name!: string

    @Field({nullable: true})
    seconds!: number
}

export const VideoModel = getModelForClass(Video)
