import { GraphQLError } from "graphql"
import { Arg, Mutation, Query, Resolver } from "type-graphql"

import { Directory, DirectoryInput, DirectoryModel } from "../schema/directory"
import { combinePath, isRoot, replacePath, startsWith } from "../utils/path"

@Resolver(() => Directory)
export class DirectoryResolver {

    @Query(() => Directory)
    async getDirectory(@Arg("input") { path, name }: DirectoryInput): Promise<Directory> {

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

            if (!directory) throw new GraphQLError('Directory does not exists.')

            return directory
        }
        catch (e) {
            throw new GraphQLError(`Cannot return directory ${directoryName}. \n\n ${e}`)
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
                        parentDirectory.children.push(name!)
                        await parentDirectory.save()

                        return await this.composeDirectory(path)
                    }
                }
                return await this.composeDirectory(directoryName)
            }
            throw new GraphQLError('Directory name already exists')
        }
        catch (e) {
            throw new GraphQLError(`Cannot add directory ${directoryName}. \n\n ${e}`)
        }
    }

    @Mutation(() => Directory)
    async removeDirectory(@Arg("input") { path, name }: DirectoryInput): Promise<Directory | null> {

        const directoryName = combinePath(path, name)

        try {
            if (!isRoot(path, name)) {

                const { acknowledged } = await DirectoryModel.deleteMany({ path: startsWith(directoryName, true) })

                if (acknowledged) {

                    const parentDirectory = await DirectoryModel.findOne({ path })

                    if (parentDirectory) {
                        parentDirectory.children = parentDirectory.children.filter(
                            child => child !== name
                        )
                        await parentDirectory.save()

                        return await this.composeDirectory(path)
                    }
                }
            }
            throw new GraphQLError('Directory is root')
        }
        catch (e) {
            throw new GraphQLError(`Cannot remove directory ${directoryName}. \n\n ${e}`)
        }
    }

    @Mutation(() => Directory)
    async moveDirectory(
        @Arg("input") { path, name }: DirectoryInput,
        @Arg("path") newPath: string
    ): Promise<Directory | null> {

        const directoryName = combinePath(path, name)

        try {

            const directory = await DirectoryModel.findOne({ path: directoryName })
            const directories = await DirectoryModel.find({ path: startsWith(directoryName) })

            if (directory &&
                directory.children.length <= directories.length) {

                directory.path = replacePath(directory.path, path, newPath)

                const parentDirectory = await DirectoryModel.findOne({ path })
                const newParentDirectory = await DirectoryModel.findOne({ path: newPath })

                if (parentDirectory && newParentDirectory) {

                    newParentDirectory.children.push(name!)
                    parentDirectory.children = parentDirectory.children.filter(
                        child => child !== name
                    )

                    for (const childDirectory of directories) {
                        childDirectory.path = replacePath(childDirectory.path, path, newPath)
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
            throw new GraphQLError('Directory does not exists')
        }
        catch (e) {
            throw new GraphQLError(`Cannot move directory ${directoryName}. \n\n ${e}`)
        }
    }

    @Mutation(() => Directory)
    async renameDirectory(
        @Arg("input") { path, name }: DirectoryInput,
        @Arg("name") newName: string
    ): Promise<Directory | null> {

        const directoryName = combinePath(path, name)
        const newDirectoryName = combinePath(path, newName)

        try {
            const directory = await DirectoryModel.findOne({ path: directoryName })
            const directories = await DirectoryModel.find({ path: startsWith(directoryName) })

            if (directory &&
                directory.children.length <= directories.length) {

                directory.name = newName
                directory.path = newDirectoryName

                const parentDirectory = await DirectoryModel.findOne({ path })

                if (parentDirectory) {
                    parentDirectory.children = parentDirectory.children.map(
                        child => child === name ?
                            newName! :
                            child
                    )

                    for (const childDirectory of directories) {
                        childDirectory.path = replacePath(childDirectory.path, directoryName, newDirectoryName)
                    }

                    await directory.save()
                    await parentDirectory.save()

                    for (const childDirectory of directories) {
                        await childDirectory.save()
                    }

                    return await this.composeDirectory(path)
                }
            }
            throw new GraphQLError('Directory does not exists')
        }
        catch (e) {
            throw new GraphQLError(`Cannot rename directory ${directoryName}. \n\n ${e}`)
        }
    }

    composeDirectory = async (path: string) => {
        try {

            const directory = await DirectoryModel.findOne({ path })

            const { nodes } = await this.getChildren(path)

            if (directory) {
                directory.children = nodes.length > 0 ? nodes : []
            }

            if (!directory) throw new GraphQLError('Directory does not exists.')

            return directory
        }
        catch (e) {
            throw new GraphQLError(`Cannot compose directory from path: ${path}. \n\n ${e}`)
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

            if (isChild) found.children = found.children.filter(
                name => !(name === child)
            )

            await this.getChildren(
                combinePath(root, child as string),
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