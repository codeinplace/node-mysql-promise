import {
    PoolConfig,
    createPool,
    Pool,
    MysqlError,
    PoolConnection as MysqlPoolConnection
} from "mysql";
import { Connection } from "./Connection";

export class PoolConnection {
    pool: Pool;

    createPool(config: PoolConfig) {
        this.pool = createPool(config);
        return this;
    }

    async query<T>(sql: string, values: any): Promise<T[]> {
        const conn = await this.getConnection();
        return conn.query<T>(sql, values);
    }

    getConnection(): Promise<Connection> {
        return new Promise((resolve, reject) => {
            this.pool.getConnection((err: MysqlError, conn: MysqlPoolConnection) => {
                if (err) return reject(err);
                resolve(new Connection(conn));
            });
        });
    }
}
