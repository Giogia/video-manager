import { GraphQLError } from "graphql"
import { Arg, Mutation, Query, Resolver } from "type-graphql"

import { Directory, DirectoryInput, DirectoryModel } from "../schema/directory"
import { combinePath, isRoot } from "../utils/path"

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
                        parentDirectory.children.push(combinePath(path, name))
                        await parentDirectory.save()

                        return await this.composeDirectory(path)
                    }
                }
                return await this.composeDirectory(combinePath(path, name))
            }
            return null
        }
        catch (e) {
            throw new GraphQLError(`
            Cannot add directory: ${combinePath(path, name)}.
            Got error from database:

            "${e}"`)
        }
    }

    @Mutation(() => Directory)
    async removeDirectory(@Arg("input") { path, name }: DirectoryInput): Promise<Directory | null> {

        try {
            const { paths } = await this.getChildren(combinePath(path, name), true)

            const { acknowledged } = await DirectoryModel.deleteMany({ path: { $in: paths } })

            if (acknowledged) {

                if (!isRoot(path, name)) {
                    const parentDirectory = await DirectoryModel.findOne({ path })

                    if (parentDirectory) {
                        parentDirectory.children = parentDirectory.children.filter(
                            child => child !== combinePath(path, name)
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
    async renameDirectory(
        @Arg("input") { path, name }: DirectoryInput,
        @Arg("name") newName: string
    ): Promise<Directory | null> {

        const update = {
            name: newName,
            path: combinePath(path, newName)
        }

        try {
            const { acknowledged } = await DirectoryModel.updateOne({ path: combinePath(path, name) }, update)

            if (acknowledged) {
                const parentDirectory = await DirectoryModel.findOne({ path })

                if (parentDirectory) {
                    parentDirectory.children = parentDirectory.children.map(
                        child => child === combinePath(path, name) ?
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
            Cannot rename directory: ${combinePath(path, name)}.
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

            const found = nodes.find(({ children =[] }) => children.includes(child))
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