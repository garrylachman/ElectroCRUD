/**
 * Interface represent a view filter
 */
export interface IViewFilter {
    /**
     * Filter name
     */
    name: string;
    /**
     * Filter icon
     */
    icon?: string;
    /**
     * Filter icon
     */
    color?: string;
    /**
     * Array of where clauses
     */
    where: IViewFilterWhere[];
}

/**
 * Interface represent a view filter where clauses
 */
export interface IViewFilterWhere {
    /**
     * Uniq UUID, internal use in form validator
     */
    uuid: string;
    /**
     * Column name
     */
    column: string;
    /**
     * The oprator to use, definded in IViewFilterWhereOpr
     */
    opr: ViewFilterWhereOpr;
    /**
     * The column value
     */
    value: any;
    /**
     * In case of multiple where clauses use OR and AND
     */
    or: boolean;
}



/**
 * Enum represent a view filter where clause operator
 */
export enum ViewFilterWhereOpr {
    /**
     * Equal to
     */
    EQ = "=",
    /**
     * Grater then
     */
    GT = ">",
    /**
     * Less then
     */
    LT = "<",
    /**
     * Like 
     */
    LIKE = "LIKE"
}