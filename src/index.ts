import { PoolConfig, escapeId, escape, format, raw } from 'mysql';
import { PoolConnection } from './PoolConnection';

export function createPool(config: PoolConfig) {
    return new PoolConnection().createPool(config)
}

export { PoolConnection, PoolConfig, escapeId, escape, format, raw };
