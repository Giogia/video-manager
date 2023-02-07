import { Field, ObjectType, InputType } from "type-graphql"
@ObjectType()
export class Directory {
    @Field()
    readonly id?: string

    @Field()
    name!: string

    @Field(() => [Directory])
    children!: Directory[]
}

@InputType()
export class DirectoryInput implements Pick<Directory, "name"> {
    @Field()
    path!: string

    @Field()
    name!: string
}