/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/BackgroungManager.ts":
/*!**********************************!*\
  !*** ./src/BackgroungManager.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"BackgroundManager\": () => (/* binding */ BackgroundManager)\n/* harmony export */ });\n/* harmony import */ var _Line__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Line */ \"./src/Line.ts\");\n/* harmony import */ var _star__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./star */ \"./src/star.ts\");\n\r\n\r\nvar BackgroundManager = /** @class */ (function () {\r\n    function BackgroundManager(linesNumber, linesSpawnPoint, speed, framesDiff) {\r\n        var _this = this;\r\n        this.state = 0;\r\n        this.lines = [];\r\n        this.currentlinesSpeed = 1;\r\n        this.starsTab = [];\r\n        this.init = function () {\r\n            _this.createLines();\r\n            _this.createStars();\r\n        };\r\n        this.update = function (c) {\r\n            _this.updateLines(c);\r\n            _this.drawStars(c);\r\n        };\r\n        this.createLines = function () {\r\n            _this.botBounty = _this.linesSpawnPoint * Math.pow(_this.normalLinesSpeed, _this.linesNumber * _this.framesDiff);\r\n            _this.headerline = new _Line__WEBPACK_IMPORTED_MODULE_0__.Line(_this.linesSpawnPoint, _this.normalLinesSpeed, _this.linesSpawnPoint, _this.botBounty);\r\n            for (var i = 0; i < _this.linesNumber; i++) {\r\n                _this.lines.push(new _Line__WEBPACK_IMPORTED_MODULE_0__.Line(_this.linesSpawnPoint * Math.pow(_this.normalLinesSpeed, i * _this.framesDiff), _this.normalLinesSpeed, _this.linesSpawnPoint, _this.botBounty));\r\n            }\r\n        };\r\n        this.createStars = function () {\r\n            var wd = innerWidth / 2.5;\r\n            var w = -innerWidth / 2.5;\r\n            for (var i = 0, r = 54; i < 7; i++, r -= 18) {\r\n                _this.starsTab[i] = [];\r\n                var h = _this.botBounty;\r\n                var j = 0;\r\n                while (h > _this.linesSpawnPoint) {\r\n                    var s = new _star__WEBPACK_IMPORTED_MODULE_1__.Star(w / 2 - 7 + j * r, h);\r\n                    _this.starsTab[i].push(s);\r\n                    h -= 55;\r\n                    j++;\r\n                }\r\n                if (i == 0 || i == 5)\r\n                    w += 1.5 * wd;\r\n                else\r\n                    w += wd;\r\n            }\r\n        };\r\n        this.drawStars = function (c) {\r\n            _this.starsTab.forEach(function (el) {\r\n                el.forEach(function (elm) {\r\n                    elm.draw(c);\r\n                });\r\n            });\r\n        };\r\n        this.updateLines = function (c) {\r\n            _this.headerline.draw(c);\r\n            if (_this.state == 1)\r\n                _this.frame++;\r\n            for (var i = 0; i < _this.lines.length; i++) {\r\n                var l = _this.lines[i];\r\n                c.fillStyle = \"rgb(56,104,144)\";\r\n                c.fillRect(l.x, l.y, l.width, l.height);\r\n                l.y *= _this.currentlinesSpeed;\r\n                switch (_this.state) {\r\n                    case 1:\r\n                        if (l.y >= _this.botBounty) {\r\n                            l.y = _this.linesSpawnPoint;\r\n                        }\r\n                        break;\r\n                    case 2:\r\n                        if (l.y <= _this.linesSpawnPoint)\r\n                            l.y = _this.botBounty;\r\n                        break;\r\n                    case 3:\r\n                        if (l.y >= _this.botBounty) {\r\n                            l.y = _this.linesSpawnPoint;\r\n                        }\r\n                        break;\r\n                    case 4:\r\n                        if (l.y >= _this.botBounty) {\r\n                            l.y = _this.linesSpawnPoint;\r\n                        }\r\n                        break;\r\n                }\r\n            }\r\n            switch (_this.state) {\r\n                case 2:\r\n                    _this.currentlinesSpeed -= 0.0005;\r\n                    if (_this.currentlinesSpeed <= _this.normalLinesSpeed - _this.speedLimit) {\r\n                        console.log('back');\r\n                        console.log(Date.now() - _this.time);\r\n                        _this.state = 3;\r\n                        _this.currentlinesSpeed = 1 / _this.currentlinesSpeed;\r\n                        // this.botBounty = this.linesSpawnPoint * Math.pow(this.normalLinesSpeed, this.linesNumber * this.framesDiff)\r\n                    }\r\n                    // this.botBounty = this.linesSpawnPoint * Math.pow(1 / this.currentlinesSpeed, this.linesNumber * this.framesDiff)\r\n                    break;\r\n                case 3:\r\n                    _this.currentlinesSpeed -= 0.0005;\r\n                    if (_this.currentlinesSpeed <= _this.normalLinesSpeed) {\r\n                        console.log('normal');\r\n                        console.log(Date.now() - _this.time);\r\n                        _this.state = 1;\r\n                        _this.currentlinesSpeed = _this.normalLinesSpeed;\r\n                    }\r\n                    break;\r\n                case 4:\r\n                    _this.currentlinesSpeed -= _this.linesSlow;\r\n                    _this.framesCounter--;\r\n                    if (_this.currentlinesSpeed <= 1) {\r\n                        _this.lines = [];\r\n                        _this.createLines();\r\n                        _this.state = 0;\r\n                        _this.currentlinesSpeed = 1;\r\n                        console.log(_this.framesCounter);\r\n                    }\r\n                    break;\r\n            }\r\n            if (_this.frame == _this.framesDiff)\r\n                _this.frame = 0;\r\n        };\r\n        this.linesNumber = linesNumber;\r\n        this.linesSpawnPoint = linesSpawnPoint;\r\n        this.normalLinesSpeed = speed;\r\n        this.framesDiff = framesDiff;\r\n        this.speedLimit = (this.normalLinesSpeed - 1) * 6;\r\n        this.frame = 0;\r\n        console.log(this.speedLimit);\r\n        this.init();\r\n        document.addEventListener(\"keydown\", function (event) {\r\n            // console.log(event.keyCode)\r\n            if (event.isComposing || event.keyCode === 83) {\r\n                _this.state = 1;\r\n                _this.currentlinesSpeed = _this.normalLinesSpeed;\r\n            }\r\n            else if (event.isComposing || event.keyCode === 68) {\r\n                _this.state = 0;\r\n                console.log(_this.frame);\r\n                _this.currentlinesSpeed = 1;\r\n            }\r\n            else if (event.isComposing || event.keyCode === 65) {\r\n                _this.state = 2;\r\n                _this.time = Date.now();\r\n                _this.currentlinesSpeed = 1;\r\n            }\r\n            else if (event.isComposing || event.keyCode === 70) {\r\n                _this.state = 4;\r\n                _this.linesSlow = 0.0001;\r\n                _this.framesCounter = 2 * framesDiff - framesDiff;\r\n                _this.linesSlow = (_this.normalLinesSpeed - 1) / _this.framesCounter;\r\n                console.log(_this.frame, _this.framesCounter);\r\n                // this.time = Date.now()\r\n                _this.currentlinesSpeed = _this.normalLinesSpeed;\r\n                // this.currentlinesSpeed = this.normalLinesSpeed\r\n            }\r\n        });\r\n    }\r\n    return BackgroundManager;\r\n}());\r\n\r\n\n\n//# sourceURL=webpack://beamrider/./src/BackgroungManager.ts?");

/***/ }),

/***/ "./src/Line.ts":
/*!*********************!*\
  !*** ./src/Line.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Line\": () => (/* binding */ Line)\n/* harmony export */ });\nvar Line = /** @class */ (function () {\r\n    function Line(y, speed, spawnPos, botBounty) {\r\n        var _this = this;\r\n        this.x = 0;\r\n        this.width = innerWidth;\r\n        this.height = 10;\r\n        this.draw = function (c) {\r\n            c.fillStyle = \"rgb(56,104,144)\";\r\n            c.fillRect(_this.x, _this.y, _this.width, _this.height);\r\n        };\r\n        this.update = function (c) {\r\n            _this.draw(c);\r\n            _this.y *= _this.speed;\r\n            if (_this.y >= _this.botBounty)\r\n                _this.y = _this.spawnPos;\r\n        };\r\n        this.y = y;\r\n        this.speed = speed;\r\n        this.spawnPos = spawnPos;\r\n        this.botBounty = botBounty;\r\n    }\r\n    return Line;\r\n}());\r\n\r\n\n\n//# sourceURL=webpack://beamrider/./src/Line.ts?");

/***/ }),

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Game\": () => (/* binding */ Game)\n/* harmony export */ });\n/* harmony import */ var _BackgroungManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BackgroungManager */ \"./src/BackgroungManager.ts\");\n\r\nvar Game = /** @class */ (function () {\r\n    function Game() {\r\n        var _this = this;\r\n        this.fps = 0;\r\n        this.animate = function () {\r\n            requestAnimationFrame(_this.animate);\r\n            _this.c.clearRect(0, 0, innerWidth, innerHeight);\r\n            _this.fps++;\r\n            _this.bgManager.update(_this.c);\r\n        };\r\n        this.createFPS = function () {\r\n            _this.fpsEl = document.querySelector('p');\r\n            setInterval(function () {\r\n                _this.fpsEl.innerText = _this.fps.toString();\r\n                _this.fps = 0;\r\n            }, 1000);\r\n        };\r\n        Game.canvas = document.querySelector('canvas');\r\n        Game.canvas.width = window.innerWidth;\r\n        Game.canvas.height = window.innerHeight - 4;\r\n        this.c = Game.canvas.getContext('2d');\r\n        this.bgManager = new _BackgroungManager__WEBPACK_IMPORTED_MODULE_0__.BackgroundManager(6, 115, 1.01, 27);\r\n        this.createFPS();\r\n        this.animate();\r\n    }\r\n    return Game;\r\n}());\r\n\r\nnew Game();\r\n\n\n//# sourceURL=webpack://beamrider/./src/app.ts?");

/***/ }),

/***/ "./src/star.ts":
/*!*********************!*\
  !*** ./src/star.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Star\": () => (/* binding */ Star)\n/* harmony export */ });\nvar Star = /** @class */ (function () {\r\n    function Star(x, y) {\r\n        var _this = this;\r\n        this.draw = function (c) {\r\n            c.fillStyle = \"rgb(56,104,144)\";\r\n            c.fillRect(_this.x, _this.y, 14, 5);\r\n        };\r\n        this.update = function (c) {\r\n            // this.draw(c)\r\n            // this.y *= this.speed\r\n            // if (this.y >= this.botBounty)\r\n            //     this.y = this.spawnPos\r\n        };\r\n        this.x = x;\r\n        this.y = y;\r\n    }\r\n    return Star;\r\n}());\r\n\r\n\n\n//# sourceURL=webpack://beamrider/./src/star.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/app.ts");
/******/ 	
/******/ })()
;