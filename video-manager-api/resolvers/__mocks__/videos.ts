import { createReadStream } from "fs"
import { dirname, resolve } from "path"
import { fileURLToPath } from "url"

import { Video } from "../../schema/video"
import { Upload } from "../../utils/upload"
import { loadBucket } from "../../utils/database"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export const horizontal: Partial<Video> = {
   name: "horizontal.mov",
   size: 19918369
}

export const vertical: Partial<Video> = {
   name: "vertical.mov",
   size: 18994292
}

export function getUpload({ name: filename }: Partial<Video>): Upload {

   const upload = new Upload()

   const path = resolve(__dirname, `../__assets__/${filename}`)

   const fileUpload = {
      filename,
      mimetype: "video/mp4",
      encoding: "test",
      createReadStream: () => createReadStream(path),
   }

   upload.promise = new Promise(res => res(fileUpload))
   upload.file = fileUpload

   return upload
}

export async function addVideo(video: Partial<Video>) {

   const { file } = getUpload(video)

   const { filename, createReadStream } = file

   const readStream = createReadStream()
   const uploadStream = loadBucket().openUploadStream(filename)

   await new Promise(resolve => readStream
      .pipe(uploadStream)
      .on("close", resolve)
   )
}

export async function dropUploadsCollections() {
   await loadBucket().drop()
}