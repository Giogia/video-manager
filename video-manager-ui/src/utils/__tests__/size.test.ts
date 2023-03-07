import { formatSize } from "../size"

describe('Size utils', () => {

    describe('formatSize', () => {

        test('format size correctly', () => {
            expect(formatSize(0)).toEqual('0')
            expect(formatSize(15)).toEqual('15')
            expect(formatSize(103)).toEqual('103')
            expect(formatSize(1657)).toEqual('1.7kb')
            expect(formatSize(14388)).toEqual('14.4kb')
            expect(formatSize(593837)).toEqual('593.8kb')
            expect(formatSize(8295849)).toEqual('8.3Mb')
            expect(formatSize(20390447)).toEqual('20.4Mb')
            expect(formatSize(241938932)).toEqual('241.9Mb')
            expect(formatSize(5678902932)).toEqual('5.7Gb')
            expect(formatSize(25091091591)).toEqual('25.1Gb')
            expect(formatSize(390290171748)).toEqual('390.3Gb')
            expect(formatSize(2093090971837)).toEqual('2.1Tb')
            expect(formatSize(69370798324094)).toEqual('69.4Tb')
            expect(formatSize(998729034098500)).toEqual('998.7Tb')
            expect(formatSize(19230975928392809)).toEqual('19.2Pb')
        })
    })
})