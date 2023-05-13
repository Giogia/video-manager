import { Field, ObjectType, InputType, createUnionType } from "type-graphql"
import { Video } from "./video"

@ObjectType()
export class Directory {
   /**
    * The unique identifier of the directory.
    */
   @Field()
   readonly id?: string

   /**
    * The name of the directory.
    */
   @Field()
   name!: string

   /**
    * The children of the directory.
    */
   @Field(() => [Child])
   children!: (Directory | Video)[]
}

@InputType()
export class DirectoryInput implements Pick<Directory, "name"> {
   /**
    * It specifies the location of the directory in the file system.
    */
   @Field()
   path!: string

   /**
    * The name of the requested directory.
    */
   @Field()
   name!: string
}

/**
 * Represents a union type called `Child`,
 * which can be either a `Directory` or a `Video`.
 */
const Child = createUnionType({
   name: "Child",
   types: () => [Directory, Video] as const,
   resolveType: child => {
      if ("url" in child) return "Video"
      if ("children" in child) return "Directory"
   }
})

/**
 * Represents the type of a child object, 
 * it can be either a `Directory` or a `Video`.
 */
export type Child = typeof Child