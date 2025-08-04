import { FastifyInstance, FastifyRequest } from "fastify";
import { NewsUserBuilder } from "../implementations/builders";
import { NewsUserWorker } from "../implementations/cruds";
import { connectPostgres } from "./postgres";

const sql = connectPostgres();
const newsUserBuilder = new NewsUserBuilder();
const newsUsersWorker = new NewsUserWorker(sql);

export function initEndpoints(fastify: FastifyInstance) {
  fastify.get('/', function(_, reply) {
    return reply.sendFile('index.html', 'dist/main');
  });

  initLoginEntrypoints(fastify);

  // fastify.route({
  //   method: "POST",
  //   url: "/post_comment",
  //   handler: async function(request: FastifyRequest<{ Body: { postId: number, userId: number, content: string } }>, reply) {
  //     // handle errors
  //     const { postId, userId, content } = request.body;
  //     if (postId !== undefined && userId !== undefined && content !== undefined) {
  //       await db.postComment(postId, userId, content);
  //       reply.code(200).send();
  //     } else {
  //       // change http code
  //       reply.code(403).send({
  //         error: 'Unable to parse the body content of a comment.'
  //       });
  //     }
  //     return 0;
  //   },
  // });
}

function initLoginEntrypoints(fastify: FastifyInstance) {
  fastify.get('/enter', function(request: FastifyRequest<{ Querystring: { register?: string } }>, reply) {
    const userId = request.cookies.user_id;
    if (userId) {
      reply.redirect("/");
    } else {
      reply.sendFile('index.html', request.query.register === 'true' ? 'dist/register' : 'dist/login');
    }
  });

  fastify.route({
    method: "POST",
    url: "/register",
    handler: async function(request: FastifyRequest<{ Body: { login: string, password: string } }>, reply) {
      const { login, password } = request.body;
      const builder = newsUserBuilder.init();
      builder.set("login", () => login);
      builder.set("password", () => password);
      const templateUser = builder.build();
      if (!templateUser) {
        reply.code(500).send({
          error: 'Couldn\'t process register query.',
        });
        return;
      }
      const user = await newsUsersWorker.add(templateUser);
      if (user) {
        reply.setCookie('user_id', String(user.user_id));
        reply.redirect("/");
      } else {
        reply.code(403).send({
          error: 'Couldn\'t register a new user with these credentials.',
        });
      }
    },
  });

  // fastify.route({
  //   method: "POST",
  //   url: "/login",
  //   handler: async function(request: FastifyRequest<{ Body: { login: string, password: string } }>, reply) {
  //     const { login, password } = request.body;
  //     const id = await db.login(login, password);
  //     if (typeof id === 'number') {
  //       reply.setCookie('user_id', String(id));
  //       reply.redirect("/");
  //     } else {
  //       reply.code(403).send({
  //         error: 'Couldn\'t log in with these credentials.',
  //       });
  //     }
  //   },
  // });
}