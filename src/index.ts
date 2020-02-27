import { ConnectionConfig, escapeId, escape, format, raw } from 'mysql';
import { MySQLPromise } from './MySQLPromise';

export function createPool(config: ConnectionConfig) {
    return new MySQLPromise().createPool(config)
}

export { escapeId, escape, format, raw };
