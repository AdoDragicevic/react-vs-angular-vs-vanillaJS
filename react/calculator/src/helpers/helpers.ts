export function getLastValAndIndxFromArr<T>(arr: T[]): [T, number] {
  const indx = arr.length - 1;
  const val = arr[indx];
  return [val, indx];
}