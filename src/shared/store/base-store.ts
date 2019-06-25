import * as ElectronStore from  'electron-store';

export class BaseStore {

    protected store:ElectronStore<any>;

    constructor(name:string, schema:any) {
        this.store = new ElectronStore({
            name: name,
            schema: schema
        });
    }

};