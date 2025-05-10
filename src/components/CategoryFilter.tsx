import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Tag } from 'lucide-react';

const categories = [
  { id: 'all', name: 'All', icon: <Tag className="w-4 h-4" /> },
  { id: 'technology', name: 'Technology', color: 'bg-blue-500' },
  { id: 'design', name: 'Design', color: 'bg-pink-500' },
  { id: 'business', name: 'Business', color: 'bg-green-500' },
  { id: 'lifestyle', name: 'Lifestyle', color: 'bg-yellow-500' },
  { id: 'health', name: 'Health', color: 'bg-red-500' },
  { id: 'education', name: 'Education', color: 'bg-purple-500' },
];

const CategoryFilter: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const currentCategory = searchParams.get('category') || 'all';
  
  const createSearchLink = (categoryId: string) => {
    const params = new URLSearchParams(location.search);
    
    if (categoryId === 'all') {
      params.delete('category');
    } else {
      params.set('category', categoryId);
    }
    
    return `${location.pathname}?${params.toString()}`;
  };
  
  return (
    <div className="py-4 overflow-x-auto">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex space-x-2">
          {categories.map(category => (
            <Link
              key={category.id}
              to={createSearchLink(category.id)}
              className={`flex items-center space-x-1 whitespace-nowrap px-4 py-2 rounded-full transition-all ${
                currentCategory === category.id
                  ? 'bg-primary-600 text-white shadow-md'
                  : 'bg-white text-secondary-700 hover:bg-secondary-100 shadow-sm'
              }`}
            >
              {category.icon || (
                <span className={`w-2 h-2 rounded-full ${category.color}`}></span>
              )}
              <span>{category.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryFilter;