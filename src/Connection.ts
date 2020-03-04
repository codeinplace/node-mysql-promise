import { PoolConnection } from 'mysql';

export class Connection {

    constructor(private conn: PoolConnection) { }

    release() {
        return this.conn.release();
    }

    query<T>(sql: string, values: Array<any>): Promise<T[]> {
        return new Promise((resolve, reject) => {
            this.conn.query(sql, values, (err, results) => {
                if (err) {
                    if (this.conn) this.release();
                    return reject(err);
                }
                this.release();
                resolve(results);
            });
        });
    }

    beginTransaction(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.conn.beginTransaction((err) => {
                if (err) {
                    if (this.conn) this.release();
                    return reject(err);
                }
                resolve();
            });
        });
    }

    commit(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.conn.commit((err) => {
                if (err) {
                    if (this.conn) this.release();
                    return reject(err);
                }
                this.release();
                resolve();
            });
        });
    }

    rollback(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.conn.rollback((err) => {
                if (err) {
                    if (this.conn) this.release();
                    return reject(err);
                }
                this.release();
                resolve();
            });
        });
    }
}
