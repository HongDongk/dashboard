export interface Comment {
  id: number;
  postId: number;
  content: string;
  createdAt: string;
}

export interface CommentCreateRequest {
  postId: number;
  content: string;
}

export interface CommentProps {
  comment: Comment;
  onDelete: (commentId: number) => void;
}

export interface CommentListProps {
  postId: number;
}

export interface CommentFormProps {
  postId: number;
  onCommentAdded: () => void;
}
