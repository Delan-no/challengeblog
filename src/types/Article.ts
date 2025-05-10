import { User } from './User';

export interface Article {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  coverImage: string;
  publishedAt: string;
  readTime: number;
  category: string;
  tags: string[];
  author: User;
  likeCount: number;
  commentCount: number;
  isLiked: boolean;
  isBookmarked: boolean;
}

export interface CreateArticleInput {
  title: string;
  content: string;
  excerpt: string;
  coverImage: string;
  category: string;
  tags: string[];
}