import { MongoClient } from 'mongodb';
const uri = process.env.MONGO_DB_URI; // Add your MongoDB URI in an environment variable
const options = {};

if (!uri) {
    throw new Error('Please add your MongoDB URI to .env.local');
}
let client = new MongoClient(uri, options);;
let clientPromise;

if (process.env.NODE_ENV === 'development') {
    if (!global._mongoClientPromise) {
        global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
} else {
    clientPromise = client.connect();
}

export default clientPromise;

