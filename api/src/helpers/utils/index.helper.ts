import { CleanObjDef, DirtyObjDef } from "./index.model";

export class Utils {
    static removeNull(dirtyObj: DirtyObjDef): CleanObjDef {
        const cleanObj: CleanObjDef = {};

        Array.from(Object.keys(dirtyObj)).forEach((key) => {
            const currentValue = dirtyObj[key];

            if (currentValue) {
                cleanObj[key] = currentValue;
            }
        });

        return cleanObj;
    }
}
