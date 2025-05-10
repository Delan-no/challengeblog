import React, { useState } from 'react';
import { useBlog } from '../contexts/BlogContext';
import { useAuth } from '../contexts/AuthContext';

interface CommentFormProps {
  articleId: string;
  parentId?: string;
  onCancel?: () => void;
}

const CommentForm: React.FC<CommentFormProps> = ({ articleId, parentId, onCancel }) => {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addComment } = useBlog();
  const { user } = useAuth();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content.trim()) return;
    
    setIsSubmitting(true);
    
    try {
      await addComment({
        articleId,
        parentId,
        content,
      });
      
      setContent('');
      if (onCancel) onCancel();
    } catch (error) {
      console.error('Failed to add comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (!user) {
    return (
      <div className="bg-secondary-50 p-4 rounded-lg text-center">
        <p className="text-secondary-600 mb-2">Sign in to join the discussion.</p>
        <div className="flex justify-center space-x-4">
          <a href="/login" className="text-primary-600 hover:text-primary-700 transition-colors">
            Login
          </a>
          <a href="/register" className="text-primary-600 hover:text-primary-700 transition-colors">
            Register
          </a>
        </div>
      </div>
    );
  }
  
  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-4 mb-6 animate-fade-in">
      <div className="flex items-start space-x-3 mb-4">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex-1">
          <textarea
            className="w-full p-3 rounded-lg border border-secondary-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none min-h-24"
            placeholder={parentId ? "Write a reply..." : "Share your thoughts..."}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
      </div>
      
      <div className="flex justify-end space-x-2">
        {parentId && onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-md text-secondary-700 hover:bg-secondary-100 transition-colors"
            disabled={isSubmitting}
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="px-4 py-2 rounded-md bg-primary-600 text-white hover:bg-primary-700 transition-colors"
          disabled={isSubmitting || !content.trim()}
        >
          {isSubmitting ? "Posting..." : parentId ? "Reply" : "Comment"}
        </button>
      </div>
    </form>
  );
};

export default CommentForm;