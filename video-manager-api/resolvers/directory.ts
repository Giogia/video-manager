import { Arg, Mutation, Query, Resolver } from "type-graphql"

import { Directory, DirectoryInput, DirectoryModel, Result } from "../schema/directory"
import { combinePath } from "../utils/path"

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

        const parentDirectory = await DirectoryModel.findOne({ path })

        const directory = new DirectoryModel({
            path: combinePath(path, name),
            name,
            children: []
        } as Directory)

        if (parentDirectory) {
            parentDirectory.children.push(directory)
            await parentDirectory.save()
        }

        if (parentDirectory || (!parentDirectory && path === '/')) {
            await directory.save()
            return { acknowledged: true }
        }

        return { acknowledged: false }
    }

    @Mutation(() => Result)
    async removeDirectory(@Arg("input") { path, name }: DirectoryInput): Promise<Result> {

        const { acknowledged } = await DirectoryModel.deleteOne({ path: combinePath(path, name) })

        const parentDirectory = await DirectoryModel.findOne({ path })

        if (parentDirectory) {
            parentDirectory.children = parentDirectory.children.filter(
                child => child.path === path
            )
            await parentDirectory.save()
        }

        return { acknowledged: acknowledged }
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

        const { acknowledged } = await DirectoryModel.updateOne({
            path: combinePath(path, name)
        }, update)

        const parentDirectory = await DirectoryModel.findOne({ path })

        if (parentDirectory) {
            parentDirectory.children = parentDirectory.children.map(
                child => child.name === name ? { ...child, ...update } : child
            )
            await parentDirectory.save()
        }

        return { acknowledged }
    }
}
