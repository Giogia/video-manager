import { prop as Property, getModelForClass } from "@typegoose/typegoose"
import { Field, ObjectType, InputType } from "type-graphql"

@ObjectType()
export class Directory {
    @Property()
    @Field()
    path!: string

    @Property()
    @Field()
    name!: string

    @Property()
    @Field(() => [Directory])
    children!: Directory[]
}

@InputType()
export class DirectoryInput implements Pick<Directory, "name" | "path"> {
    @Field()
    path!: string

    @Field()
    name!: string
}

@ObjectType()
export class Result {
    @Property()
    @Field()
    acknowledged!: boolean
}

export const DirectoryModel = getModelForClass(Directory)
