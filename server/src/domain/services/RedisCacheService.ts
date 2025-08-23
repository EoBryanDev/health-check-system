import Redis from "ioredis";
import { ICacheProvider } from "./interfaces/ICacheProvider";
import { env } from "../../../env";

class RedisCacheProvider implements ICacheProvider {
    private client: Redis;

    constructor() {
        this.client = new Redis({
            host: env.REDIS_HOST || "localhost",
            port: env.REDIS_PORT || 6379,
        }); // exemplo: redis://redis-hcs:6379
    }

    async get<T>(key: string): Promise<T | null> {
        const value = await this.client.get(key);
        return value ? JSON.parse(value) : null;
    }

    async set<T>(key: string, value: T, ttl?: number): Promise<void> {
        const payload = JSON.stringify(value);
        if (ttl) {
            await this.client.set(key, payload, "EX", ttl);
        } else {
            await this.client.set(key, payload);
        }
    }

    async del(key: string): Promise<void> {
        await this.client.del(key);
    }
}

export { RedisCacheProvider }