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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"BackgroundManager\": () => (/* binding */ BackgroundManager)\n/* harmony export */ });\n/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app */ \"./src/app.ts\");\n/* harmony import */ var _Line__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Line */ \"./src/Line.ts\");\n/* harmony import */ var _Star__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Star */ \"./src/Star.ts\");\n\r\n\r\n// import { Game } from './app'\r\n\r\nvar BackgroundManager = /** @class */ (function () {\r\n    function BackgroundManager(linesNumber, linesSpawnPoint, speed, framesDiff, startPlayer) {\r\n        var _this = this;\r\n        this.lines = [];\r\n        this.currentlinesSpeed = 1;\r\n        this.starsTab = [];\r\n        this.pause = function () {\r\n            _this.currentlinesSpeed = 1;\r\n        };\r\n        this.unpause = function () {\r\n            _this.currentlinesSpeed = _this.normalLinesSpeed;\r\n        };\r\n        this.start = function () {\r\n            _this.frame = 0;\r\n            _this.currentlinesSpeed = 1 / _this.normalLinesSpeed;\r\n        };\r\n        this.stop = function () {\r\n            _this.linesSlow = 0.0001;\r\n            _this.framesCounter = 2 * _this.framesDiff - _this.frame;\r\n            _this.linesSlow = (_this.normalLinesSpeed - 1) / _this.framesCounter;\r\n            console.log(_this.frame, _this.framesCounter);\r\n            // this.time = Date.now()\r\n            _this.currentlinesSpeed = _this.normalLinesSpeed;\r\n            // this.currentlinesSpeed = this.normalLinesSpeed\r\n        };\r\n        this.init = function () {\r\n            _this.createLines();\r\n            _this.createStars();\r\n        };\r\n        this.update = function (c) {\r\n            _this.updateLines(c);\r\n            _this.drawStars(c);\r\n        };\r\n        this.createLines = function () {\r\n            _this.botBounty = _this.linesSpawnPoint * Math.pow(_this.normalLinesSpeed, _this.linesNumber * _this.framesDiff);\r\n            _this.headerline = new _Line__WEBPACK_IMPORTED_MODULE_1__.Line(_this.linesSpawnPoint, _this.normalLinesSpeed, _this.linesSpawnPoint, _this.botBounty);\r\n            for (var i = 0; i < _this.linesNumber; i++) {\r\n                _this.lines.push(new _Line__WEBPACK_IMPORTED_MODULE_1__.Line(_this.linesSpawnPoint * Math.pow(_this.normalLinesSpeed, i * _this.framesDiff), _this.normalLinesSpeed, _this.linesSpawnPoint, _this.botBounty));\r\n            }\r\n        };\r\n        this.createStars = function () {\r\n            var wd = innerWidth / 2.5;\r\n            var w = -innerWidth / 2.5;\r\n            var gx = 1;\r\n            for (var i = 0, r = 54, g = -3; i < 7; i++, r -= 18) {\r\n                _this.starsTab[i] = [];\r\n                var h = _this.botBounty;\r\n                var j = 0;\r\n                while (h + g * j > _this.linesSpawnPoint) {\r\n                    var s = new _Star__WEBPACK_IMPORTED_MODULE_2__.Star(w / 2 - 7 + j * r, h + g * j);\r\n                    _this.starsTab[i].push(s);\r\n                    h -= 52;\r\n                    j++;\r\n                }\r\n                if (i == 0 || i == 5)\r\n                    w += 1.5 * wd;\r\n                else\r\n                    w += wd;\r\n                g += gx;\r\n                if (g == 0)\r\n                    gx = -1;\r\n            }\r\n        };\r\n        this.drawStars = function (c) {\r\n            _this.starsTab.forEach(function (el) {\r\n                el.forEach(function (elm) {\r\n                    elm.draw(c);\r\n                });\r\n            });\r\n        };\r\n        this.updateLines = function (c) {\r\n            _this.headerline.draw(c);\r\n            _this.frame++;\r\n            for (var i = 0; i < _this.lines.length; i++) {\r\n                var l = _this.lines[i];\r\n                c.fillStyle = \"rgb(56,104,144)\";\r\n                c.fillRect(l.x, l.y, l.width, l.height);\r\n                l.y *= _this.currentlinesSpeed;\r\n                switch (_app__WEBPACK_IMPORTED_MODULE_0__.Game.state) {\r\n                    case 1:\r\n                        if (l.y >= _this.botBounty) {\r\n                            l.y = _this.linesSpawnPoint;\r\n                        }\r\n                        break;\r\n                    case 2:\r\n                        if (l.y <= _this.linesSpawnPoint)\r\n                            l.y = _this.botBounty;\r\n                        break;\r\n                    case 3:\r\n                        if (l.y >= _this.botBounty) {\r\n                            l.y = _this.linesSpawnPoint;\r\n                        }\r\n                        break;\r\n                    case 4:\r\n                        if (l.y >= _this.botBounty) {\r\n                            l.y = _this.linesSpawnPoint;\r\n                        }\r\n                        break;\r\n                }\r\n            }\r\n            switch (_app__WEBPACK_IMPORTED_MODULE_0__.Game.state) {\r\n                case 2:\r\n                    _this.currentlinesSpeed *= 0.9995;\r\n                    console.log(_this.frame);\r\n                    if (_this.frame == 3 * _this.framesDiff) {\r\n                        _this.frame = 0;\r\n                        // console.log('back')\r\n                        // console.log(Date.now() - this.time)\r\n                        _app__WEBPACK_IMPORTED_MODULE_0__.Game.state = 3;\r\n                        _this.currentlinesSpeed = 1 / _this.currentlinesSpeed;\r\n                    }\r\n                    break;\r\n                case 3:\r\n                    _this.currentlinesSpeed *= 0.9995;\r\n                    if (_this.frame == 3 * _this.framesDiff) {\r\n                        // console.log('normal')\r\n                        // console.log(Date.now() - this.time)\r\n                        _app__WEBPACK_IMPORTED_MODULE_0__.Game.state = 1;\r\n                        _this.startPlayer();\r\n                        _this.currentlinesSpeed = _this.normalLinesSpeed;\r\n                    }\r\n                    break;\r\n                case 4:\r\n                    _this.currentlinesSpeed -= _this.linesSlow;\r\n                    _this.framesCounter--;\r\n                    if (_this.currentlinesSpeed <= 1) {\r\n                        _this.lines = [];\r\n                        _this.createLines();\r\n                        _app__WEBPACK_IMPORTED_MODULE_0__.Game.state = 0;\r\n                        _this.currentlinesSpeed = 1;\r\n                        console.log(_this.framesCounter);\r\n                    }\r\n                    break;\r\n            }\r\n            if (_app__WEBPACK_IMPORTED_MODULE_0__.Game.state == 1 && _this.frame == _this.framesDiff)\r\n                _this.frame = 0;\r\n        };\r\n        this.linesNumber = linesNumber;\r\n        this.linesSpawnPoint = linesSpawnPoint;\r\n        this.normalLinesSpeed = speed;\r\n        this.framesDiff = framesDiff;\r\n        this.speedLimit = (this.normalLinesSpeed - 1) * 6;\r\n        this.frame = 0;\r\n        this.startPlayer = function () { startPlayer(); };\r\n        console.log(this.speedLimit);\r\n        this.init();\r\n    }\r\n    return BackgroundManager;\r\n}());\r\n\r\n\n\n//# sourceURL=webpack://beamrider/./src/BackgroungManager.ts?");

/***/ }),

/***/ "./src/Bullet.ts":
/*!***********************!*\
  !*** ./src/Bullet.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Bullet\": () => (/* binding */ Bullet)\n/* harmony export */ });\nvar Bullet = /** @class */ (function () {\r\n    function Bullet(posX, y, type) {\r\n        var _this = this;\r\n        this.speed = 20;\r\n        this.state = 1;\r\n        this.width = innerWidth;\r\n        this.height = 10;\r\n        this.bounty = 150;\r\n        this.draw = function (c) {\r\n            c.drawImage(_this.image, _this.x, _this.y);\r\n        };\r\n        this.update = function (c) {\r\n            _this.draw(c);\r\n            _this.y -= _this.speed;\r\n            _this.x += _this.r;\r\n            if (_this.type == 1) {\r\n                if (_this.y < 180)\r\n                    _this.state = 0;\r\n            }\r\n            else if (_this.type == 2) {\r\n                if (_this.state == 1 && _this.y < 400) {\r\n                    _this.image.src = \"./gfx/bullets/player2/bullet2-2.PNG\";\r\n                    _this.x += 9.5;\r\n                    _this.state = 2;\r\n                }\r\n                else if (_this.state == 2 && _this.y < 200) {\r\n                    _this.image.src = \"./gfx/bullets/player2/bullet2-3.PNG\";\r\n                    _this.x += 11.5;\r\n                    _this.state = 3;\r\n                }\r\n                if (_this.y < 70)\r\n                    _this.state = 0;\r\n            }\r\n        };\r\n        this.image = new Image;\r\n        this.type = type;\r\n        var wd = innerWidth / 5;\r\n        this.r = posX * -6.5;\r\n        if (type == 1) {\r\n            this.image.src = \"./gfx/bullets/player1/bullet1.PNG\";\r\n            this.y = y - 35;\r\n            this.x = this.width = innerWidth / 2 + posX * wd + posX * 12 - 45.5;\r\n        }\r\n        else {\r\n            this.image.src = \"./gfx/bullets/player2/bullet2.PNG\";\r\n            this.y = y - 27;\r\n            this.x = this.width = innerWidth / 2 + posX * wd + posX * 12 - 25.5;\r\n        }\r\n    }\r\n    return Bullet;\r\n}());\r\n\r\n\n\n//# sourceURL=webpack://beamrider/./src/Bullet.ts?");

/***/ }),

/***/ "./src/Line.ts":
/*!*********************!*\
  !*** ./src/Line.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Line\": () => (/* binding */ Line)\n/* harmony export */ });\nvar Line = /** @class */ (function () {\r\n    function Line(y, speed, spawnPos, botBounty) {\r\n        var _this = this;\r\n        this.x = 0;\r\n        this.width = innerWidth;\r\n        this.height = 10;\r\n        this.draw = function (c) {\r\n            c.fillStyle = \"rgb(56,104,144)\";\r\n            c.fillRect(_this.x, _this.y, _this.width, _this.height);\r\n        };\r\n        this.update = function (c) {\r\n            _this.draw(c);\r\n            _this.y *= _this.speed;\r\n            if (_this.y >= _this.botBounty)\r\n                _this.y = _this.spawnPos;\r\n        };\r\n        this.y = y;\r\n        this.speed = speed;\r\n        this.spawnPos = spawnPos;\r\n        this.botBounty = botBounty;\r\n    }\r\n    return Line;\r\n}());\r\n\r\n\n\n//# sourceURL=webpack://beamrider/./src/Line.ts?");

/***/ }),

/***/ "./src/PlayerController.ts":
/*!*********************************!*\
  !*** ./src/PlayerController.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"PlayerController\": () => (/* binding */ PlayerController)\n/* harmony export */ });\n/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app */ \"./src/app.ts\");\n/* harmony import */ var _Bullet__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Bullet */ \"./src/Bullet.ts\");\n\r\n\r\nvar PlayerController = /** @class */ (function () {\r\n    function PlayerController(h) {\r\n        var _this = this;\r\n        this.color = 1;\r\n        this.frame = 0;\r\n        this.speed = 26;\r\n        this.xwidth = 0;\r\n        this.bullet = null;\r\n        this.draw = function (c) {\r\n            c.drawImage(_this.image, _this.width, _this.height);\r\n        };\r\n        this.update = function (c) {\r\n            _this.draw(c);\r\n            if (_app__WEBPACK_IMPORTED_MODULE_0__.Game.state != 1) {\r\n                _this.frame++;\r\n                if (_this.frame == 20) {\r\n                    _this.changePlayerColor();\r\n                    _this.frame = 0;\r\n                }\r\n            }\r\n            else if (_app__WEBPACK_IMPORTED_MODULE_0__.Game.state == 1) {\r\n                _this.width += _this.xwidth;\r\n                if (_this.xwidth < 0 && _this.width <= innerWidth / 2 + _this.pos * _this.wd - _this.image.width / 2 + _this.pos * 12) {\r\n                    _this.width = innerWidth / 2 + _this.pos * _this.wd - _this.image.width / 2 + _this.pos * 12;\r\n                    _this.xwidth = 0;\r\n                    _this.canMove = true;\r\n                }\r\n                else if (_this.xwidth > 0 && _this.width >= innerWidth / 2 + _this.pos * _this.wd - _this.image.width / 2 + _this.pos * 12) {\r\n                    _this.width = innerWidth / 2 + _this.pos * _this.wd - _this.image.width / 2 + _this.pos * 12;\r\n                    _this.xwidth = 0;\r\n                    _this.canMove = true;\r\n                }\r\n            }\r\n            _this.drawBullet(c);\r\n        };\r\n        this.drawBullet = function (c) {\r\n            if (_this.bullet == null)\r\n                return;\r\n            _this.bullet.update(c);\r\n            if (_this.bullet.state == 0)\r\n                _this.bullet = null;\r\n        };\r\n        this.shoot = function (type) {\r\n            if (_this.bullet == null) {\r\n                if (type == 2 && _this.ammo > 0) {\r\n                    console.log(_this.ammo);\r\n                    _this.bullet = new _Bullet__WEBPACK_IMPORTED_MODULE_1__.Bullet(_this.pos, _this.height, 2);\r\n                    _this.ammo--;\r\n                }\r\n                else if (type == 1)\r\n                    _this.bullet = new _Bullet__WEBPACK_IMPORTED_MODULE_1__.Bullet(_this.pos, _this.height, 1);\r\n            }\r\n        };\r\n        this.start = function () {\r\n            _this.canMove = true;\r\n            _this.image.src = \"./gfx/player/player1.PNG\";\r\n            _this.color = 1;\r\n        };\r\n        this.changePlayerColor = function () {\r\n            if (_this.color == 1) {\r\n                _this.image.src = \"./gfx/player/player2.PNG\";\r\n                _this.color = 2;\r\n            }\r\n            else {\r\n                _this.image.src = \"./gfx/player/player1.PNG\";\r\n                _this.color = 1;\r\n            }\r\n        };\r\n        this.height = h - 20;\r\n        this.wd = innerWidth / 5;\r\n        this.pos = 0;\r\n        this.ammo = 3;\r\n        this.hp = 2;\r\n        this.image = new Image;\r\n        this.image.src = \"./gfx/player/player1.PNG\";\r\n        // console.log(this.image.width)\r\n        this.width = innerWidth / 2 + this.pos * this.wd - 151 / 2 + this.pos * 10;\r\n        document.addEventListener(\"keydown\", function (event) {\r\n            console.log(event.keyCode);\r\n            if (_this.canMove) {\r\n                if (event.isComposing || event.keyCode === 37) {\r\n                    if (_this.pos > -2) {\r\n                        _this.pos--;\r\n                        _this.xwidth = -_this.speed;\r\n                    }\r\n                }\r\n                else if (event.isComposing || event.keyCode === 39) {\r\n                    if (_this.pos < 2) {\r\n                        _this.pos++;\r\n                        _this.xwidth = _this.speed;\r\n                    }\r\n                }\r\n                else if (event.isComposing || event.keyCode === 32) {\r\n                    if (_this.xwidth == 0)\r\n                        _this.shoot(1);\r\n                }\r\n                else if (event.isComposing || event.keyCode === 38) {\r\n                    if (_this.xwidth == 0)\r\n                        _this.shoot(2);\r\n                }\r\n                // else if (event.isComposing || event.keyCode === 86) {\r\n                //     this.hp--\r\n                // }\r\n                // this.width = innerWidth / 2 + this.pos * this.wd - this.image.width / 2 + this.pos * 12\r\n            }\r\n        });\r\n    }\r\n    return PlayerController;\r\n}());\r\n\r\n\n\n//# sourceURL=webpack://beamrider/./src/PlayerController.ts?");

/***/ }),

/***/ "./src/Star.ts":
/*!*********************!*\
  !*** ./src/Star.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Star\": () => (/* binding */ Star)\n/* harmony export */ });\nvar Star = /** @class */ (function () {\r\n    function Star(x, y) {\r\n        var _this = this;\r\n        this.draw = function (c) {\r\n            c.fillStyle = \"rgb(56,104,144)\";\r\n            c.fillRect(_this.x, _this.y, 14, 5);\r\n        };\r\n        this.update = function (c) {\r\n            // this.draw(c)\r\n            // this.y *= this.speed\r\n            // if (this.y >= this.botBounty)\r\n            //     this.y = this.spawnPos\r\n        };\r\n        this.x = x;\r\n        this.y = y;\r\n    }\r\n    return Star;\r\n}());\r\n\r\n\n\n//# sourceURL=webpack://beamrider/./src/Star.ts?");

/***/ }),

/***/ "./src/Ui.ts":
/*!*******************!*\
  !*** ./src/Ui.ts ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Ui\": () => (/* binding */ Ui)\n/* harmony export */ });\nvar Ui = /** @class */ (function () {\r\n    function Ui() {\r\n        var _this = this;\r\n        this.update = function (c, ammo, hp) {\r\n            _this.c = c;\r\n            _this.drawAmmo(ammo);\r\n            _this.drawHp(hp);\r\n        };\r\n        this.drawAmmo = function (ammo) {\r\n            _this.c.fillStyle = \"purple\";\r\n            var x = _this.w - 70;\r\n            for (var i = 0; i < ammo; i++, x += 70)\r\n                _this.c.fillRect(x - i * 150, 50, 35, 35);\r\n        };\r\n        this.drawHp = function (hp) {\r\n            var image = new Image;\r\n            image.src = \"./gfx/hp/1.PNG\";\r\n            var x = 100;\r\n            for (var i = 0; i < hp; i++, x += 65)\r\n                _this.c.drawImage(image, x, _this.h - 50);\r\n        };\r\n        this.w = innerWidth;\r\n        this.h = innerHeight;\r\n    }\r\n    return Ui;\r\n}());\r\n\r\n\n\n//# sourceURL=webpack://beamrider/./src/Ui.ts?");

/***/ }),

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Game\": () => (/* binding */ Game)\n/* harmony export */ });\n/* harmony import */ var _PlayerController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PlayerController */ \"./src/PlayerController.ts\");\n/* harmony import */ var _BackgroungManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BackgroungManager */ \"./src/BackgroungManager.ts\");\n/* harmony import */ var _Ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Ui */ \"./src/Ui.ts\");\n\r\n\r\n\r\nvar Game = /** @class */ (function () {\r\n    function Game() {\r\n        var _this = this;\r\n        //liczenie klatek\r\n        this.fps = 0;\r\n        this.animate = function () {\r\n            requestAnimationFrame(_this.animate);\r\n            _this.c.clearRect(0, 0, innerWidth, innerHeight);\r\n            _this.fps++;\r\n            _this.bgManager.update(_this.c);\r\n            _this.playerController.update(_this.c);\r\n            _this.ui.update(_this.c, _this.playerController.ammo, _this.playerController.hp);\r\n        };\r\n        this.onKeyDown = function (event) {\r\n            //Background \r\n            if (event.isComposing || event.keyCode === 83) {\r\n                Game.state = 1;\r\n                _this.bgManager.unpause();\r\n                _this.playerController.start();\r\n            }\r\n            else if (event.isComposing || event.keyCode === 68) {\r\n                Game.state = 0;\r\n                _this.bgManager.pause();\r\n            }\r\n            else if (event.isComposing || event.keyCode === 65) {\r\n                Game.state = 2;\r\n                _this.bgManager.start();\r\n            }\r\n            else if (event.isComposing || event.keyCode === 70) {\r\n                Game.state = 4;\r\n                _this.bgManager.stop();\r\n            }\r\n        };\r\n        this.createFPS = function () {\r\n            _this.fpsEl = document.querySelector('p');\r\n            setInterval(function () {\r\n                _this.fpsEl.innerText = _this.fps.toString();\r\n                _this.fps = 0;\r\n            }, 1000);\r\n        };\r\n        Game.canvas = document.querySelector('canvas');\r\n        Game.canvas.width = window.innerWidth;\r\n        Game.canvas.height = window.innerHeight - 4;\r\n        this.c = Game.canvas.getContext('2d');\r\n        this.playerController = new _PlayerController__WEBPACK_IMPORTED_MODULE_0__.PlayerController(630);\r\n        this.bgManager = new _BackgroungManager__WEBPACK_IMPORTED_MODULE_1__.BackgroundManager(6, 115, 1.01, 27, this.playerController.start);\r\n        this.ui = new _Ui__WEBPACK_IMPORTED_MODULE_2__.Ui();\r\n        this.createFPS();\r\n        this.animate();\r\n        document.addEventListener(\"keydown\", function (e) { _this.onKeyDown(e); });\r\n    }\r\n    Game.state = 0;\r\n    return Game;\r\n}());\r\n\r\nnew Game();\r\n\n\n//# sourceURL=webpack://beamrider/./src/app.ts?");

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
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/app.ts");
/******/ 	
/******/ })()
;