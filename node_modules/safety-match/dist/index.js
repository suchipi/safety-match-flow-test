"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.none = Symbol();
var MEMBER_TYPE = Symbol();
var MemberObjectImpl = /** @class */ (function () {
    function MemberObjectImpl(variant, data) {
        this.variant = variant;
        this.data = data;
    }
    MemberObjectImpl.prototype.match = function (casesObj) {
        var data = this.data;
        var matchingHandler = casesObj[this.variant];
        if (matchingHandler) {
            return matchingHandler(data);
        }
        else if (casesObj._) {
            return casesObj._(data);
        }
        else {
            throw new Error("Match did not handle variant: '" + this.variant + "'");
        }
    };
    return MemberObjectImpl;
}());
Object.defineProperty(MemberObjectImpl, "name", { value: "MemberObject" });
function makeTaggedUnion(defObj) {
    var matchObj = {};
    Object.keys(defObj).forEach(function (matchType) {
        var value = defObj[matchType];
        if (typeof value === "function") {
            matchObj[matchType] = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var data = value.apply(void 0, args);
                return new MemberObjectImpl(matchType, data);
            };
        }
        else {
            matchObj[matchType] = new MemberObjectImpl(matchType, undefined);
        }
    });
    return matchObj;
}
exports.makeTaggedUnion = makeTaggedUnion;
