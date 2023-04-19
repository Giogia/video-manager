import { encodeName, getLastDigits, increaseNumber, startsWith } from "../name"

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
         expect(getLastDigits("New Folder")).toEqual({ number: NaN, position: 10 })

         Array.from({ length: 100 }).map((_, n) => {
            expect(getLastDigits(`New Folder ${n}`)).toEqual({ number: n, position: 11 })
         })
      })

      test("return correct name with root", () => {
         expect(getLastDigits("")).toEqual({ number: NaN, position: 0 })
      })
   })

   describe("increaseNumber", () => {

      test("return correct number", () => {
         expect(increaseNumber("New Folder")).toEqual("New Folder 1")

         Array.from({ length: 100 }).map((_, n) => {
            expect(increaseNumber(`New Folder ${n}`)).toEqual(`New Folder ${n + 1}`)
         })
      })

      test("return correct name with root", () => {
         expect(increaseNumber("")).toEqual("")
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