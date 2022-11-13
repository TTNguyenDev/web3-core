export * from "./cache";
export function debounce(func, timeout) {
    var _this = this;
    if (timeout === void 0) { timeout = 300; }
    var timer;
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        clearTimeout(timer);
        timer = setTimeout(function () {
            // @ts-ignore
            func.apply(_this, args);
        }, timeout);
    };
}
export function parseToUsername(accountId) {
    return accountId === null || accountId === void 0 ? void 0 : accountId.replace(".testnet", "").replace(".near", "");
}
