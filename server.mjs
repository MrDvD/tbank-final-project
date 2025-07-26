import Fastify from 'fastify';
import path from 'path';
import { fileURLToPath } from 'url';

const fastify = Fastify({
  logger: true,
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

fastify.register(await import('@fastify/static'), {
  root: path.join(__dirname, 'public'),
});

fastify.get('/', function(_, reply) {
  reply.sendFile('main/index.html');
});

try {
  await fastify.listen({
    port: 3000,
  });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}