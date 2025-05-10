import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { format } from 'date-fns';
import { useBlog } from '../contexts/BlogContext';
import { useAuth } from '../contexts/AuthContext';
import CommentForm from '../components/CommentForm';
import CommentList from '../components/CommentList';
import { Heart, MessageCircle, Share2, Bookmark, Clock, Calendar, User, Tag } from 'lucide-react';

const Article: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getArticleById, articles, comments, likeArticle, bookmarkArticle } = useBlog();
  const { user } = useAuth();
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  
  useEffect(() => {
    if (id) {
      try {
        const foundArticle = getArticleById(id);
        setArticle(foundArticle);
        setIsLoading(false);
      } catch (err) {
        setError('Article not found');
        setIsLoading(false);
      }
    }
  }, [id, getArticleById, articles]);
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }
  
  if (error || !article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <h1 className="font-heading text-3xl font-bold text-secondary-800 mb-4">Article Not Found</h1>
        <p className="text-secondary-600 mb-6">The article you're looking for might have been removed or doesn't exist.</p>
        <Link 
          to="/" 
          className="px-6 py-3 rounded-md bg-primary-600 text-white hover:bg-primary-700 transition-colors"
        >
          Back to Home
        </Link>
      </div>
    );
  }
  
  const articleComments = comments.filter(comment => comment.articleId === article.id);
  const rootComments = articleComments.filter(comment => !comment.parentId);
  const relatedArticles = articles
    .filter(a => a.id !== article.id && a.category === article.category)
    .slice(0, 3);
  
  const handleLike = () => {
    likeArticle(article.id);
  };
  
  const handleBookmark = () => {
    bookmarkArticle(article.id);
  };
  
  return (
    <div className="min-h-screen pb-16">
      {/* Article Hero */}
      <div className="bg-secondary-900 text-white">
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center space-x-2 text-sm text-secondary-300 mb-4 animate-fade-in">
              <Link to="/" className="hover:text-primary-400 transition-colors">Home</Link>
              <span>/</span>
              <Link 
                to={`/?category=${article.category}`} 
                className="hover:text-primary-400 transition-colors"
              >
                {article.category}
              </Link>
            </div>
            
            <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6 animate-fade-in">
              {article.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 mb-8 animate-fade-in">
              <div className="flex items-center">
                <img 
                  src={article.author.avatar} 
                  alt={article.author.name}
                  className="w-10 h-10 rounded-full object-cover border-2 border-primary-500 mr-3"
                />
                <div>
                  <span className="block font-medium">{article.author.name}</span>
                  <Link to={`/?author=${article.author.id}`} className="text-sm text-primary-400 hover:text-primary-300 transition-colors">
                    View profile
                  </Link>
                </div>
              </div>
              
              <div className="flex items-center text-secondary-300">
                <Calendar className="w-4 h-4 mr-1" />
                <time dateTime={article.publishedAt}>
                  {format(new Date(article.publishedAt), 'MMM d, yyyy')}
                </time>
              </div>
              
              <div className="flex items-center text-secondary-300">
                <Clock className="w-4 h-4 mr-1" />
                <span>{article.readTime} min read</span>
              </div>
              
              <div className="flex items-center">
                <span className="bg-primary-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  {article.category}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Article Cover Image */}
      <div className="relative -mt-10 mb-10">
        <div className="max-w-5xl mx-auto px-4">
          <div className="rounded-xl overflow-hidden shadow-xl">
            <img 
              src={article.coverImage} 
              alt={article.title}
              className="w-full h-auto object-cover max-h-[600px]"
            />
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-7xl mx-auto">
          {/* Action Sidebar - Desktop */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24 flex flex-col items-center space-y-4">
              <button 
                onClick={handleLike}
                className={`p-3 rounded-full transition-colors ${
                  article.isLiked 
                    ? 'bg-accent-100 text-accent-500' 
                    : 'bg-white text-secondary-500 hover:bg-secondary-50'
                } shadow-sm`}
              >
                <Heart className={`w-6 h-6 ${article.isLiked ? 'fill-accent-500' : ''}`} />
              </button>
              <div className="text-sm text-center font-medium">{article.likeCount}</div>
              
              <button 
                className="p-3 rounded-full bg-white text-secondary-500 hover:bg-secondary-50 transition-colors shadow-sm"
                onClick={() => document.getElementById('comments').scrollIntoView({ behavior: 'smooth' })}
              >
                <MessageCircle className="w-6 h-6" />
              </button>
              <div className="text-sm text-center font-medium">{articleComments.length}</div>
              
              <button 
                onClick={handleBookmark}
                className={`p-3 rounded-full transition-colors ${
                  article.isBookmarked 
                    ? 'bg-primary-100 text-primary-600' 
                    : 'bg-white text-secondary-500 hover:bg-secondary-50'
                } shadow-sm`}
              >
                <Bookmark className={`w-6 h-6 ${article.isBookmarked ? 'fill-primary-600' : ''}`} />
              </button>
              
              <button className="p-3 rounded-full bg-white text-secondary-500 hover:bg-secondary-50 transition-colors shadow-sm">
                <Share2 className="w-6 h-6" />
              </button>
            </div>
          </div>
          
          {/* Article Content */}
          <article className="lg:col-span-8 bg-white rounded-xl shadow-sm p-6 md:p-8">
            <div className="prose prose-lg max-w-none animate-fade-in">
              <div dangerouslySetInnerHTML={{ __html: article.content }} />
            </div>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-secondary-100">
              <span className="text-secondary-600 flex items-center">
                <Tag className="w-4 h-4 mr-2" />
                Tags:
              </span>
              {article.tags.map(tag => (
                <Link 
                  key={tag}
                  to={`/?tag=${tag}`}
                  className="px-3 py-1 bg-secondary-100 text-secondary-700 rounded-full text-sm hover:bg-secondary-200 transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>
            
            {/* Author Box */}
            <div className="mt-10 p-6 bg-secondary-50 rounded-xl">
              <div className="flex items-start sm:items-center flex-col sm:flex-row">
                <img 
                  src={article.author.avatar}
                  alt={article.author.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-primary-500 mb-4 sm:mb-0 sm:mr-6"
                />
                <div>
                  <h3 className="font-heading text-xl font-bold mb-2">{article.author.name}</h3>
                  <p className="text-secondary-600 mb-3">{article.author.bio}</p>
                  <div className="flex space-x-3">
                    <a 
                      href="#" 
                      className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors text-sm"
                    >
                      Follow
                    </a>
                    <a 
                      href="#" 
                      className="px-4 py-2 bg-white text-secondary-700 rounded-md hover:bg-secondary-100 transition-colors text-sm"
                    >
                      View Profile
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Mobile Action Bar */}
            <div className="flex justify-between mt-10 py-4 border-t border-b border-secondary-100 lg:hidden">
              <button 
                onClick={handleLike}
                className={`flex items-center space-x-1 transition-colors ${
                  article.isLiked ? 'text-accent-500' : 'text-secondary-600'
                }`}
              >
                <Heart className={`w-5 h-5 ${article.isLiked ? 'fill-accent-500' : ''}`} />
                <span>{article.likeCount}</span>
              </button>
              
              <button 
                className="flex items-center space-x-1 text-secondary-600"
                onClick={() => document.getElementById('comments').scrollIntoView({ behavior: 'smooth' })}
              >
                <MessageCircle className="w-5 h-5" />
                <span>{articleComments.length}</span>
              </button>
              
              <button 
                onClick={handleBookmark}
                className={`transition-colors ${
                  article.isBookmarked ? 'text-primary-600' : 'text-secondary-600'
                }`}
              >
                <Bookmark className={`w-5 h-5 ${article.isBookmarked ? 'fill-primary-600' : ''}`} />
              </button>
              
              <button className="text-secondary-600">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
            
            {/* Comments Section */}
            <section id="comments" className="mt-12">
              <h2 className="font-heading text-2xl font-bold mb-6">
                Comments ({articleComments.length})
              </h2>
              
              <CommentForm articleId={article.id} />
              
              {rootComments.length > 0 ? (
                <CommentList 
                  comments={articleComments} 
                  articleId={article.id} 
                />
              ) : (
                <div className="text-center py-8 text-secondary-500">
                  <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-30" />
                  <p>Be the first to share your thoughts!</p>
                </div>
              )}
            </section>
          </article>
          
          {/* Sidebar */}
          <aside className="lg:col-span-3">
            <div className="sticky top-24">
              {/* Related Articles */}
              <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <h3 className="font-heading text-xl font-bold mb-4">Related Articles</h3>
                
                {relatedArticles.length > 0 ? (
                  <div className="space-y-4">
                    {relatedArticles.map(related => (
                      <Link 
                        key={related.id}
                        to={`/article/${related.id}`}
                        className="block group"
                      >
                        <div className="flex space-x-3">
                          <div className="flex-shrink-0 w-20 h-20 rounded-md overflow-hidden">
                            <img 
                              src={related.coverImage}
                              alt={related.title}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                          </div>
                          <div>
                            <h4 className="font-medium text-secondary-900 line-clamp-2 group-hover:text-primary-600 transition-colors">
                              {related.title}
                            </h4>
                            <div className="flex items-center mt-1 text-xs text-secondary-500">
                              <User className="w-3 h-3 mr-1" />
                              <span>{related.author.name}</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="text-secondary-600 text-sm">No related articles found.</p>
                )}
              </div>
              
              {/* Popular Tags */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="font-heading text-xl font-bold mb-4">Popular Tags</h3>
                <div className="flex flex-wrap gap-2">
                  <Link 
                    to="/?tag=webdev"
                    className="px-3 py-1 bg-secondary-100 text-secondary-700 rounded-full text-sm hover:bg-secondary-200 transition-colors"
                  >
                    #webdev
                  </Link>
                  <Link 
                    to="/?tag=javascript"
                    className="px-3 py-1 bg-secondary-100 text-secondary-700 rounded-full text-sm hover:bg-secondary-200 transition-colors"
                  >
                    #javascript
                  </Link>
                  <Link 
                    to="/?tag=programming"
                    className="px-3 py-1 bg-secondary-100 text-secondary-700 rounded-full text-sm hover:bg-secondary-200 transition-colors"
                  >
                    #programming
                  </Link>
                  <Link 
                    to="/?tag=design"
                    className="px-3 py-1 bg-secondary-100 text-secondary-700 rounded-full text-sm hover:bg-secondary-200 transition-colors"
                  >
                    #design
                  </Link>
                  <Link 
                    to="/?tag=productivity"
                    className="px-3 py-1 bg-secondary-100 text-secondary-700 rounded-full text-sm hover:bg-secondary-200 transition-colors"
                  >
                    #productivity
                  </Link>
                  <Link 
                    to="/?tag=startup"
                    className="px-3 py-1 bg-secondary-100 text-secondary-700 rounded-full text-sm hover:bg-secondary-200 transition-colors"
                  >
                    #startup
                  </Link>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Article;