// Import the framework and instantiate it
import Fastify from "fastify";
import { registerPostRoutes } from "./controllers/post.js";
import { registerAuthRoutes } from "./controllers/auth.js";
import fastifyCors from "@fastify/cors";
import FastifyAuth from "@fastify/auth";
import { registerAuthMiddlewares } from "./middleware/auth.js";
import FastifySwagger from '@fastify/swagger'
import FastifySwaggerUI from '@fastify/swagger-ui'

import { registerErrorMiddleware } from "./middleware/error.js";
import { registerCategoryRoutes } from "./controllers/category.js";

const fastify = Fastify({
  logger: true,
  ajv: { customOptions: { removeAdditional: true } }
});

await fastify.register(fastifyCors, {
  origin: process.env.NODE_ENV === "production" ? "example.com" : "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
});
await fastify.register(FastifySwagger, {
  openapi: {
    components: {
      securitySchemes: {
        token: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    }
  }
})

await fastify.register(FastifySwaggerUI, {
  routePrefix: '/documentation',
  uiConfig: {
    docExpansion: 'list'
  }
})
await fastify.register(FastifyAuth);

registerErrorMiddleware(fastify);
registerAuthMiddlewares(fastify);
registerPostRoutes(fastify);
registerAuthRoutes(fastify);
registerCategoryRoutes(fastify);

// Run the server!
try {
  await fastify.listen({
    port: process.env.PORT || 3000,
    host: process.env.HOST || 'localhost'
  });
  await fastify.ready()
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
