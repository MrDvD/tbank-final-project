-- clear script
do $$
declare
  t text;
begin
  for t in
    select table_name
    from information_schema.tables
    where table_schema = 'public'
  loop
    execute 'drop table if exists ' || t || ' cascade';
  end loop;
end $$;

create table USERS(
  user_id serial primary key,
  login text not null unique,
  full_name text not null default 'New User',
  password text not null,
  description text,
  photo_link text,
  check (
    login <> '' and
    full_name <> '' and
    password <> '' and
    (description is null or description <> '')
  )
);

create table POSTS(
  post_id serial primary key,
  author_id integer references USERS(user_id) on delete cascade,
  content text check(
    content is null or content <> ''
  ),
  creation_timestamp timestamp not null default now()
);

create table LIKES(
  post_id integer references POSTS(post_id) on delete cascade,
  user_id integer references USERS(user_id) on delete no action,
  primary key (post_id, user_id)
);

create table COMMENTS(
  post_id integer references POSTS(post_id),
  author_id integer references USERS(user_id),
  comment_id serial,
  content text check(
    content is null or content <> ''
  ),
  creation_timestamp timestamp not null default now(),
  primary key (post_id, comment_id)
);