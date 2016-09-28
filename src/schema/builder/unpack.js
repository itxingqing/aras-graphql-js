/* @flow */
/**
 *  Copyright (c) 2016, Dejan Siedle
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 */
import {ValidResultPathLense, FaultResultPathLense} from './';
import R from 'ramda';
import Either from 'data.either';


export function unpack(soapMessage: JSON) : Either {
  const result: JSON = R.view(ValidResultPathLense, soapMessage);
  return R.isNil(result) ?
    Either.Left(R.view(FaultResultPathLense, soapMessage)) :
    Either.Right(result);
}