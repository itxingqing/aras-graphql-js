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

export const ValidResultPathLens = R.lensPath([
  'SOAP-ENV:Envelope',
  'SOAP-ENV:Body',
  'Result'
]);

export const FaultResultPathLens = R.lensPath([
  'SOAP-ENV:Envelope',
  'SOAP-ENV:Body',
  'SOAP-ENV:Fault'
]);

export const TypeAttributeLens = R.lensPath([
  '$',
  'type'
]);

export const IdAttributeLens = R.lensPath([
  '$',
  'id'
]);

export const TypeIdAttributeLens = R.lensPath([
  '$',
  'typeId'
]);

export const FaultCodeLens = R.lensProp('faultcode');

export const FaultStringLens = R.lensProp('faultstring');

export const FaultLegacyDetailLens = R.lensPath([
  'detail',
  'af:legacy_detail'
]);

export const FaultLegacyStringLens = R.lensPath([
  'detail',
  'af:legacy_faultstring'
]);

export const ItemLens = R.lensProp('Item');

export const ItemNameLens = R.lensProp('name');

export const RelationshipsLens = R.lensPath([
  'Relationships',
  'Item'
]);
