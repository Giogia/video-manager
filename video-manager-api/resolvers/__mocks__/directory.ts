import { Directory } from '../../schema/directory'

export const root: Directory = {
    name: '',
    path: '/',
    children: []
}

export const parentDirectory: Directory = {
    name: 'Parent',
    path: '/parent',
    children: ['Dir', 'Sibling']
}

export const newParentDirectory: Directory = {
    name: 'New Parent',
    path: '/newparent',
    children: []
}

export const directory: Directory = {
    name: 'Dir',
    path: '/parent/dir',
    children: ['Child']
}

export const siblingDirectory: Directory = {
    name: 'Sibling',
    path: '/parent/sibling',
    children: ['Sibling Child']
}

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