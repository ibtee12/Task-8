import { MongoClient } from "mongodb";

/**
 * Cached MongoDB connection.
 *
 * In development, Next.js hot-reloads modules which would otherwise open a
 * new connection on every change and exhaust the connection pool. We cache
 * the client promise on the global object so a single client is reused.
 *
 * The connection is established lazily (on first getMongoClient/getDb call)
 * so that merely importing this module never opens a socket — which keeps
 * `next build` working without a live database.
 */
const dbName = process.env.MONGODB_DB_NAME || "inkwell";

function createClientPromise() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error(
      "Missing MONGODB_URI environment variable. Add it to .env.local — see .env.example."
    );
  }
  return new MongoClient(uri).connect();
}

function getClientPromise() {
  if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromise) {
      global._mongoClientPromise = createClientPromise();
    }
    return global._mongoClientPromise;
  }
  if (!global._mongoClientPromiseProd) {
    global._mongoClientPromiseProd = createClientPromise();
  }
  return global._mongoClientPromiseProd;
}

/** Resolve to the connected MongoClient. */
export async function getMongoClient() {
  return getClientPromise();
}

/** Resolve to the application database (Db instance). */
export async function getDb() {
  const client = await getClientPromise();
  return client.db(dbName);
}

export { dbName };
