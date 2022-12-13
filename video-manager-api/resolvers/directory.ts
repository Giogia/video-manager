import { Arg, Mutation, Query, Resolver } from "type-graphql"

import { Directory, DirectoryInput, DirectoryModel, Result } from "../schema/directory"
import { combinePath, isRoot } from "../utils/path"

@Resolver(() => Directory)
export class DirectoryResolver {

    @Query(() => [Directory])
    async getDirectories(): Promise<Directory[]> {

        return await DirectoryModel.find({})
    }

    @Query(() => Directory)
    async getDirectory(@Arg("input") { path, name }: DirectoryInput): Promise<Directory | null> {

        const directory = await DirectoryModel.findOne({ path: combinePath(path, name) })

        if (!directory && !name && path === '/') {
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

    @Mutation(() => Result)
    async addDirectory(@Arg("input") { path, name }: DirectoryInput): Promise<Result> {

        try {
            const directory = new DirectoryModel({
                path: combinePath(path, name),
                name,
                children: []
            } as Directory)

            const saved = await directory.save()

            if (saved && !isRoot(name, path)) {

                const parentDirectory = await DirectoryModel.findOne({ path })

                if (parentDirectory) {
                    parentDirectory.children.push(directory)
                    await parentDirectory.save()
                }
            }

            return { acknowledged: true }

        } catch (e) {
            return { acknowledged: false }
        }
    }

    @Mutation(() => Result)
    async removeDirectory(@Arg("input") { path, name }: DirectoryInput): Promise<Result> {

        try {
            const { acknowledged } = await DirectoryModel.deleteOne({ path: combinePath(path, name) })

            if (acknowledged && !isRoot(name, path)) {
                const parentDirectory = await DirectoryModel.findOne({ path })

                if (parentDirectory) {
                    parentDirectory.children = parentDirectory.children.filter(
                        child => child.name !== name
                    )
                    await parentDirectory.save()
                }
            }

            return { acknowledged }

        } catch (e) {
            return { acknowledged: false }
        }
    }

    @Mutation(() => Result)
    async renameDirectory(
        @Arg("input") { path, name }: DirectoryInput,
        @Arg("name") newName: string
    ): Promise<Result> {

        const update = {
            name: newName,
            path: combinePath(path, newName)
        }

        try {
            const { acknowledged } = await DirectoryModel.updateOne({
                path: combinePath(path, name)
            }, update)

            if (acknowledged) {
                const parentDirectory = await DirectoryModel.findOne({ path })

                if (parentDirectory) {
                    parentDirectory.children = parentDirectory.children.map(
                        child => child.name === name ?
                            { ...child, ...update } :
                            child
                    )
                    await parentDirectory.save()
                }
            }

            return { acknowledged }

        } catch (e) {
            return { acknowledged: false }
        }
    }
}
