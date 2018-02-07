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
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pm = exports.dm = exports.grid = exports.canvasHeight = exports.canvasWidth = exports.context = undefined;

var _particleManager = __webpack_require__(9);

var _particleManager2 = _interopRequireDefault(_particleManager);

var _droneManager = __webpack_require__(10);

var _droneManager2 = _interopRequireDefault(_droneManager);

var _gameGrid = __webpack_require__(11);

var _gameGrid2 = _interopRequireDefault(_gameGrid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var canvas = document.getElementById('canvas');
var context = exports.context = canvas.getContext('2d');
var canvasWidth = exports.canvasWidth = canvas.width = window.innerWidth;
var canvasHeight = exports.canvasHeight = canvas.height = window.innerHeight;
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

var _point = __webpack_require__(12);

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
/* 2 */
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
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _constants = __webpack_require__(0);

var _deltaTime = __webpack_require__(2);

var _vector = __webpack_require__(1);

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
        this.gimbal = gimbal;
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
        value: function update(position, vector, velocity, scanner) {
            this.position.x = position.x;
            this.position.y = position.y;
            this.velocity = velocity;
            this.droneAngle = vector.getAngle();
            this.gimbal.update();
            if (scanner.hasTarget() && scanner.angleToTarget() > -0.8 && scanner.angleToTarget() < 0.8) {
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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _particle = __webpack_require__(7);

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
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isOffCanvas = isOffCanvas;
exports.returnToCanvas = returnToCanvas;
exports.distanceTo = distanceTo;
exports.didCollide = didCollide;

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

function didCollide(p1, p2) {
    return !(p1.id === p2.id) && distanceTo(p1, p2) < p1.radius + p2.radius;
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _constants = __webpack_require__(0);

var _vector = __webpack_require__(1);

var _vector2 = _interopRequireDefault(_vector);

var _particle = __webpack_require__(7);

var _particle2 = _interopRequireDefault(_particle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Drone = function (_Particle) {
    _inherits(Drone, _Particle);

    function Drone(id, color, x, y, speed, angle, weapon, gimbal, scanner) {
        _classCallCheck(this, Drone);

        var _this = _possibleConstructorReturn(this, (Drone.__proto__ || Object.getPrototypeOf(Drone)).call(this, id, x, y, speed, 10, angle));

        _this.vector = new _vector2.default(x, y);
        _this.vector.setAngle(angle);
        _this.weapon = new weapon(id, x, y, angle, gimbal);
        _this._health = 10;
        _this.color = color;
        _this.scanner = scanner;
        return _this;
    }

    _createClass(Drone, [{
        key: 'takeDamage',
        value: function takeDamage(damage) {
            this._health -= damage;
        }
    }, {
        key: 'update',
        value: function update() {
            this.scanner.findTarget(this);
            var targetAngle = this.scanner.angleToTarget();
            if (targetAngle > 0.1) {
                this.vector.setAngle(this.vector.getAngle() + 0.02);
            } else if (targetAngle < -0.1) {
                this.vector.setAngle(this.vector.getAngle() - 0.02);
            } else {
                this.vector.setAngle(this.vector.getAngle() + Math.random() * 0.06 - 0.03);
            }
            this.velocity.setAngle(this.vector.getAngle());
            this.move();
            this.weapon.update(this.position, this.vector, this.velocity, this.scanner);
        }
    }, {
        key: 'draw',
        value: function draw() {
            _constants.context.translate(this.position.x, this.position.y);
            _constants.context.rotate(this.vector.getAngle());
            _constants.context.beginPath();
            _constants.context.moveTo(10, 0);
            _constants.context.lineTo(-10, -7);
            _constants.context.lineTo(-10, 7);
            _constants.context.lineTo(10, 0);
            _constants.context.strokeStyle = this.color;
            _constants.context.stroke();
            _constants.context.fillStyle = this.color;
            _constants.context.fill();
            _constants.context.resetTransform();
            this.scanner.draw(this);
            this.weapon.draw();
        }
    }, {
        key: 'health',
        get: function get() {
            return this._health;
        }
    }]);

    return Drone;
}(_particle2.default);

exports.default = Drone;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _constants = __webpack_require__(0);

var _vector = __webpack_require__(1);

var _vector2 = _interopRequireDefault(_vector);

var _deltaTime = __webpack_require__(2);

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
        this.color = '#000';
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
            var gridX = Math.floor(this.position.x / _constants.grid.gridBlockSize);
            var gridY = Math.floor(this.position.y / _constants.grid.gridBlockSize);
            _constants.grid.removeParticle(this, gridX, gridY);
            this.position.addTo(distanceByDeltaTime);
            _constants.grid.addParticle(this, gridX, gridY);
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
            _constants.context.strokeStyle = this.color;
            _constants.context.stroke();
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
    }]);

    return Particle;
}();

exports.default = Particle;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _constants = __webpack_require__(0);

var _deltaTime = __webpack_require__(2);

var _drone = __webpack_require__(6);

var _drone2 = _interopRequireDefault(_drone);

var _shotgun = __webpack_require__(13);

var _shotgun2 = _interopRequireDefault(_shotgun);

var _uzi = __webpack_require__(15);

var _uzi2 = _interopRequireDefault(_uzi);

var _rifle = __webpack_require__(17);

var _rifle2 = _interopRequireDefault(_rifle);

var _gimbal = __webpack_require__(19);

var _gimbal2 = _interopRequireDefault(_gimbal);

var _scanner = __webpack_require__(20);

var _scanner2 = _interopRequireDefault(_scanner);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

for (var i = 0; i < 5; i++) {

    var gimbalOne = new _gimbal2.default(0, 0);
    var gimbalTwo = new _gimbal2.default(0.2, 0.01);
    var gimbalThree = new _gimbal2.default(0.4, 0.01);

    var scannerOne = new _scanner2.default(500);
    var scannerTwo = new _scanner2.default(700);
    var scannerThree = new _scanner2.default(800);

    var droneOne = new _drone2.default(1, '#777', Math.random() * _constants.canvasWidth, Math.random() * _constants.canvasHeight, 12, Math.random() * Math.PI * 2, _shotgun2.default, gimbalOne, scannerOne);
    var droneTwo = new _drone2.default(2, '#444', Math.random() * _constants.canvasWidth, Math.random() * _constants.canvasHeight, 17, Math.random() * Math.PI * 2, _uzi2.default, gimbalTwo, scannerTwo);
    var droneThree = new _drone2.default(3, '#222', Math.random() * _constants.canvasWidth, Math.random() * _constants.canvasHeight, 15, Math.random() * Math.PI * 2, _rifle2.default, gimbalThree, scannerThree);

    _constants.dm.addDrone(droneOne);
    _constants.dm.addDrone(droneTwo);
    _constants.dm.addDrone(droneThree);
}

var fpsInterval = void 0,
    startTime = void 0,
    now = void 0,
    then = void 0,
    elapsed = void 0;

startAnimating(30);

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
    requestAnimationFrame(animate);
    now = Date.now();
    elapsed = now - then;
    if (elapsed > fpsInterval) {
        then = now - elapsed % fpsInterval;
    }
}

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _functions = __webpack_require__(5);

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
                    d.takeDamage(p.damage);
                    p.removeParticle();
                    // dm.drones.map((d) => console.log(d.id + ': ' + d.health));
                }
            });
        }
    }]);

    return ParticleManager;
}();

exports.default = ParticleManager;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _functions = __webpack_require__(5);

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
                return d;
            }).filter(function (d) {
                return d.health > 0;
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
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _constants = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GameGrid = function () {
    function GameGrid() {
        _classCallCheck(this, GameGrid);

        this._gridBlockSize = 100;
        this._rows = Math.floor(_constants.canvasWidth / this._gridBlockSize);
        this._columns = Math.floor(_constants.canvasWidth / this._gridBlockSize);
        this._grid = new Array(this._rows);
        for (var i = 0; i < this._grid.length; i++) {
            this._grid[i] = new Array(this._columns);
            for (var j = 0; j < this._grid.length; j++) {
                this._grid[i][j] = [];
            }
        }
    }

    _createClass(GameGrid, [{
        key: 'gridHasKeys',
        value: function gridHasKeys(x, y) {
            return x >= 0 && x < this._rows && y >= 0 && y < this._columns;
        }
    }, {
        key: 'addParticle',
        value: function addParticle(particle, x, y) {
            if (!this.gridHasKeys(x, y)) {
                return;
            }
            this._grid[x][y].push(particle);
        }
    }, {
        key: 'removeParticle',
        value: function removeParticle(particle, x, y) {
            if (!this.gridHasKeys(x, y)) {
                return;
            }
            this._grid[x][y] = this._grid[x][y].filter(function (p) {
                return p.id !== particle.id;
            });
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
/* 12 */
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
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _weapon = __webpack_require__(3);

var _weapon2 = _interopRequireDefault(_weapon);

var _constants = __webpack_require__(0);

var _shot = __webpack_require__(14);

var _shot2 = _interopRequireDefault(_shot);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Shotgun = function (_Weapon) {
    _inherits(Shotgun, _Weapon);

    function Shotgun(id, x, y, angle, gimbal) {
        _classCallCheck(this, Shotgun);

        var fireRate = 11;
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
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _bullet = __webpack_require__(4);

var _bullet2 = _interopRequireDefault(_bullet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Shot = function (_Bullet) {
    _inherits(Shot, _Bullet);

    function Shot(id, x, y, angle, velocity) {
        _classCallCheck(this, Shot);

        return _possibleConstructorReturn(this, (Shot.__proto__ || Object.getPrototypeOf(Shot)).call(this, id, x, y, 40, 0.5, angle, velocity, 1));
    }

    return Shot;
}(_bullet2.default);

exports.default = Shot;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _weapon = __webpack_require__(3);

var _weapon2 = _interopRequireDefault(_weapon);

var _nineMm = __webpack_require__(16);

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

        var fireRate = 3;
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
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _bullet = __webpack_require__(4);

var _bullet2 = _interopRequireDefault(_bullet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NineMM = function (_Bullet) {
    _inherits(NineMM, _Bullet);

    function NineMM(id, x, y, angle, velocity) {
        _classCallCheck(this, NineMM);

        return _possibleConstructorReturn(this, (NineMM.__proto__ || Object.getPrototypeOf(NineMM)).call(this, id, x, y, 45, 1, angle, velocity, 2));
    }

    return NineMM;
}(_bullet2.default);

exports.default = NineMM;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _weapon = __webpack_require__(3);

var _weapon2 = _interopRequireDefault(_weapon);

var _constants = __webpack_require__(0);

var _sevenSixTwoMm = __webpack_require__(18);

var _sevenSixTwoMm2 = _interopRequireDefault(_sevenSixTwoMm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Rifle = function (_Weapon) {
    _inherits(Rifle, _Weapon);

    function Rifle(id, x, y, angle, gimbal) {
        _classCallCheck(this, Rifle);

        var fireRate = 9;
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
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _bullet = __webpack_require__(4);

var _bullet2 = _interopRequireDefault(_bullet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SevenSixTwoMM = function (_Bullet) {
    _inherits(SevenSixTwoMM, _Bullet);

    function SevenSixTwoMM(id, x, y, angle, velocity) {
        _classCallCheck(this, SevenSixTwoMM);

        return _possibleConstructorReturn(this, (SevenSixTwoMM.__proto__ || Object.getPrototypeOf(SevenSixTwoMM)).call(this, id, x, y, 50, 2, angle, velocity, 17));
    }

    return SevenSixTwoMM;
}(_bullet2.default);

exports.default = SevenSixTwoMM;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _vector = __webpack_require__(1);

var _vector2 = _interopRequireDefault(_vector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Gimbal = function () {
    function Gimbal(angleLimit, turningSpeed) {
        _classCallCheck(this, Gimbal);

        this.vector = new _vector2.default(0, 0);
        this.vector.setAngle(0);
        this.vector.setLength(5);
        this.rotation = 'right';
        this.angleLimit = angleLimit;
        this.turningSpeed = turningSpeed;
    }

    _createClass(Gimbal, [{
        key: 'update',
        value: function update() {
            switch (true) {
                case this.rotation === 'right' && this.vector.getAngle() < this.angleLimit:
                    this.vector.setAngle(this.vector.getAngle() + this.turningSpeed);
                    break;
                case this.rotation === 'left' && this.vector.getAngle() > -this.angleLimit:
                    this.vector.setAngle(this.vector.getAngle() - this.turningSpeed);
                    break;
                case this.rotation === 'right' && this.vector.getAngle() > this.angleLimit:
                    this.rotation = 'left';
                    break;
                case this.rotation === 'left' && this.vector.getAngle() < -this.angleLimit:
                    this.rotation = 'right';
                    break;
            }
        }
    }]);

    return Gimbal;
}();

exports.default = Gimbal;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _constants = __webpack_require__(0);

var _drone = __webpack_require__(6);

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
                        if (!(item instanceof _drone2.default) || item.id === drone.id) {
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
            if (nearestTarget.target !== null && nearestTarget.distance < this.radius && nearestTarget.target.health > 0) {
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
            if (this.gridRange.end[0] > _constants.grid.rows) {
                this.gridRange.end[0] = _constants.grid.rows;
            }
            if (this.gridRange.end[1] > _constants.grid.columns) {
                this.gridRange.end[1] = _constants.grid.columns;
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
            var x = this._drone.position.x;
            var y = this._drone.position.y;
            this.gridRange = {
                start: [Math.floor((x - this.radius) / _constants.grid.gridBlockSize) - 1, Math.floor((y - this.radius) / _constants.grid.gridBlockSize) - 1],
                end: [Math.round((x + this.radius) / _constants.grid.gridBlockSize) + 1, Math.round((y + this.radius) / _constants.grid.gridBlockSize) + 1]
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
                _constants.context.strokeStyle = '#ffffff';
                _constants.context.strokeWidth = 2;
                _constants.context.stroke();
                _constants.context.resetTransform();
                _constants.context.setLineDash([1, 2]);
                _constants.context.beginPath();
                _constants.context.moveTo(drone.position.x, drone.position.y);
                _constants.context.lineTo(this.target.position.x, this.target.position.y);
                _constants.context.strokeStyle = this.color;
                _constants.context.strokeWidth = 1;
                _constants.context.strokeOpacity = 0.5;
                _constants.context.stroke();
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

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map