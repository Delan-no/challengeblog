import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, MessageCircle, Heart } from 'lucide-react';
import { format } from 'date-fns';
import { Article } from '../types/Article';

interface FeaturedSectionProps {
  articles: Article[];
}

const FeaturedSection: React.FC<FeaturedSectionProps> = ({ articles }) => {
  if (articles.length < 3) return null;
  
  // Get the first article for the hero section
  const heroArticle = articles[0];
  
  // Get the next 2 articles for the secondary slots
  const secondaryArticles = articles.slice(1, 3);
  
  return (
    <section className="py-8 md:py-12">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-secondary-900 mb-6">
          Featured Articles
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Hero Article */}
          <div className="md:col-span-2">
            <article className="relative overflow-hidden rounded-xl bg-secondary-900 text-white h-[60vh] min-h-[400px] group">
              <Link to={`/article/${heroArticle.id}`} className="block h-full">
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
                <img 
                  src={heroArticle.coverImage}
                  alt={heroArticle.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                  <div className="flex items-center space-x-4 mb-3">
                    <img 
                      src={heroArticle.author.avatar}
                      alt={heroArticle.author.name}
                      className="w-10 h-10 rounded-full border-2 border-white"
                    />
                    <div>
                      <span className="block font-medium">{heroArticle.author.name}</span>
                      <div className="flex items-center text-sm text-secondary-300">
                        <Clock className="w-4 h-4 mr-1" />
                        <time dateTime={heroArticle.publishedAt}>
                          {format(new Date(heroArticle.publishedAt), 'MMM d, yyyy')}
                        </time>
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="font-heading text-2xl md:text-4xl font-bold mb-3 group-hover:text-primary-400 transition-colors">
                    {heroArticle.title}
                  </h3>
                  
                  <p className="text-secondary-200 mb-4 max-w-2xl line-clamp-2 md:line-clamp-3">
                    {heroArticle.excerpt}
                  </p>
                  
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <MessageCircle className="w-4 h-4 mr-1" />
                      <span>{heroArticle.commentCount}</span>
                    </div>
                    <div className="flex items-center">
                      <Heart className="w-4 h-4 mr-1" />
                      <span>{heroArticle.likeCount}</span>
                    </div>
                    <span className="bg-primary-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      {heroArticle.category}
                    </span>
                  </div>
                </div>
              </Link>
            </article>
          </div>
          
          {/* Secondary Articles */}
          {secondaryArticles.map(article => (
            <article key={article.id} className="group overflow-hidden bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
              <Link to={`/article/${article.id}`} className="block">
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
                  
                  <h3 className="font-heading text-xl font-bold text-secondary-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
                    {article.title}
                  </h3>
                  
                  <p className="text-secondary-600 text-sm mb-4 line-clamp-2">
                    {article.excerpt}
                  </p>
                  
                  <div className="flex items-center space-x-4 text-secondary-500 text-sm">
                    <div className="flex items-center">
                      <MessageCircle className="w-4 h-4 mr-1" />
                      <span>{article.commentCount}</span>
                    </div>
                    <div className="flex items-center">
                      <Heart className="w-4 h-4 mr-1" />
                      <span>{article.likeCount}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;