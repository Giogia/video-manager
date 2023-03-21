import { isRoot, combinePath, destructurePath } from "../path"

describe("Path utils", () => {

   describe("isRoot", () => {

      test("return true if root", () => {
         expect(isRoot("/", undefined)).toEqual(true)
         expect(isRoot("/", "")).toEqual(true)
      })

      test("return false if not root", () => {
         expect(isRoot("/", "test")).toEqual(false)
         expect(isRoot("/test", "")).toEqual(false)
         expect(isRoot("/test", "test")).toEqual(false)
      })
   })

   describe("combinePath", () => {

      test("combine root path correctly", () => {
         expect(combinePath("/", undefined)).toEqual("/")
         expect(combinePath("/", "")).toEqual("/")
      })

      test("combine path correctly", () => {
         expect(combinePath("/", "test")).toEqual("/test")
         expect(combinePath("/test", undefined)).toEqual("/test")
         expect(combinePath("/test", "")).toEqual("/test")
         expect(combinePath("/test", "test")).toEqual("/test/test")
      })

      test("combine path with spaces correctly", () => {
         expect(combinePath("/", " test")).toEqual("/%20test")
         expect(combinePath("/", "test ")).toEqual("/test%20")
         expect(combinePath("/", " test ")).toEqual("/%20test%20")
         expect(combinePath("/", " te st ")).toEqual("/%20te%20st%20")

         expect(combinePath("/test", "  ")).toEqual("/test/%20%20")

         expect(combinePath("/test", " test")).toEqual("/test/%20test")
         expect(combinePath("/test", "test ")).toEqual("/test/test%20")
         expect(combinePath("/test", " test ")).toEqual("/test/%20test%20")
         expect(combinePath("/test", " te st ")).toEqual("/test/%20te%20st%20")
      })
   })

   describe("destructurePath", () => {

      test("return parent and dir", () => {
         expect(destructurePath("/parent")).toEqual(["parent", ""])
         expect(destructurePath("/parent/dir")).toEqual(["dir", "parent", ""])
         expect(destructurePath("/parent/dir/child")).toEqual(["child", "dir", "parent", ""])
      })

      test("return empty if root", () => {
         expect(destructurePath("/")).toEqual(["", ""])
      })
   })
})