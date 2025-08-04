export interface NewsComment {
  post_id: number;
  author_id: number;
  comment_id: number;
  content: string;
  creation_timestamp: Date;
}

export interface NewsPost {
  post_id: number;
  author_id: number;
  content: string;
  creation_timestamp: Date;
}

export interface NewsUser {
  user_id: number;
  login: string;
  full_name: string;
  password: string;
  description: string;
  photo_link: string;
}