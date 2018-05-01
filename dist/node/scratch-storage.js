module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading wasm modules
/******/ 	var installedWasmModules = {};
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
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
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
/******/ 	// object with all compiled WebAssembly.Modules
/******/ 	__webpack_require__.w = {};
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 17);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TextDecoder = __webpack_require__(5).TextDecoder;
var TextEncoder = __webpack_require__(5).TextEncoder;
var base64js = __webpack_require__(13);

var memoizedToString = function () {
    var strings = {};
    return function (assetId, data) {
        if (!strings.hasOwnProperty(assetId)) {
            strings[assetId] = base64js.fromByteArray(data);
        }
        return strings[assetId];
    };
}();

var Asset = function () {
    /**
     * Construct an Asset.
     * @param {AssetType} assetType - The type of this asset (sound, image, etc.)
     * @param {string} assetId - The ID of this asset.
     * @param {DataFormat} [dataFormat] - The format of the data (WAV, PNG, etc.); required iff `data` is present.
     * @param {Buffer} [data] - The in-memory data for this asset; optional.
     */
    function Asset(assetType, assetId, dataFormat, data) {
        _classCallCheck(this, Asset);

        /** @type {AssetType} */
        this.assetType = assetType;

        /** @type {string} */
        this.assetId = assetId;

        this.setData(data, dataFormat || assetType.runtimeFormat);

        /** @type {Asset[]} */
        this.dependencies = [];
    }

    _createClass(Asset, [{
        key: 'setData',
        value: function setData(data, dataFormat) {
            if (data && !dataFormat) {
                throw new Error('Data provided without specifying its format');
            }

            /** @type {DataFormat} */
            this.dataFormat = dataFormat;

            /** @type {Buffer} */
            this.data = data;
        }

        /**
         * @returns {string} - This asset's data, decoded as text.
         */

    }, {
        key: 'decodeText',
        value: function decodeText() {
            var decoder = new TextDecoder();
            return decoder.decode(this.data);
        }

        /**
         * Same as `setData` but encodes text first.
         * @param {string} data - the text data to encode and store.
         * @param {DataFormat} dataFormat - the format of the data (DataFormat.SVG for example).
         */

    }, {
        key: 'encodeTextData',
        value: function encodeTextData(data, dataFormat) {
            var encoder = new TextEncoder();
            this.setData(encoder.encode(data), dataFormat);
        }

        /**
         * @param {string} [contentType] - Optionally override the content type to be included in the data URI.
         * @returns {string} - A data URI representing the asset's data.
         */

    }, {
        key: 'encodeDataURI',
        value: function encodeDataURI(contentType) {
            contentType = contentType || this.assetType.contentType;
            return 'data:' + contentType + ';base64,' + memoizedToString(this.assetId, this.data);
        }
    }]);

    return Asset;
}();

module.exports = Asset;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (base64Data) {
  var isBrowser = typeof window !== 'undefined' && typeof window.atob === 'function'
  var binary = isBrowser ? window.atob(base64Data) : new Buffer(base64Data, 'base64').toString('binary')
  var bytes = new Uint8Array(binary.length)

  for (var i = 0; i < binary.length; ++i) {
    bytes[i] = binary.charCodeAt(i)
  }

  return bytes.buffer
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Base class for asset load/save helpers.
 * @abstract
 */
var Helper = function () {
    function Helper(parent) {
        _classCallCheck(this, Helper);

        this.parent = parent;
    }

    /**
     * Fetch an asset but don't process dependencies.
     * @param {AssetType} assetType - The type of asset to fetch.
     * @param {string} assetId - The ID of the asset to fetch: a project ID, MD5, etc.
     * @param {DataFormat} dataFormat - The file format / file extension of the asset to fetch: PNG, JPG, etc.
     * @return {Promise.<Asset>} A promise for the contents of the asset.
     */


    _createClass(Helper, [{
        key: "load",
        value: function load(assetType, assetId, dataFormat) {
            return Promise.reject(new Error("No asset of type " + assetType + " for ID " + assetId + " with format " + dataFormat));
        }
    }]);

    return Helper;
}();

module.exports = Helper;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Enumeration of the supported data formats.
 * @enum {string}
 */
var DataFormat = {
    JPG: 'jpg',
    JSON: 'json',
    MP3: 'mp3',
    PNG: 'png',
    SB2: 'sb2',
    SVG: 'svg',
    WAV: 'wav'
};

module.exports = DataFormat;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var DataFormat = __webpack_require__(3);

/**
 * Enumeration of the supported asset types.
 * @type {Object.<String,AssetType>}
 * @typedef {Object} AssetType - Information about a supported asset type.
 * @property {string} contentType - the MIME type associated with this kind of data. Useful for data URIs, etc.
 * @property {string} name - The human-readable name of this asset type.
 * @property {DataFormat} runtimeFormat - The default format used for runtime, in-memory storage of this asset. For
 *     example, a project stored in SB2 format on disk will be returned as JSON when loaded into memory.
 * @property {boolean} immutable - Indicates if the asset id is determined by the asset content.
 */
var AssetType = {
    ImageBitmap: {
        contentType: 'image/png',
        name: 'ImageBitmap',
        runtimeFormat: DataFormat.PNG,
        immutable: true
    },
    ImageVector: {
        contentType: 'image/svg+xml',
        name: 'ImageVector',
        runtimeFormat: DataFormat.SVG,
        immutable: true
    },
    Project: {
        contentType: 'application/json',
        name: 'Project',
        runtimeFormat: DataFormat.JSON,
        immutable: false
    },
    Sound: {
        contentType: 'audio/x-wav',
        name: 'Sound',
        runtimeFormat: DataFormat.WAV,
        immutable: true
    },
    Sprite: {
        contentType: 'application/json',
        name: 'Sprite',
        runtimeFormat: DataFormat.JSON,
        immutable: true
    }
};

module.exports = AssetType;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("text-encoding");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("nets");

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var nets = __webpack_require__(6);

var Asset = __webpack_require__(0);
var Helper = __webpack_require__(2);

/**
 * @typedef {function} UrlFunction - A function which computes a URL from asset information.
 * @param {Asset} - The asset for which the URL should be computed.
 * @returns {string} - The URL for the asset.
 */

var WebHelper = function (_Helper) {
    _inherits(WebHelper, _Helper);

    function WebHelper(parent) {
        _classCallCheck(this, WebHelper);

        /**
         * @type {Array.<SourceRecord>}
         * @typedef {object} SourceRecord
         * @property {Array.<string>} types - The types of asset provided by this source, from AssetType's name field.
         * @property {UrlFunction} urlFunction - A function which computes a URL from an Asset.
         */
        var _this = _possibleConstructorReturn(this, (WebHelper.__proto__ || Object.getPrototypeOf(WebHelper)).call(this, parent));

        _this.sources = [];
        return _this;
    }

    /**
     * Register a web-based source for assets. Sources will be checked in order of registration.
     * @param {Array.<AssetType>} types - The types of asset provided by this source.
     * @param {UrlFunction} urlFunction - A function which computes a URL from an Asset.
     */


    _createClass(WebHelper, [{
        key: 'addSource',
        value: function addSource(types, urlFunction) {
            this.sources.push({
                types: types.map(function (assetType) {
                    return assetType.name;
                }),
                urlFunction: urlFunction
            });
        }

        /**
         * Fetch an asset but don't process dependencies.
         * @param {AssetType} assetType - The type of asset to fetch.
         * @param {string} assetId - The ID of the asset to fetch: a project ID, MD5, etc.
         * @param {DataFormat} dataFormat - The file format / file extension of the asset to fetch: PNG, JPG, etc.
         * @return {Promise.<Asset>} A promise for the contents of the asset.
         */

    }, {
        key: 'load',
        value: function load(assetType, assetId, dataFormat) {

            /** @type {Array.<{url:string, result:*}>} List of URLs attempted & errors encountered. */
            var errors = [];
            var sources = this.sources.slice();
            var asset = new Asset(assetType, assetId, dataFormat);
            var sourceIndex = 0;

            return new Promise(function (fulfill, reject) {

                var tryNextSource = function tryNextSource() {

                    /** @type {UrlFunction} */
                    var urlFunction = void 0;

                    while (sourceIndex < sources.length) {
                        var source = sources[sourceIndex];
                        ++sourceIndex;
                        if (source.types.indexOf(assetType.name) >= 0) {
                            urlFunction = source.urlFunction;
                            break;
                        }
                    }

                    if (urlFunction) {
                        var url = urlFunction(asset);

                        nets({ url: url }, function (err, resp, body) {
                            // body is a Buffer
                            if (err) {
                                tryNextSource();
                            } else {
                                asset.setData(body, dataFormat);
                                fulfill(asset);
                            }
                        });
                    } else if (errors.length > 0) {
                        reject(errors);
                    } else {
                        fulfill(null); // no sources matching asset
                    }
                };

                tryNextSource();
            });
        }
    }]);

    return WebHelper;
}(Helper);

module.exports = WebHelper;

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("localforage");

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var localforage = __webpack_require__(8);

var Asset = __webpack_require__(0);
var Helper = __webpack_require__(2);

/**
 * Implements storage on the local device, available even when the device has no network connection.
 */

var LocalHelper = function (_Helper) {
    _inherits(LocalHelper, _Helper);

    function LocalHelper(parent) {
        _classCallCheck(this, LocalHelper);

        var _this = _possibleConstructorReturn(this, (LocalHelper.__proto__ || Object.getPrototypeOf(LocalHelper)).call(this, parent));

        localforage.config({
            name: 'Scratch 3.0',
            size: 100 * 1024 * 1024
        });
        return _this;
    }

    /**
     * Fetch an asset but don't process dependencies.
     * @param {AssetType} assetType - The type of asset to fetch.
     * @param {string} assetId - The ID of the asset to fetch: a project ID, MD5, etc.
     * @param {DataFormat} dataFormat - The file format / file extension of the asset to fetch: PNG, JPG, etc.
     * @return {Promise.<Asset>} A promise for the contents of the asset.
     */


    _createClass(LocalHelper, [{
        key: 'load',
        value: function load(assetType, assetId, dataFormat) {
            return new Promise(function (fulfill, reject) {
                var fileName = [assetId, dataFormat].join('.');
                localforage.getItem(fileName).then(function (data) {
                    if (data === null) {
                        fulfill(null);
                    } else {
                        fulfill(new Asset(assetType, assetId, dataFormat, data));
                    }
                }, function (error) {
                    reject(error);
                });
            });
        }
    }]);

    return LocalHelper;
}(Helper);

module.exports = LocalHelper;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1)("PD94bWwgdmVyc2lvbj0iMS4wIj8+Cjxzdmcgd2lkdGg9IjEyOCIgaGVpZ2h0PSIxMjgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6c3ZnPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiA8Zz4KICA8cmVjdCBmaWxsPSIjQ0NDIiBoZWlnaHQ9IjEyOCIgd2lkdGg9IjEyOCIvPgogIDx0ZXh0IGZpbGw9ImJsYWNrIiB5PSIxMDciIHg9IjM1LjUiIGZvbnQtc2l6ZT0iMTI4Ij4/PC90ZXh0PgogPC9nPgo8L3N2Zz4K")

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1)("UklGRiYAAABXQVZFZm10IBAAAAABAAEAIlYAAESsAAACABAAZGF0YQIAAAAAAA==")

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1)("iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAAAAADmVT4XAAADZElEQVR42u3a70vbQBgH8O/7vOibvsmbFUEEWUGGUhQ25nDuhSKIUFDxlYi0SAd94atRmFiHCH2x4W8iiNtwowXRgd1QipJYY3N/1F4kTQ6XLKS9yyHcvWyO8MnT5y53Tw5EcIMESIAESIAESIAESIAEPFVAq/6l8G4oAQCp4aniwbUVJ6BVzafwqKXy1VZMgNb+CHzbyK4ZB+Bi0nnk0VyhsDiSoAmvvnMHmGUVAF6UG+0ffsxRhsRHky/AyCsAUpumX0wAAIs6T4CxDADDtcdZsal6gjmdH8AsAEC6+s8Fa48SFExeAKusAEju+V367AmUCi9ANQ0AU3pwcOw2cMEH0FwAAKz5X228pRLR5AI4TgIAtIDL24oLUE94AB6W7LsH/cONN14Ilh44AOqD9s2LQR1KHiB9zgGgOSGeuA3ocPrME1Q4ANaceyePAzrcjHmAZYs9IBeW4/fzHiAwTCwAgTle9ACZK44ALDT9e6x7gL4aT0BQCHb4AqgA5/1TTOMLoJ7vZSMM0H/GHnCeDnu+CrU8vGYPcN5FADBYD0vCaYPDy+i0p337GSMsS1Z4vA3t9QgAZTt0IuIxFRPSKicAQHlvhk3FXF5GhBByMa8qo/sBO6BarwuYbYrYnFKDYEvE7phKgcxvEQBqnvhgiQCUOgoAO4C3JOS3L/hv23UXxVldBECfcueAqpAa0WGy/QeULREAY6aTXRFDgBuA13+ElOncAERMAGaA9hBQD4gQQHsIRE1AZoD2xrgQS5nOZyHgFKmWDSIG4GRAVidiAE4GRB6AzAB2AKIPQFaA5myHA5AV4ESNugZhC7BLR50lIBPAebrzBGQCKAFQNSIMcDvRTQIwAHxNApM3RBygGK0uyhxwOwGsPAgEnPWj5ycRCNiJtBHlAChGKQVwANzPY+CXSMDNWISiLA9AfRA5IhJQ68UnoQAt+AtOPIBKhJosF8B6UM0yLkAxQk2WCyDX9SiUh1gkQAIkoCuAvjGuquMbuijAtwG7MPL8yBICOHSPk3W8Ne8KcEUdmBi6FADYos+QleIH0N/ogOxd7AD6uAS6WRU8WcBdlgZMG/EnYUlwEpLLoQ4PjzGbiA5UsRMRsbQ+5ziDJmYqJuR6NaMomdXuFuZyPSABEiABEiABEiABEiAc8Bd6VyvCEKGqcQAAAABJRU5ErkJggg==")

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("base64-js");

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("js-md5");

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var md5 = __webpack_require__(14);

var Asset = __webpack_require__(0);
var AssetType = __webpack_require__(4);
var DataFormat = __webpack_require__(3);
var Helper = __webpack_require__(2);

/**
 * @typedef {object} BuiltinAssetRecord
 * @property {AssetType} type - The type of the asset.
 * @property {DataFormat} format - The format of the asset's data.
 * @property {?string} id - The asset's unique ID.
 * @property {Buffer} data - The asset's data.
 */

/**
 * @type {BuiltinAssetRecord[]}
 */
var DefaultAssets = [{
    type: AssetType.ImageBitmap,
    format: DataFormat.PNG,
    id: null,
    data: new Buffer(__webpack_require__(12)) // eslint-disable-line global-require
}, {
    type: AssetType.Sound,
    format: DataFormat.WAV,
    id: null,
    data: new Buffer(__webpack_require__(11)) // eslint-disable-line global-require
}, {
    type: AssetType.ImageVector,
    format: DataFormat.SVG,
    id: null,
    data: new Buffer(__webpack_require__(10)) // eslint-disable-line global-require
}];

/**
 * @type {BuiltinAssetRecord[]}
 */
var BuiltinAssets = DefaultAssets.concat([]);

var BuiltinHelper = function (_Helper) {
    _inherits(BuiltinHelper, _Helper);

    function BuiltinHelper(parent) {
        _classCallCheck(this, BuiltinHelper);

        /**
         * In-memory storage for all built-in assets.
         * @type {Object.<AssetType, AssetIdMap>} Maps asset type to a map of asset ID to actual assets.
         * @typedef {Object.<string, BuiltinAssetRecord>} AssetIdMap - Maps asset ID to asset.
         */
        var _this = _possibleConstructorReturn(this, (BuiltinHelper.__proto__ || Object.getPrototypeOf(BuiltinHelper)).call(this, parent));

        _this.assets = {};

        BuiltinAssets.forEach(function (assetRecord) {
            assetRecord.id = _this.cache(assetRecord.type, assetRecord.format, assetRecord.data, assetRecord.id);
        });
        return _this;
    }

    /**
     * Call `setDefaultAssetId` on the parent `ScratchStorage` instance to register all built-in default assets.
     */


    _createClass(BuiltinHelper, [{
        key: 'registerDefaultAssets',
        value: function registerDefaultAssets() {
            var numAssets = DefaultAssets.length;
            for (var assetIndex = 0; assetIndex < numAssets; ++assetIndex) {
                var assetRecord = DefaultAssets[assetIndex];
                this.parent.setDefaultAssetId(assetRecord.type, assetRecord.id);
            }
        }

        /**
         * Synchronously fetch a cached asset for a given asset id. Returns null if not found.
         * @param {string} assetId - The id for the asset to fetch.
         * @returns {?Asset} The asset for assetId, if it exists.
         */

    }, {
        key: 'get',
        value: function get(assetId) {
            var asset = null;
            if (this.assets.hasOwnProperty(assetId)) {
                /** @type{BuiltinAssetRecord} */
                var assetRecord = this.assets[assetId];
                asset = new Asset(assetRecord.type, assetRecord.id, assetRecord.format, assetRecord.data);
            }
            return asset;
        }

        /**
         * Cache an asset for future lookups by ID.
         * @param {AssetType} assetType - The type of the asset to cache.
         * @param {DataFormat} dataFormat - The dataFormat of the data for the cached asset.
         * @param {Buffer} data - The data for the cached asset.
         * @param {string} id - The id for the cached asset.
         * @returns {string} The calculated id of the cached asset, or the supplied id if the asset is mutable.
         */

    }, {
        key: 'cache',
        value: function cache(assetType, dataFormat, data, id) {
            if (!dataFormat) throw new Error('Data cached without specifying its format');
            if (id) {
                if (this.assets.hasOwnProperty(id) && assetType.immutable) return id;
            } else if (assetType.immutable) {
                id = md5(data);
            }
            this.assets[id] = {
                type: assetType,
                format: dataFormat,
                id: id,
                data: data
            };
            return id;
        }

        /**
         * Fetch an asset but don't process dependencies.
         * @param {AssetType} assetType - The type of asset to fetch.
         * @param {string} assetId - The ID of the asset to fetch: a project ID, MD5, etc.
         * @return {Promise.<Asset>} A promise for the contents of the asset.
         */

    }, {
        key: 'load',
        value: function load(assetType, assetId) {
            return Promise.resolve(this.get(assetId));
        }
    }]);

    return BuiltinHelper;
}(Helper);

module.exports = BuiltinHelper;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BuiltinHelper = __webpack_require__(15);
var LocalHelper = __webpack_require__(9);
var WebHelper = __webpack_require__(7);

var _Asset = __webpack_require__(0);
var _AssetType = __webpack_require__(4);
var _DataFormat = __webpack_require__(3);

var ScratchStorage = function () {
    function ScratchStorage() {
        _classCallCheck(this, ScratchStorage);

        this.defaultAssetId = {};

        this.builtinHelper = new BuiltinHelper(this);
        this.webHelper = new WebHelper(this);
        this.localHelper = new LocalHelper(this);

        this.builtinHelper.registerDefaultAssets(this);
    }

    /**
     * @return {Asset} - the `Asset` class constructor.
     * @constructor
     */


    _createClass(ScratchStorage, [{
        key: 'get',


        /**
         * Synchronously fetch a cached asset from built-in storage. Assets are cached when they are loaded.
         * @param {string} assetId - The id of the asset to fetch.
         * @returns {?Asset} The asset, if it exists.
         */
        value: function get(assetId) {
            return this.builtinHelper.get(assetId);
        }

        /**
         * Cache an asset for future lookups by ID.
         * @param {AssetType} assetType - The type of the asset to cache.
         * @param {DataFormat} dataFormat - The dataFormat of the data for the cached asset.
         * @param {Buffer} data - The data for the cached asset.
         * @param {string} id - The id for the cached asset.
         * @returns {string} The calculated id of the cached asset, or the supplied id if the asset is mutable.
         */

    }, {
        key: 'cache',
        value: function cache(assetType, dataFormat, data, id) {
            return this.builtinHelper.cache(assetType, dataFormat, data, id);
        }

        /**
         * Register a web-based source for assets. Sources will be checked in order of registration.
         * @param {Array.<AssetType>} types - The types of asset provided by this source.
         * @param {UrlFunction} urlFunction - A function which computes a URL from an Asset.
         */

    }, {
        key: 'addWebSource',
        value: function addWebSource(types, urlFunction) {
            this.webHelper.addSource(types, urlFunction);
        }

        /**
         * TODO: Should this be removed in favor of requesting an asset with `null` as the ID?
         * @param {AssetType} type - Get the default ID for assets of this type.
         * @return {?string} The ID of the default asset of the given type, if any.
         */

    }, {
        key: 'getDefaultAssetId',
        value: function getDefaultAssetId(type) {
            if (this.defaultAssetId.hasOwnProperty(type.name)) {
                return this.defaultAssetId[type.name];
            }
        }

        /**
         * Set the default ID for a particular type of asset. This default asset will be used if a requested asset cannot
         * be found and automatic fallback is enabled. Ideally this should be an asset that is available locally or even
         * one built into this module.
         * TODO: Should this be removed in favor of requesting an asset with `null` as the ID?
         * @param {AssetType} type - The type of asset for which the default will be set.
         * @param {string} id - The default ID to use for this type of asset.
         */

    }, {
        key: 'setDefaultAssetId',
        value: function setDefaultAssetId(type, id) {
            this.defaultAssetId[type.name] = id;
        }

        /**
         * Fetch an asset by type & ID.
         * @param {AssetType} assetType - The type of asset to fetch. This also determines which asset store to use.
         * @param {string} assetId - The ID of the asset to fetch: a project ID, MD5, etc.
         * @param {DataFormat} [dataFormat] - Optional: load this format instead of the AssetType's default.
         * @return {Promise.<Asset>} A promise for the requested Asset.
         *   If the promise is fulfilled with non-null, the value is the requested asset or a fallback.
         *   If the promise is fulfilled with null, the desired asset could not be found with the current asset sources.
         *   If the promise is rejected, there was an error on at least one asset source. HTTP 404 does not count as an
         *   error here, but (for example) HTTP 403 does.
         */

    }, {
        key: 'load',
        value: function load(assetType, assetId, dataFormat) {
            var _this = this;

            /** @type {Helper[]} */
            var helpers = [this.builtinHelper, this.localHelper, this.webHelper];
            var errors = [];
            var helperIndex = 0;
            dataFormat = dataFormat || assetType.runtimeFormat;

            return new Promise(function (fulfill, reject) {
                var tryNextHelper = function tryNextHelper() {
                    if (helperIndex < helpers.length) {
                        var helper = helpers[helperIndex++];
                        helper.load(assetType, assetId, dataFormat).then(function (asset) {
                            if (asset === null) {
                                tryNextHelper();
                            } else {
                                // TODO? this.localHelper.cache(assetType, assetId, asset);
                                if (helper !== _this.builtinHelper && assetType.immutable) {
                                    asset.assetId = _this.builtinHelper.cache(assetType, asset.dataFormat, asset.data, assetId);
                                }
                                // Note that other attempts may have caused errors, effectively suppressed here.
                                fulfill(asset);
                            }
                        }, function (error) {
                            errors.push(error);
                            // TODO: maybe some types of error should prevent trying the next helper?
                            tryNextHelper();
                        });
                    } else if (errors.length === 0) {
                        // Nothing went wrong but we couldn't find the asset.
                        fulfill(null);
                    } else {
                        // At least one thing went wrong and also we couldn't find the asset.
                        reject(errors);
                    }
                };

                tryNextHelper();
            });
        }
    }, {
        key: 'Asset',
        get: function get() {
            return _Asset;
        }

        /**
         * @return {AssetType} - the list of supported asset types.
         * @constructor
         */

    }, {
        key: 'AssetType',
        get: function get() {
            return _AssetType;
        }

        /**
         * @return {DataFormat} - the list of supported data formats.
         * @constructor
         */

    }, {
        key: 'DataFormat',
        get: function get() {
            return _DataFormat;
        }

        /**
         * @deprecated Please use the `Asset` member of a storage instance instead.
         * @return {Asset} - the `Asset` class constructor.
         * @constructor
         */

    }], [{
        key: 'Asset',
        get: function get() {
            return _Asset;
        }

        /**
         * @deprecated Please use the `AssetType` member of a storage instance instead.
         * @return {AssetType} - the list of supported asset types.
         * @constructor
         */

    }, {
        key: 'AssetType',
        get: function get() {
            return _AssetType;
        }
    }]);

    return ScratchStorage;
}();

module.exports = ScratchStorage;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ScratchStorage = __webpack_require__(16);

/**
 * Export for use with NPM & Node.js.
 * @type {ScratchStorage}
 */
module.exports = ScratchStorage;

/***/ })
/******/ ]);
//# sourceMappingURL=scratch-storage.js.map