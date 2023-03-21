import { encodeName, increaseNumber, startsWith } from "../name"

describe("Name utils", () => {

   describe("formatName", () => {

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

   describe("increaseNumber", () => {

      test("return correct number", () => {
         expect(increaseNumber("New Folder")).toEqual("New Folder 1")
         expect(increaseNumber("New Folder 1")).toEqual("New Folder 2")
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