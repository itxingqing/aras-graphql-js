/* @flow */
/**
 *  Copyright (c) 2016, Dejan Siedle
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 */
import {
  AmlError,
  ValidResultPathLense,
  FaultResultPathLense,
  FaultCodeLense,
  FaultStringLense,
  FaultLegacyDetailLense,
  FaultLegacyStringLense,
  TypeAttributeLense
} from './';

import {
  view,
  isNil,
  groupBy
} from 'ramda';

import {
  Left,
  Right,
  Either
} from 'data.either';

export function unpack(soapMessage: JSON) : Either {
  const result: JSON = view(ValidResultPathLense, soapMessage);
  return isNil(result) ?
    Left(view(FaultResultPathLense, soapMessage)) :
    Right(result);
}

export const groupTypes = groupBy(item => {
  return view(TypeAttributeLense, item);
});

export function getErrorFrom(message: JSON) : AmlError {
  const result = new AmlError();

  result.faultCode = view(FaultCodeLense, message);
  result.faultString = view(FaultStringLense, message);
  result.faultLegacyDetail = view(FaultLegacyDetailLense, message);
  result.faultLegacyString = view(FaultLegacyStringLense, message);

  return result;
}
