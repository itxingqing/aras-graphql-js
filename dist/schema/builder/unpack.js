'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unpack = unpack;

var _ = require('./');

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _data = require('data.either');

var _data2 = _interopRequireDefault(_data);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function unpack(soapMessage) {
  var result = _ramda2.default.view(_.ValidResultPathLense, soapMessage);
  return _ramda2.default.isNil(result) ? _data2.default.Left(_ramda2.default.view(_.FaultResultPathLense, soapMessage)) : _data2.default.Right(result);
}
/**
 *  Copyright (c) 2016, Dejan Siedle
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 */