module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1614484976834, function(require, module, exports) {

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./lib/router"), exports);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsK0NBQTZCIn0=
}, function(modId) {var map = {"./lib/router":1614484976835}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1614484976835, function(require, module, exports) {

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Router = void 0;
var logger_1 = __importDefault(require("./logger"));
var navigator_1 = __importDefault(require("./navigator"));
var route_1 = __importDefault(require("./route"));
var route_matcher_1 = __importDefault(require("./route-matcher"));
var utils_1 = require("./utils");
var Router = /** @class */ (function () {
    function Router() {
        this.routes = {};
        this.routeMatchers = [];
    }
    Router.prototype.register = function (option) {
        var tiers = option.route
            .replace(/^\//, '')
            .replace(/$\//, '')
            .split('/')
            .slice(0, -1)
            .join('.');
        utils_1.setter(this.routes, tiers, new route_1.default({ routeUrl: option.route }));
        if (option.path)
            this.routeMatchers.push(new route_matcher_1.default(option.path, option.route));
    };
    Router.prototype.batchRegister = function (options) {
        var _this = this;
        options.forEach(function (option) { return _this.register(option); });
    };
    Router.prototype.getRoutes = function () {
        return this.routes;
    };
    Router.prototype.gotoPage = function (pathOrRoute, query) {
        var matchResult = this.routeMatchers
            .map(function (routeMatcher) { return routeMatcher.match(pathOrRoute); })
            .filter(function (result) { return !!result; });
        logger_1.default.debug('route match result:', { matchResult: matchResult, pathOrRoute: pathOrRoute });
        // 优先使用第一个匹配
        var route = matchResult[0];
        if (matchResult[0])
            return navigator_1.default.gotoPage(route.route, Object.assign({}, route.query, query));
        // 否则，尝试直接跳转
        return navigator_1.default.gotoPage(pathOrRoute, query);
    };
    return Router;
}());
exports.Router = Router;
exports.default = Router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9yb3V0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsb0RBQThCO0FBQzlCLDBEQUFvQztBQUNwQyxrREFBNEI7QUFDNUIsa0VBQTJDO0FBQzNDLGlDQUFpQztBQU9qQztJQUFBO1FBQ1UsV0FBTSxHQUE0QixFQUFFLENBQUM7UUFDckMsa0JBQWEsR0FBd0IsRUFBRSxDQUFDO0lBeUNsRCxDQUFDO0lBdkNRLHlCQUFRLEdBQWYsVUFBZ0IsTUFBc0I7UUFDcEMsSUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUs7YUFDdkIsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUM7YUFDbEIsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUM7YUFDbEIsS0FBSyxDQUFDLEdBQUcsQ0FBQzthQUNWLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7YUFDWixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFYixjQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsSUFBSSxlQUFLLENBQUMsRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNsRSxJQUFJLE1BQU0sQ0FBQyxJQUFJO1lBQ2IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSx1QkFBWSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDekUsQ0FBQztJQUVNLDhCQUFhLEdBQXBCLFVBQXFCLE9BQU87UUFBNUIsaUJBRUM7UUFEQyxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQUMsTUFBTSxJQUFLLE9BQUEsS0FBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBckIsQ0FBcUIsQ0FBQyxDQUFDO0lBQ3JELENBQUM7SUFFTSwwQkFBUyxHQUFoQjtRQUNFLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUNyQixDQUFDO0lBRU0seUJBQVEsR0FBZixVQUFnQixXQUFXLEVBQUUsS0FBSztRQUNoQyxJQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsYUFBYTthQUNuQyxHQUFHLENBQUMsVUFBQyxZQUFZLElBQUssT0FBQSxZQUFZLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxFQUEvQixDQUErQixDQUFDO2FBQ3RELE1BQU0sQ0FBQyxVQUFDLE1BQU0sSUFBSyxPQUFBLENBQUMsQ0FBQyxNQUFNLEVBQVIsQ0FBUSxDQUFDLENBQUM7UUFFaEMsZ0JBQU0sQ0FBQyxLQUFLLENBQUMscUJBQXFCLEVBQUUsRUFBRSxXQUFXLGFBQUEsRUFBRSxXQUFXLGFBQUEsRUFBRSxDQUFDLENBQUM7UUFFbEUsWUFBWTtRQUNaLElBQU0sS0FBSyxHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM3QixJQUFJLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDaEIsT0FBTyxtQkFBUyxDQUFDLFFBQVEsQ0FDdkIsS0FBSyxDQUFDLEtBQUssRUFDWCxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxLQUFLLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUN0QyxDQUFDO1FBRUosWUFBWTtRQUNaLE9BQU8sbUJBQVMsQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFDSCxhQUFDO0FBQUQsQ0FBQyxBQTNDRCxJQTJDQztBQTNDWSx3QkFBTTtBQTZDbkIsa0JBQWUsTUFBTSxDQUFDIn0=
}, function(modId) { var map = {"./logger":1614484976836,"./navigator":1614484976837,"./route":1614484976839,"./route-matcher":1614484976840,"./utils":1614484976838}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1614484976836, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var mini_logger_1 = require("@jerryc/mini-logger");
var logger = new mini_logger_1.Logger({ prefix: 'wxapp-router' });
exports.default = logger;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9sb2dnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtREFBNkM7QUFFN0MsSUFBTSxNQUFNLEdBQVEsSUFBSSxvQkFBTSxDQUFDLEVBQUUsTUFBTSxFQUFFLGNBQWMsRUFBRSxDQUFDLENBQUM7QUFFM0Qsa0JBQWUsTUFBTSxDQUFDIn0=
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1614484976837, function(require, module, exports) {

var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Navigator = exports.PathType = void 0;
var logger_1 = __importDefault(require("./logger"));
var utils_1 = require("./utils");
var paramsParsing = function (commonParams) {
    var path = commonParams.path, query = commonParams.query;
    var routerPath = typeof path === 'string' ? { path: path, type: PathType.NORMAL } : path;
    var urlQuery = utils_1.obj2Params(query);
    var urlQueryStr = urlQuery ? "?" + urlQuery : '';
    var toUrl = "" + routerPath.path + urlQueryStr;
    return {
        routerPath: routerPath,
        toUrl: toUrl,
    };
};
var PathType;
(function (PathType) {
    // 普通页面
    PathType["NORMAL"] = "normal";
    // 微信小程序原生tabBar页面
    PathType["TAB"] = "tab";
})(PathType = exports.PathType || (exports.PathType = {}));
var Navigator = /** @class */ (function () {
    function Navigator() {
        // 锁
        this.isClick = true;
        // 页面栈最大深度
        this.maxDeep = 10;
    }
    // 智能跳转应用内某页面
    Navigator.prototype.gotoPage = function () {
        var arg = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            arg[_i] = arguments[_i];
        }
        var path = arg[0], query = arg[1];
        logger_1.default.debug('call gotoPage', { path: path, query: query });
        var routerPath = paramsParsing({ path: path, query: query }).routerPath;
        if (!routerPath)
            return logger_1.default.log('gotoPage:fail', "\u9875\u9762\u8DEF\u5F84\u4E0D\u5B58\u5728 " + path);
        // 页面为tab页面
        if (routerPath.type === PathType.TAB) {
            return this.switchTab.apply(this, arg);
        }
        // 页面栈已达上限
        var pageStack = getCurrentPages();
        var pageStackLength = pageStack.length;
        var curDelta = this.findPageInHistory(routerPath.path);
        if (pageStack.length >= this.maxDeep) {
            // 当前页面：在页面栈中
            if (curDelta > -1)
                return this.navigateBack({ delta: pageStackLength - curDelta });
            // 当前页面：不在页面栈中
            return this.redirectTo.apply(this, arg);
        }
        return this.navigateTo.apply(this, arg);
    };
    Navigator.prototype.navigateTo = function (path, query) {
        var _this = this;
        if (!this.isClick)
            return;
        this.isClick = false;
        var toUrl = paramsParsing({ path: path, query: query }).toUrl;
        wx.navigateTo({
            url: toUrl,
            success: function () {
                logger_1.default.log('navigateTo:success', 'navigateTo成功', { toUrl: toUrl });
            },
            fail: function () {
                var arg = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    arg[_i] = arguments[_i];
                }
                logger_1.default.log('navigateTo:fail', 'navigateTo失败', arg);
            },
            complete: function () {
                _this.isClick = true;
            },
        });
    };
    Navigator.prototype.switchTab = function (path, query) {
        var _this = this;
        if (!this.isClick)
            return;
        this.isClick = false;
        var toUrl = paramsParsing({ path: path, query: query }).toUrl;
        wx.switchTab({
            url: toUrl,
            success: function () {
                logger_1.default.log('switchTab:success', 'switchTab成功', { toUrl: toUrl });
            },
            fail: function () {
                var arg = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    arg[_i] = arguments[_i];
                }
                logger_1.default.log('switchTab:fail', 'switchTab失败', arg);
            },
            complete: function () {
                _this.isClick = true;
            },
        });
    };
    Navigator.prototype.redirectTo = function (path, query) {
        var _this = this;
        if (!this.isClick)
            return;
        this.isClick = false;
        var toUrl = paramsParsing({ path: path, query: query }).toUrl;
        wx.redirectTo({
            url: toUrl,
            success: function () {
                logger_1.default.log('redirectTo:success', 'redirectTo成功', { toUrl: toUrl });
            },
            fail: function () {
                var arg = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    arg[_i] = arguments[_i];
                }
                logger_1.default.log('redirectTo:fail', 'redirectTo失败', arg);
            },
            complete: function () {
                _this.isClick = true;
            },
        });
    };
    Navigator.prototype.navigateBack = function (query, option) {
        var _this = this;
        if (!this.isClick)
            return;
        this.isClick = false;
        if (option === null || option === void 0 ? void 0 : option.setData) {
            var pageStack = getCurrentPages();
            var backPage = pageStack[pageStack.length - 1 - (query.delta || 1)];
            backPage === null || backPage === void 0 ? void 0 : backPage.setData(option === null || option === void 0 ? void 0 : option.setData);
        }
        wx.navigateBack({
            delta: query.delta,
            success: function () {
                var _a;
                var arg = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    arg[_i] = arguments[_i];
                }
                return (_a = query === null || query === void 0 ? void 0 : query.success) === null || _a === void 0 ? void 0 : _a.call.apply(_a, __spreadArray([query], arg));
            },
            fail: function () {
                var _a;
                var arg = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    arg[_i] = arguments[_i];
                }
                logger_1.default.log('navigateBack:fail', 'navigateBack失败', arg);
                (_a = query === null || query === void 0 ? void 0 : query.fail) === null || _a === void 0 ? void 0 : _a.call.apply(_a, __spreadArray([query], arg));
            },
            complete: function () {
                var _a;
                var arg = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    arg[_i] = arguments[_i];
                }
                _this.isClick = true;
                (_a = query === null || query === void 0 ? void 0 : query.complete) === null || _a === void 0 ? void 0 : _a.call.apply(_a, __spreadArray([query], arg));
            },
        });
    };
    Navigator.prototype.findPageInHistory = function (path) {
        var pageStack = getCurrentPages();
        var reg = /^\//;
        var delta = -1;
        // eslint-disable-next-line functional/no-loop-statement
        for (var i = 0; i < pageStack.length; i++) {
            var myRoute = pageStack[i].route;
            if (myRoute &&
                path &&
                myRoute.replace(reg, '') === path.replace(reg, '')) {
                delta = i + 1; // 目标页在栈中的位置
                break;
            }
        }
        return delta;
    };
    return Navigator;
}());
exports.Navigator = Navigator;
var navigator = new Navigator();
exports.default = navigator;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2aWdhdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9uYXZpZ2F0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxvREFBOEI7QUFDOUIsaUNBQXFDO0FBT3JDLElBQU0sYUFBYSxHQUFHLFVBQUMsWUFBMEI7SUFDdkMsSUFBQSxJQUFJLEdBQVksWUFBWSxLQUF4QixFQUFFLEtBQUssR0FBSyxZQUFZLE1BQWpCLENBQWtCO0lBQ3JDLElBQU0sVUFBVSxHQUNkLE9BQU8sSUFBSSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLE1BQUEsRUFBRSxJQUFJLEVBQUUsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFFcEUsSUFBTSxRQUFRLEdBQUcsa0JBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNuQyxJQUFNLFdBQVcsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLE1BQUksUUFBVSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDbkQsSUFBTSxLQUFLLEdBQUcsS0FBRyxVQUFVLENBQUMsSUFBSSxHQUFHLFdBQWEsQ0FBQztJQUVqRCxPQUFPO1FBQ0wsVUFBVSxZQUFBO1FBQ1YsS0FBSyxPQUFBO0tBQ04sQ0FBQztBQUNKLENBQUMsQ0FBQztBQUVGLElBQVksUUFLWDtBQUxELFdBQVksUUFBUTtJQUNsQixPQUFPO0lBQ1AsNkJBQWlCLENBQUE7SUFDakIsa0JBQWtCO0lBQ2xCLHVCQUFXLENBQUE7QUFDYixDQUFDLEVBTFcsUUFBUSxHQUFSLGdCQUFRLEtBQVIsZ0JBQVEsUUFLbkI7QUFFRDtJQUFBO1FBQ0UsSUFBSTtRQUNJLFlBQU8sR0FBRyxJQUFJLENBQUM7UUFFdkIsVUFBVTtRQUNGLFlBQU8sR0FBRyxFQUFFLENBQUM7SUE0SXZCLENBQUM7SUExSUMsYUFBYTtJQUNOLDRCQUFRLEdBQWY7UUFBZ0IsYUFBcUQ7YUFBckQs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
}, function(modId) { var map = {"./logger":1614484976836,"./utils":1614484976838}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1614484976838, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.obj2Params = exports.setter = void 0;
var setter = function (obj, key, value) {
    var keys = key.split('.');
    var pres = keys.slice(0, -1);
    var last = keys[keys.length - 1];
    var deepObj = keys.length === 1
        ? obj
        : pres.reduce(function (curObj, curKey) {
            if (!curObj[curKey])
                curObj[curKey] = {};
            return curObj[curKey];
        }, obj);
    deepObj[last] = value;
    return obj;
};
exports.setter = setter;
var obj2Params = function (obj, encode) {
    if (obj === void 0) { obj = {}; }
    if (encode === void 0) { encode = false; }
    var result = [];
    Object.keys(obj).forEach(function (key) {
        return result.push(key + "=" + (encode ? encodeURIComponent(obj[key]) : obj[key]));
    });
    return result.join('&');
};
exports.obj2Params = obj2Params;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFPLElBQU0sTUFBTSxHQUFHLFVBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxLQUFLO0lBQ3BDLElBQU0sSUFBSSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDNUIsSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMvQixJQUFNLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztJQUNuQyxJQUFNLE9BQU8sR0FDWCxJQUFJLENBQUMsTUFBTSxLQUFLLENBQUM7UUFDZixDQUFDLENBQUMsR0FBRztRQUNMLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQUMsTUFBTSxFQUFFLE1BQU07WUFDekIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7Z0JBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUN6QyxPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN4QixDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDZCxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDO0lBQ3RCLE9BQU8sR0FBRyxDQUFDO0FBQ2IsQ0FBQyxDQUFDO0FBYlcsUUFBQSxNQUFNLFVBYWpCO0FBRUssSUFBTSxVQUFVLEdBQUcsVUFBQyxHQUFRLEVBQUUsTUFBYztJQUF4QixvQkFBQSxFQUFBLFFBQVE7SUFBRSx1QkFBQSxFQUFBLGNBQWM7SUFDakQsSUFBTSxNQUFNLEdBQWEsRUFBRSxDQUFDO0lBQzVCLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUMsR0FBRztRQUMzQixPQUFBLE1BQU0sQ0FBQyxJQUFJLENBQUksR0FBRyxVQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUMsa0JBQWtCLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBRSxDQUFDO0lBQXpFLENBQXlFLENBQzFFLENBQUM7SUFFRixPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDMUIsQ0FBQyxDQUFDO0FBUFcsUUFBQSxVQUFVLGNBT3JCIn0=
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1614484976839, function(require, module, exports) {

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Route = void 0;
var navigator_1 = __importDefault(require("./navigator"));
var Route = /** @class */ (function () {
    function Route(_a) {
        var routeUrl = _a.routeUrl;
        this.routeUrl = routeUrl;
    }
    Route.prototype.go = function (query) {
        return navigator_1.default.gotoPage(this.routeUrl, query);
    };
    Route.prototype.navigateTo = function (query) {
        return navigator_1.default.navigateTo(this.routeUrl, query);
    };
    Route.prototype.redirectTo = function (query) {
        return navigator_1.default.redirectTo(this.routeUrl, query);
    };
    Route.prototype.switchTab = function (query) {
        return navigator_1.default.switchTab(this.routeUrl, query);
    };
    return Route;
}());
exports.Route = Route;
exports.default = Route;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL3JvdXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDBEQUFvQztBQUVwQztJQUdFLGVBQVksRUFBWTtZQUFWLFFBQVEsY0FBQTtRQUNwQixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztJQUMzQixDQUFDO0lBRU0sa0JBQUUsR0FBVCxVQUFVLEtBQUs7UUFDYixPQUFPLG1CQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUVNLDBCQUFVLEdBQWpCLFVBQWtCLEtBQUs7UUFDckIsT0FBTyxtQkFBUyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3BELENBQUM7SUFFTSwwQkFBVSxHQUFqQixVQUFrQixLQUFLO1FBQ3JCLE9BQU8sbUJBQVMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBRU0seUJBQVMsR0FBaEIsVUFBaUIsS0FBSztRQUNwQixPQUFPLG1CQUFTLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDbkQsQ0FBQztJQUNILFlBQUM7QUFBRCxDQUFDLEFBdEJELElBc0JDO0FBdEJZLHNCQUFLO0FBd0JsQixrQkFBZSxLQUFLLENBQUMifQ==
}, function(modId) { var map = {"./navigator":1614484976837}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1614484976840, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var path_to_regexp_1 = require("path-to-regexp");
var RouteMatcher = /** @class */ (function () {
    function RouteMatcher(path, route) {
        this.keys = [];
        // 匹配正则
        this.regex = null;
        // 真实路径
        this.route = null;
        this.regex = path_to_regexp_1.pathToRegexp(path, this.keys);
        this.route = route;
    }
    RouteMatcher.prototype.match = function (path) {
        var result = path.match(this.regex);
        if (!result)
            return undefined;
        var route = this.route;
        var query = {};
        // 若存在路由参数，解释
        if (this.keys[0]) {
            this.keys.forEach(function (key, index) {
                query[key.name] = result[index + 1];
            });
        }
        return {
            route: route,
            query: query,
        };
    };
    return RouteMatcher;
}());
exports.default = RouteMatcher;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUtbWF0Y2hlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvcm91dGUtbWF0Y2hlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGlEQUE4QztBQUU5QztJQVNFLHNCQUFZLElBQUksRUFBRSxLQUFLO1FBUmYsU0FBSSxHQUFHLEVBQUUsQ0FBQztRQUVsQixPQUFPO1FBQ0EsVUFBSyxHQUFHLElBQUksQ0FBQztRQUVwQixPQUFPO1FBQ0EsVUFBSyxHQUFHLElBQUksQ0FBQztRQUdsQixJQUFJLENBQUMsS0FBSyxHQUFHLDZCQUFZLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMzQyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztJQUNyQixDQUFDO0lBRUQsNEJBQUssR0FBTCxVQUFNLElBQVk7UUFDaEIsSUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdEMsSUFBSSxDQUFDLE1BQU07WUFBRSxPQUFPLFNBQVMsQ0FBQztRQUU5QixJQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3pCLElBQU0sS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUVqQixhQUFhO1FBQ2IsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ2hCLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQUMsR0FBRyxFQUFFLEtBQUs7Z0JBQzNCLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsTUFBTSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztZQUN0QyxDQUFDLENBQUMsQ0FBQztTQUNKO1FBRUQsT0FBTztZQUNMLEtBQUssT0FBQTtZQUNMLEtBQUssT0FBQTtTQUNOLENBQUM7SUFDSixDQUFDO0lBQ0gsbUJBQUM7QUFBRCxDQUFDLEFBakNELElBaUNDIn0=
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1614484976834);
})()
//# sourceMappingURL=index.js.map