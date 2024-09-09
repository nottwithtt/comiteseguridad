import mongoose from "mongoose";

const url =
  "mongodb+srv://nottwithtt:JErZUZrWNjZKSFnl@cluster0.cs9td.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

class Database {
  private static instance: Database;

  private constructor() {}

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  public connect() {
    mongoose
      .connect(url)
      .then(() => {
        console.log("Database connection successful");
      })
      .catch((err: Error) => {
        console.error("Database connection error:", err.message);
      });
  }
}

export { Database };
