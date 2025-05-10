import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useBlog } from '../contexts/BlogContext';
import CategoryFilter from '../components/CategoryFilter';
import FeaturedSection from '../components/FeaturedSection';
import ArticleList from '../components/ArticleList';
import { Article } from '../types/Article';
import { Search } from 'lucide-react';

const Home: React.FC = () => {
  const location = useLocation();
  const { articles } = useBlog();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  
  // Parse category from URL
  const searchParams = new URLSearchParams(location.search);
  const categoryFilter = searchParams.get('category');
  
  // Filter articles based on category and search term
  useEffect(() => {
    let result = [...articles];
    
    if (categoryFilter && categoryFilter !== 'all') {
      result = result.filter(article => article.category === categoryFilter);
    }
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(article => 
        article.title.toLowerCase().includes(term) || 
        article.excerpt.toLowerCase().includes(term) ||
        article.author.name.toLowerCase().includes(term)
      );
    }
    
    setFilteredArticles(result);
  }, [articles, categoryFilter, searchTerm]);
  
  // Featured articles (always take from all articles, not filtered)
  const featuredArticles = [...articles]
    .sort((a, b) => b.likeCount - a.likeCount)
    .slice(0, 3);
  
  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-primary-700 to-primary-900 text-white py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-fade-in">
            Explore Thoughtful Ideas
          </h1>
          <p className="text-primary-100 text-lg md:text-xl max-w-2xl mx-auto mb-8 animate-fade-in">
            Discover insightful articles, meaningful comments, and join a community of thinkers and creators.
          </p>
          
          <div className="relative max-w-xl mx-auto animate-fade-in">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-secondary-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search articles, topics, or authors..."
              className="w-full pl-12 pr-4 py-3 rounded-full bg-white text-secondary-800 shadow-lg focus:outline-none focus:ring-2 focus:ring-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </section>
      
      {/* Category Filter */}
      <CategoryFilter />
      
      {/* Featured Section (only shown if not filtering) */}
      {!searchTerm && !categoryFilter && <FeaturedSection articles={featuredArticles} />}
      
      {/* Articles List */}
      <ArticleList 
        articles={filteredArticles} 
        title={categoryFilter ? `${categoryFilter.charAt(0).toUpperCase() + categoryFilter.slice(1)} Articles` : 'Recent Articles'} 
      />
    </div>
  );
};

export default Home;