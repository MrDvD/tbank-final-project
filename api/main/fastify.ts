import Fastify from 'fastify';
import * as path from 'path';
import { fileURLToPath } from 'url';
import fastifyCookie from '@fastify/cookie';
import { initEndpoints } from "./endpoints";

function validateEnvironment() {
  return "APP_SECRET" in process.env;
}

if (!validateEnvironment()) {
  throw new Error("Unconfigured environment variables for web server.");
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const fastify = Fastify({
  logger: true,
});

fastify.register(import('@fastify/formbody'));

fastify.register(fastifyCookie, {
  secret: process.env.APP_SECRET,
});

fastify.register(await import('@fastify/static'), {
  root: path.join(__dirname, '../dist'),
});

initEndpoints(fastify);

await fastify.listen({
  port: 8080,
  host: "0.0.0.0"
});