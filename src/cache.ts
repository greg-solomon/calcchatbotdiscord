import redis from 'redis';

const redisClient = redis.createClient();

redisClient.on('error', (err) => console.error(err.message));

export default redisClient;