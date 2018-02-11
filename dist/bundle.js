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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 12);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.pm = exports.dm = exports.grid = exports.debug = exports.canvasHeight = exports.canvasWidth = exports.context = exports.friction = exports.colours = undefined;

var _particleManager = __webpack_require__(13);

var _particleManager2 = _interopRequireDefault(_particleManager);

var _droneManager = __webpack_require__(14);

var _droneManager2 = _interopRequireDefault(_droneManager);

var _gameGrid = __webpack_require__(15);

var _gameGrid2 = _interopRequireDefault(_gameGrid);

var _debug = __webpack_require__(18);

var _debug2 = _interopRequireDefault(_debug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var canvas = document.getElementById('canvas');
var colours = exports.colours = {
    black: '#2a2e34',
    orange: '#cd7831',
    red: '#cd4535',
    green: '#80bf32',
    blue: '#345b77'
};
var friction = exports.friction = 0.8;
var context = exports.context = canvas.getContext('2d');
var canvasWidth = exports.canvasWidth = canvas.width = window.innerWidth;
var canvasHeight = exports.canvasHeight = canvas.height = window.innerHeight;
var debug = exports.debug = new _debug2.default();
var grid = exports.grid = new _gameGrid2.default();
var dm = exports.dm = new _droneManager2.default(canvasWidth, canvasHeight);
var pm = exports.pm = new _particleManager2.default(canvasWidth, canvasHeight);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _vector = __webpack_require__(4);

var _vector2 = _interopRequireDefault(_vector);

var _functions = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Gimbal = function () {
    function Gimbal(angleLimit, turningSpeed) {
        _classCallCheck(this, Gimbal);

        this.vector = new _vector2.default(0, 0);
        this.vector.setAngle(0);
        this.vector.setLength(5);
        this.rotation = 'right';
        this._angleLimit = angleLimit;
        this.turningSpeed = turningSpeed;
        this.lead = 0.2;
    }

    _createClass(Gimbal, [{
        key: 'trackTarget',
        value: function trackTarget(drone) {
            if (drone.scanner.hasTarget()) {
                switch (true) {
                    case (0, _functions.angleTo)(drone.angle + this.vector.getAngle(), drone.scanner.angleToTarget()) > 0.05:
                        this.rotation = 'left';
                        break;
                    case (0, _functions.angleTo)(drone.angle + this.vector.getAngle(), drone.scanner.angleToTarget()) < -0.05:
                        this.rotation = 'right';
                        break;
                    default:
                        return;
                }
            }
            this.turn();
        }
    }, {
        key: 'turn',
        value: function turn() {
            switch (true) {
                case this.rotation === 'right' && this.vector.getAngle() < this._angleLimit:
                    this.vector.setAngle(this.vector.getAngle() + this.turningSpeed);
                    break;
                case this.rotation === 'left' && this.vector.getAngle() > -this._angleLimit:
                    this.vector.setAngle(this.vector.getAngle() - this.turningSpeed);
                    break;
                case this.rotation === 'right' && this.vector.getAngle() > this._angleLimit:
                    this.rotation = 'left';
                    break;
                case this.rotation === 'left' && this.vector.getAngle() < -this._angleLimit:
                    this.rotation = 'right';
                    break;
            }
        }
    }, {
        key: 'angleLimit',
        get: function get() {
            return this._angleLimit;
        }
    }]);

    return Gimbal;
}();

exports.default = Gimbal;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isOffCanvas = isOffCanvas;
exports.returnToCanvas = returnToCanvas;
exports.distanceTo = distanceTo;
exports.angleTo = angleTo;
exports.didCollide = didCollide;
exports.randomItem = randomItem;
exports.angleBetweenRange = angleBetweenRange;

var _constants = __webpack_require__(0);

function isOffCanvas(particle) {
    return particle.position.x > _constants.canvasWidth + particle.radius || particle.position.x < 0 - particle.radius || particle.position.y > _constants.canvasHeight + particle.radius || particle.position.y < 0 - particle.radius;
}

function returnToCanvas(drone) {
    if (drone.position.x > _constants.canvasWidth) {
        drone.position.x = 0;
    }
    if (drone.position.x < 0) {
        drone.position.x = _constants.canvasWidth;
    }
    if (drone.position.y > _constants.canvasHeight) {
        drone.position.y = 0;
    }
    if (drone.position.y < 0) {
        drone.position.y = _constants.canvasHeight;
    }
}

function distanceTo(p1, p2) {
    var dx = p2.position.x - p1.position.x,
        dy = p2.position.y - p1.position.y;
    return Math.sqrt(dx * dx + dy * dy);
}

function angleTo(angleOne, angleTwo) {
    return Math.atan2(Math.sin(angleOne - angleTwo), Math.cos(angleOne - angleTwo));
}

function didCollide(p1, p2) {
    return !(p1.id === p2.id) && distanceTo(p1, p2) < p1.radius + p2.radius;
}

function randomItem(items) {
    return items[Math.floor(Math.random() * items.length)];
}

function angleBetweenRange(angleOne, angleTwo, range) {
    return angleTo(angleOne, angleTwo) <= range / 2 && angleTo(angleOne, angleTwo) >= -(range / 2);
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _functions = __webpack_require__(2);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Steering = function () {
    function Steering(turningSpeed) {
        _classCallCheck(this, Steering);

        this.turningSpeed = turningSpeed;
        this.turnAmount = 0;
        this.roaming = { callback: null, count: 0 };
        this.evading = { callback: null, count: 0 };
    }

    _createClass(Steering, [{
        key: 'turn',
        value: function turn(drone) {
            this.drone = drone;
            if (!drone.scanner.hasTarget()) {
                this.roam();
                return;
            }
            if (drone.scanner.hasTarget() && (0, _functions.distanceTo)(drone, drone.scanner.target) < 100 && !(0, _functions.angleBetweenRange)(drone, Math.PI / 2)) {
                this.evade();
                return;
            }
            switch (true) {
                case (0, _functions.angleTo)(drone.angle, drone.scanner.angleToTarget()) >= 0.6:
                    this.turnAmount = this.turningSpeed * 0.1;
                    this.turnLeft();
                    break;
                case (0, _functions.angleTo)(drone.angle, drone.scanner.angleToTarget()) >= 0.4:
                    this.turnAmount = this.turningSpeed * 0.066;
                    this.turnLeft();
                    break;
                case (0, _functions.angleTo)(drone.angle, drone.scanner.angleToTarget()) >= 0.2:
                    this.turnAmount = this.turningSpeed * 0.033;
                    this.turnLeft();
                    break;
                case (0, _functions.angleTo)(drone.angle, drone.scanner.angleToTarget()) > 0:
                    this.turnLeft((0, _functions.angleTo)(drone.angle, drone.scanner.angleToTarget()));
                    break;
                case (0, _functions.angleTo)(drone.angle, drone.scanner.angleToTarget()) <= -0.6:
                    this.turnAmount = this.turningSpeed * 0.1;
                    this.turnRight();
                    break;
                case (0, _functions.angleTo)(drone.angle, drone.scanner.angleToTarget()) <= -0.4:
                    this.turnAmount = this.turningSpeed * 0.066;
                    this.turnRight();
                    break;
                case (0, _functions.angleTo)(drone.angle, drone.scanner.angleToTarget()) <= -0.2:
                    this.turnAmount = this.turningSpeed * 0.033;
                    this.turnRight();
                    break;
                case (0, _functions.angleTo)(drone.angle, drone.scanner.angleToTarget()) < 0:
                    this.turnRight((0, _functions.angleTo)(drone.angle, drone.scanner.angleToTarget()));
                    break;
            }
        }
    }, {
        key: 'turnLeft',
        value: function turnLeft() {
            this.incrementAngle(-this.turnAmount);
        }
    }, {
        key: 'turnRight',
        value: function turnRight() {
            this.incrementAngle(this.turnAmount);
        }
    }, {
        key: 'incrementAngle',
        value: function incrementAngle(increment) {
            this.drone.angle += increment;
        }
    }, {
        key: 'roam',
        value: function roam() {
            if (this.roaming.count > 0) {
                this.turnAmount = this.turningSpeed * 0.033;
                this.roaming.callback();
                this.roaming.count--;
            } else {
                this.roaming.count = Math.floor(Math.random() * 60 + 20);
                this.roaming.callback = Math.random() > 0.5 ? this.turnRight.bind(this) : this.turnLeft.bind(this);
            }
        }
    }, {
        key: 'evade',
        value: function evade() {
            if (this.evading.count > 0) {
                this.turnAmount = this.turningSpeed * 0.1;
                this.evading.callback();
                this.evading.count--;
            } else {
                this.evading.count = Math.floor(Math.random() * 20 + 5);
                this.evading.callback = Math.random() > 0.5 ? this.turnRight.bind(this) : this.turnLeft.bind(this);
            }
        }
    }]);

    return Steering;
}();

exports.default = Steering;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _point = __webpack_require__(16);

var _point2 = _interopRequireDefault(_point);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Vector = function () {
    function Vector(x, y) {
        _classCallCheck(this, Vector);

        this._position = new _point2.default(x, y);
    }

    _createClass(Vector, [{
        key: 'setAngle',
        value: function setAngle(angle) {
            var length = this.getLength();
            this._position.x = Math.cos(angle) * length;
            this._position.y = Math.sin(angle) * length;
        }
    }, {
        key: 'getAngle',
        value: function getAngle() {
            return Math.atan2(this._position.y, this._position.x);
        }
    }, {
        key: 'setLength',
        value: function setLength(length) {
            var angle = this.getAngle();
            this._position.x = Math.cos(angle) * length;
            this._position.y = Math.sin(angle) * length;
        }
    }, {
        key: 'getLength',
        value: function getLength() {
            return Math.sqrt(this._position.x * this._position.x + this._position.y * this._position.y);
        }
    }, {
        key: 'add',
        value: function add(v2) {
            return new Vector(this._position.x + v2.x, this._position.y + v2.y);
        }
    }, {
        key: 'subtract',
        value: function subtract(v2) {
            return new Vector(this._position.x - v2.x, this._position.y - v2.y);
        }
    }, {
        key: 'multiply',
        value: function multiply(value) {
            return new Vector(this._position.x * value, this._position.y * value);
        }
    }, {
        key: 'divide',
        value: function divide(value) {
            return new Vector(this._position.x / value, this._position.y / value);
        }
    }, {
        key: 'addTo',
        value: function addTo(v2) {
            this._position.x += v2.x;
            this._position.y += v2.y;
        }
    }, {
        key: 'subtractFrom',
        value: function subtractFrom(v2) {
            this._position.x -= v2.x;
            this._position.y -= v2.y;
        }
    }, {
        key: 'multiplyBy',
        value: function multiplyBy(value) {
            this._position.x *= value;
            this._position.y *= value;
        }
    }, {
        key: 'divideBy',
        value: function divideBy(value) {
            this._position.x /= value;
            this._position.y /= value;
        }
    }, {
        key: 'angleTo',
        value: function angleTo(v2) {
            Math.atan2(v2.y - this.y, v2.x - this.x);
        }
    }, {
        key: 'x',
        get: function get() {
            return this._position.x;
        },
        set: function set(value) {
            this._position.x = value;
        }
    }, {
        key: 'y',
        get: function get() {
            return this._position.y;
        },
        set: function set(value) {
            this._position.y = value;
        }
    }, {
        key: 'point',
        get: function get() {
            return this._position;
        },
        set: function set(value) {
            this._position = value;
        }
    }]);

    return Vector;
}();

exports.default = Vector;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _functions = __webpack_require__(2);

var _constants = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Thruster = function () {
    function Thruster(thrust) {
        _classCallCheck(this, Thruster);

        this.thrust = thrust;
        this.roaming = { callback: null, count: 0 };
    }

    _createClass(Thruster, [{
        key: 'setPower',
        value: function setPower(drone) {
            this.drone = drone;
            this.power = 1;
            switch (true) {
                case this.targetIsTooClose(drone):
                    this.stopThrusting();
                    break;
                case this.targetIsCloseBehind(drone):
                    this.startThrusting(1);
                    break;
                case drone.scanner.hasTarget() && (0, _functions.angleBetweenRange)(drone.angle, drone.scanner.angleToTarget(), 0.2):
                    this.power = this.getPowerFromDistance(drone);
                    this.startThrusting(this.power);
                    break;
                case drone.scanner.hasTarget() && (0, _functions.angleBetweenRange)(drone.angle, drone.scanner.angleToTarget(), 0.3):
                    this.power = 0.8 * this.getPowerFromDistance(drone);
                    this.startThrusting();
                    break;
                case drone.scanner.hasTarget() && (0, _functions.angleBetweenRange)(drone.angle, drone.scanner.angleToTarget(), 0.6):
                    this.power = 0.4;
                    this.startThrusting();
                    break;
                default:
                    if (this.roaming.count <= 0) {
                        this.roaming.count = Math.random() * 25 + 5;
                        this.roaming.callback = Math.random() > 0.4 ? this.startThrusting.bind(this) : this.stopThrusting.bind(this);
                    }
                    this.power = 0.5;
                    this.roaming.callback();
                    this.roaming.count--;
            }
        }
    }, {
        key: 'startThrusting',
        value: function startThrusting() {
            this.drone.velocity.setLength(this.thrust * this.power);
        }
    }, {
        key: 'stopThrusting',
        value: function stopThrusting() {
            this.power = 0;
        }
    }, {
        key: 'isThrusting',
        value: function isThrusting() {
            return this.power > 0;
        }
    }, {
        key: 'draw',
        value: function draw(drone) {
            if (this.isThrusting()) {
                _constants.context.translate(drone.position.x, drone.position.y);
                _constants.context.rotate(drone.vector.getAngle());
                _constants.context.beginPath();
                _constants.context.moveTo(-10, -2);
                _constants.context.lineTo(-14, Math.floor(Math.random() * 2) - 3);
                _constants.context.lineTo(-12, -1);
                _constants.context.lineTo(-16, Math.floor(Math.random() * 3) - 1);
                _constants.context.lineTo(-12, 1);
                _constants.context.lineTo(-14, Math.floor(Math.random() * 2) + 2);
                _constants.context.lineTo(-10, 2);
                _constants.context.strokeWidth = 0.5;
                _constants.context.strokeStyle = _constants.colours.orange;
                _constants.context.stroke();
                _constants.context.fillStyle = _constants.colours.red;
                _constants.context.fill();
                _constants.context.resetTransform();
            }
        }
    }, {
        key: 'targetIsCloseBehind',
        value: function targetIsCloseBehind() {
            return this.drone.scanner.hasTarget() && (0, _functions.distanceTo)(this.drone, this.drone.scanner.target) < 300 && this.targetIsBehind(this.drone);
        }
    }, {
        key: 'targetIsTooClose',
        value: function targetIsTooClose() {
            return this.drone.scanner.hasTarget() && (0, _functions.distanceTo)(this.drone, this.drone.scanner.target) < 30 && (0, _functions.angleBetweenRange)(this.drone, 0.6);
        }
    }, {
        key: 'getPowerFromDistance',
        value: function getPowerFromDistance(drone) {
            switch (true) {
                case (0, _functions.distanceTo)(drone, drone.scanner.target) > 800:
                    return this.targetIsAhead(drone) ? 1 : 0;
                case (0, _functions.distanceTo)(drone, drone.scanner.target) > 600:
                    return this.targetIsAhead(drone) ? 0.8 : 0.2;
                case (0, _functions.distanceTo)(drone, drone.scanner.target) > 300:
                    return this.targetIsAhead(drone) ? 0.6 : 0.4;
                case (0, _functions.distanceTo)(drone, drone.scanner.target) > 200:
                    return this.targetIsAhead(drone) ? 0.4 : 0.6;
                case (0, _functions.distanceTo)(drone, drone.scanner.target) > 100:
                    return this.targetIsAhead(drone) ? 0.2 : 0.8;
                default:
                    return this.targetIsAhead(drone) ? 0.1 : 0.9;
            }
        }
    }, {
        key: 'targetIsAhead',
        value: function targetIsAhead(target) {
            return (0, _functions.angleBetweenRange)(target, Math.PI / 2);
        }
    }, {
        key: 'targetIsBehind',
        value: function targetIsBehind(target) {
            return !(0, _functions.angleBetweenRange)(target, Math.PI / 2);
        }
    }]);

    return Thruster;
}();

exports.default = Thruster;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _constants = __webpack_require__(0);

var _drone = __webpack_require__(7);

var _drone2 = _interopRequireDefault(_drone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Scanner = function () {
    function Scanner(radius) {
        _classCallCheck(this, Scanner);

        this.radius = radius;
        this._target = null;
        this._drone = null;
    }

    _createClass(Scanner, [{
        key: 'hasTarget',
        value: function hasTarget() {
            return this._target !== null;
        }
    }, {
        key: 'findTarget',
        value: function findTarget(drone) {
            var _this = this;

            this._drone = drone;
            this._target = null;
            var nearestTarget = { target: null, distance: null };
            this.findGridRange();
            this.forceRangeToGridRowsColumns();
            for (var i = this.gridRange.start[0]; i < this.gridRange.end[0]; i++) {
                for (var j = this.gridRange.start[1]; j < this.gridRange.end[1]; j++) {
                    _constants.grid.grid[i][j].map(function (item) {
                        if (!(item instanceof _drone2.default) || item.squadId === drone.squadId) {
                            return;
                        }
                        var distanceTo = _this.distanceToTarget(item);
                        if (nearestTarget.distance === null || distanceTo < nearestTarget.distance) {
                            nearestTarget.target = item;
                            nearestTarget.distance = distanceTo;
                        }
                    });
                }
            }
            if (nearestTarget.target !== null && nearestTarget.distance <= this.radius && nearestTarget.target.health.health > 0) {
                this._target = nearestTarget.target;
            } else {
                this._target = null;
            }
        }
    }, {
        key: 'forceRangeToGridRowsColumns',
        value: function forceRangeToGridRowsColumns() {
            if (this.gridRange.start[0] < 0) {
                this.gridRange.start[0] = 0;
            }
            if (this.gridRange.start[1] < 0) {
                this.gridRange.start[1] = 0;
            }
            if (this.gridRange.end[0] > _constants.grid.columns) {
                this.gridRange.end[0] = _constants.grid.columns;
            }
            if (this.gridRange.end[1] > _constants.grid.rows) {
                this.gridRange.end[1] = _constants.grid.rows;
            }
        }
    }, {
        key: 'angleToTarget',
        value: function angleToTarget() {
            if (this.hasTarget()) {
                return Math.atan2(this._target.position.y - this._drone.position.y, this._target.position.x - this._drone.position.x);
            }
            return 0;
        }
    }, {
        key: 'distanceToTarget',
        value: function distanceToTarget(droneTwo) {
            var dx = droneTwo.position.x - this._drone.position.x,
                dy = droneTwo.position.y - this._drone.position.y;
            return Math.sqrt(dx * dx + dy * dy);
        }
    }, {
        key: 'findGridRange',
        value: function findGridRange() {
            var x = this._drone.position.x / _constants.grid.gridBlockSize;
            var y = this._drone.position.y / _constants.grid.gridBlockSize;
            var blockRadius = this.radius / _constants.grid.gridBlockSize + 2;
            this.gridRange = {
                start: [Math.floor(x - blockRadius), Math.floor(y - blockRadius)],
                end: [Math.ceil(x + blockRadius), Math.ceil(y + blockRadius)]
            };
        }
    }, {
        key: 'draw',
        value: function draw(drone) {
            if (this.hasTarget()) {
                _constants.context.translate(this.target.position.x, this.target.position.y);
                _constants.context.beginPath();
                _constants.context.moveTo(-5, -5);
                _constants.context.lineTo(5, 5);
                _constants.context.moveTo(5, -5);
                _constants.context.lineTo(-5, 5);
                _constants.context.strokeStyle = drone.color;
                _constants.context.strokeWidth = 5;
                _constants.context.stroke();
                _constants.context.resetTransform();
                this.drawScannerPath(drone);
            }
            this.drawScannerRadius(drone);
        }
    }, {
        key: 'drawScannerPath',
        value: function drawScannerPath(drone) {
            if (_constants.debug.scannerPathToggle) {
                _constants.context.setLineDash([1, 5]);
                _constants.context.beginPath();
                _constants.context.moveTo(drone.position.x, drone.position.y);
                _constants.context.lineTo(this.target.position.x, this.target.position.y);
                _constants.context.strokeStyle = _constants.colours.black;
                _constants.context.stroke();
                _constants.context.setLineDash([0]);
            }
        }
    }, {
        key: 'drawScannerRadius',
        value: function drawScannerRadius(drone) {
            if (_constants.debug.scannerRadiusToggle) {
                _constants.context.setLineDash([1, 5]);
                _constants.context.beginPath();
                _constants.context.arc(drone.position.x, drone.position.y, this.radius, 0, 2 * Math.PI);
                _constants.context.strokeStyle = _constants.colours.black;
                _constants.context.stroke();
                _constants.context.setLineDash([0]);
            }
        }
    }, {
        key: 'target',
        get: function get() {
            return this._target;
        }
    }]);

    return Scanner;
}();

exports.default = Scanner;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _constants = __webpack_require__(0);

var _vector = __webpack_require__(4);

var _vector2 = _interopRequireDefault(_vector);

var _particle = __webpack_require__(11);

var _particle2 = _interopRequireDefault(_particle);

var _health = __webpack_require__(17);

var _health2 = _interopRequireDefault(_health);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Drone = function (_Particle) {
    _inherits(Drone, _Particle);

    function Drone(id, squadId, name, color, x, y, speed, angle, weapon, gimbal, scanner, thruster, steering) {
        _classCallCheck(this, Drone);

        var _this = _possibleConstructorReturn(this, (Drone.__proto__ || Object.getPrototypeOf(Drone)).call(this, id, x, y, speed, 10, angle));

        _this.name = name;
        _this.vector = new _vector2.default(x, y);
        _this.vector.setAngle(angle);
        _this.weapon = new weapon(id, x, y, angle, gimbal);
        _this._color = color;
        _this.scanner = new scanner();
        _this.thruster = new thruster();
        _this.steering = new steering();
        _this.health = new _health2.default(100);
        _this._squadId = squadId;
        return _this;
    }

    _createClass(Drone, [{
        key: 'update',
        value: function update() {
            this.scanner.findTarget(this);
            this.thruster.setPower(this);
            this.steering.turn(this);
            if (this.thruster.isThrusting()) {
                this.velocity.setAngle(this.vector.getAngle());
            }
            this.move();
            this.weapon.update(this);
        }
    }, {
        key: 'draw',
        value: function draw() {
            _constants.context.translate(this.position.x, this.position.y);
            this.drawName();
            this.drawData();
            _constants.context.rotate(this.vector.getAngle());
            _constants.context.beginPath();
            _constants.context.moveTo(10, 0);
            _constants.context.lineTo(-10, -7);
            _constants.context.lineTo(-10, 7);
            _constants.context.lineTo(10, 0);
            _constants.context.strokeStyle = this._color;
            _constants.context.stroke();
            _constants.context.fillStyle = this._color;
            _constants.context.fill();
            _constants.context.resetTransform();
            this.health.draw(this);
            this.scanner.draw(this);
            this.thruster.draw(this);
            this.weapon.draw();
        }
    }, {
        key: 'drawName',
        value: function drawName() {
            if (_constants.debug.droneNameToggle) {
                _constants.context.textAlign = 'center';
                _constants.context.fillStyle = this._color;
                _constants.context.fillText(this.name, 0, -18);
            }
        }
    }, {
        key: 'drawData',
        value: function drawData() {
            if (_constants.debug.droneDataToggle) {
                _constants.context.textAlign = 'left';
                _constants.context.fillStyle = this._color;
                _constants.context.fillText('ID: ' + this.id, 25, -10);
                _constants.context.fillText('SquadID: ' + this.squadId, 25, 0);
                _constants.context.fillText('Health: ' + this.health.health, 25, 10);
                var positionText = 'Position: (' + Math.round(this.position.x) + ', ' + Math.round(this.position.y) + ')';
                _constants.context.fillText(positionText, 25, 20);
                var gridText = 'Grid: (' + this.gridX + ', ' + this.gridY + ')';
                _constants.context.fillText(gridText, 25, 30);
            }
        }
    }, {
        key: 'squadId',
        get: function get() {
            return this._squadId;
        }
    }, {
        key: 'angle',
        get: function get() {
            return this.vector.getAngle();
        },
        set: function set(angle) {
            this.vector.setAngle(angle);
        }
    }]);

    return Drone;
}(_particle2.default);

exports.default = Drone;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DeltaTime = function () {
    function DeltaTime() {
        _classCallCheck(this, DeltaTime);

        this.startTime = Date.now();
        this.lastTime = Date.now();
        this.currentTime = Date.now();
        this.deltaTime = 0;
    }

    _createClass(DeltaTime, [{
        key: "update",
        value: function update() {
            this.currentTime = Date.now();
            this.deltaTime = this.currentTime - this.lastTime;
            this.lastTime = this.currentTime;
        }
    }, {
        key: "getTime",
        value: function getTime() {
            return this.deltaTime / 100;
        }
    }, {
        key: "getOffsetTime",
        value: function getOffsetTime(offset) {
            return this.deltaTime / 100 + offset;
        }
    }, {
        key: "getElapsedTime",
        value: function getElapsedTime() {
            return (this.currentTime - this.startTime) / 100;
        }
    }, {
        key: "getOffsetElapsedTime",
        value: function getOffsetElapsedTime(offset) {
            return (this.currentTime - this.startTime) / 100 + offset;
        }
    }]);

    return DeltaTime;
}();

var deltaTime = exports.deltaTime = new DeltaTime();

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _constants = __webpack_require__(0);

var _deltaTime = __webpack_require__(8);

var _vector = __webpack_require__(4);

var _vector2 = _interopRequireDefault(_vector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Weapon = function () {
    function Weapon(id, color, x, y, angle, gimbal, round, fireRate) {
        _classCallCheck(this, Weapon);

        this.id = id;
        this.color = color;
        this.position = new _vector2.default(x, y);
        this.velocity = 0;
        this.fireRate = fireRate;
        this.lastFired = 0;
        this.gimbal = new gimbal();
        this.round = round;
    }

    _createClass(Weapon, [{
        key: 'draw',
        value: function draw() {
            _constants.context.translate(this.position.x, this.position.y);
            _constants.context.rotate(this.gimbal.vector.getAngle() + this.droneAngle);
            _constants.context.beginPath();
            _constants.context.lineTo(10, -2);
            _constants.context.lineTo(10, 2);
            _constants.context.lineTo(0, 2);
            _constants.context.lineTo(0, -2);
            _constants.context.strokeStyle = this.color;
            _constants.context.stroke();
            _constants.context.fillStyle = this.color;
            _constants.context.fill();
            _constants.context.resetTransform();
        }
    }, {
        key: 'update',
        value: function update(drone) {
            this.position.x = drone.position.x;
            this.position.y = drone.position.y;
            this.velocity = drone.velocity;
            this.droneAngle = drone.vector.getAngle();
            this.gimbal.trackTarget(drone);
            if (drone.scanner.hasTarget()) {
                this.fireIfReady();
            }
        }
    }, {
        key: 'fireIfReady',
        value: function fireIfReady() {
            if (_deltaTime.deltaTime.getElapsedTime() - this.lastFired > this.fireRate) {
                this.fire();
                this.lastFired = _deltaTime.deltaTime.getElapsedTime();
            }
        }
    }, {
        key: 'fire',
        value: function fire() {
            _constants.pm.addParticle(new this.round(this.id, this.position.x, this.position.y, this.gimbal.vector.getAngle() + this.droneAngle, this.velocity));
        }
    }, {
        key: 'applyFill',
        value: function applyFill() {
            _constants.context.fillStyle = this.color;
            _constants.context.fill();
        }
    }, {
        key: 'applyStroke',
        value: function applyStroke() {
            _constants.context.strokeStyle = this.color;
            _constants.context.stroke();
        }
    }]);

    return Weapon;
}();

exports.default = Weapon;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _particle = __webpack_require__(11);

var _particle2 = _interopRequireDefault(_particle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Bullet = function (_Particle) {
    _inherits(Bullet, _Particle);

    function Bullet(id, x, y, speed, radius, angle, velocity, damage) {
        _classCallCheck(this, Bullet);

        var _this = _possibleConstructorReturn(this, (Bullet.__proto__ || Object.getPrototypeOf(Bullet)).call(this, id, x, y, speed, radius, angle));

        _this._damage = damage;
        _this.velocity.addTo(velocity);
        return _this;
    }

    _createClass(Bullet, [{
        key: 'damage',
        get: function get() {
            return this._damage;
        }
    }]);

    return Bullet;
}(_particle2.default);

exports.default = Bullet;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _constants = __webpack_require__(0);

var _vector = __webpack_require__(4);

var _vector2 = _interopRequireDefault(_vector);

var _deltaTime = __webpack_require__(8);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Particle = function () {
    function Particle(id, x, y, speed, radius, angle) {
        _classCallCheck(this, Particle);

        this._id = id;
        this.radius = radius;
        this.position = new _vector2.default(x, y);
        this.velocity = new _vector2.default(0, 0);
        this.velocity.setLength(speed);
        this.velocity.setAngle(angle);
        this._remove = false;
        this._color = '#000';
        this._gridX = Math.floor(this.position.x / _constants.grid.gridBlockSize);
        this._gridY = Math.floor(this.position.y / _constants.grid.gridBlockSize);
    }

    _createClass(Particle, [{
        key: 'update',
        value: function update() {
            this.move();
        }
    }, {
        key: 'move',
        value: function move() {
            var distanceByDeltaTime = this.velocity.multiply(_deltaTime.deltaTime.getTime());
            this.velocity.multiply(_constants.friction);
            _constants.grid.removeParticle(this);
            this.position.addTo(distanceByDeltaTime);
            _constants.grid.addParticle(this);
        }
    }, {
        key: 'removeParticle',
        value: function removeParticle() {
            this._remove = true;
            _constants.grid.removeParticle(this);
        }
    }, {
        key: 'draw',
        value: function draw() {
            _constants.context.beginPath();
            _constants.context.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
            _constants.context.strokeStyle = this._color;
            _constants.context.stroke();
        }
    }, {
        key: 'gridY',
        get: function get() {
            return this._gridY;
        },
        set: function set(value) {
            this._gridY = value;
        }
    }, {
        key: 'gridX',
        get: function get() {
            return this._gridX;
        },
        set: function set(value) {
            this._gridX = value;
        }
    }, {
        key: 'remove',
        get: function get() {
            return this._remove;
        }
    }, {
        key: 'id',
        get: function get() {
            return this._id;
        }
    }, {
        key: 'color',
        get: function get() {
            return this._color;
        }
    }]);

    return Particle;
}();

exports.default = Particle;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _constants = __webpack_require__(0);

var _deltaTime = __webpack_require__(8);

var _drone = __webpack_require__(7);

var _drone2 = _interopRequireDefault(_drone);

var _utilities = __webpack_require__(19);

var _weapons = __webpack_require__(39);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_constants.debug.initialiseListeners();

// const weaponsArray = [Shotgun, Uzi, Rifle];
//
// for(let i = 0; i < 10; i++) {
//
//     const gimbalOne = new Gimbal(Math.random() * Math.PI + 0.3, 0.02);
//     const gimbalTwo = new Gimbal(Math.random() * Math.PI + 0.3, 0.02);
//     const gimbalThree = new Gimbal(Math.random() * Math.PI + 0.3, 0.02);
//
//     const scannerOne = new Scanner(Math.random() * 600 + 200);
//     const scannerTwo = new Scanner(Math.random() * 600 + 200);
//     const scannerThree = new Scanner(Math.random() * 600 + 200);
//
//     const thrusterOne = new Thrust(Math.random() * 20 + 10);
//     const thrusterTwo = new Thrust(Math.random() * 20 + 10);
//     const thrusterThree = new Thrust(Math.random() * 20 + 10);
//
//     const steeringOne = new Steering(Math.random() * 0.9 + 0.4);
//     const steeringTwo = new Steering(Math.random() * 0.9 + 0.4);
//     const steeringThree = new Steering(Math.random() * 0.9 + 0.4);
//
//     const droneOne = new Drone(1, colours.blue, Math.random() *
//         canvasWidth, Math.random() *
//         canvasHeight, 0, Math.random() * Math.PI * 2, randomItem(weaponsArray),
//         gimbalOne,
//         scannerOne, thrusterOne, steeringOne);
//     const droneTwo = new Drone(2, colours.red, Math.random() *
//         canvasWidth, Math.random() *
//         canvasHeight, 0, Math.random() * Math.PI * 2, randomItem(weaponsArray),
//         gimbalTwo,
//         scannerTwo, thrusterTwo, steeringTwo);
//     const droneThree = new Drone(3, colours.green, Math.random() *
//         canvasWidth, Math.random() *
//         canvasHeight, 0, Math.random() * Math.PI * 2, randomItem(weaponsArray),
//         gimbalThree,
//         scannerThree, thrusterThree, steeringThree);
//
//     dm.addDrone(droneOne);
//     dm.addDrone(droneTwo);
//     dm.addDrone(droneThree);
// }
var fpsInterval = void 0,
    startTime = void 0,
    now = void 0,
    then = void 0,
    elapsed = void 0;

function setupDrones(data) {
    console.log(data);
    data.squadrons.map(function (s) {
        s.drones.map(function (d) {
            var drone = new _drone2.default(d.id, s.id, d.name, _constants.colours[s.colour], Math.random() * _constants.canvasWidth, Math.random() * _constants.canvasHeight, 0, Math.random() * Math.PI * 2, _weapons.weapons[d.weapon], _utilities.gimbals[d.gimbal], _utilities.scanners[d.scanner], _utilities.thrusters[d.thruster], _utilities.steering[d.steering]);
            _constants.dm.addDrone(drone);
        });
    });
}

fetch('./data/squads.json').then(function (resp) {
    return resp.json();
}).then(function (data) {
    setupDrones(data.data);
    startAnimating(30);
});

function startAnimating(fps) {
    fpsInterval = 1000 / fps;
    then = Date.now();
    startTime = then;
    animate();
}

function animate() {
    _constants.context.clearRect(0, 0, _constants.canvasWidth, _constants.canvasHeight);
    _constants.context.fillStyle = '#FFD700';
    _constants.context.fillRect(0, 0, _constants.canvasWidth, _constants.canvasHeight);
    _deltaTime.deltaTime.update();
    _constants.dm.update();
    _constants.pm.update();
    _constants.grid.draw();
    _constants.grid.log();
    requestAnimationFrame(animate);
    now = Date.now();
    elapsed = now - then;
    if (elapsed > fpsInterval) {
        then = now - elapsed % fpsInterval;
    }
}

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _functions = __webpack_require__(2);

var _constants = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ParticleManager = function () {
    function ParticleManager() {
        _classCallCheck(this, ParticleManager);

        this.particles = [];
    }

    _createClass(ParticleManager, [{
        key: 'addParticle',
        value: function addParticle(particle) {
            this.particles.push(particle);
        }
    }, {
        key: 'update',
        value: function update() {
            var _this = this;

            this.particles = this.particles.map(function (p) {
                p.draw();
                p.update();
                _this.collisionDetection(p);
                if ((0, _functions.isOffCanvas)(p)) {
                    p.removeParticle();
                }
                return p;
            }).filter(function (p) {
                return !p.remove && !(0, _functions.isOffCanvas)(p);
            });
        }
    }, {
        key: 'collisionDetection',
        value: function collisionDetection(p) {
            _constants.dm.drones.map(function (d) {
                if ((0, _functions.didCollide)(p, d)) {
                    d.health.takeDamage(p.damage);
                    p.removeParticle();
                }
            });
        }
    }]);

    return ParticleManager;
}();

exports.default = ParticleManager;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _functions = __webpack_require__(2);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DroneManager = function () {
    function DroneManager() {
        _classCallCheck(this, DroneManager);

        this._drones = [];
    }

    _createClass(DroneManager, [{
        key: 'addDrone',
        value: function addDrone(drone) {
            this._drones.push(drone);
        }
    }, {
        key: 'update',
        value: function update() {
            this._drones = this._drones.map(function (d) {
                d.draw();
                d.update();
                (0, _functions.returnToCanvas)(d);
                if (d.health.health <= 0) {
                    d.removeParticle();
                }
                return d;
            }).filter(function (d) {
                return d.health.health > 0;
            });
        }
    }, {
        key: 'drones',
        get: function get() {
            return this._drones;
        }
    }]);

    return DroneManager;
}();

exports.default = DroneManager;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _constants = __webpack_require__(0);

var _drone = __webpack_require__(7);

var _drone2 = _interopRequireDefault(_drone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GameGrid = function () {
    function GameGrid() {
        _classCallCheck(this, GameGrid);

        this._gridBlockSize = 100;
        this._columns = Math.round(_constants.canvasWidth / this._gridBlockSize);
        this._rows = Math.round(_constants.canvasHeight / this._gridBlockSize);
        this._grid = new Array(this._columns);
        for (var i = 0; i < this._grid.length; i++) {
            this._grid[i] = new Array(this._rows);
            for (var j = 0; j < this._grid.length; j++) {
                this._grid[i][j] = [];
            }
        }
    }

    _createClass(GameGrid, [{
        key: 'gridHasKeys',
        value: function gridHasKeys(x, y) {
            return x >= 0 && x < this._columns && y >= 0 && y < this._rows;
        }
    }, {
        key: 'addParticle',
        value: function addParticle(particle) {
            particle.gridX = Math.floor(particle.position.x / this.gridBlockSize);
            particle.gridY = Math.floor(particle.position.y / this.gridBlockSize);
            if (!this.gridHasKeys(particle.gridX, particle.gridY)) {
                return;
            }
            this._grid[particle.gridX][particle.gridY].push(particle);
        }
    }, {
        key: 'removeParticle',
        value: function removeParticle(particle) {
            if (!this.gridHasKeys(particle.gridX, particle.gridY)) {
                return;
            }
            this._grid[particle.gridX][particle.gridY] = this._grid[particle.gridX][particle.gridY].filter(function (p) {
                return p.id !== particle.id;
            });
        }
    }, {
        key: 'log',
        value: function log() {
            if (_constants.debug.gameGridLog) {
                _constants.debug.gameGridLog = false;
                console.log(this.grid);
            }
        }
    }, {
        key: 'draw',
        value: function draw() {
            this.drawGrid();
            this.drawGridContent();
        }
    }, {
        key: 'drawGridContent',
        value: function drawGridContent() {
            _constants.context.textAlign = 'left';
            if (_constants.debug.gameGridToggle) {
                for (var i = 0; i < this._grid.length; i++) {
                    for (var j = 0; j < this._grid[i].length; j++) {
                        for (var k = 0; k < this._grid[i][j].length; k++) {
                            var item = this._grid[i][j][k];
                            var text = item instanceof _drone2.default ? 'Drone:' + item.name : item.id;
                            _constants.context.fillText(text, i * this._gridBlockSize + 4, j * this._gridBlockSize + (10 * k + 14));
                        }
                    }
                }
            }
        }
    }, {
        key: 'drawGrid',
        value: function drawGrid() {
            if (_constants.debug.gameGridToggle) {
                _constants.context.setLineDash([1, 7]);
                _constants.context.strokeStyle = _constants.colours.black;
                for (var i = 0; i < this._columns; i++) {
                    _constants.context.fillText(i, i * this._gridBlockSize, 10);
                    _constants.context.beginPath();
                    _constants.context.moveTo(i * this._gridBlockSize, 0);
                    _constants.context.lineTo(i * this._gridBlockSize, _constants.canvasHeight);
                    _constants.context.stroke();
                }
                for (var _i = 0; _i < this._rows; _i++) {
                    _constants.context.fillText(_i, 0, _i * this._gridBlockSize + 10);
                    _constants.context.beginPath();
                    _constants.context.moveTo(0, _i * this._gridBlockSize);
                    _constants.context.lineTo(_constants.canvasWidth, _i * this._gridBlockSize);
                    _constants.context.stroke();
                }
                _constants.context.setLineDash([0]);
            }
        }
    }, {
        key: 'gridBlockSize',
        get: function get() {
            return this._gridBlockSize;
        }
    }, {
        key: 'columns',
        get: function get() {
            return this._columns;
        }
    }, {
        key: 'rows',
        get: function get() {
            return this._rows;
        }
    }, {
        key: 'grid',
        get: function get() {
            return this._grid;
        }
    }]);

    return GameGrid;
}();

exports.default = GameGrid;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Point = function () {
    function Point(x, y) {
        _classCallCheck(this, Point);

        this._x = x;
        this._y = y;
    }

    _createClass(Point, [{
        key: "x",
        get: function get() {
            return this._x;
        },
        set: function set(value) {
            this._x = value;
        }
    }, {
        key: "y",
        get: function get() {
            return this._y;
        },
        set: function set(value) {
            this._y = value;
        }
    }]);

    return Point;
}();

exports.default = Point;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _constants = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Heath = function () {
    function Heath(health) {
        _classCallCheck(this, Heath);

        this._health = health;
    }

    _createClass(Heath, [{
        key: 'takeDamage',
        value: function takeDamage(damage) {
            this._health -= damage;
        }
    }, {
        key: 'repairDamage',
        value: function repairDamage(value) {
            this._health += value;
        }
    }, {
        key: 'draw',
        value: function draw(drone) {
            _constants.context.translate(drone.position.x, drone.position.y);
            _constants.context.translate(-8, 16);
            this.drawHealthBox(this.health);
            _constants.context.fillStyle = this._health > 15 ? _constants.colours.green : _constants.colours.red;
            _constants.context.fill();
            this.drawHealthBox();
            _constants.context.strokeStyle = _constants.colours.black;
            _constants.context.stroke();
            _constants.context.resetTransform();
        }
    }, {
        key: 'drawHealthBox',
        value: function drawHealthBox() {
            var width = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 100;

            _constants.context.beginPath();
            _constants.context.moveTo(0, 0);
            _constants.context.lineTo(16 * width / 100, 0);
            _constants.context.lineTo(16 * width / 100, 4);
            _constants.context.lineTo(0, 4);
            _constants.context.lineTo(0, 0);
        }
    }, {
        key: 'health',
        get: function get() {
            return this._health;
        }
    }]);

    return Heath;
}();

exports.default = Heath;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Debug = function () {
    function Debug() {
        _classCallCheck(this, Debug);

        this._gameGridToggle = false;
        this._scannerRadiusToggle = false;
        this._scannerPathToggle = false;
        this._droneNameToggle = false;
        this._droneDataToggle = false;
        this._gameGridLog = false;
    }

    _createClass(Debug, [{
        key: 'initialiseListeners',
        value: function initialiseListeners() {
            this.addGameGridToggleListener();
            this.addScannerRadiusToggleListener();
            this.addScannerPathToggleListener();
            this.addNameToggleListener();
            this.addDataToggleListener();
            this.addGameGridLogListener();
        }
    }, {
        key: 'addGameGridLogListener',
        value: function addGameGridLogListener() {
            var _this = this;

            document.getElementById('game-grid-log').addEventListener('click', function (e) {
                _this._gameGridLog = !_this._gameGridLog;
            });
        }
    }, {
        key: 'addGameGridToggleListener',
        value: function addGameGridToggleListener() {
            var _this2 = this;

            document.getElementById('game-grid-toggle').addEventListener('click', function (e) {
                e.target.classList.toggle('toggled');
                _this2._gameGridToggle = !_this2._gameGridToggle;
            });
        }
    }, {
        key: 'addScannerRadiusToggleListener',
        value: function addScannerRadiusToggleListener() {
            var _this3 = this;

            document.getElementById('scanner-radius-toggle').addEventListener('click', function (e) {
                e.target.classList.toggle('toggled');
                _this3._scannerRadiusToggle = !_this3._scannerRadiusToggle;
            });
        }
    }, {
        key: 'addScannerPathToggleListener',
        value: function addScannerPathToggleListener() {
            var _this4 = this;

            document.getElementById('scanner-path-toggle').addEventListener('click', function (e) {
                e.target.classList.toggle('toggled');
                _this4._scannerPathToggle = !_this4._scannerPathToggle;
            });
        }
    }, {
        key: 'addNameToggleListener',
        value: function addNameToggleListener() {
            var _this5 = this;

            document.getElementById('name-toggle').addEventListener('click', function (e) {
                e.target.classList.toggle('toggled');
                _this5._droneNameToggle = !_this5._droneNameToggle;
            });
        }
    }, {
        key: 'addDataToggleListener',
        value: function addDataToggleListener() {
            var _this6 = this;

            document.getElementById('data-toggle').addEventListener('click', function (e) {
                e.target.classList.toggle('toggled');
                _this6._droneDataToggle = !_this6._droneDataToggle;
            });
        }
    }, {
        key: 'droneDataToggle',
        get: function get() {
            return this._droneDataToggle;
        },
        set: function set(value) {
            this._droneDataToggle = value;
        }
    }, {
        key: 'gameGridLog',
        get: function get() {
            return this._gameGridLog;
        },
        set: function set(value) {
            this._gameGridLog = value;
        }
    }, {
        key: 'gameGridToggle',
        get: function get() {
            return this._gameGridToggle;
        },
        set: function set(value) {
            this._gameGridToggle = value;
        }
    }, {
        key: 'droneNameToggle',
        get: function get() {
            return this._droneNameToggle;
        },
        set: function set(value) {
            this._droneNameToggle = value;
        }
    }, {
        key: 'scannerPathToggle',
        get: function get() {
            return this._scannerPathToggle;
        },
        set: function set(value) {
            this._scannerPathToggle = value;
        }
    }, {
        key: 'scannerRadiusToggle',
        get: function get() {
            return this._scannerRadiusToggle;
        },
        set: function set(value) {
            this._scannerRadiusToggle = value;
        }
    }]);

    return Debug;
}();

exports.default = Debug;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.thrusters = exports.steering = exports.scanners = exports.gimbals = undefined;

var _T = __webpack_require__(20);

var _T2 = _interopRequireDefault(_T);

var _T3 = __webpack_require__(21);

var _T4 = _interopRequireDefault(_T3);

var _T5 = __webpack_require__(22);

var _T6 = _interopRequireDefault(_T5);

var _T7 = __webpack_require__(23);

var _T8 = _interopRequireDefault(_T7);

var _S = __webpack_require__(24);

var _S2 = _interopRequireDefault(_S);

var _S3 = __webpack_require__(25);

var _S4 = _interopRequireDefault(_S3);

var _S5 = __webpack_require__(26);

var _S6 = _interopRequireDefault(_S5);

var _S7 = __webpack_require__(27);

var _S8 = _interopRequireDefault(_S7);

var _S9 = __webpack_require__(28);

var _S10 = _interopRequireDefault(_S9);

var _SC = __webpack_require__(29);

var _SC2 = _interopRequireDefault(_SC);

var _SC3 = __webpack_require__(30);

var _SC4 = _interopRequireDefault(_SC3);

var _SC5 = __webpack_require__(31);

var _SC6 = _interopRequireDefault(_SC5);

var _SC7 = __webpack_require__(32);

var _SC8 = _interopRequireDefault(_SC7);

var _G = __webpack_require__(33);

var _G2 = _interopRequireDefault(_G);

var _G3 = __webpack_require__(34);

var _G4 = _interopRequireDefault(_G3);

var _G5 = __webpack_require__(35);

var _G6 = _interopRequireDefault(_G5);

var _G7 = __webpack_require__(36);

var _G8 = _interopRequireDefault(_G7);

var _G9 = __webpack_require__(37);

var _G10 = _interopRequireDefault(_G9);

var _G11 = __webpack_require__(38);

var _G12 = _interopRequireDefault(_G11);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var gimbals = exports.gimbals = {
    'G40': _G12.default,
    'G60': _G10.default,
    'G90': _G8.default,
    'G120': _G6.default,
    'G240': _G4.default,
    'G360': _G2.default
};

var scanners = exports.scanners = {
    'SC200': _SC8.default,
    'SC400': _SC6.default,
    'SC600': _SC4.default,
    'SC900': _SC2.default
};

var steering = exports.steering = {
    'S4': _S10.default,
    'S6': _S8.default,
    'S8': _S6.default,
    'S10': _S4.default,
    'S12': _S2.default
};

var thrusters = exports.thrusters = {
    'T10': _T8.default,
    'T12': _T6.default,
    'T15': _T4.default,
    'T18': _T2.default
};

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _thruster = __webpack_require__(5);

var _thruster2 = _interopRequireDefault(_thruster);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var T18 = function (_Thruster) {
    _inherits(T18, _Thruster);

    function T18() {
        _classCallCheck(this, T18);

        return _possibleConstructorReturn(this, (T18.__proto__ || Object.getPrototypeOf(T18)).call(this, 18));
    }

    return T18;
}(_thruster2.default);

exports.default = T18;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _thruster = __webpack_require__(5);

var _thruster2 = _interopRequireDefault(_thruster);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var T15 = function (_Thruster) {
    _inherits(T15, _Thruster);

    function T15() {
        _classCallCheck(this, T15);

        return _possibleConstructorReturn(this, (T15.__proto__ || Object.getPrototypeOf(T15)).call(this, 15));
    }

    return T15;
}(_thruster2.default);

exports.default = T15;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _thruster = __webpack_require__(5);

var _thruster2 = _interopRequireDefault(_thruster);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var T12 = function (_Thruster) {
    _inherits(T12, _Thruster);

    function T12() {
        _classCallCheck(this, T12);

        return _possibleConstructorReturn(this, (T12.__proto__ || Object.getPrototypeOf(T12)).call(this, 12));
    }

    return T12;
}(_thruster2.default);

exports.default = T12;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _thruster = __webpack_require__(5);

var _thruster2 = _interopRequireDefault(_thruster);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var T10 = function (_Thruster) {
    _inherits(T10, _Thruster);

    function T10() {
        _classCallCheck(this, T10);

        return _possibleConstructorReturn(this, (T10.__proto__ || Object.getPrototypeOf(T10)).call(this, 10));
    }

    return T10;
}(_thruster2.default);

exports.default = T10;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _steering = __webpack_require__(3);

var _steering2 = _interopRequireDefault(_steering);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var S12 = function (_Steering) {
    _inherits(S12, _Steering);

    function S12() {
        _classCallCheck(this, S12);

        return _possibleConstructorReturn(this, (S12.__proto__ || Object.getPrototypeOf(S12)).call(this, 1.2));
    }

    return S12;
}(_steering2.default);

exports.default = S12;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _steering = __webpack_require__(3);

var _steering2 = _interopRequireDefault(_steering);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var S10 = function (_Steering) {
    _inherits(S10, _Steering);

    function S10() {
        _classCallCheck(this, S10);

        return _possibleConstructorReturn(this, (S10.__proto__ || Object.getPrototypeOf(S10)).call(this, 1));
    }

    return S10;
}(_steering2.default);

exports.default = S10;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _steering = __webpack_require__(3);

var _steering2 = _interopRequireDefault(_steering);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var S8 = function (_Steering) {
    _inherits(S8, _Steering);

    function S8() {
        _classCallCheck(this, S8);

        return _possibleConstructorReturn(this, (S8.__proto__ || Object.getPrototypeOf(S8)).call(this, 0.8));
    }

    return S8;
}(_steering2.default);

exports.default = S8;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _steering = __webpack_require__(3);

var _steering2 = _interopRequireDefault(_steering);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var S6 = function (_Steering) {
    _inherits(S6, _Steering);

    function S6() {
        _classCallCheck(this, S6);

        return _possibleConstructorReturn(this, (S6.__proto__ || Object.getPrototypeOf(S6)).call(this, 0.6));
    }

    return S6;
}(_steering2.default);

exports.default = S6;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _steering = __webpack_require__(3);

var _steering2 = _interopRequireDefault(_steering);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var S4 = function (_Steering) {
    _inherits(S4, _Steering);

    function S4() {
        _classCallCheck(this, S4);

        return _possibleConstructorReturn(this, (S4.__proto__ || Object.getPrototypeOf(S4)).call(this, 0.4));
    }

    return S4;
}(_steering2.default);

exports.default = S4;

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _scanner = __webpack_require__(6);

var _scanner2 = _interopRequireDefault(_scanner);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SC900 = function (_Scanner) {
    _inherits(SC900, _Scanner);

    function SC900() {
        _classCallCheck(this, SC900);

        return _possibleConstructorReturn(this, (SC900.__proto__ || Object.getPrototypeOf(SC900)).call(this, 900));
    }

    return SC900;
}(_scanner2.default);

exports.default = SC900;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _scanner = __webpack_require__(6);

var _scanner2 = _interopRequireDefault(_scanner);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SC600 = function (_Scanner) {
    _inherits(SC600, _Scanner);

    function SC600() {
        _classCallCheck(this, SC600);

        return _possibleConstructorReturn(this, (SC600.__proto__ || Object.getPrototypeOf(SC600)).call(this, 600));
    }

    return SC600;
}(_scanner2.default);

exports.default = SC600;

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _scanner = __webpack_require__(6);

var _scanner2 = _interopRequireDefault(_scanner);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SC400 = function (_Scanner) {
    _inherits(SC400, _Scanner);

    function SC400() {
        _classCallCheck(this, SC400);

        return _possibleConstructorReturn(this, (SC400.__proto__ || Object.getPrototypeOf(SC400)).call(this, 400));
    }

    return SC400;
}(_scanner2.default);

exports.default = SC400;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _scanner = __webpack_require__(6);

var _scanner2 = _interopRequireDefault(_scanner);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SC200 = function (_Scanner) {
    _inherits(SC200, _Scanner);

    function SC200() {
        _classCallCheck(this, SC200);

        return _possibleConstructorReturn(this, (SC200.__proto__ || Object.getPrototypeOf(SC200)).call(this, 200));
    }

    return SC200;
}(_scanner2.default);

exports.default = SC200;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _gimbal = __webpack_require__(1);

var _gimbal2 = _interopRequireDefault(_gimbal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var G360 = function (_Gimbal) {
    _inherits(G360, _Gimbal);

    function G360() {
        _classCallCheck(this, G360);

        return _possibleConstructorReturn(this, (G360.__proto__ || Object.getPrototypeOf(G360)).call(this, 0.175 * 180, 0.2));
    }

    return G360;
}(_gimbal2.default);

exports.default = G360;

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _gimbal = __webpack_require__(1);

var _gimbal2 = _interopRequireDefault(_gimbal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var G240 = function (_Gimbal) {
    _inherits(G240, _Gimbal);

    function G240() {
        _classCallCheck(this, G240);

        return _possibleConstructorReturn(this, (G240.__proto__ || Object.getPrototypeOf(G240)).call(this, 0.175 * 12, 0.18));
    }

    return G240;
}(_gimbal2.default);

exports.default = G240;

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _gimbal = __webpack_require__(1);

var _gimbal2 = _interopRequireDefault(_gimbal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var G120 = function (_Gimbal) {
    _inherits(G120, _Gimbal);

    function G120() {
        _classCallCheck(this, G120);

        return _possibleConstructorReturn(this, (G120.__proto__ || Object.getPrototypeOf(G120)).call(this, 0.175 * 6, 0.16));
    }

    return G120;
}(_gimbal2.default);

exports.default = G120;

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _gimbal = __webpack_require__(1);

var _gimbal2 = _interopRequireDefault(_gimbal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var G90 = function (_Gimbal) {
    _inherits(G90, _Gimbal);

    function G90() {
        _classCallCheck(this, G90);

        return _possibleConstructorReturn(this, (G90.__proto__ || Object.getPrototypeOf(G90)).call(this, 0.175 * 4.5, 0.14));
    }

    return G90;
}(_gimbal2.default);

exports.default = G90;

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _gimbal = __webpack_require__(1);

var _gimbal2 = _interopRequireDefault(_gimbal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var G60 = function (_Gimbal) {
    _inherits(G60, _Gimbal);

    function G60() {
        _classCallCheck(this, G60);

        return _possibleConstructorReturn(this, (G60.__proto__ || Object.getPrototypeOf(G60)).call(this, 0.175 * 3, 0.12));
    }

    return G60;
}(_gimbal2.default);

exports.default = G60;

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _gimbal = __webpack_require__(1);

var _gimbal2 = _interopRequireDefault(_gimbal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var G40 = function (_Gimbal) {
    _inherits(G40, _Gimbal);

    function G40() {
        _classCallCheck(this, G40);

        return _possibleConstructorReturn(this, (G40.__proto__ || Object.getPrototypeOf(G40)).call(this, 0.175 * 2, 0.1));
    }

    return G40;
}(_gimbal2.default);

exports.default = G40;

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.weapons = undefined;

var _uzi = __webpack_require__(40);

var _uzi2 = _interopRequireDefault(_uzi);

var _shotgun = __webpack_require__(42);

var _shotgun2 = _interopRequireDefault(_shotgun);

var _rifle = __webpack_require__(44);

var _rifle2 = _interopRequireDefault(_rifle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var weapons = exports.weapons = {
    'Uzi': _uzi2.default,
    'Shotgun': _shotgun2.default,
    'Rifle': _rifle2.default
};

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _weapon = __webpack_require__(9);

var _weapon2 = _interopRequireDefault(_weapon);

var _nineMm = __webpack_require__(41);

var _nineMm2 = _interopRequireDefault(_nineMm);

var _constants = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Uzi = function (_Weapon) {
    _inherits(Uzi, _Weapon);

    function Uzi(id, x, y, angle, gimbal) {
        _classCallCheck(this, Uzi);

        var fireRate = 2;
        var round = _nineMm2.default;
        return _possibleConstructorReturn(this, (Uzi.__proto__ || Object.getPrototypeOf(Uzi)).call(this, id, '#8aa', x, y, angle, gimbal, round, fireRate));
    }

    _createClass(Uzi, [{
        key: 'draw',
        value: function draw() {
            _constants.context.translate(this.position.x, this.position.y);
            _constants.context.rotate(this.gimbal.vector.getAngle() + this.droneAngle);
            _constants.context.beginPath();
            _constants.context.lineTo(6, -1);
            _constants.context.lineTo(6, 1);
            _constants.context.lineTo(0, 1);
            _constants.context.lineTo(0, -1);
            this.applyStroke();
            this.applyFill();
            _constants.context.resetTransform();
        }
    }]);

    return Uzi;
}(_weapon2.default);

exports.default = Uzi;

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _bullet = __webpack_require__(10);

var _bullet2 = _interopRequireDefault(_bullet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NineMM = function (_Bullet) {
    _inherits(NineMM, _Bullet);

    function NineMM(id, x, y, angle, velocity) {
        _classCallCheck(this, NineMM);

        return _possibleConstructorReturn(this, (NineMM.__proto__ || Object.getPrototypeOf(NineMM)).call(this, id, x, y, 45, 1, angle, velocity, 3));
    }

    return NineMM;
}(_bullet2.default);

exports.default = NineMM;

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _weapon = __webpack_require__(9);

var _weapon2 = _interopRequireDefault(_weapon);

var _constants = __webpack_require__(0);

var _shot = __webpack_require__(43);

var _shot2 = _interopRequireDefault(_shot);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Shotgun = function (_Weapon) {
    _inherits(Shotgun, _Weapon);

    function Shotgun(id, x, y, angle, gimbal) {
        _classCallCheck(this, Shotgun);

        var fireRate = 7;
        var round = _shot2.default;
        return _possibleConstructorReturn(this, (Shotgun.__proto__ || Object.getPrototypeOf(Shotgun)).call(this, id, '#664', x, y, angle, gimbal, round, fireRate));
    }

    _createClass(Shotgun, [{
        key: 'draw',
        value: function draw() {
            _constants.context.translate(this.position.x, this.position.y);
            _constants.context.rotate(this.gimbal.vector.getAngle() + this.droneAngle);
            _constants.context.beginPath();
            _constants.context.lineTo(8, -2);
            _constants.context.lineTo(8, 2);
            _constants.context.lineTo(0, 2);
            _constants.context.lineTo(0, -2);
            this.applyStroke();
            this.applyFill();
            _constants.context.resetTransform();
        }
    }, {
        key: 'fire',
        value: function fire() {
            for (var i = 0; i < 12; i++) {
                var scatter = Math.random() * 0.08 - 0.04;
                _constants.pm.addParticle(new this.round(this.id, this.position.x, this.position.y, this.gimbal.vector.getAngle() + this.droneAngle + scatter, this.velocity));
            }
        }
    }]);

    return Shotgun;
}(_weapon2.default);

exports.default = Shotgun;

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _bullet = __webpack_require__(10);

var _bullet2 = _interopRequireDefault(_bullet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Shot = function (_Bullet) {
    _inherits(Shot, _Bullet);

    function Shot(id, x, y, angle, velocity) {
        _classCallCheck(this, Shot);

        return _possibleConstructorReturn(this, (Shot.__proto__ || Object.getPrototypeOf(Shot)).call(this, id, x, y, 38, 0.5, angle, velocity, 1));
    }

    return Shot;
}(_bullet2.default);

exports.default = Shot;

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _weapon = __webpack_require__(9);

var _weapon2 = _interopRequireDefault(_weapon);

var _constants = __webpack_require__(0);

var _sevenSixTwoMm = __webpack_require__(45);

var _sevenSixTwoMm2 = _interopRequireDefault(_sevenSixTwoMm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Rifle = function (_Weapon) {
    _inherits(Rifle, _Weapon);

    function Rifle(id, x, y, angle, gimbal) {
        _classCallCheck(this, Rifle);

        var fireRate = 10;
        var round = _sevenSixTwoMm2.default;
        return _possibleConstructorReturn(this, (Rifle.__proto__ || Object.getPrototypeOf(Rifle)).call(this, id, '#577', x, y, angle, gimbal, round, fireRate));
    }

    _createClass(Rifle, [{
        key: 'draw',
        value: function draw() {
            _constants.context.translate(this.position.x, this.position.y);
            _constants.context.rotate(this.gimbal.vector.getAngle() + this.droneAngle);
            _constants.context.beginPath();
            _constants.context.lineTo(10, -2);
            _constants.context.lineTo(10, 2);
            _constants.context.lineTo(0, 2);
            _constants.context.lineTo(0, -2);
            this.applyStroke();
            this.applyFill();
            _constants.context.resetTransform();
        }
    }]);

    return Rifle;
}(_weapon2.default);

exports.default = Rifle;

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _bullet = __webpack_require__(10);

var _bullet2 = _interopRequireDefault(_bullet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SevenSixTwoMM = function (_Bullet) {
    _inherits(SevenSixTwoMM, _Bullet);

    function SevenSixTwoMM(id, x, y, angle, velocity) {
        _classCallCheck(this, SevenSixTwoMM);

        return _possibleConstructorReturn(this, (SevenSixTwoMM.__proto__ || Object.getPrototypeOf(SevenSixTwoMM)).call(this, id, x, y, 50, 2, angle, velocity, 18));
    }

    return SevenSixTwoMM;
}(_bullet2.default);

exports.default = SevenSixTwoMM;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map