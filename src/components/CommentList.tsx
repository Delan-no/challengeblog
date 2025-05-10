import React, { useState } from 'react';
import { format } from 'date-fns';
import { Heart, Reply, MoreVertical, Trash, Edit } from 'lucide-react';
import { Comment } from '../types/Comment';
import CommentForm from './CommentForm';
import { useAuth } from '../contexts/AuthContext';
import { useBlog } from '../contexts/BlogContext';

interface CommentListProps {
  comments: Comment[];
  articleId: string;
  parentId?: string;
  level?: number;
}

const CommentList: React.FC<CommentListProps> = ({ 
  comments, 
  articleId, 
  parentId = null, 
  level = 0 
}) => {
  // Filter comments to show only those for the current parent
  const filteredComments = comments.filter(comment => comment.parentId === parentId);
  
  if (filteredComments.length === 0) {
    return null;
  }
  
  return (
    <div className={`${level > 0 ? 'ml-8 border-l-2 border-secondary-100 pl-4' : ''}`}>
      {filteredComments.map(comment => (
        <CommentItem 
          key={comment.id} 
          comment={comment} 
          comments={comments}
          articleId={articleId}
          level={level}
        />
      ))}
    </div>
  );
};

interface CommentItemProps {
  comment: Comment;
  comments: Comment[];
  articleId: string;
  level: number;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment, comments, articleId, level }) => {
  const [isReplyFormOpen, setIsReplyFormOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);
  const { user } = useAuth();
  const { likeComment, deleteComment, updateComment } = useBlog();
  
  const isAuthor = user && user.id === comment.author.id;
  
  const handleToggleReply = () => {
    setIsReplyFormOpen(!isReplyFormOpen);
  };
  
  const handleLike = () => {
    likeComment(comment.id);
  };
  
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      deleteComment(comment.id);
    }
    setIsMenuOpen(false);
  };
  
  const handleEdit = () => {
    setIsEditing(true);
    setIsMenuOpen(false);
  };
  
  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditContent(comment.content);
  };
  
  const handleSubmitEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editContent.trim()) {
      updateComment(comment.id, editContent);
      setIsEditing(false);
    }
  };
  
  return (
    <div className="py-4 animate-fade-in">
      <div className="flex items-start space-x-3">
        <img
          src={comment.author.avatar}
          alt={comment.author.name}
          className="w-10 h-10 rounded-full object-cover"
        />
        
        <div className="flex-1">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex justify-between mb-2">
              <div>
                <h4 className="font-medium text-secondary-900">{comment.author.name}</h4>
                <time className="text-xs text-secondary-500" dateTime={comment.createdAt}>
                  {format(new Date(comment.createdAt), 'MMM d, yyyy • h:mm a')}
                </time>
              </div>
              
              {isAuthor && (
                <div className="relative">
                  <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="text-secondary-500 hover:text-secondary-700 transition-colors"
                  >
                    <MoreVertical className="w-5 h-5" />
                  </button>
                  
                  {isMenuOpen && (
                    <div className="absolute right-0 mt-1 bg-white rounded-md shadow-lg border border-secondary-200 z-10 w-32 animate-fade-in">
                      <button
                        onClick={handleEdit}
                        className="w-full text-left flex items-center space-x-2 px-4 py-2 hover:bg-secondary-50 text-secondary-700"
                      >
                        <Edit className="w-4 h-4" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={handleDelete}
                        className="w-full text-left flex items-center space-x-2 px-4 py-2 hover:bg-secondary-50 text-red-600"
                      >
                        <Trash className="w-4 h-4" />
                        <span>Delete</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            {isEditing ? (
              <form onSubmit={handleSubmitEdit} className="mt-2">
                <textarea
                  className="w-full p-3 rounded-lg border border-secondary-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none min-h-24"
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  required
                />
                <div className="flex justify-end space-x-2 mt-2">
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="px-3 py-1 rounded-md text-secondary-700 hover:bg-secondary-100 transition-colors text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-3 py-1 rounded-md bg-primary-600 text-white hover:bg-primary-700 transition-colors text-sm"
                  >
                    Save
                  </button>
                </div>
              </form>
            ) : (
              <p className="text-secondary-800 whitespace-pre-wrap">{comment.content}</p>
            )}
            
            <div className="flex mt-3 text-sm">
              <button
                onClick={handleLike}
                className={`flex items-center mr-4 transition-colors ${
                  comment.isLiked ? 'text-accent-500' : 'text-secondary-500 hover:text-accent-500'
                }`}
              >
                <Heart className={`w-4 h-4 mr-1 ${comment.isLiked ? 'fill-accent-500' : ''}`} />
                <span>{comment.likeCount}</span>
              </button>
              
              {level < 3 && user && (
                <button
                  onClick={handleToggleReply}
                  className="flex items-center text-secondary-500 hover:text-primary-600 transition-colors"
                >
                  <Reply className="w-4 h-4 mr-1" />
                  <span>Reply</span>
                </button>
              )}
            </div>
          </div>
          
          {isReplyFormOpen && (
            <div className="mt-3">
              <CommentForm
                articleId={articleId}
                parentId={comment.id}
                onCancel={() => setIsReplyFormOpen(false)}
              />
            </div>
          )}
          
          {/* Recursive comment rendering for replies */}
          <CommentList
            comments={comments}
            articleId={articleId}
            parentId={comment.id}
            level={level + 1}
          />
        </div>
      </div>
    </div>
  );
};

export default CommentList;