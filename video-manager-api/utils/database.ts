import mongoose from "mongoose"

const RECONNECTION_INTERVAL = 30 * 1000 // milliseconds

export async function loadDatabase(dbName?: string, options: mongoose.ConnectOptions = {}) {
    try {
        await mongoose.connect(process.env.MONGO_DB_URL!, {
            dbName,
            ...options
        })
        console.log("Connected to Database")
    }
    catch {
        setTimeout(() => {
            console.log("Trying to Reconnect...")
            loadDatabase(dbName, options)

        }, RECONNECTION_INTERVAL)
    }
}

export async function disconnect() {
    await mongoose.connection.close()
    console.log("Disconnected from Database")
}