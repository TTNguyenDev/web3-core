var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var DEFAULT_LIMIT_PER_CACHE_HIT = 5000;
export var cacheDataList = function (_a) {
    var dbClient = _a.dbClient, _b = _a.limitPerCacheHit, limitPerCacheHit = _b === void 0 ? DEFAULT_LIMIT_PER_CACHE_HIT : _b, _c = _a.firstRecordQuery, firstRecordQuery = _c === void 0 ? {
        selector: {
            id: { $exists: true },
        },
    } : _c, _d = _a.compareKey, compareKey = _d === void 0 ? "id" : _d, fetchList = _a.fetchList, _e = _a.override, override = _e === void 0 ? false : _e;
    return __awaiter(void 0, void 0, void 0, function () {
        var docs, firstRecord, currentFromIndex, isCompleted, res, firstRecordIndex, err_1;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0: return [4 /*yield*/, dbClient.find(__assign(__assign({}, firstRecordQuery), { skip: 0, limit: 1 }))];
                case 1:
                    docs = (_f.sent()).docs;
                    firstRecord = docs ? docs[0] : null;
                    currentFromIndex = 0;
                    isCompleted = false;
                    _f.label = 2;
                case 2:
                    if (!!isCompleted) return [3 /*break*/, 10];
                    _f.label = 3;
                case 3:
                    _f.trys.push([3, 8, , 9]);
                    return [4 /*yield*/, fetchList({
                            from_index: currentFromIndex,
                            limit: limitPerCacheHit,
                        })];
                case 4:
                    res = _f.sent();
                    if (res.length === 0) {
                        isCompleted = true;
                        return [3 /*break*/, 10];
                    }
                    if (!firstRecord) return [3 /*break*/, 6];
                    firstRecordIndex = res.findIndex(
                    // @ts-ignore
                    function (item) { return item[compareKey] === firstRecord[compareKey]; });
                    if (!(firstRecordIndex !== -1)) return [3 /*break*/, 6];
                    return [4 /*yield*/, dbClient.bulkDocs(res.slice(0, firstRecordIndex))];
                case 5:
                    _f.sent();
                    isCompleted = true;
                    return [3 /*break*/, 10];
                case 6: return [4 /*yield*/, dbClient.bulkDocs(res)];
                case 7:
                    _f.sent();
                    currentFromIndex += limitPerCacheHit;
                    return [3 /*break*/, 9];
                case 8:
                    err_1 = _f.sent();
                    console.error(err_1);
                    isCompleted = true;
                    return [3 /*break*/, 9];
                case 9: return [3 /*break*/, 2];
                case 10: return [2 /*return*/];
            }
        });
    });
};
