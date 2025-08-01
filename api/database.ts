import sql from './sql.js';
import { Optional } from './abstracts/types.js';

// of course, this is not safe. at least i should rewrite it using hash function
export async function register(login: string, password: string): Promise<Optional<number>> {
  const result = await sql<{ user_id: number }[]>`
    insert into USERS(login, password)
      values (${login}, ${password})
      returning user_id;
  `;
  return result.length > 0 ? result[0].user_id : null;
}

// of course, this is not safe. at least i should rewrite it using hash function
export async function login(login: string, password: string): Promise<Optional<number>> {
  const result = await sql<{ user_id: number }[]>`
    select user_id from USERS
      where login = ${login} and password = ${password}
      returning user_id;
  `;
  return result.length > 0 ? result[0].user_id : null;
}

// export async function getComments(postId: number): Promise<Array<NewsComment>> {
//   const comments = await sql`
//     select * from COMMENTS
//       where post_id = ${postId};
//   `;
//   return comments;
// }

export async function postComment(postId: number, userId: number, content: string): Promise<void> {
  await sql`
    insert into COMMENTS(post_id, user_id, content)
      values (${postId}, ${userId}, ${content});
  `;
}