import Fastify from 'fastify';
import path from 'path';
import { fileURLToPath } from 'url';
import * as db from './api/database.mjs';
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
  root: path.join(__dirname, 'dist'),
});

fastify.get('/', function(_, reply) {
  return reply.sendFile('index.html', 'dist/main');
});

fastify.get('/get_comments/:postId', async function(request, reply) {
  try {
    const comments = await db.getComments(request.params.postId);
    return reply.send(comments);
  } catch (error) {
    reply.code(500).send({
      error: `Failed to fetch comments for post #${postId}`
    });
  }
});

fastify.route({
  method: "POST",
  url: "/post_comment",
  // schema: {
  //   body: {

  //   },
  // },
  handler: function(request, reply) {
    // handle errors
    const postId = request.body['post_id'];
    const userId = request.body['user_id'];
    const content = request.body['content'];
    if (postId !== undefined && userId !== undefined && content !== undefined) {
      db.postComment(postId, userId, content);
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

fastify.route({
  method: "POST",
  url: "/login",
  handler: function(request, reply) {
    const login = request.body['login'];
    const password = request.body['password'];
    if (login !== undefined && password !== undefined) {
      const id = db.login(login, password);
      if (id.length == 1) {
        reply.setCookie('user_id', id[0]);
        reply.redirect("/");
      } else {
        reply.code(403).send({
          error: 'Couldn\'t log in with these credentials.',
        });
      }
    } else {
      reply.code(403).send({
        error: 'Unable to parse the body content of a register.',
      });
    }
  },
});

fastify.route({
  method: "POST",
  url: "/register",
  handler: function(request, reply) {
    const login = request.body['login'];
    const password = request.body['password'];
    if (login !== undefined && password !== undefined) {
      const id = db.register(login, password);
      if (id !== undefined) {
        reply.setCookie('user_id', id);
        reply.redirect("/");
      } else {
        reply.code(403).send({
          error: 'Couldn\'t register a new user with these credentials.',
        });
      }
    } else {
      reply.code(403).send({
        error: 'Unable to parse the body content of a register.',
      });
    }
  },
});

try {
  // // change this logic
  // await db.initDatabase();

  await fastify.listen({
    port: 8080,
    host: "0.0.0.0"
  });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}