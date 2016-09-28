/* eslint-disable no-unused-expressions */

/**
 *  Copyright (c) 2016, Dejan Siedle
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 */

import {
  unpack,
  AmlError,
  toDictionary,
  getErrorFrom
} from '../';
import {view, lensProp} from 'ramda';
import {expect} from 'chai';
import {describe, it} from 'mocha';
import amlSchema from './amlSchema.json';
import testItemType from './itemTypePart.json';
import faultResponse from './amlFaultResponse.json';

describe('transform into a dictionary of items', () => {
  it('results into a dictionary object', () => {
    const maybeDb = unpack(amlSchema).chain( rootItem => {
      return toDictionary(rootItem);
    });
    const memoryDb = maybeDb.map(db => {
      return view(lensProp('4F1AC04A2B484F3ABA4E20DB63808A88'), db);
    });

    expect(memoryDb).to.exist;
  });
});

describe('read error message values', () => {
  const error: AmlError = unpack(faultResponse).orElse(errorMessage => {
    return getErrorFrom(errorMessage);
  });

  it('should have same error data', () => {
    expect(error).to.deep.equal({
      faultCode: '0',
      faultString: 'No items of type ItemType found.',
      faultLegacyDetail: 'No items of type ItemType found.',
      faultLegacyString: 'Some details...'
    });
  });
});

describe('unpack valid result', () => {
  it('is a valid response we expect Right result', () => {
    expect(true).to.be.equal(unpack(testItemType).isRight);
  });
});

describe('unpack falult result', () => {
  it('is a fault response then we expect Left result', () => {
    expect(true).to.be.equal(unpack(faultResponse).isLeft);
  });
});
