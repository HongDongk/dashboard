export interface Post {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface PostItemProps {
  id: number;
  title: string;
  createdAt: string;
}

export interface PostCreateRequest {
  title: string;
  content: string;
}

export interface PostUpdateRequest {
  title?: string;
  content?: string;
}
