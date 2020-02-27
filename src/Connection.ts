import { PoolConnection } from 'mysql';

export class Connection {

    constructor(private conn: PoolConnection) {

    }

    release() {
        return this.conn.release();
    }

    query(sql: string, values: Array<any>): Promise<Array<Object>> {
        return new Promise((resolve, reject) => {
            this.conn.query(sql, values, (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    }

    beginTransaction(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.conn.beginTransaction((err) => {
                if (err) return reject(err);
                resolve();
            });
        });
    }

    commit(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.conn.commit((err) => {
                if (err) return reject(err);
                resolve();
            });
        });
    }

    rollback(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.conn.rollback((err) => {
                if (err) return reject(err);
                resolve();
            });
        });
    }
}
