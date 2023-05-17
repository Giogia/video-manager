import { log } from "console"
import { GridFSBucketOptions } from "mongodb"
import mongoose from "mongoose"

/**
 * Loads the database with the specified name and options.
 * @param dbName - The name of the database. Default is "video-manager".
 * @param options - Additional options for connecting to the database.
 * @returns A Promise that resolves when the database is successfully connected.
 */
export async function loadDatabase(dbName = "video-manager", options: mongoose.ConnectOptions = {}) {
   await mongoose.connect(process.env.MONGO_DB_URL!, {
      dbName,
      ...options
   })

   log(`Connected to ${dbName} Database`)
}

/**
 * Loads the GridFSBucket with the specified name and options.
 * @param bucketName - The name of the bucket. Default is "uploads".
 * @param options - Additional options for configuring the GridFSBucket.
 * @returns The created GridFSBucket object.
 */
export function loadBucket(bucketName = "uploads", options: GridFSBucketOptions = {}) {
   return new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
      bucketName,
      ...options
   })
}

/**
 * Disconnects from the database.
 * @returns A Promise that resolves when the disconnection is successful.
 */
export async function disconnect() {
   await mongoose.connection.close()

   log("Disconnected from Database")
}
