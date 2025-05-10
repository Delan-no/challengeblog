import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, MessageCircle, Heart, Share2 } from 'lucide-react';
import { format } from 'date-fns';
import { Article } from '../types/Article';

interface ArticleCardProps {
  article: Article;
  featured?: boolean;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, featured = false }) => {
  return (
    <article 
      className={`group overflow-hidden bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 ${
        featured ? 'md:col-span-2 md:row-span-2' : ''
      }`}
    >
      <Link to={`/article/${article.id}`}>
        <div className="relative aspect-video overflow-hidden">
          <img 
            src={article.coverImage} 
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {article.category && (
            <span className="absolute top-4 left-4 bg-primary-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
              {article.category}
            </span>
          )}
        </div>
      </Link>
      
      <div className="p-5">
        <div className="flex items-center space-x-2 mb-3">
          <img 
            src={article.author.avatar} 
            alt={article.author.name}
            className="w-8 h-8 rounded-full object-cover"
          />
          <div>
            <span className="block text-sm font-medium text-secondary-900">{article.author.name}</span>
            <div className="flex items-center text-xs text-secondary-500">
              <Clock className="w-3 h-3 mr-1" />
              <time dateTime={article.publishedAt}>
                {format(new Date(article.publishedAt), 'MMM d, yyyy')}
              </time>
            </div>
          </div>
        </div>
        
        <Link to={`/article/${article.id}`} className="block mb-2 group-hover:text-primary-600 transition-colors">
          <h3 className={`font-heading font-bold text-secondary-900 line-clamp-2 ${featured ? 'text-2xl' : 'text-xl'}`}>
            {article.title}
          </h3>
        </Link>
        
        <p className="text-secondary-600 text-sm mb-4 line-clamp-2">
          {article.excerpt}
        </p>
        
        <div className="flex items-center justify-between text-secondary-500 text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <MessageCircle className="w-4 h-4 mr-1" />
              <span>{article.commentCount}</span>
            </div>
            <div className="flex items-center">
              <Heart className="w-4 h-4 mr-1" />
              <span>{article.likeCount}</span>
            </div>
          </div>
          <button className="hover:text-primary-600 transition-colors">
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </article>
  );
};

export default ArticleCard;