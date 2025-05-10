import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { useAuth } from '../contexts/AuthContext';
import { useBlog } from '../contexts/BlogContext';
import { User, Edit, Settings, Bookmark, Heart, MessageCircle, Calendar } from 'lucide-react';

const Profile: React.FC = () => {
  const { user } = useAuth();
  const { articles, comments } = useBlog();
  const [activeTab, setActiveTab] = useState('articles');
  
  // Filter user's articles and bookmarks
  const userArticles = articles.filter(article => article.author.id === user?.id);
  const userBookmarks = articles.filter(article => article.isBookmarked);
  const userComments = comments.filter(comment => comment.author.id === user?.id);
  
  if (!user) {
    return null;
  }
  
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Profile Header */}
          <div className="relative bg-secondary-900 rounded-xl overflow-hidden mb-8">
            <div className="h-48 bg-gradient-to-r from-primary-700 to-primary-500"></div>
            <div className="absolute top-32 left-8 border-4 border-white bg-white rounded-full">
              <img 
                src={user.avatar}
                alt={user.name}
                className="w-32 h-32 rounded-full object-cover"
              />
            </div>
            
            <div className="bg-white p-6 pt-20 sm:pt-6 sm:pl-48">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                <div>
                  <h1 className="font-heading text-3xl font-bold text-secondary-900">{user.name}</h1>
                  <p className="text-secondary-600">@{user.username}</p>
                </div>
                
                <div className="mt-4 sm:mt-0 flex space-x-3">
                  <Link 
                    to="/profile/edit" 
                    className="flex items-center px-4 py-2 bg-white border border-secondary-300 rounded-md text-secondary-700 hover:bg-secondary-50 transition-colors"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    <span>Edit Profile</span>
                  </Link>
                  <Link 
                    to="/profile/settings" 
                    className="flex items-center px-4 py-2 bg-white border border-secondary-300 rounded-md text-secondary-700 hover:bg-secondary-50 transition-colors"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    <span>Settings</span>
                  </Link>
                </div>
              </div>
              
              <div className="mt-6">
                <p className="text-secondary-700">{user.bio}</p>
                
                <div className="flex items-center space-x-4 mt-4 text-sm text-secondary-600">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>Joined {format(new Date(user.joinedAt), 'MMMM yyyy')}</span>
                  </div>
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-1" />
                    <span>{user.followers} followers</span>
                  </div>
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-1" />
                    <span>{user.following} following</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Profile Tabs */}
          <div className="border-b border-secondary-200 mb-8">
            <nav className="flex -mb-px space-x-8">
              <button
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'articles'
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-secondary-500 hover:text-secondary-700 hover:border-secondary-300'
                } transition-colors`}
                onClick={() => setActiveTab('articles')}
              >
                Articles ({userArticles.length})
              </button>
              <button
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'bookmarks'
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-secondary-500 hover:text-secondary-700 hover:border-secondary-300'
                } transition-colors`}
                onClick={() => setActiveTab('bookmarks')}
              >
                Bookmarks ({userBookmarks.length})
              </button>
              <button
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'comments'
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-secondary-500 hover:text-secondary-700 hover:border-secondary-300'
                } transition-colors`}
                onClick={() => setActiveTab('comments')}
              >
                Comments ({userComments.length})
              </button>
            </nav>
          </div>
          
          {/* Tab Content */}
          <div className="animate-fade-in">
            {activeTab === 'articles' && (
              <div>
                {userArticles.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {userArticles.map(article => (
                      <div key={article.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                        <Link to={`/article/${article.id}`} className="block">
                          <img 
                            src={article.coverImage}
                            alt={article.title}
                            className="w-full h-48 object-cover"
                          />
                        </Link>
                        <div className="p-5">
                          <Link 
                            to={`/article/${article.id}`}
                            className="block font-heading text-xl font-bold text-secondary-900 hover:text-primary-600 transition-colors mb-2"
                          >
                            {article.title}
                          </Link>
                          <p className="text-secondary-600 text-sm mb-4 line-clamp-2">
                            {article.excerpt}
                          </p>
                          <div className="flex justify-between items-center text-sm text-secondary-500">
                            <div className="flex items-center space-x-3">
                              <div className="flex items-center">
                                <Heart className="w-4 h-4 mr-1" />
                                <span>{article.likeCount}</span>
                              </div>
                              <div className="flex items-center">
                                <MessageCircle className="w-4 h-4 mr-1" />
                                <span>{article.commentCount}</span>
                              </div>
                            </div>
                            <time dateTime={article.publishedAt}>
                              {format(new Date(article.publishedAt), 'MMM d, yyyy')}
                            </time>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-secondary-50 rounded-xl">
                    <div className="w-16 h-16 mx-auto mb-4 bg-secondary-100 rounded-full flex items-center justify-center">
                      <Edit className="w-8 h-8 text-secondary-400" />
                    </div>
                    <h3 className="font-heading text-xl font-bold text-secondary-900 mb-2">No articles yet</h3>
                    <p className="text-secondary-600 mb-6">You haven't published any articles yet.</p>
                    <Link 
                      to="/create" 
                      className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      <span>Write your first article</span>
                    </Link>
                  </div>
                )}
              </div>
            )}
            
            {activeTab === 'bookmarks' && (
              <div>
                {userBookmarks.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {userBookmarks.map(article => (
                      <div key={article.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                        <Link to={`/article/${article.id}`} className="block">
                          <img 
                            src={article.coverImage}
                            alt={article.title}
                            className="w-full h-48 object-cover"
                          />
                        </Link>
                        <div className="p-5">
                          <div className="flex justify-between items-start mb-2">
                            <Link 
                              to={`/article/${article.id}`}
                              className="block font-heading text-xl font-bold text-secondary-900 hover:text-primary-600 transition-colors"
                            >
                              {article.title}
                            </Link>
                            <button className="text-primary-600">
                              <Bookmark className="w-5 h-5 fill-primary-600" />
                            </button>
                          </div>
                          <p className="text-secondary-600 text-sm mb-4 line-clamp-2">
                            {article.excerpt}
                          </p>
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center">
                              <img
                                src={article.author.avatar}
                                alt={article.author.name}
                                className="w-6 h-6 rounded-full mr-2"
                              />
                              <span className="text-secondary-700">{article.author.name}</span>
                            </div>
                            <time className="text-secondary-500" dateTime={article.publishedAt}>
                              {format(new Date(article.publishedAt), 'MMM d, yyyy')}
                            </time>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-secondary-50 rounded-xl">
                    <div className="w-16 h-16 mx-auto mb-4 bg-secondary-100 rounded-full flex items-center justify-center">
                      <Bookmark className="w-8 h-8 text-secondary-400" />
                    </div>
                    <h3 className="font-heading text-xl font-bold text-secondary-900 mb-2">No bookmarks yet</h3>
                    <p className="text-secondary-600 mb-6">Articles you bookmark will appear here.</p>
                    <Link 
                      to="/" 
                      className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
                    >
                      Browse articles
                    </Link>
                  </div>
                )}
              </div>
            )}
            
            {activeTab === 'comments' && (
              <div>
                {userComments.length > 0 ? (
                  <div className="space-y-6">
                    {userComments.map(comment => {
                      const article = articles.find(a => a.id === comment.articleId);
                      return (
                        <div key={comment.id} className="bg-white rounded-lg shadow-sm p-6">
                          <div className="flex items-start space-x-4">
                            <img
                              src={user.avatar}
                              alt={user.name}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <div>
                                  <span className="font-medium text-secondary-900">{user.name}</span>
                                  <span className="text-secondary-500 text-sm mx-2">•</span>
                                  <time className="text-secondary-500 text-sm" dateTime={comment.createdAt}>
                                    {format(new Date(comment.createdAt), 'MMM d, yyyy')}
                                  </time>
                                </div>
                                <Link 
                                  to={`/article/${comment.articleId}`} 
                                  className="text-primary-600 text-sm hover:text-primary-700 transition-colors"
                                >
                                  View Article
                                </Link>
                              </div>
                              <p className="text-secondary-700 mb-3">{comment.content}</p>
                              {article && (
                                <div className="bg-secondary-50 p-3 rounded-md">
                                  <Link 
                                    to={`/article/${article.id}`}
                                    className="font-medium text-secondary-900 hover:text-primary-600 transition-colors"
                                  >
                                    On: {article.title}
                                  </Link>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-secondary-50 rounded-xl">
                    <div className="w-16 h-16 mx-auto mb-4 bg-secondary-100 rounded-full flex items-center justify-center">
                      <MessageCircle className="w-8 h-8 text-secondary-400" />
                    </div>
                    <h3 className="font-heading text-xl font-bold text-secondary-900 mb-2">No comments yet</h3>
                    <p className="text-secondary-600 mb-6">You haven't commented on any articles yet.</p>
                    <Link 
                      to="/" 
                      className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
                    >
                      Browse articles
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;