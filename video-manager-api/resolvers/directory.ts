import { GraphQLError } from "graphql"
import { Arg, Mutation, Query, Resolver } from "type-graphql"

import { Directory, DirectoryInput, DirectoryModel } from "../schema/directory"
import { combinePath, isRoot, startsWith } from "../utils/path"

@Resolver(() => Directory)
export class DirectoryResolver {

    @Query(() => [Directory])
    async getDirectories(): Promise<Directory[]> {

        try {
            return await DirectoryModel.find({})
        }
        catch (e) {
            throw new GraphQLError(`
            Cannot return directories. 
            Got error from database operation: 
                
            "${e}"`)
        }
    }

    @Query(() => Directory)
    async getDirectory(@Arg("input") { path, name }: DirectoryInput): Promise<Directory | null> {

        const directoryName = combinePath(path, name)

        try {
            const directory = await this.composeDirectory(directoryName)

            if (!directory && isRoot(path, name)) {
                const rootDirectory = new DirectoryModel({
                    path,
                    name,
                    children: []
                } as Directory)

                await rootDirectory.save()

                return rootDirectory
            }
            return directory
        }
        catch (e) {
            throw new GraphQLError(`
            Cannot return directory: ${directoryName}.
            Got error from database:

            "${e}"`)
        }
    }

    @Mutation(() => Directory)
    async addDirectory(@Arg("input") { path, name }: DirectoryInput): Promise<Directory | null> {

        const directoryName = combinePath(path, name)

        try {
            const directory = new DirectoryModel({
                path: combinePath(path, name),
                name,
                children: [] as string[]
            } as Directory)

            const saved = await directory.save()

            if (saved) {
                if (!isRoot(path, name)) {
                    const parentDirectory = await DirectoryModel.findOne({ path })

                    if (parentDirectory) {
                        parentDirectory.children.push(directoryName)
                        await parentDirectory.save()

                        return await this.composeDirectory(path)
                    }
                }
                return await this.composeDirectory(directoryName)
            }
            return null
        }
        catch (e) {
            throw new GraphQLError(`
            Cannot add directory: ${directoryName}.
            Got error from database:

            "${e}"`)
        }
    }

    @Mutation(() => Directory)
    async removeDirectory(@Arg("input") { path, name }: DirectoryInput): Promise<Directory | null> {

        const directoryName = combinePath(path, name)

        try {
            if (!isRoot(path, name)) {

                const { acknowledged } = await DirectoryModel.deleteMany({ path: startsWith(directoryName) })

                if (acknowledged) {

                    const parentDirectory = await DirectoryModel.findOne({ path })

                    if (parentDirectory) {
                        parentDirectory.children = parentDirectory.children.filter(
                            child => child !== directoryName
                        )
                        await parentDirectory.save()

                        return await this.composeDirectory(path)
                    }
                }
            }
            return null
        }
        catch (e) {
            return null
        }
    }

    @Mutation(() => Directory)
    async moveDirectory(
        @Arg("input") { path, name }: DirectoryInput,
        @Arg("path") newPath: string
    ): Promise<Directory | null> {

        const directoryName = combinePath(path, name)
        const newDirectoryName = combinePath(newPath, name)

        try {

            const directory = await DirectoryModel.findOne({ path: directoryName })
            const directories = await DirectoryModel.find({ path: startsWith(directoryName, false) })

            if (directory &&
                directory.children.length == directories.length) {

                directory.path = directory.path.replace(path, newPath)

                const parentDirectory = await DirectoryModel.findOne({ path })
                const newParentDirectory = await DirectoryModel.findOne({ path: newPath })

                if (parentDirectory && newParentDirectory) {

                    newParentDirectory.children.push(newDirectoryName)
                    parentDirectory.children = parentDirectory.children.filter(
                        child => child !== directoryName
                    )

                    for (const child of directories) {
                        child.path = child.path.replace(path, newPath)
                        parentDirectory.children = parentDirectory.children.map(
                            nephew => (nephew as string).replace(path, newPath)
                        )
                    }

                    await directory.save()
                    await parentDirectory.save()
                    await newParentDirectory.save()

                    for (const childDirectory of directories) {
                        await childDirectory.save()
                    }

                    return await this.composeDirectory(path)
                }
            }
            return null
        }
        catch (e) {
            throw new GraphQLError(`
            Cannot rename directory: ${directoryName}.
            Got error from database:

            "${e}"`)
        }
    }

    @Mutation(() => Directory)
    async renameDirectory(
        @Arg("input") { path, name }: DirectoryInput,
        @Arg("name") newName: string
    ): Promise<Directory | null> {

        const update = {
            name: newName,
            path: combinePath(path, newName)
        }

        const directoryName = combinePath(path, name)

        try {
            const { acknowledged } = await DirectoryModel.updateOne({ path: directoryName }, update)

            if (acknowledged) {
                const parentDirectory = await DirectoryModel.findOne({ path })

                if (parentDirectory) {
                    parentDirectory.children = parentDirectory.children.map(
                        child => child === directoryName ?
                            update.path :
                            child
                    )
                    await parentDirectory.save()

                    return await this.composeDirectory(path)
                }
            }
            return null
        }
        catch (e) {
            throw new GraphQLError(`
            Cannot rename directory: ${directoryName}.
            Got error from database:

            "${e}"`)
        }
    }

    composeDirectory = async (path: string) => {
        try {

            const directory = await DirectoryModel.findOne({ path })

            const { nodes } = await this.getChildren(path)

            if (directory) {
                directory.children = nodes.length > 0 ? nodes : []
            }

            return directory

        }
        catch (e) {
            throw new GraphQLError(`${e}`)
        }
    }

    getChildren = async (
        root: string,
        addRoot = false,
        nodes: Directory[] = [],
        paths: string[] = [],
    ) => {

        const node = await DirectoryModel.findOne({ path: root })

        const { path, children = [] } = node || {}

        addRoot && path && paths.push(path)
        addRoot && node && nodes.push(node)

        for (const child of children) {

            const found = nodes.find(({ children = [] }) => children.includes(child))
            const isChild = !!node && !!found

            if (isChild) found.children = found.children.filter(path => !(path === child))

            await this.getChildren(
                child as string,
                true,
                isChild ?
                    found.children as Directory[] :
                    nodes,
                paths
            )
        }

        return { nodes, paths }
    }
}