import Fastify, { FastifyReply, FastifyRequest } from 'fastify';
import * as path from 'path';
import { fileURLToPath } from 'url';
import * as db from './database.js';
import fastifyCookie from '@fastify/cookie';

function validateEnvironment() {
  return "APP_SECRET" in process.env;
}

if (!validateEnvironment()) {
  throw new Error("Unconfigured environment variables for web server.");
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

fastify.get('/', function(_, reply) {
  return reply.sendFile('index.html', 'dist/main');
});

fastify.route({
  method: "POST",
  url: "/register",
  handler: async function(request: FastifyRequest<{ Body: { login: string, password: string } }>, reply) {
    const { login, password } = request.body;
    const id = await db.register(login, password);
    if (typeof id === 'number') {
      reply.setCookie('user_id', String(id));
      reply.redirect("/");
    } else {
      reply.code(403).send({
        error: 'Couldn\'t register a new user with these credentials.',
      });
    }
  },
});

fastify.route({
  method: "POST",
  url: "/login",
  handler: async function(request: FastifyRequest<{ Body: { login: string, password: string } }>, reply) {
    const { login, password } = request.body;
    const id = await db.login(login, password);
    if (typeof id === 'number') {
      reply.setCookie('user_id', String(id));
      reply.redirect("/");
    } else {
      reply.code(403).send({
        error: 'Couldn\'t log in with these credentials.',
      });
    }
  },
});

fastify.get('/enter', function(request: FastifyRequest<{ Querystring: { register?: string } }>, reply) {
  const userId = request.cookies.user_id;
  if (userId) {
    reply.redirect("/");
  } else {
    reply.sendFile('index.html', request.query.register === 'true' ? 'dist/register' : 'dist/login');
  }
});

// fastify.get<{ Params: { postId: number } }>('/get_comments/:postId', async function(request, reply) {
//   try {
//     const comments = await db.getComments(request.params.postId);
//     return reply.send(comments);
//   } catch (error) {
//     reply.code(500).send({
//       error: `Failed to fetch comments for post #${postId}`
//     });
//   }
// });

fastify.route({
  method: "POST",
  url: "/post_comment",
  handler: async function(request: FastifyRequest<{ Body: { postId: number, userId: number, content: string } }>, reply) {
    // handle errors
    const { postId, userId, content } = request.body;
    if (postId !== undefined && userId !== undefined && content !== undefined) {
      await db.postComment(postId, userId, content);
      reply.code(200).send();
    } else {
      // change http code
      reply.code(403).send({
        error: 'Unable to parse the body content of a comment.'
      });
    }
    return 0;
  },
});

try {
  await fastify.listen({
    port: 8080,
    host: "0.0.0.0"
  });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}