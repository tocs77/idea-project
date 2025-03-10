import { cloneDeep } from 'lodash';

type ReplaceFn = ({ path, key, value }: { path: string; key: string; value: Value }) => Value;
type Value = Object | number | string | boolean | null | undefined | Function | Symbol | any[];

const recursion = ({
  input,
  replaceFn,
  seen,
  pathStartsWith,
  parentKey,
}: { input: Value; replaceFn: ReplaceFn; seen: WeakSet<any>; pathStartsWith: string; parentKey: string }): Value => {
  if (['function', 'symbol', 'function'].includes(typeof input) && input !== null) {
    if (seen.has(input)) {
      return '!!!Circular Reference!!!';
    } else {
      seen.add(input);
    }
  }
  const result = replaceFn({ path: pathStartsWith.replace(/\.$/, ''), key: parentKey, value: input });
  if (!result) return result;

  if (Array.isArray(result)) {
    return result.map((item, index) =>
      recursion({
        input: item,
        replaceFn,
        seen,
        pathStartsWith: `${pathStartsWith}[${index}]`,
        parentKey: index.toString(),
      }),
    );
  }
  if (typeof result === 'object' && result !== null) {
    return Object.fromEntries(
      Object.entries(result).map(([key, value]) => [
        key,
        recursion({ input: value, replaceFn, seen, pathStartsWith: `${pathStartsWith}.${key}`, parentKey: key }),
      ]),
    );
  }
  return result;
};

export const deepMap = <T = Value>(input: Value, replaceFn: ReplaceFn): T => {
  const seen = new WeakSet();
  const mappedObject = recursion({ input, replaceFn, seen, pathStartsWith: '', parentKey: '' });
  const cloneMappedObject = cloneDeep(mappedObject);
  return cloneMappedObject as T;
};
