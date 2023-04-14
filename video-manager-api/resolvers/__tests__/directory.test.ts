import "reflect-metadata"
import { buildSchema } from "type-graphql"
import { graphql, GraphQLError, GraphQLSchema } from "graphql"

import { DirectoryResolver } from "../directory"
import { loadDatabase, disconnect } from "../../utils/database"
import * as nodes from "../__mocks__/nodes"
import * as directories from "../__mocks__/directories"

const {
   parentNode,
   newParentNode,
   node,
   siblingNode,
   childNode,
   siblingChildNode,
   addNode,
   findNode,
   deleteNodes,
   dropNodesCollection
} = nodes

const {
   rootDirectory,
   parentDirectory,
   newParentDirectory,
   directory,
   siblingDirectory,
   childDirectory,
   siblingChildDirectory
} = directories

describe("Resolvers", () => {

   let schema: GraphQLSchema

   beforeAll(async () => {
      schema = await buildSchema({
         resolvers: [DirectoryResolver]
      })

      await loadDatabase("video-manager-tests-directories")
   })

   afterEach(async () => {
      await deleteNodes()
   })

   afterAll(async () => {
      await dropNodesCollection()
      await disconnect()
   })

   describe("getDirectory", () => {
      it("returns root directory", async () => {

         await addNode(parentNode)
         await addNode(newParentNode)
         await addNode(node)
         await addNode(siblingNode)

         const getRootQuery = `#graphql
                query {
                    getDirectory(input: { path: "/", name: "" }){
                        name
                        children {
                            ... on Directory {
                                name
                                children {
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
                    }
                }
            `

         const { data } = await graphql(schema, getRootQuery)

         expect(data).toEqual({ getDirectory: rootDirectory })
      })

      it("returns composed directory", async () => {

         await addNode(parentNode)
         await addNode(node)
         await addNode(childNode)
         await addNode(siblingNode)
         await addNode(siblingChildNode)

         const getDirectoryQuery = `#graphql
                query {
                    getDirectory(input: { path: "/", name: "Parent" }){
                        name
                        children {
                            ... on Directory {
                                name
                                children {
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
                    }
                }
            `

         const { data } = await graphql(schema, getDirectoryQuery)

         expect(data).toEqual({ getDirectory: parentDirectory })
      })

      it("returns composed directory if nested", async () => {

         await addNode(parentNode)
         await addNode(node)
         await addNode(childNode)
         await addNode(siblingNode)
         await addNode(siblingChildNode)

         const getDirectoryQuery = `#graphql
                query {
                    getDirectory(input: { path: "/Parent", name: "Dir" }){
                        name
                        children {
                            ... on Directory {
                                name
                                children {
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
                    }
                }
            `

         const { data } = await graphql(schema, getDirectoryQuery)

         expect(data).toEqual({ getDirectory: directory })
      })

      it("returns error if directory does not exists", async () => {

         await addNode(parentNode)

         const getDirectoryQuery = `#graphql
                query {
                    getDirectory(input: { path: "/Parent", name: "Dir" }){
                        name
                        children {
                            ... on Directory {
                                name
                            }
                        }
                    }
                }
            `

         const { errors } = await graphql(schema, getDirectoryQuery)

         expect(errors).toEqual([new GraphQLError("Cannot return directory /Parent/Dir. \n\n Directory does not exists.")])
      })
   })

   describe("addDirectory", () => {
      it("returns parent directory with added child", async () => {

         await addNode(parentNode)
         await addNode(node)

         const addDirectoryMutation = `#graphql
                mutation {
                    addDirectory(input: { path: "/Parent/Dir", name: "Child" }){
                        name
                        children {
                            ... on Directory {
                                name
                                children {
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
                    }
                }
            `

         const { data } = await graphql(schema, addDirectoryMutation)

         expect(data).toEqual({ addDirectory: directory })
      })

      it("returns parent directory with added child numbered if name already exists", async () => {

         await addNode(parentNode)
         await addNode(node)
         await addNode(childNode)

         const addDirectoryMutation = `#graphql
                mutation {
                    addDirectory(input: { path: "/Parent/Dir", name: "Child" }){
                        name
                        children {
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

         const { data: data1 } = await graphql(schema, addDirectoryMutation)
         const { data: data2 } = await graphql(schema, addDirectoryMutation)

         expect(data1).toEqual({
            addDirectory: {
               ...directory, children: [childDirectory,
                  { ...childDirectory, name: "Child 1" }
               ]
            }
         })

         expect(data2).toEqual({
            addDirectory: {
               ...directory, children: [childDirectory,
                  { ...childDirectory, name: "Child 1" },
                  { ...childDirectory, name: "Child 2" }
               ]
            }
         })
      })

      it("returns error if directory does not exists", async () => {

         await addNode(parentNode)

         const addDirectoryMutation = `#graphql
                mutation {
                    addDirectory(input: { path: "/Parent/Dir", name: "Child" }){
                        name
                        children {
                            ... on Directory {
                                name
                            }
                        }
                    }
                }
            `

         const { errors } = await graphql(schema, addDirectoryMutation)

         expect(errors).toEqual([new GraphQLError("Cannot add directory /Parent/Dir/Child. \n\n Directory /Parent/Dir does not exists.")])
      })
   })

   describe("moveDirectory", () => {
      it("return parent directory without child, moves directory to new parent", async () => {

         await addNode(parentNode)
         await addNode(newParentNode)
         await addNode(node)
         await addNode(childNode)

         const moveDirectoryMutation = `#graphql
                mutation {
                    moveDirectory(input: {path: "/Parent", name: "Dir"}, path: "/New%20Parent") {
                        name
                        children {
                            ... on Directory {
                                name
                                children {
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
                    }
                }
            `

         const { data: parentData } = await graphql(schema, moveDirectoryMutation)

         expect(parentData).toEqual({ moveDirectory: { ...parentDirectory, children: [] } })

         const getNewParentDirectoryQuery = `#graphql
                query {
                    getDirectory(input: { path: "/", name: "New Parent" }){
                        name
                        children {
                            ... on Directory {
                                name
                                children {
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
                    }
                }
            `

         const { data: newParentData } = await graphql(schema, getNewParentDirectoryQuery)

         expect(newParentData).toEqual({
            getDirectory: {
               ...newParentDirectory, children: [directory]
            }
         })
      })

      it("return parent directory without child, moves directory down one level", async () => {

         await addNode(parentNode)
         await addNode(node)
         await addNode(childNode)
         await addNode(siblingNode)
         await addNode(siblingChildNode)

         const moveDirectoryMutation = `#graphql
                mutation {
                    moveDirectory(input: {path: "/Parent", name: "Dir"}, path: "/Parent/Sibling") {
                        name
                        children {
                            ... on Directory {
                                name
                                children {
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
                    }
                }
            `

         const { data: parentData } = await graphql(schema, moveDirectoryMutation)

         expect(parentData).toEqual({
            moveDirectory: {
               ...parentDirectory, children: [
                  {
                     ...siblingDirectory, children: [
                        {
                           ...directory, children: []
                        },
                        siblingChildDirectory,
                     ]
                  }
               ]
            }
         })

         const getNewParentDirectoryQuery = `#graphql
                query {
                    getDirectory(input: { path: "/Parent", name: "Sibling" }){
                        name
                        children {
                            ... on Directory {
                                name
                                children {
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
                    }
                }
            `

         const { data: newParentData } = await graphql(schema, getNewParentDirectoryQuery)

         expect(newParentData).toEqual({
            getDirectory: {
               ...siblingDirectory, children: [
                  directory,
                  siblingChildDirectory
               ]
            }
         })
      })

      it("return parent directory without child, moves directory up one level", async () => {

         await addNode(parentNode)
         await addNode(node)
         await addNode(childNode)
         await addNode(siblingNode)
         await addNode(siblingChildNode)

         const moveDirectoryMutation = `#graphql
                mutation {
                    moveDirectory(input: {path: "/Parent/Dir", name: "Child"}, path: "/Parent") {
                        name
                        children {
                            ... on Directory {
                                name
                                children {
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
                    }
                }
            `

         const { data: parentData } = await graphql(schema, moveDirectoryMutation)

         expect(parentData).toEqual({ moveDirectory: { ...directory, children: [] } })

         const getNewParentDirectoryQuery = `#graphql
                query {
                    getDirectory(input: { path: "/", name: "Parent" }){
                        name
                        children {
                            ... on Directory {
                                name
                                children {
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
                    }
                }
            `

         const { data: newParentData } = await graphql(schema, getNewParentDirectoryQuery)

         expect(newParentData).toEqual({
            getDirectory: {
               ...parentDirectory, children: [
                  childDirectory,
                  { ...directory, children: [] },
                  { ...siblingDirectory, children: [siblingChildDirectory] },
               ]
            }
         })
      })

      it("returns error if directory does not exists", async () => {

         await addNode(parentNode)
         await addNode(newParentNode)

         const moveDirectoryMutation = `#graphql
                mutation {
                    moveDirectory(input: {path: "/Parent", name: "Dir"}, path: "/New%20Parent") {
                        name
                        children {
                            ... on Directory {
                                name
                            }
                        }
                    }
                }
            `

         const { errors } = await graphql(schema, moveDirectoryMutation)

         expect(errors).toEqual([new GraphQLError("Cannot move directory /Parent/Dir. \n\n Directory does not exists.")])
      })

      it("returns error if target directory does not exists", async () => {

         await addNode(parentNode)
         await addNode(node)

         const moveDirectoryMutation = `#graphql
                mutation {
                    moveDirectory(input: {path: "/Parent", name: "Dir"}, path: "/New%20Parent") {
                        name
                        children {
                            ... on Directory {
                                name
                            }
                        }
                    }
                }
            `

         const { errors } = await graphql(schema, moveDirectoryMutation)

         expect(errors).toEqual([new GraphQLError("Cannot move directory /Parent/Dir. \n\n Directory /New%20Parent does not exists.")])
      })

      it("returns error if directory already exists in target directory", async () => {

         await addNode(parentNode)
         await addNode(newParentNode)
         await addNode({ ...node, parent: newParentNode.name })
         await addNode(node)

         const moveDirectoryMutation = `#graphql
                mutation {
                    moveDirectory(input: {path: "/Parent", name: "Dir"}, path: "/New%20Parent") {
                        name
                        children {
                            ... on Directory {
                                name
                            }
                        }
                    }
                }
            `

         const { errors } = await graphql(schema, moveDirectoryMutation)

         expect(errors).toEqual([new GraphQLError("Cannot move directory /Parent/Dir. \n\n Directory already exists.")])
      })
   })

   describe("renameDirectory", () => {
      it("returns parent directory with child with new name", async () => {

         await addNode(parentNode)
         await addNode(node)
         await addNode(childNode)

         const newName = "New Name"

         const renameDirectoryMutation = `#graphql
                mutation {
                    renameDirectory(input: {path: "/Parent", name: "Dir"}, name: "New Name") {
                        name
                        children {
                            ... on Directory {
                                name
                                children {
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
                    }
                }
            `

         const { data } = await graphql(schema, renameDirectoryMutation)

         expect(data).toEqual({
            renameDirectory: {
               ...parentDirectory,
               children: [
                  {
                     ...directory,
                     name: newName,
                     children: [childDirectory]
                  }
               ]
            }
         })
      })

      it("returns error if directory does not exists", async () => {

         await addNode(parentNode)

         const renameDirectoryMutation = `#graphql
                mutation {
                    renameDirectory(input: {path: "/Parent", name: "Dir"}, name: "New Name") {
                        name
                        children {
                            ... on Directory {
                                name
                            }
                        }
                    }
                }
            `

         const { errors } = await graphql(schema, renameDirectoryMutation)

         expect(errors).toEqual([new GraphQLError("Cannot rename directory /Parent/Dir. \n\n Directory does not exists.")])
      })

      it("returns error if target directory already exists", async () => {

         await addNode(parentNode)
         await addNode(node)
         await addNode(siblingNode)

         const renameDirectoryMutation = `#graphql
                mutation {
                    renameDirectory(input: {path: "/Parent", name: "Dir"}, name: "Sibling") {
                        name
                        children {
                            ... on Directory {
                                name
                            }
                        }
                    }
                }
            `

         const { errors } = await graphql(schema, renameDirectoryMutation)

         expect(errors).toEqual([new GraphQLError("Cannot rename directory /Parent/Dir. \n\n Directory Sibling already exists.")])
      })
   })

   describe("removeDirectory", () => {
      it("returns parent directory without removed child and its children", async () => {

         await addNode(parentNode)
         await addNode(node)
         await addNode(childNode)

         const removeDirectoryMutation = `#graphql
                mutation {
                    removeDirectory(input: { path: "/", name: "Parent" }){
                        name
                        children {
                            ... on Directory {
                                name
                            }
                        }
                    }
                }
            `

         const { data } = await graphql(schema, removeDirectoryMutation)

         expect(data).toEqual({ removeDirectory: { ...rootDirectory, children: [] } })
         expect(await findNode(node)).toEqual(null)
         expect(await findNode(childNode)).toEqual(null)
      })

      it("returns error if directory does not exists", async () => {

         await addNode(parentNode)

         const removeDirectoryMutation = `#graphql
                mutation {
                    removeDirectory(input: { path: "/Parent", name: "Dir" }){
                        name
                        children {
                            ... on Directory {
                                name
                            }
                        }
                    }
                }
            `

         const { errors } = await graphql(schema, removeDirectoryMutation)

         expect(errors).toEqual([new GraphQLError("Cannot remove directory /Parent/Dir. \n\n Directory does not exists.")])
      })

      it("returns error if directory is root", async () => {

         await addNode(parentNode)

         const removeDirectoryMutation = `#graphql
                mutation {
                    removeDirectory(input: { path: "/", name: "" }){
                        name
                        children {
                            ... on Directory {
                                name
                            }
                        }
                    }
                }
            `

         const { errors } = await graphql(schema, removeDirectoryMutation)

         expect(errors).toEqual([new GraphQLError("Cannot remove directory /. \n\n Directory is root.")])
      })
   })
})

