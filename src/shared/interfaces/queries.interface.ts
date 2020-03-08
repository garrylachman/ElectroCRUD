/**
 * Interface represent a custom query
 */
export interface IQuery {
    /**
     * Query id
     */
    id?: number;
    /**
     * Account id
     */
    account: number;
    /**
     * Query name
     */
    name: string;
    /**
     * Query
     */
    query: string;
    /**
     * Last modification date
     */
    modify_date?: string;
    /**
     * Creation date
     */
    creation_date?: string;
}