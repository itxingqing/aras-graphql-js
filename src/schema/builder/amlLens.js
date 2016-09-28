/* @flow */
/**
 *  Copyright (c) 2016, Dejan Siedle
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 */
import R from 'ramda';

export const ValidResultPathLense = R.lensPath([
  'SOAP-ENV:Envelope',
  'SOAP-ENV:Body',
  'Result'
]);

export const FaultResultPathLense = R.lensPath([
  'SOAP-ENV:Envelope',
  'SOAP-ENV:Body',
  'SOAP-ENV:Fault'
]);