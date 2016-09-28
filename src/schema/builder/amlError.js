/* @flow */
/**
 *  Copyright (c) 2016, Dejan Siedle
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 */

export class AmlError {
  faultCode: string;
  faultString: string;
  faultLegacyDetail: string;
  faultLegacyString: string;
}
