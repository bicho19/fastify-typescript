import {ERROR400, ERROR401, ERROR404, ERROR500, responseProperty} from '@constants/constants';
import {FastifyRequest, FastifySchema} from 'fastify';

import {Static, Type} from '@sinclair/typebox';

export const GetUsersQuery = Type.Object({
  name: Type.String(),
  mail: Type.Optional(Type.String({format: 'email'}))
});

export type GetUsersQueryType = Static<typeof GetUsersQuery>

export type GetUsersRequest = FastifyRequest<{
  Querystring: GetUsersQueryType
}>

export const GetUserSchema: FastifySchema = {
  description: 'Get users endpoint',
  tags: ['users'],
  querystring: GetUsersQuery.properties,
  response: {
    200: {
      description: 'Successful get response',
      type: 'object',
      properties: {
        ...responseProperty,
        data: {type: 'object', properties: {email: {type: 'string'}}}
      }
    },
    400: ERROR400,
    401: ERROR401,
    404: ERROR404,
    500: ERROR500
  }
};
