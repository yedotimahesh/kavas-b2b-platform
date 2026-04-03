const Redis = require("ioredis");

let redis;

if (process.env.REDIS_URL) {
  // 🌐 Production (Upstash)
  redis = new Redis(process.env.REDIS_URL, {
    tls: {}
  });
} else {
  // 💻 Local (Docker)
  redis = new Redis({
    host: "127.0.0.1",
    port: 6379
  });
}

redis.on("connect", () => {
  console.log("✅ Redis connected");
});

redis.on("error", (err) => {
  console.error("❌ Redis ERROR:", err.message);
});

module.exports = { redis };