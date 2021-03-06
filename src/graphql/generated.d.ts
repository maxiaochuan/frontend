/* tslint:disable */
import { GraphQLResolveInfo, GraphQLScalarType } from 'graphql';
/**
 * This file is auto-generated by graphql-schema-typescript
 * Please note that any changes in this file may be overwritten
 */
 

/*******************************
 *                             *
 *          TYPE DEFS          *
 *                             *
 *******************************/
export interface GQLQuery {
  users: Array<GQLUser>;
}

export interface GQLUser {
  createdAt: GQLISO8601DateTime;
  email: string;
  id: string;
  name: string;
  updatedAt: GQLISO8601DateTime;
}

/**
 * An ISO 8601-encoded datetime
 */
export type GQLISO8601DateTime = any;

export interface GQLMutation {
  
  /**
   * An example field added by the generator
   */
  testField: string;
}

/*********************************
 *                               *
 *         TYPE RESOLVERS        *
 *                               *
 *********************************/
/**
 * This interface define the shape of your resolver
 * Note that this type is designed to be compatible with graphql-tools resolvers
 * However, you can still use other generated interfaces to make your resolver type-safed
 */
export interface GQLResolver {
  Query?: GQLQueryTypeResolver;
  User?: GQLUserTypeResolver;
  ISO8601DateTime?: GraphQLScalarType;
  Mutation?: GQLMutationTypeResolver;
}
export interface GQLQueryTypeResolver<TParent = any> {
  users?: QueryToUsersResolver<TParent>;
}

export interface QueryToUsersResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface GQLUserTypeResolver<TParent = any> {
  createdAt?: UserToCreatedAtResolver<TParent>;
  email?: UserToEmailResolver<TParent>;
  id?: UserToIdResolver<TParent>;
  name?: UserToNameResolver<TParent>;
  updatedAt?: UserToUpdatedAtResolver<TParent>;
}

export interface UserToCreatedAtResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface UserToEmailResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface UserToIdResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface UserToNameResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface UserToUpdatedAtResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface GQLMutationTypeResolver<TParent = any> {
  testField?: MutationToTestFieldResolver<TParent>;
}

export interface MutationToTestFieldResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}
