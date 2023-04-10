import "reflect-metadata"
import { buildSchema } from "type-graphql"
import { graphql, GraphQLError, GraphQLSchema } from "graphql"

import { VideoResolver } from "../video"
import { DirectoryResolver } from "../directory"
import { loadDatabase, disconnect } from "../../utils/database"
import * as nodes from "../__mocks__/nodes"
import * as directories from "../__mocks__/directories"
import * as videos from "../__mocks__/videos"

const {
   parentNode,
   node,
   childNode,
   addNode,
   deleteNodes,
   dropNodesCollection
} = nodes

const {
   directory,
   childDirectory,
} = directories

const {
   horizontal,
   getUpload,
   dropUploadsCollections
} = videos

describe("Resolvers", () => {

   let schema: GraphQLSchema

   beforeAll(async () => {
      schema = await buildSchema({
         resolvers: [DirectoryResolver, VideoResolver]
      })

      await loadDatabase("video-manager-tests")
   })

   afterEach(async () => {
      await deleteNodes()
   })

   afterAll(async () => {
      await dropNodesCollection()
      await dropUploadsCollections()
      await disconnect()
   })

   describe("uploadVideo", () => {
      it("returns parent directory with added video", async () => {

         await addNode(parentNode)
         await addNode(node)
         await addNode(childNode)

         const upload = getUpload(horizontal)

         const uploadVideoMutation = `#graphql
               mutation uploadVideoMutation($path: String!, $video: Upload!){
                  uploadVideo(input: { path: $path, video: $video }){
                     name
                     children {
                        ... on Video {
                           name
                           size
                        }
                        ... on Directory {
                           name
                           children {
                              ... on Directory {
                                 name
                              }
                           }
                        }
                     }
                  }
               } 
            `

         const { data } = await graphql({
            schema,
            source: uploadVideoMutation,
            variableValues: { path: "/Parent/Dir", video: upload }
         })

         expect(data).toMatchObject({
            uploadVideo: {
               ...directory,
               children: [childDirectory, horizontal]
            }
         })
      })

      it("returns error if video already exists", async () => {

         await addNode(parentNode)
         await addNode(node)
         await addNode({ ...childNode, name: "horizontal.mov" })

         const upload = getUpload(horizontal)

         const uploadVideoMutation = `#graphql
               mutation uploadVideoMutation($path: String!, $video: Upload!){
                  uploadVideo(input: { path: $path, video: $video }){
                     name
                     children {
                        ... on Video {
                           name
                           size
                        }
                        ... on Directory {
                           name
                           children {
                              ... on Directory {
                                 name
                              }
                           }
                        }
                     }
                  }
               } 
            `

         const { errors } = await graphql({
            schema,
            source: uploadVideoMutation,
            variableValues: { path: "/Parent/Dir", video: upload }
         })

         expect(errors).toEqual([new GraphQLError("Cannot upload video in directory /Parent/Dir. \n\n Video horizontal.mov already exists.")])
      })

      it("returns error if directory does not exists", async () => {

         await addNode(parentNode)

         const upload = getUpload(horizontal)

         const uploadVideoMutation = `#graphql
               mutation uploadVideoMutation($path: String!, $video: Upload!){
                  uploadVideo(input: { path: $path, video: $video }){
                     name
                     children {
                        ... on Video {
                           name
                           size
                        }
                        ... on Directory {
                           name
                           children {
                              ... on Directory {
                                 name
                              }
                           }
                        }
                     }
                  }
               } 
            `

         const { errors } = await graphql({
            schema,
            source: uploadVideoMutation,
            variableValues: { path: "/Parent/Dir", video: upload }
         })

         expect(errors).toEqual([new GraphQLError("Cannot upload video in directory /Parent/Dir. \n\n Directory /Parent/Dir does not exists.")])
      })
   })
})

