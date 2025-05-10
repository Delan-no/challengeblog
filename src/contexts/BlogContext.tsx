import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Article, CreateArticleInput } from '../types/Article';
import { Comment, AddCommentInput } from '../types/Comment';
import { useAuth } from './AuthContext';
import { mockArticles, mockComments } from '../data/mockData';

interface BlogContextType {
  articles: Article[];
  comments: Comment[];
  getArticleById: (id: string) => Article;
  createArticle: (input: CreateArticleInput) => Promise<Article>;
  likeArticle: (id: string) => void;
  bookmarkArticle: (id: string) => void;
  addComment: (input: AddCommentInput) => Promise<Comment>;
  likeComment: (id: string) => void;
  deleteComment: (id: string) => void;
  updateComment: (id: string, content: string) => void;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export const useBlog = (): BlogContextType => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
};

interface BlogProviderProps {
  children: React.ReactNode;
}

export const BlogProvider: React.FC<BlogProviderProps> = ({ children }) => {
  const { user } = useAuth();
  const [articles, setArticles] = useState<Article[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  
  useEffect(() => {
    // Load mock data
    setArticles(mockArticles);
    setComments(mockComments);
  }, []);
  
  const getArticleById = (id: string): Article => {
    const article = articles.find(a => a.id === id);
    if (!article) {
      throw new Error(`Article with id ${id} not found`);
    }
    return article;
  };
  
  const createArticle = async (input: CreateArticleInput): Promise<Article> => {
    if (!user) {
      throw new Error('You must be logged in to create an article');
    }
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newArticle: Article = {
      id: uuidv4(),
      ...input,
      publishedAt: new Date().toISOString(),
      readTime: Math.ceil(input.content.split(' ').length / 200), // Rough estimate
      author: user,
      likeCount: 0,
      commentCount: 0,
      isLiked: false,
      isBookmarked: false,
    };
    
    setArticles(prev => [newArticle, ...prev]);
    return newArticle;
  };
  
  const likeArticle = (id: string): void => {
    setArticles(prev => prev.map(article => {
      if (article.id === id) {
        const isLiked = !article.isLiked;
        return {
          ...article,
          isLiked,
          likeCount: isLiked ? article.likeCount + 1 : article.likeCount - 1,
        };
      }
      return article;
    }));
  };
  
  const bookmarkArticle = (id: string): void => {
    setArticles(prev => prev.map(article => {
      if (article.id === id) {
        return {
          ...article,
          isBookmarked: !article.isBookmarked,
        };
      }
      return article;
    }));
  };
  
  const addComment = async (input: AddCommentInput): Promise<Comment> => {
    if (!user) {
      throw new Error('You must be logged in to add a comment');
    }
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newComment: Comment = {
      id: uuidv4(),
      articleId: input.articleId,
      parentId: input.parentId || null,
      author: user,
      content: input.content,
      createdAt: new Date().toISOString(),
      likeCount: 0,
      isLiked: false,
    };
    
    setComments(prev => [newComment, ...prev]);
    
    // Update the comment count on the article
    setArticles(prev => prev.map(article => {
      if (article.id === input.articleId) {
        return {
          ...article,
          commentCount: article.commentCount + 1,
        };
      }
      return article;
    }));
    
    return newComment;
  };
  
  const likeComment = (id: string): void => {
    setComments(prev => prev.map(comment => {
      if (comment.id === id) {
        const isLiked = !comment.isLiked;
        return {
          ...comment,
          isLiked,
          likeCount: isLiked ? comment.likeCount + 1 : comment.likeCount - 1,
        };
      }
      return comment;
    }));
  };
  
  const deleteComment = (id: string): void => {
    // Find the comment to delete its articleId
    const commentToDelete = comments.find(c => c.id === id);
    if (!commentToDelete) return;
    
    // First, get all child comments (replies to this comment)
    const getAllChildIds = (parentId: string): string[] => {
      const childIds = comments
        .filter(c => c.parentId === parentId)
        .map(c => c.id);
      
      return [
        ...childIds,
        ...childIds.flatMap(childId => getAllChildIds(childId)),
      ];
    };
    
    const childIds = getAllChildIds(id);
    const allIdsToDelete = [id, ...childIds];
    
    // Delete the comment and all its children
    setComments(prev => prev.filter(c => !allIdsToDelete.includes(c.id)));
    
    // Update the comment count on the article
    if (commentToDelete) {
      setArticles(prev => prev.map(article => {
        if (article.id === commentToDelete.articleId) {
          return {
            ...article,
            commentCount: Math.max(0, article.commentCount - allIdsToDelete.length),
          };
        }
        return article;
      }));
    }
  };
  
  const updateComment = (id: string, content: string): void => {
    setComments(prev => prev.map(comment => {
      if (comment.id === id) {
        return {
          ...comment,
          content,
        };
      }
      return comment;
    }));
  };
  
  const value: BlogContextType = {
    articles,
    comments,
    getArticleById,
    createArticle,
    likeArticle,
    bookmarkArticle,
    addComment,
    likeComment,
    deleteComment,
    updateComment,
  };
  
  return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>;
};