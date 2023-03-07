import { Field, ObjectType, InputType, createUnionType } from "type-graphql"
import { Video } from "./video"

const Child = createUnionType({
    name: "Child",
    types: () => [Directory, Video] as const,
    resolveType: child => {
        if ("url" in child) return "Video"
        if ("children" in child) return "Directory"
    }
})

@ObjectType()
export class Directory {
    @Field()
    readonly id?: string

    @Field()
    name!: string

    @Field(() => [Child])
    children!: (Directory | Video)[]
}

@InputType()
export class DirectoryInput implements Pick<Directory, "name"> {
    @Field()
    path!: string

    @Field()
    name!: string
}