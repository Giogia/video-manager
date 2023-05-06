import { encodeName, getLastDigits, firstMissingName, startsWith } from "../name"

describe("Name utils", () => {

   describe("encodeName", () => {

      test("return correct name", () => {
         expect(encodeName("New Folder")).toEqual("New%20Folder")
         expect(encodeName("New Folder 1")).toEqual("New%20Folder%201")

         expect(encodeName("New_Folder_2")).toEqual("New_Folder_2")
         expect(encodeName("New-Folder-3")).toEqual("New-Folder-3")
         expect(encodeName("New Folder 4!")).toEqual("New%20Folder%204!")
      })

      test("return correct name with root", () => {
         expect(encodeName("")).toEqual("")
      })
   })

   describe("getLastDigits", () => {

      test("return correct number", () => {
         expect(getLastDigits("New Folder")).toEqual(0)

         Array.from({ length: 100 }).map((_, n) => {
            expect(getLastDigits(`New Folder ${n}`)).toEqual(n)
         })
      })

      test("return correct name with root", () => {
         expect(getLastDigits("")).toEqual(0)
      })
   })

   describe("firstMissingName", () => {

      const getNamesUntil = (length: number) => Array
         .from({ length })
         .map((_, n) => `New Folder ${n + 1}`)

      test("return correct number", () => {
         expect(firstMissingName("New Folder", ["New Folder"])).toEqual("New Folder 1")
         expect(firstMissingName("New Folder", ["New Folder", "New Folder 1"])).toEqual("New Folder 2")
         expect(firstMissingName("New Folder", ["New Folder", "New Folder 2"])).toEqual("New Folder 1")
         expect(firstMissingName("New Folder", ["New Folder", "New Folder 3"])).toEqual("New Folder 1")
         expect(firstMissingName("New Folder", ["New Folder", "New Folder 1", "New Folder 3"])).toEqual("New Folder 2")
         expect(firstMissingName("New Folder", ["New Folder", ...getNamesUntil(9)])).toEqual("New Folder 10")
         expect(firstMissingName("New Folder", ["New Folder", ...getNamesUntil(10)])).toEqual("New Folder 11")
         expect(firstMissingName("New Folder", ["New Folder", ...getNamesUntil(99)])).toEqual("New Folder 100")
         expect(firstMissingName("New Folder", ["New Folder", ...getNamesUntil(100)])).toEqual("New Folder 101")
      })
   })

   describe("startsWith", () => {

      test("return correct regex", () => {
         expect(startsWith("New Folder")).toEqual(/^New Folder/)
         expect(startsWith("New Folder 1")).toEqual(/^New Folder 1/)
      })

      test("return correct regex with root", () => {
         expect(startsWith("")).toEqual(/^/)
      })
   })
})