const redis = require("redis");
const instance = redis.createClient({
    host: '172.17.0.2',
    port: 6379
});



module.exports = instance;

