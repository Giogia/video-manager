import { Field, ObjectType, InputType } from "type-graphql"

import { GraphQLUpload, Upload } from '../utils/upload'

@ObjectType()
export class Video {
    @Field()
    readonly id?: string

    @Field()
    name!: string

    @Field()
    url!: string

    @Field()
    size!: number
}
@InputType()
export class VideoInput {
    @Field()
    path!: string

    @Field(() => GraphQLUpload, { nullable: true })
    video?: Upload
}