const redis = require("redis");
const instance = redis.createClient(process.env.REDIS_URL);

module.exports = instance;

