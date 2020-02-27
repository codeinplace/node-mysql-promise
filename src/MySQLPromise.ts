import { PoolConfig, createPool, Pool, MysqlError, PoolConnection } from 'mysql';
import { Connection } from './Connection';

export class MySQLPromise {
    
    pool: Pool;

    createPool(config: PoolConfig) {
        this.pool = createPool(config)
        return this;
    }

    async query(sql: string, values: any) {
        const conn = await this.getConnection();
        return conn.query(sql, values);
    }

    getConnection(): Promise<Connection> {
        return new Promise((resolve, reject) => {
            this.pool.getConnection((err: MysqlError, conn: PoolConnection) => {
                if (err) return reject(err);
                resolve(new Connection(conn));
            });
        });
    }
}
