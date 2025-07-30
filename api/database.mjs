import sql from './sql.mjs';
import * as fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// of course, this is not safe. at least i should rewrite it using hash function
export async function register(login, password) {
  const result = await sql`
    insert into USERS(login, password)
      values (${login}, ${password});
  `;
  return result['user_id'];
}

// of course, this is not safe. at least i should rewrite it using hash function
export async function login(login, password) {
  return await sql`
    select user_id from USERS
      where login = ${login} and password = ${password};
  `;
}

export async function getComments(postId) {
  const comments = await sql`
    select * from COMMENTS
      where post_id = ${postId};
  `;
  return comments;
}

export async function postComment(postId, userId, content) {
  await sql`
    insert into COMMENTS(post_id, user_id, content)
      values (${postId}, ${userId}, ${content});
  `;
}

export async function initDatabase() {
  const script = fs.readFileSync(`${__dirname}/init.sql`, 'utf8');
  await sql.unsafe(script);
  console.log("Database initialized.");
}