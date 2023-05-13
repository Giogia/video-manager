import { Field, ObjectType, InputType } from "type-graphql"

import { GraphQLUpload, Upload } from "../utils/upload"

@ObjectType()
export class Video {
   /**
    * The unique identifier of the video.
    */
   @Field()
   readonly id!: string

   /**
    * The name of the video.
    */
   @Field()
   name!: string

   /**
    * The URL of the video.
    */
   @Field()
   url!: string

   /**
    * The size of the video in bytes.
    */
   @Field()
   size!: number
}
@InputType()
export class VideoInput {
   /**
    * The path of the requested video.
    * It specifies the location of the video file in the file system.
    */
   @Field()
   path!: string

   /**
    * The name of the requested video.
    */
   @Field({nullable: true})
   name?: string

   /**
    * The video file to upload.
    * This field is used to upload video files to the server.
    */
   @Field(() => GraphQLUpload, { nullable: true })
   video?: Upload
}