const {createClient} =require('redis');

const redisClient = createClient({
    username: 'default',
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: 'redis-14720.crce283.ap-south-1-2.ec2.cloud.redislabs.com',
        port: 14720
    }
});

module.exports=redisClient;