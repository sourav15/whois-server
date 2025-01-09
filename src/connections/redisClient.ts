import { createClient } from "redis";
const redisClient = createClient({
  socket: {
    host: "redis",
    port: 6379,
  },
});

export const connectRedis = async () => {
  redisClient.on("error", (err) => {
    console.log("Redis client error", err);
    process.exit(1);
  });

  await redisClient.connect();
  console.log("Redis client connected successfully");
};

export default redisClient;
