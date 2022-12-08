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

        return await DirectoryModel.findOne({ path: combinePath(path, name) })
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
            parentDirectory.children = parentDirectory.children.filter(child => child.path === path)
            await parentDirectory.save()
        }

        return { acknowledged }
    }

    @Mutation(() => Directory)
    async renameDirectory(
        @Arg("input") { path, name }: DirectoryInput,
        @Arg("name") newName: string
    ): Promise<Directory | null> {

        const updatedDirectory = await DirectoryModel.findOneAndUpdate({ path: combinePath(path, name) }, {
            name: newName,
            path: combinePath(path, newName)
        })

        if (updatedDirectory) {
            await updatedDirectory.save()
            return updatedDirectory
        }

        return null
    }
}
