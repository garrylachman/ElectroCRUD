import { BaseStore } from './base.store';
import { IView } from '../interfaces/views.interface';
import { IAccount } from '../interfaces/accounts.interface';

const CONST_NAME = "views";

export class ViewsStore extends BaseStore {

    constructor() {
        super(CONST_NAME);
    }

    public all(account:IAccount): IView[] {
        return this.
            _all<IView>()
            .filter((view:IView) => view.account == account.id);
    }

    public get(id: number): IView {
        let views: IView[] = this._all<IView>();
        for (let i=0; i <= views.length; i++) {
            if (views[i].id == id)   {
                return views[i];
            }
        }
    }

    public add(data: IView): void {
        data.id = this.lastId<IView>();
        data.modify_date = new Date().toISOString();
        ++data.id; // increment the last id
        let views = this._all();
        views.push(data);
        this.store.set(CONST_NAME, views);
    }

    public update(data: IView): void {
        if (!data.id) {
            throw new Error('View ID missing');
        }

        // update the modify date
        data.modify_date = new Date().toISOString()

        let views = this
            ._all<IView>()
            .map((view:IView) => {
                if (view.id == data.id) {
                    return data;
                }
                return view;
            });
        this.store.set(CONST_NAME, views);
    }

    public delete(id: number): void {
        let views = this
            ._all<IView>()
            .filter((view:IView) => view.id != id);
        this.store.set(CONST_NAME, views);
    }
}