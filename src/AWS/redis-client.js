import { createClient } from "redis";

let client;

function createRedisClient() {
  if (!client) {
    client = createClient({
      url: `redis://${process.env.REDIS_ENDPOINT}:${process.env.REDIS_PORT}`,
      // url: `redis://localhost:6379`
    });

    client.on("error", (error) => console.error("Redis Client Error", error));
  }
  return client;
}

async function ensureConnection() {
  if (!client.isOpen) {
    await client.connect();
  }
}

async function get(key) {
  await ensureConnection();
  return client.get(key);
}

async function set(key, value, expirationMode, duration) {
  await ensureConnection();
  return client.set(key, value, expirationMode, duration);
}

async function expire(key, duration) {
  await ensureConnection();
  return client.expire(key, duration);
}

export { createRedisClient, get, set, expire };
