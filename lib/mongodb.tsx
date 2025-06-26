import mongoose from "mongoose";

declare global {
    const mongoose: any; // This must be a `var` and not a `let / const`
}

(global as any).mongoose = {
    connection: null,
    promise: null,
};

export const connectToDB = async () => {
    try {
        if ((global as any).mongoose && (global as any).mongoose.connection) {
            console.log("Connected from previous");
            return (global as any).mongoose.connection;
        } else {
            const conString = process.env.MONGODB_URI as string;

            const promise = mongoose.connect(conString, {
                autoIndex: true,
            });

            // Store the connection
            (global as any).mongoose = {
                connection: await promise,
                promise,
            };

            console.log("Newly connected");
            return await promise;
        }
    } catch (error) {
        console.error("Error connecting to the database:", error);
        throw new Error("Database connection failed");
    }
};
