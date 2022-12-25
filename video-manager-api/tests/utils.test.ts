import { isRoot, combinePath } from "../utils/path"

describe('Utils', () => {

    describe('Path', () => {

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
    })
})