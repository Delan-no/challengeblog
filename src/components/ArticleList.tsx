import React, { useState } from 'react';
import ArticleCard from './ArticleCard';
import { Article } from '../types/Article';
import { Filter, ChevronDown } from 'lucide-react';

interface ArticleListProps {
  articles: Article[];
  title?: string;
}

const ArticleList: React.FC<ArticleListProps> = ({ articles, title }) => {
  const [sortBy, setSortBy] = useState('latest');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Sort articles based on selected option
  const sortedArticles = [...articles].sort((a, b) => {
    switch (sortBy) {
      case 'latest':
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
      case 'oldest':
        return new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime();
      case 'popular':
        return b.likeCount - a.likeCount;
      case 'comments':
        return b.commentCount - a.commentCount;
      default:
        return 0;
    }
  });

  return (
    <section className="py-8">
      <div className="container mx-auto px-4 md:px-6">
        {title && (
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-secondary-900 mb-2">
            {title}
          </h2>
        )}
        
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <p className="text-secondary-600 mb-4 sm:mb-0">
            {articles.length} articles
          </p>
          
          <div className="relative">
            <button 
              className="flex items-center space-x-2 px-4 py-2 bg-white border border-secondary-200 rounded-lg shadow-sm hover:bg-secondary-50 transition-colors"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <Filter className="w-4 h-4" />
              <span>Sort by</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            
            {isFilterOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-secondary-200 z-10 animate-fade-in">
                <ul className="py-2">
                  <li>
                    <button
                      className={`w-full text-left px-4 py-2 hover:bg-secondary-50 ${sortBy === 'latest' ? 'text-primary-600 font-medium' : 'text-secondary-700'}`}
                      onClick={() => { setSortBy('latest'); setIsFilterOpen(false); }}
                    >
                      Latest
                    </button>
                  </li>
                  <li>
                    <button
                      className={`w-full text-left px-4 py-2 hover:bg-secondary-50 ${sortBy === 'oldest' ? 'text-primary-600 font-medium' : 'text-secondary-700'}`}
                      onClick={() => { setSortBy('oldest'); setIsFilterOpen(false); }}
                    >
                      Oldest
                    </button>
                  </li>
                  <li>
                    <button
                      className={`w-full text-left px-4 py-2 hover:bg-secondary-50 ${sortBy === 'popular' ? 'text-primary-600 font-medium' : 'text-secondary-700'}`}
                      onClick={() => { setSortBy('popular'); setIsFilterOpen(false); }}
                    >
                      Most Popular
                    </button>
                  </li>
                  <li>
                    <button
                      className={`w-full text-left px-4 py-2 hover:bg-secondary-50 ${sortBy === 'comments' ? 'text-primary-600 font-medium' : 'text-secondary-700'}`}
                      onClick={() => { setSortBy('comments'); setIsFilterOpen(false); }}
                    >
                      Most Comments
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedArticles.map((article, index) => (
            <ArticleCard 
              key={article.id} 
              article={article} 
              featured={index === 0 && sortBy === 'latest'} 
            />
          ))}
        </div>
        
        {sortedArticles.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-secondary-600">No articles found.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ArticleList;