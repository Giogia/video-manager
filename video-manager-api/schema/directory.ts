import { prop, index, getModelForClass } from "@typegoose/typegoose"
import { Field, ObjectType, InputType } from "type-graphql"

@index({ path: 1, name: 1 }, { unique: true })
@ObjectType()
export class Directory {
    @Field()
    readonly id?: string

    @prop()
    @Field()
    path!: string

    @prop()
    @Field({ nullable: true })
    name?: string

    @prop()
    @Field(() => [Directory])
    children!: Directory[]
}

@InputType()
export class DirectoryInput implements Pick<Directory, "name" | "path"> {
    @Field()
    path!: string

    @Field({ nullable: true })
    name?: string
}

export const DirectoryModel = getModelForClass(Directory)