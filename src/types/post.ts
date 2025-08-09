export interface Post {
  id: number;
  title: string;
  createdAt: string;
}

export interface PostList {
  posts: Post[];
}
