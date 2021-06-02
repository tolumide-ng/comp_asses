export interface DirtyObjDef {
    [key: string]: null | number | string | Object;
}

export interface CleanObjDef {
    [key: string]: number | string | Object;
}
