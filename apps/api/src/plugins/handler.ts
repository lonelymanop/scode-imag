import fp from 'fastify-plugin';
import {HandlerRegistry} from '../common/domainFunctions/registry.js';

export default fp(async fastify => {
  fastify.decorate('handlerRegistry', new HandlerRegistry());
});

declare module 'fastify' {
  interface FastifyInstance {
    handlerRegistry: HandlerRegistry;
  }
}
