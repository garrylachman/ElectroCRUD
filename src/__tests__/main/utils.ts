import { delay } from "underscore";

export const sleepFor = (timeout: number) => new Promise( (resolve, reject) => delay(resolve, timeout));