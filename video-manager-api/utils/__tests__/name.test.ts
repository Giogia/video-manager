import { increaseNumber } from "../name"

describe('Name utils', () => {

    describe('increaseNumber', () => {

        test('return correct number', () => {
            expect(increaseNumber('New Folder')).toEqual('New Folder 1')
            expect(increaseNumber('New Folder 1')).toEqual('New Folder 2')
        })

        test('return correct name with root', () => {
            expect(increaseNumber('')).toEqual('')
        })
    })
})