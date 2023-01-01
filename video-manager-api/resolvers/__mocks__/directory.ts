import { Directory } from '../../schema/directory'

export const root: Directory = {
    name: '',
    path: '/',
    children: []
}

export const parentDirectory: Directory = {
    name: 'parent',
    path: '/parent',
    children: ['/parent/dir']
}

export const newParentDirectory: Directory = {
    name: 'new-parent',
    path: '/new-parent',
    children: []
}

export const directory: Directory = {
    name: 'dir',
    path: '/parent/dir',
    children: ['/parent/dir/child']
}

export const child: Directory = {
    name: 'child',
    path: '/parent/dir/child',
    children: []
}