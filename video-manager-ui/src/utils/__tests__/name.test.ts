import { formatName } from "../name"

describe('Name utils', () => {

    describe('formatName', () => {

        test('format name correctly', () => {
            expect(formatName('home')).toEqual('Home')
            expect(formatName('upload-video')).toEqual('Upload Video')
            expect(formatName('')).toEqual('')
        })
    })
})