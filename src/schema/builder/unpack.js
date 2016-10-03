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
  ItemLens,
  ItemNameLens,
  RelationshipsLens,
  ValidResultPathLens,
  FaultResultPathLens,
  FaultCodeLens,
  FaultStringLens,
  IdAttributeLens,
  FaultLegacyDetailLens,
  FaultLegacyStringLens
} from './';

import {
  map,
  view,
  isNil,
  assoc,
  replace,
  compose,
  forEach,
} from 'ramda';

import {
  Left,
  Right,
  Either
} from 'data.either';

import {
  Maybe,
  Just,
  fromNullable
} from 'data.maybe';

import {
  GraphQLObjectType
} from 'graphql';

export function constructGraphQLObjects(memoryDb: Maybe) : Maybe {
  return memoryDb.map(db => {
    map(constructGraphQLObject, db);
  });
}

export function newGraphQLObject(maybeItem: Maybe) : Maybe {
  return maybeItem.map(item => {
    return Just(new GraphQLObjectType({
      name: normalize(ItemNameLens, item),
      fields: () => constructProperties(item)
    }));
  });
}

export function validateItem(item: JSON) : Maybe {
  const hasName = fromNullable(view(ItemNameLens, item));
  return hasName.map( () => {
    return Just(item);
  });
}

export function constructProperties(item: JSON) : any {
  const maybeProperties = fromNullable(view)
  return item;
}

export const normalize = compose(replaceSpacesWithDashes, view);

export const constructGraphQLObject = compose(newGraphQLObject, validateItem);

export function replaceSpacesWithDashes(value: string) : string {
  return replace(/ /g, '_', value);
}

export function toDictionary(rootItem: JSON) : Maybe {
  const maybeResult = fromNullable(view(ItemLens, rootItem));
  return maybeResult.map(itemArray => {
    const result = {};
    forEach(item => {
      assoc(view(IdAttributeLens, item), item, result);
    }, itemArray);
    return Just(result);
  });
}

export function unpack(soapMessage: JSON) : Either {
  const result: JSON = view(ValidResultPathLens, soapMessage);
  return isNil(result) ?
    Left(view(FaultResultPathLens, soapMessage)) :
    Right(result);
}

export function getErrorFrom(message: JSON) : AmlError {
  const result = new AmlError();

  result.faultCode = view(FaultCodeLens, message);
  result.faultString = view(FaultStringLens, message);
  result.faultLegacyDetail = view(FaultLegacyDetailLens, message);
  result.faultLegacyString = view(FaultLegacyStringLens, message);

  return result;
}
