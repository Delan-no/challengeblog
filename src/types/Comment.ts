import { User } from './User';

export interface Comment {
  id: string;
  articleId: string;
  parentId: string | null;
  author: User;
  content: string;
  createdAt: string;
  likeCount: number;
  isLiked: boolean;
}

export interface AddCommentInput {
  articleId: string;
  parentId?: string;
  content: string;
}