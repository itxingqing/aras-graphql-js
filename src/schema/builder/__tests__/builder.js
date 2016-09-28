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
  groupTypes,
  getErrorFrom
} from '../';
import {expect} from 'chai';
import {describe, it} from 'mocha';
import amlSchema from './amlSchema.json';
import testItemType from './itemTypePart.json';
import faultResponse from './amlFaultResponse.json';

describe('group items by item type', () => {
  it('should result in an object with the properties ', () => {
    const groups = unpack(amlSchema).chain( amlItem => {
      return groupTypes(amlItem.Item);
    });

    expect(groups).to.exist;
    expect(groups.ItemType).to.exist;
    expect(groups.RelationshipType).to.exist;
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
