"use strict";
function curry(fn) {
    var curryArgs = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        curryArgs[_i - 1] = arguments[_i];
    }
    var args = Array.prototype.slice.call(curryArgs, 1);
    return function () {
        return fn.apply(this, args.concat(Array.prototype.slice.call(arguments, 0)));
    };
}
exports.curry = curry;
//# sourceMappingURL=curry.js.map