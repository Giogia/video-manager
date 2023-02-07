import { formatName, increaseNumber, startsWith } from "../name"

describe('Name utils', () => {

    describe('formatName', () => {

        test('return correct name', () => {
            expect(formatName('New Folder')).toEqual('newfolder')
            expect(formatName('New Folder 1')).toEqual('newfolder1')
        })

        test('return correct name with root', () => {
            expect(formatName('')).toEqual('')
        })
    })

    describe('increaseNumber', () => {

        test('return correct number', () => {
            expect(increaseNumber('New Folder')).toEqual('New Folder 1')
            expect(increaseNumber('New Folder 1')).toEqual('New Folder 2')
        })

        test('return correct name with root', () => {
            expect(increaseNumber('')).toEqual('')
        })
    })

    describe('startsWith', () => {

        test('return correct regex', () => {
            expect(startsWith('New Folder')).toEqual(/^New Folder/)
            expect(startsWith('New Folder 1')).toEqual(/^New Folder 1/)
        })

        test('return correct regex with root', () => {
            expect(startsWith('')).toEqual(/^/)
        })
    })
})