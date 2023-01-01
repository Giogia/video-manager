import "reflect-metadata"
import mongoose from "mongoose"

import { graphql, GraphQLSchema } from "graphql"
import { buildSchema } from "type-graphql"

import { Directory, DirectoryModel } from "../../schema/directory"
import { DirectoryResolver } from "../directory"
import { child, directory, newParentDirectory, parentDirectory, root } from "../__mocks__/directory"
import { combinePath } from "../../utils/path"


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

            const query = `#graphql
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

            const { data } = await graphql(schema, query)

            expect(data).toEqual({ getDirectory: root })
        })

        it('returns composed directory', async () => {

            await addDirectory(directory)
            await addDirectory(parentDirectory)
            await addDirectory(child)

            const query = `#graphql
                query {
                    getDirectory(input: { path: "/parent", name: "dir" }){
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

            const { data } = await graphql(schema, query)

            expect(data).toEqual({ getDirectory: { ...directory, children: [child] } })
        })
    })

    describe('addDirectory', () => {
        it('returns directory with added child', async () => {

            await addDirectory({ ...directory, children: [] })
            await addDirectory(parentDirectory)

            const query = `#graphql
                mutation {
                    addDirectory(input: { path: "/parent/dir", name: "child" }){
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

            const { data } = await graphql(schema, query)

            expect(data).toEqual({ addDirectory: { ...directory, children: [child] } })
        })
    })

    describe('removeDirectory', () => {
        it('returns directory without removed child and its children', async () => {

            await addDirectory(directory)
            await addDirectory(parentDirectory)

            const removeDirectoryQuery = `#graphql
                mutation {
                    removeDirectory(input: { path: "/parent", name: "dir" }){
                        name
                        path
                        children {
                            name
                            path
                        }
                    }
                }
            `

            const { data: parentData } = await graphql(schema, removeDirectoryQuery)

            expect(parentData).toEqual({ removeDirectory: { ...parentDirectory, children: [] } })
            expect(await findDirectory(directory)).toEqual(null)
            expect(await findDirectory(child)).toEqual(null)
        })
    })

    describe('moveDirectory', () => {
        it('moves directory to new parent', async () => {

            await addDirectory(directory)
            await addDirectory(parentDirectory)
            await addDirectory(newParentDirectory)
            await addDirectory(child)

            const moveDirectory = `#graphql
                mutation {
                    moveDirectory(input: {path: "/parent", name: "dir"}, path: "/new-parent") {
                        name
                        path
                        children {
                            name
                            path
                        }
                    }
                }
            `

            const { data: parentData } = await graphql(schema, moveDirectory)

            expect(parentData).toEqual({ moveDirectory: { ...parentDirectory, children: [] } })
            expect(await findDirectory(newParentDirectory)).toMatchObject({
                ...newParentDirectory,
                children: [combinePath(newParentDirectory.path, directory.name)]
            })
        })
    })
})