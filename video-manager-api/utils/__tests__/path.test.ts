import { isRoot, combinePath, startsWith, replacePath } from "../path"

describe('Path utils', () => {

    describe('isRoot', () => {

        test('return true if root', () => {
            expect(isRoot('/', undefined)).toEqual(true)
            expect(isRoot('/', '')).toEqual(true)
        })

        test('return false if not root', () => {
            expect(isRoot('/', 'test')).toEqual(false)
            expect(isRoot('/test', '')).toEqual(false)
            expect(isRoot('/test', 'test')).toEqual(false)
        })
    })

    describe('combinePath', () => {

        test('combine root path correctly', () => {
            expect(combinePath('/', undefined)).toEqual('/')
            expect(combinePath('/', '')).toEqual('/')
        })

        test('combine path correctly', () => {
            expect(combinePath('/', 'test')).toEqual('/test')
            expect(combinePath('/test', undefined)).toEqual('/test')
            expect(combinePath('/test', '')).toEqual('/test')
            expect(combinePath('/test', 'test')).toEqual('/test/test')
        })

        test('combine path with spaces correctly', () => {
            expect(combinePath('/', ' test')).toEqual('/test')
            expect(combinePath('/', 'test ')).toEqual('/test')
            expect(combinePath('/', ' test ')).toEqual('/test')
            expect(combinePath('/', ' te st ')).toEqual('/test')

            expect(combinePath('/test', '  ')).toEqual('/test')

            expect(combinePath('/test', ' test')).toEqual('/test/test')
            expect(combinePath('/test', 'test ')).toEqual('/test/test')
            expect(combinePath('/test', ' test ')).toEqual('/test/test')
            expect(combinePath('/test', ' te st ')).toEqual('/test/test')
        })
    })

    describe('replacePath', () => {

        test('replace root path correctly', () => {
            expect(replacePath('/dir', '/', '/newparent')).toEqual('/newparent/dir')
            expect(replacePath('/newparent/dir', '/newparent', '/')).toEqual('/dir')
        })

        test('replace path correctly', () => {
            expect(replacePath('/parent/dir', '/parent', '/newparent')).toEqual('/newparent/dir')
        })
    })

    describe('startsWith', () => {

        test('return correct regex with root', () => {
            expect(startsWith('/', true)).toEqual(/^\//)
            expect(startsWith('/test', true)).toEqual(/^\/test/)
            expect(startsWith('/test/test', true)).toEqual(/^\/test\/test/)
        })

        test('return correct regex without root', () => {
            expect(startsWith('/', false)).toEqual(/^\//)
            expect(startsWith('/test', false)).toEqual(/^\/test\//)
            expect(startsWith('/test/test', false)).toEqual(/^\/test\/test\//)
        })
    })

})