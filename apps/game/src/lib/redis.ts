import { Redis } from "ioredis";

const redisClientSingleton = () => {
  return new Redis({
    keyPrefix: "game:",
  });
};

declare const globalThis: {
  redisGlobal: ReturnType<typeof redisClientSingleton>;
} & typeof global;

const redisClient = globalThis.redisGlobal ?? redisClientSingleton();

export default redisClient;

if (process.env.NODE_ENV !== "production") globalThis.redisGlobal = redisClient;
