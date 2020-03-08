import { BaseStore } from './base.store';
import { IQuery } from '../interfaces/queries.interface';
import { IAccount } from '../interfaces/accounts.interface';

const CONST_NAME = "queries";

export class QueriesStore extends BaseStore {

    constructor() {
        super(CONST_NAME);
    }

    public all(account:IAccount): IQuery[] {
        return this.
            _all<IQuery>()
            .filter((item:IQuery) => item.account == account.id);
    }

    public get(id: number): IQuery {
        let queries: IQuery[] = this._all<IQuery>();
        for (let i=0; i <= queries.length; i++) {
            if (queries[i].id == id)   {
                return queries[i];
            }
        }
    }

    public add(data: IQuery): void {
        data.id = this.lastId<IQuery>();
        data.modify_date = new Date().toISOString();
        ++data.id; // increment the last id
        let queries = this._all();
        queries.push(data);
        this.store.set(CONST_NAME, queries);
    }

    public update(data: IQuery): void {
        if (!data.id) {
            throw new Error('Query ID missing');
        }

        // update the modify date
        data.modify_date = new Date().toISOString()

        let queries = this
            ._all<IQuery>()
            .map((item:IQuery) => {
                if (item.id == data.id) {
                    return data;
                }
                return item;
            });
        this.store.set(CONST_NAME, queries);
    }

    public delete(id: number): void {
        let queries = this
            ._all<IQuery>()
            .filter((item:IQuery) => item.id != id);
        this.store.set(CONST_NAME, queries);
    }
}