import { Directory } from '../../schema/directory'

export const childDirectory: Directory = {
    name: 'Child',
    children: []
}

export const siblingChildDirectory: Directory = {
    name: 'Sibling Child',
    children: []
}

export const directory: Directory = {
    name: 'Dir',
    children: [
        childDirectory
    ]
}

export const siblingDirectory: Directory = {
    name: 'Sibling',
    children: [
        siblingChildDirectory
    ]
}

export const parentDirectory: Directory = {
    name: 'Parent',
    children: [
        directory,
        siblingDirectory
    ]
}

export const newParentDirectory: Directory = {
    name: 'New Parent',
    children: []
}

export const rootDirectory: Directory = {
    name: '',
    children: [
        newParentDirectory,
        {
            ...parentDirectory,
            children: [
                {
                    ...directory,
                    children: []
                },
                {
                    ...siblingDirectory,
                    children: []
                },
            ]
        }
    ]
}