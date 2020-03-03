/**
 * Interface represent a view widget
 */
export interface IWidget {
    /**
     * Widget title
     */
    name: string;
    /**
     * Column to run the funcation on
     */
    column: string;
    /**
     * Is the column distinct
     */
    distinct: boolean;
    /**
     * Array of where clauses
     */
    where?: IWidgetWhere[];
    /**
     * The aggrate function to use
     */
    function: WidgetFunction;
    /**
     * Widget color
     */
    color?: string;
    /**
     * Widget icon
     */
    icon?: string;
    /**
     * Last result handler, here we store the result from database
     */
    lastResult?: number;
}

/**
 * Interface represent a view widget where clauses
 */
export interface IWidgetWhere {
    /**
     * Uniq UUID, internal use in form validator
     */
    uuid: string;
    /**
     * Column name or '*'
     */
    column: string;
    /**
     * The oprator to use, definded in IWidgetWhereOpr
     */
    opr: WidgetWhereOpr;
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
 * Enum represent a view widget where clause operator
 */
export enum WidgetWhereOpr {
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

/**
 * Enum represent a view widget aggragate function to apply
 */
export enum WidgetFunction {
    /**
     * Count function - count(*)
     */
    COUNT = "COUNT",
    /**
     * Sum function - sum(*)
     */
    SUM = "SUM",
    /**
     * Average function - avg(x)
     */
    AVG = "AVG",
    /**
     * Mininum function - min(x)
     */
    MIN = "MIN",
    /**
     * Maximum function - max(x)
     */
    MAX = "MAX"
}