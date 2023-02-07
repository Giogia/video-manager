import "reflect-metadata"
import { buildSchema } from "type-graphql"
import { graphql, GraphQLError, GraphQLSchema } from "graphql"

import { DirectoryResolver } from "../directory"
import { loadDatabase, disconnect } from "../../utils/database"
import { combinePath } from "../../utils/path"
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
    dropCollection
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

describe('Resolvers', () => {

    let schema: GraphQLSchema

    beforeAll(async () => {
        schema = await buildSchema({
            resolvers: [DirectoryResolver]
        })

        await loadDatabase('video-manager-tests')
    })

    afterEach(async () => {
        await deleteNodes()
    })

    afterAll(async () => {
        await dropCollection()
        await disconnect()
    })

    describe('getDirectory', () => {
        it('returns root directory', async () => {

            await addNode(parentNode)
            await addNode(newParentNode)
            await addNode(node)
            await addNode(siblingNode)

            const getRootQuery = `#graphql
                query {
                    getDirectory(input: { path: "/", name: "" }){
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
                                }
                            }
                        }
                    }
                }
            `

            const { data } = await graphql(schema, getRootQuery)

            expect(data).toEqual({ getDirectory: rootDirectory })
        })

        it('returns composed directory', async () => {

            await addNode(parentNode)
            await addNode(node)
            await addNode(childNode)
            await addNode(siblingNode)
            await addNode(siblingChildNode)

            const getDirectoryQuery = `#graphql
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
                                }
                            }
                        }
                    }
                }
            `

            const { data } = await graphql(schema, getDirectoryQuery)

            expect(data).toEqual({ getDirectory: parentDirectory })
        })

        it('returns composed directory if nested', async () => {

            await addNode(parentNode)
            await addNode(node)
            await addNode(childNode)
            await addNode(siblingNode)
            await addNode(siblingChildNode)

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
                                children {
                                    name
                                }
                            }
                        }
                    }
                }
            `

            const { data } = await graphql(schema, getDirectoryQuery)

            expect(data).toEqual({ getDirectory: directory })
        })

        it('returns error if directory does not exists', async () => {

            await addNode(parentNode)

            const getDirectoryQuery = `#graphql
                query {
                    getDirectory(input: { path: "/parent", name: "Dir" }){
                        name
                        path
                        children {
                            name
                        }
                    }
                }
            `

            const { errors } = await graphql(schema, getDirectoryQuery)

            expect(errors).toEqual([new GraphQLError('Cannot return directory /parent/dir. \n\n Directory does not exists.')])
        })
    })

    describe('addDirectory', () => {
        it('returns parent directory with added child', async () => {

            await addNode(parentNode)
            await addNode(node)

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
                                children {
                                    name
                                }
                            }
                        }
                    }
                }
            `

            const { data } = await graphql(schema, addDirectoryMutation)

            expect(data).toEqual({ addDirectory: directory })
        })

        it('returns parent directory with added child numbered if name already exists', async () => {

            await addNode(parentNode)
            await addNode(node)
            await addNode(childNode)

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

            const { data: data1 } = await graphql(schema, addDirectoryMutation)
            const { data: data2 } = await graphql(schema, addDirectoryMutation)

            expect(data1).toEqual({
                addDirectory: {
                    ...directory, children: [childDirectory,
                        { ...childDirectory, name: 'Child 1', path: '/parent/dir/child1' }
                    ]
                }
            })

            expect(data2).toEqual({
                addDirectory: {
                    ...directory, children: [childDirectory,
                        { ...childDirectory, name: 'Child 1', path: '/parent/dir/child1' },
                        { ...childDirectory, name: 'Child 2', path: '/parent/dir/child2' }
                    ]
                }
            })
        })
    })

    describe('moveDirectory', () => {
        it('return parent directory without child, moves directory to new parent', async () => {

            await addNode(parentNode)
            await addNode(newParentNode)
            await addNode(node)
            await addNode(childNode)

            const moveDirectoryMutation = `#graphql
                mutation {
                    moveDirectory(input: {path: "/parent", name: "Dir"}, path: "/newparent") {
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
                        path
                        children {
                            name
                            path
                            children {
                                name
                                path
                                children {
                                    name
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

            await addNode(parentNode)
            await addNode(node)
            await addNode(childNode)
            await addNode(siblingNode)
            await addNode(siblingChildNode)

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
                    ...parentDirectory, children: [
                        {
                            ...siblingDirectory, children: [
                                {
                                    ...directory,
                                    path: newDirectoryPath,
                                    children: []
                                }, siblingChildDirectory,
                            ]
                        }
                    ]
                }
            })

            const getNewParentDirectoryQuery = `#graphql
                query {
                    getDirectory(input: { path: "/parent", name: "Sibling" }){
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
                        {
                            ...directory,
                            path: newDirectoryPath,
                            children: [
                                { ...childDirectory, path: newChildPath }
                            ]
                        }, siblingChildDirectory
                    ]
                }
            })
        })

        it('return parent directory without child, moves directory up one level', async () => {

            await addNode(parentNode)
            await addNode(node)
            await addNode(childNode)
            await addNode(siblingNode)
            await addNode(siblingChildNode)

            const moveDirectoryMutation = `#graphql
                mutation {
                    moveDirectory(input: {path: "/parent/dir", name: "Child"}, path: "/parent") {
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
                        { ...childDirectory, path: newChildPath },
                        { ...directory, children: [] },
                        { ...siblingDirectory, children: [siblingChildDirectory] },
                    ]
                }
            })
        })

        it('returns error if directory does not exists', async () => {

            await addNode(parentNode)
            await addNode(newParentNode)

            const moveDirectoryMutation = `#graphql
                mutation {
                    moveDirectory(input: {path: "/parent", name: "Dir"}, path: "/newparent") {
                        name
                        path
                        children {
                            name
                        }
                    }
                }
            `

            const { errors } = await graphql(schema, moveDirectoryMutation)

            expect(errors).toEqual([new GraphQLError('Cannot move directory /parent/dir. \n\n Directory does not exists.')])
        })

        it('returns error if target directory does not exists', async () => {

            await addNode(parentNode)
            await addNode(node)

            const moveDirectoryMutation = `#graphql
                mutation {
                    moveDirectory(input: {path: "/parent", name: "Dir"}, path: "/newparent") {
                        name
                        path
                        children {
                            name
                        }
                    }
                }
            `

            const { errors } = await graphql(schema, moveDirectoryMutation)

            expect(errors).toEqual([new GraphQLError('Cannot move directory /parent/dir. \n\n Directory /newparent does not exists.')])
        })

        it('returns error if directory already exists in target directory', async () => {

            await addNode(parentNode)
            await addNode(newParentNode)
            await addNode({ ...node, parent: newParentNode.path })
            await addNode(node)

            const moveDirectoryMutation = `#graphql
                mutation {
                    moveDirectory(input: {path: "/parent", name: "Dir"}, path: "/newparent") {
                        name
                        path
                        children {
                            name
                        }
                    }
                }
            `

            const { errors } = await graphql(schema, moveDirectoryMutation)

            expect(errors).toEqual([new GraphQLError('Cannot move directory /parent/dir. \n\n Directory already exists.')])
        })
    })

    describe('renameDirectory', () => {
        it('returns parent directory with child with new name', async () => {

            await addNode(parentNode)
            await addNode(node)
            await addNode(childNode)

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
                            path: combinePath(parentDirectory.path, newName),
                            children: [
                                {
                                    ...childDirectory,
                                    path: childDirectory.path.replace(
                                        combinePath(parentDirectory.path, directory.name),
                                        combinePath(parentDirectory.path, newName)
                                    )
                                }
                            ]
                        }
                    ]
                }
            })
        })

        it('returns error if directory does not exists', async () => {

            await addNode(parentNode)

            const renameDirectoryMutation = `#graphql
                mutation {
                    renameDirectory(input: {path: "/parent", name: "Dir"}, name: "New Name") {
                        name
                        path
                        children {
                            name
                        }
                    }
                }
            `

            const { errors } = await graphql(schema, renameDirectoryMutation)

            expect(errors).toEqual([new GraphQLError('Cannot rename directory /parent/dir. \n\n Directory does not exists.')])
        })
    })

    describe('removeDirectory', () => {
        it('returns parent directory without removed child and its children', async () => {

            await addNode(parentNode)
            await addNode(node)
            await addNode(childNode)

            const removeDirectoryMutation = `#graphql
                mutation {
                    removeDirectory(input: { path: "/", name: "Parent" }){
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

            expect(data).toEqual({ removeDirectory: { ...rootDirectory, children: [] } })
            expect(await findNode(node)).toEqual(null)
            expect(await findNode(childNode)).toEqual(null)
        })

        it('returns error if directory does not exists', async () => {

            await addNode(parentNode)

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

            const { errors } = await graphql(schema, removeDirectoryMutation)

            expect(errors).toEqual([new GraphQLError('Cannot remove directory /parent/dir. \n\n Directory does not exists.')])
        })

        it('returns error if directory does not exists', async () => {

            await addNode(parentNode)

            const removeDirectoryMutation = `#graphql
                mutation {
                    removeDirectory(input: { path: "/", name: "" }){
                        name
                        path
                        children {
                            name
                            path
                        }
                    }
                }
            `

            const { errors } = await graphql(schema, removeDirectoryMutation)

            expect(errors).toEqual([new GraphQLError('Cannot remove directory /. \n\n Directory is root.')])
        })
    })
})

