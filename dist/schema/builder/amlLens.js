'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FaultResultPathLense = exports.ValidResultPathLense = undefined;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ValidResultPathLense = exports.ValidResultPathLense = _ramda2.default.lensPath(['SOAP-ENV:Envelope', 'SOAP-ENV:Body', 'Result']);
/**
 *  Copyright (c) 2016, Dejan Siedle
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 */
var FaultResultPathLense = exports.FaultResultPathLense = _ramda2.default.lensPath(['SOAP-ENV:Envelope', 'SOAP-ENV:Body', 'SOAP-ENV:Fault']);