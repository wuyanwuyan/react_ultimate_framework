module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const koaRouter = __webpack_require__(6);
let router = new koaRouter();

console.log("require index router2222222!");

router.get('/fake', async ctx => {

    console.log("fake ctx :", ctx.url);
    ctx.type = 'html';
    ctx.body = "11fake ff ll222l";
});

module.exports = router;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("koa");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("koa-bodyparser");

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var serverEntry = function (expressDevMiddleware, expressHotMiddleware) {

    const Koa = __webpack_require__(3);
    const fs = __webpack_require__(1);
    const bodyParser = __webpack_require__(4);

    const app = new Koa();

    // error handle
    app.use(async function (ctx, next) {
        try {
            await next();
        } catch (e) {
            app.emit('error', e, ctx);
        }
    });

    if (true) {
        app.use(expressDevMiddleware);
        app.use(expressHotMiddleware);
    }

    app.use(bodyParser());

    var indexRoute = __webpack_require__(0);
    app.use(indexRoute.routes());

    app.use(async ctx => {
        ctx.redirect("/");
    });

    const port = __webpack_require__.i({"NODE_ENV":"development"}).PORT || 8087;

    var server = __webpack_require__(2).createServer(app.callback());

    server.listen(port, function (err) {
        if (err) {
            console.log(err);
            return;
        }
        console.log(`Listening at http://localhost:${port}`);
    });

    return server;
};

if (false) {
    serverEntry();
}

module.exports = serverEntry;

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("koa-router");

/***/ })
/******/ ]);
//# sourceMappingURL=server.js.map