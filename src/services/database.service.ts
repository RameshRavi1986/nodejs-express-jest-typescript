import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";
import {collections} from "./db";

export async function connectToDatabase () {
    dotenv.config();
    const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DB_CONN_STRING || "");

    await client.connect();

    const db: mongoDB.Db = client.db(process.env.DB_NAME);

    const usersCollection: mongoDB.Collection = db.collection(process.env.LOGIN_COLLECTION_NAME || "");

    collections.users = usersCollection;

    console.info(`Successfully connected to database: ${db.databaseName} and collection: ${usersCollection.collectionName}`);
}