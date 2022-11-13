"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.NearConnector = void 0;
var bn_js_1 = require("bn.js");
var near_api_js_1 = require("near-api-js");
var constants_1 = require("../../constants");
near_api_js_1.WalletConnection.prototype._completeSignInWithAccessKey = function () {
    return __awaiter(this, void 0, void 0, function () {
        var currentUrl, contractId, publicKey, allKeys, accountId, authData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    currentUrl = new URL(window.location.href);
                    contractId = currentUrl.searchParams.get("contract_id") || "";
                    if (contractId !== this._near.config.contractId)
                        return [2 /*return*/];
                    publicKey = currentUrl.searchParams.get("public_key") || "";
                    allKeys = (currentUrl.searchParams.get("all_keys") || "").split(",");
                    accountId = currentUrl.searchParams.get("account_id") || "";
                    if (!accountId) return [3 /*break*/, 3];
                    authData = {
                        accountId: accountId,
                        allKeys: allKeys,
                    };
                    window.localStorage.setItem(this._authDataKey, JSON.stringify(authData));
                    if (!publicKey) return [3 /*break*/, 2];
                    return [4 /*yield*/, this._moveKeyFromTempToPermanent(accountId, publicKey)];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2:
                    this._authData = authData;
                    _a.label = 3;
                case 3:
                    currentUrl.searchParams.delete("public_key");
                    currentUrl.searchParams.delete("all_keys");
                    currentUrl.searchParams.delete("account_id");
                    currentUrl.searchParams.delete("meta");
                    currentUrl.searchParams.delete("transactionHashes");
                    window.history.replaceState({}, document.title, currentUrl.toString());
                    return [2 /*return*/];
            }
        });
    });
};
var NUM_BLOCKS_NON_ARCHIVAL = 4 * 12 * 3600;
var NearConnector = /** @class */ (function () {
    function NearConnector(config) {
        this._config = config;
    }
    Object.defineProperty(NearConnector.prototype, "config", {
        get: function () {
            return this._config;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(NearConnector.prototype, "conn", {
        get: function () {
            if (!this._conn)
                throw new Error("".concat(this.constructor.name, ": conn not initialize"));
            return this._conn;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(NearConnector.prototype, "wallet", {
        get: function () {
            if (!this._wallet)
                throw new Error("".concat(this.constructor.name, ": wallet not initialize"));
            return this._wallet;
        },
        enumerable: false,
        configurable: true
    });
    NearConnector.prototype.connect = function () {
        return __awaiter(this, void 0, void 0, function () {
            var keyStore, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        keyStore = new near_api_js_1.keyStores.BrowserLocalStorageKeyStore(window.localStorage, this.config.contractId);
                        _a = this;
                        return [4 /*yield*/, (0, near_api_js_1.connect)(__assign(__assign({}, this._config), { keyStore: keyStore }))];
                    case 1:
                        _a._conn = _b.sent();
                        this._wallet = new near_api_js_1.WalletConnection(this.conn, this.config.contractId);
                        this._archivalConnection = near_api_js_1.Connection.fromConfig({
                            networkId: this.config.networkId,
                            provider: {
                                type: "JsonRpcProvider",
                                args: {
                                    url: this.config.nodeUrl,
                                },
                            },
                            signer: { type: "InMemorySigner", keyStore: keyStore },
                        });
                        return [2 /*return*/, this.conn];
                }
            });
        });
    };
    NearConnector.prototype.signIn = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.wallet.requestSignIn({
                        contractId: this.config.contractId,
                        successUrl: "".concat(location.href, "?contract_id=").concat(this.config.contractId),
                    })];
            });
        });
    };
    NearConnector.prototype.signOut = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.wallet.signOut()];
            });
        });
    };
    NearConnector.prototype.isSignedIn = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.wallet.isSignedInAsync()];
            });
        });
    };
    Object.defineProperty(NearConnector.prototype, "lastBlockHeight", {
        get: function () {
            return this._lastBlockHeight;
        },
        enumerable: false,
        configurable: true
    });
    NearConnector.prototype.updateLastBlockHeight = function () {
        return __awaiter(this, void 0, void 0, function () {
            var block;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.wallet.account().connection.provider.block({
                            finality: "optimistic",
                        })];
                    case 1:
                        block = _a.sent();
                        this._lastBlockHeight = block.header.height;
                        return [2 /*return*/];
                }
            });
        });
    };
    Object.defineProperty(NearConnector.prototype, "archivalConnection", {
        get: function () {
            return this._archivalConnection;
        },
        enumerable: false,
        configurable: true
    });
    NearConnector.prototype.getBlock = function (payload) {
        return __awaiter(this, void 0, void 0, function () {
            var blockId, methodName, args, connection, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        blockId = payload.blockId, methodName = payload.methodName, args = payload.args;
                        // @ts-ignore
                        this.wallet.account().validateArgs(args || {});
                        connection = blockId + NUM_BLOCKS_NON_ARCHIVAL < this._lastBlockHeight
                            ? this.archivalConnection
                            : this.wallet.account().connection;
                        return [4 /*yield*/, connection.provider.query({
                                request_type: "call_function",
                                block_id: blockId,
                                // @ts-ignore
                                account_id: process.env.NEXT_PUBLIC_NEAR_CONTRACT_NAME,
                                method_name: methodName,
                                args_base64: new Buffer(JSON.stringify(args), "utf8").toString("base64"),
                            })];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, (res.result &&
                                res.result.length > 0 &&
                                JSON.parse(Buffer.from(res.result).toString()))];
                }
            });
        });
    };
    NearConnector.prototype.callViewMethod = function (payload) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                try {
                    return [2 /*return*/, this.wallet.account().viewFunctionV2(__assign(__assign({}, payload), { contractId: (_a = payload.contractId) !== null && _a !== void 0 ? _a : this.config.contractId }))];
                }
                catch (error) {
                    console.log({ payload: payload });
                }
                return [2 /*return*/];
            });
        });
    };
    NearConnector.prototype.callChangeMethod = function (payload) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                try {
                    return [2 /*return*/, this.wallet.account().functionCall(__assign(__assign({}, payload), { contractId: (_a = payload.contractId) !== null && _a !== void 0 ? _a : this.config.contractId }))];
                }
                catch (error) {
                    console.log({ payload: payload });
                }
                return [2 /*return*/];
            });
        });
    };
    NearConnector.prototype.transaction = function (payload) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var walletMeta, walletCallbackUrl, returnError, actions;
            return __generator(this, function (_b) {
                walletMeta = payload.walletMeta, walletCallbackUrl = payload.walletCallbackUrl, returnError = payload.returnError;
                actions = payload.actions.map(function (_a) {
                    var methodName = _a.methodName, body = _a.args, _b = _a.gas, gas = _b === void 0 ? constants_1.NearTransactionConfig.defaultGas : _b, _c = _a.deposit, deposit = _c === void 0 ? "0" : _c;
                    return near_api_js_1.transactions.functionCall(methodName, body, new bn_js_1.BN(gas), new bn_js_1.BN(deposit));
                });
                // @ts-ignore
                return [2 /*return*/, this.wallet.account().signAndSendTransaction({
                        receiverId: (_a = payload.contractId) !== null && _a !== void 0 ? _a : this.config.contractId,
                        actions: actions,
                        walletMeta: walletMeta,
                        walletCallbackUrl: walletCallbackUrl,
                        returnError: returnError,
                    })];
            });
        });
    };
    return NearConnector;
}());
exports.NearConnector = NearConnector;
