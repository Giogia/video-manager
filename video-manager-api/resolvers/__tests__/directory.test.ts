import "reflect-metadata"
import mongoose from "mongoose"

import { graphql, GraphQLSchema } from "graphql"
import { buildSchema } from "type-graphql"

import { Directory, DirectoryModel } from "../../schema/directory"
import { DirectoryResolver } from "../directory"
import { combinePath } from "../../utils/path"
import * as mocks from "../__mocks__/directory"

const {
    root,
    parentDirectory,
    newParentDirectory,
    directory,
    siblingDirectory,
    childDirectory,
    siblingChildDirectory
} = mocks


const loadDatabase = async (dbName = 'video-manager-tests') => {
    await mongoose.connect(process.env.MONGO_DB_URL!, { dbName })
}

const findDirectory = async ({ path }: Directory) => {
    return await DirectoryModel.findOne({ path })
}

const addDirectory = async (dir: Directory) => {
    await new DirectoryModel(dir).save()
}


describe('Resolvers', () => {

    let schema: GraphQLSchema

    beforeAll(async () => {
        schema = await buildSchema({ resolvers: [DirectoryResolver] })
        await loadDatabase()
    })

    afterEach(async () => {
        await DirectoryModel.collection.drop()
    })

    describe('getDirectory', () => {
        it('returns root directory even if database is empty', async () => {

            const getRootQuery = `#graphql
                query {
                    getDirectory(input: { path: "/", name: "" }){
                        name
                        path
                        children {
                            name
                            path
                        }
                    }
                }
            `

            const { data } = await graphql(schema, getRootQuery)

            expect(data).toEqual({ getDirectory: root })
        })

        it('returns composed directory', async () => {

            await addDirectory(directory)
            await addDirectory(parentDirectory)
            await addDirectory(childDirectory)

            const getDirectoryQuery = `#graphql
                query {
                    getDirectory(input: { path: "/parent", name: "Dir" }){
                        name
                        path
                        children {
                            name
                            path
                            children {
                                name
                                path
                            }
                        }
                    }
                }
            `

            const { data } = await graphql(schema, getDirectoryQuery)

            expect(data).toEqual({ getDirectory: { ...directory, children: [childDirectory] } })
        })
    })

    describe('addDirectory', () => {
        it('returns parent directory with added child', async () => {

            await addDirectory({ ...directory, children: [] })
            await addDirectory(parentDirectory)

            const addDirectoryMutation = `#graphql
                mutation {
                    addDirectory(input: { path: "/parent/dir", name: "Child" }){
                        name
                        path
                        children {
                            name
                            path
                            children {
                                name
                                path
                            }
                        }
                    }
                }
            `

            const { data } = await graphql(schema, addDirectoryMutation)

            expect(data).toEqual({ addDirectory: { ...directory, children: [childDirectory] } })
        })
    })

    describe('removeDirectory', () => {
        it('returns parent directory without removed child and its children', async () => {

            await addDirectory(directory)
            await addDirectory(parentDirectory)

            const removeDirectoryMutation = `#graphql
                mutation {
                    removeDirectory(input: { path: "/parent", name: "Dir" }){
                        name
                        path
                        children {
                            name
                            path
                        }
                    }
                }
            `

            const { data } = await graphql(schema, removeDirectoryMutation)

            expect(data).toEqual({ removeDirectory: { ...parentDirectory, children: [] } })
            expect(await findDirectory(directory)).toEqual(null)
            expect(await findDirectory(childDirectory)).toEqual(null)
        })
    })

    describe('moveDirectory', () => {
        it('return parent directory without child, moves directory to new parent', async () => {

            await addDirectory(directory)
            await addDirectory(parentDirectory)
            await addDirectory(newParentDirectory)
            await addDirectory(childDirectory)

            const moveDirectoryMutation = `#graphql
                mutation {
                    moveDirectory(input: {path: "/parent", name: "Dir"}, path: "/newparent") {
                        name
                        path
                        children {
                            name
                            path
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
                        path
                        children {
                            name
                            path
                            children {
                                name
                                path
                                children {
                                    name
                                    path
                                }
                            }
                        }
                    }
                }
            `

            const { data: newParentData } = await graphql(schema, getNewParentDirectoryQuery)

            const newDirectoryPath = combinePath(newParentDirectory.path, directory.name)
            const newChildPath = combinePath(newDirectoryPath, childDirectory.name)

            expect(newParentData).toEqual({
                getDirectory: {
                    ...newParentDirectory,
                    children: [{
                        ...directory, path: newDirectoryPath,
                        children: [{
                            ...childDirectory,
                            path: newChildPath
                        }]
                    }]
                }
            })
        })

        it('return parent directory without child, moves directory down one level', async () => {

            await addDirectory(parentDirectory)
            await addDirectory(directory)
            await addDirectory(siblingDirectory)
            await addDirectory(childDirectory)
            await addDirectory(siblingChildDirectory)

            const moveDirectoryMutation = `#graphql
                mutation {
                    moveDirectory(input: {path: "/parent", name: "Dir"}, path: "/parent/sibling") {
                        name
                        path
                        children {
                            name
                            path
                            children {
                                name 
                                path
                                children {
                                    name
                                    path
                                    children {
                                        name
                                        path
                                    }
                                }
                            }
                        }
                    }
                }
            `

            const { data: parentData } = await graphql(schema, moveDirectoryMutation)

            const newDirectoryPath = combinePath(siblingDirectory.path, directory.name)
            const newChildPath = combinePath(newDirectoryPath, childDirectory.name)

            expect(parentData).toEqual({
                moveDirectory: {
                    ...parentDirectory, children: [{
                        ...siblingDirectory, children: [
                            siblingChildDirectory, {
                                ...directory,
                                path: newDirectoryPath,
                                children: [{ ...childDirectory, path: newChildPath }]
                            }
                        ]
                    }]
                }
            })
        })

        it('return parent directory without child, moves directory up one level', async () => {

            await addDirectory(parentDirectory)
            await addDirectory(directory)
            await addDirectory(siblingDirectory)
            await addDirectory(childDirectory)
            await addDirectory(siblingChildDirectory)

            const moveDirectoryMutation = `#graphql
                mutation {
                    moveDirectory(input: {path: "/parent/dir", name: "Child"}, path: "/parent") {
                        name
                        path
                        children {
                            name
                            path
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
                        path
                        children {
                            name
                            path
                            children {
                                name
                                path
                                children {
                                    name
                                    path
                                }
                            }
                        }
                    }
                }
            `

            const { data: newParentData } = await graphql(schema, getNewParentDirectoryQuery)

            const newChildPath = combinePath(parentDirectory.path, childDirectory.name)

            expect(newParentData).toEqual({
                getDirectory: {
                    ...parentDirectory, children: [
                        { ...directory, children: [] },
                        { ...siblingDirectory, children: [siblingChildDirectory] },
                        { ...childDirectory, path: newChildPath }
                    ]
                }
            })
        })
    })

    describe('renameDirectory', () => {
        it('returns parent directory with child with new name', async () => {

            await addDirectory(directory)
            await addDirectory(parentDirectory)
            await addDirectory(childDirectory)

            const newName = "New Name"

            const renameDirectoryMutation = `#graphql
                mutation {
                    renameDirectory(input: {path: "/parent", name: "Dir"}, name: "New Name") {
                        name
                        path
                        children {
                            name
                            path
                            children {
                                name
                                path
                                children {
                                    name
                                    path
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
                    children: [{
                        ...directory,
                        name: newName,
                        path: combinePath(parentDirectory.path, newName),
                        children: [{
                            ...childDirectory,
                            path: childDirectory.path.replace(
                                combinePath(parentDirectory.path, directory.name),
                                combinePath(parentDirectory.path, newName)
                            )
                        }]
                    }]
                }
            })
        })
    })
})