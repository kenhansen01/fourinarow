export function curry(fn: any, ...curryArgs: any[]) {
  let args = Array.prototype.slice.call(curryArgs, 1);

  return function () {
    return fn.apply(this, args.concat(
      Array.prototype.slice.call(arguments, 0)));
  };
}