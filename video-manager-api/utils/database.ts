import mongoose from "mongoose"
import { GridFSBucketOptions } from "mongodb"

export async function loadDatabase(dbName = "video-manager", options: mongoose.ConnectOptions = {}) {
   await mongoose.connect(process.env.MONGO_DB_URL!, {
      dbName,
      ...options
   })
   console.log("Connected to Database")
}

export function loadBucket(bucketName = "uploads", options: GridFSBucketOptions = {}) {
   return new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
      bucketName,
      ...options
   })
}

export async function disconnect() {
   await mongoose.connection.close()
   console.log("Disconnected from Database")
}