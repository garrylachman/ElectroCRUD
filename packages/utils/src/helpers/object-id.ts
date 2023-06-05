/* eslint-disable unicorn/no-static-only-class */
import ArcHash from 'arc-hash';
import { stringify } from 'flatted';

export class ObjectID {
  static id(input: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return ArcHash.md5(stringify(input));
  }
}
