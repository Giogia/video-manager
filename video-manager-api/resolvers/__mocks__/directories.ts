import { Directory } from '../../schema/directory'

export const childDirectory: Directory = {
    name: 'Child',
    path: '/parent/dir/child',
    children: []
}

export const siblingChildDirectory: Directory = {
    name: 'Sibling Child',
    path: '/parent/sibling/siblingchild',
    children: []
}

export const directory: Directory = {
    name: 'Dir',
    path: '/parent/dir',
    children: [
        childDirectory
    ]
}

export const siblingDirectory: Directory = {
    name: 'Sibling',
    path: '/parent/sibling',
    children: [
        siblingChildDirectory
    ]
}

export const parentDirectory: Directory = {
    name: 'Parent',
    path: '/parent',
    children: [
        directory,
        siblingDirectory
    ]
}

export const newParentDirectory: Directory = {
    name: 'New Parent',
    path: '/newparent',
    children: []
}

export const rootDirectory: Directory = {
    name: '',
    path: '/',
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