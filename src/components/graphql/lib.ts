import {
  GraphQLObjectType,
  isInputObjectType,
  isScalarType,
  isObjectType,
  GraphQLInputObjectType,
} from 'graphql';

function isCustomType(type: any) {
  return (
    'name' in type &&
    !isScalarType(type) &&
    !type.name.startsWith('__') &&
    !['Query', 'Mutation'].includes(type?.name)
  );
}

export function isGraphqlInputObjectType(type: unknown): type is GraphQLInputObjectType {
  return isCustomType(type) && isInputObjectType(type);
}

export function isGraphqlObjectType(type: unknown): type is GraphQLObjectType {
  return isCustomType(type) && isObjectType(type);
}
