"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useBlockchain = void 0;
var react_1 = __importDefault(require("react"));
var core_1 = require("@hookstate/core");
var store_1 = require("../store");
var utils_1 = require("../utils");
var container_1 = require("../container");
var useBlockchain = function (_a) {
    var _b = _a === void 0 ? {} : _a, connector = _b.connector, state = _b.state;
    var bcConnector = connector !== null && connector !== void 0 ? connector : (0, container_1.getContainer)().bcConnector;
    var blockchainState = (0, core_1.useHookstate)(state !== null && state !== void 0 ? state : store_1.BlockchainState);
    var _checkLogged = function () { return __awaiter(void 0, void 0, void 0, function () {
        var isSignedIn, accountId, accountBalance;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, bcConnector.isSignedIn()];
                case 1:
                    isSignedIn = _a.sent();
                    blockchainState.wallet.merge({
                        logged: isSignedIn,
                    });
                    if (!isSignedIn) return [3 /*break*/, 3];
                    accountId = bcConnector.wallet.getAccountId();
                    blockchainState.accountId.set(accountId);
                    return [4 /*yield*/, bcConnector.wallet
                            .account()
                            .getAccountBalance()];
                case 2:
                    accountBalance = _a.sent();
                    // update wallet state
                    blockchainState.wallet.account.merge({
                        id: accountId,
                        username: (0, utils_1.parseToUsername)(accountId),
                        balance: accountBalance,
                    });
                    _a.label = 3;
                case 3:
                    blockchainState.wallet.merge({
                        loading: false,
                    });
                    return [2 /*return*/];
            }
        });
    }); };
    /////
    var connect = react_1.default.useCallback(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, bcConnector.connect()];
                case 1:
                    _a.sent();
                    blockchainState.merge({
                        loading: false,
                        ready: true,
                    });
                    return [4 /*yield*/, _checkLogged()];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); }, []);
    var signIn = react_1.default.useCallback(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!blockchainState.ready.value) return [3 /*break*/, 2];
                    store_1.BlockchainState.wallet.loading.set(true);
                    return [4 /*yield*/, bcConnector.signIn()];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    }); }, []);
    var signOut = react_1.default.useCallback(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!blockchainState.ready.value) return [3 /*break*/, 2];
                    store_1.BlockchainState.wallet.loading.set(true);
                    return [4 /*yield*/, bcConnector.signOut()];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    }); }, []);
    return {
        blockchainState: blockchainState,
        blockchainMethods: {
            connect: connect,
            signIn: signIn,
            signOut: signOut,
        },
    };
};
exports.useBlockchain = useBlockchain;
