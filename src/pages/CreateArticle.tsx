import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBlog } from '../contexts/BlogContext';
import { Plus, Image, Tag, X } from 'lucide-react';

const CreateArticle: React.FC = () => {
  const navigate = useNavigate();
  const { createArticle } = useBlog();
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [category, setCategory] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [tag, setTag] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const categories = [
    { id: 'technology', name: 'Technology' },
    { id: 'design', name: 'Design' },
    { id: 'business', name: 'Business' },
    { id: 'lifestyle', name: 'Lifestyle' },
    { id: 'health', name: 'Health' },
    { id: 'education', name: 'Education' },
  ];
  
  const handleAddTag = () => {
    if (tag.trim() && !tags.includes(tag.trim())) {
      setTags([...tags, tag.trim()]);
      setTag('');
    }
  };
  
  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(t => t !== tagToRemove));
  };
  
  const handleTagKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim() || !category || !coverImage.trim()) {
      alert('Please fill in all required fields.');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Create a simple HTML content from the textarea input
      const htmlContent = content
        .split('\n\n')
        .map(paragraph => `<p>${paragraph}</p>`)
        .join('');
      
      const newArticle = await createArticle({
        title,
        content: htmlContent,
        excerpt: excerpt || `${content.substring(0, 150)}...`,
        coverImage,
        category,
        tags,
      });
      
      navigate(`/article/${newArticle.id}`);
    } catch (error) {
      console.error('Failed to create article:', error);
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-heading text-3xl md:text-4xl font-bold mb-6">Create New Article</h1>
          
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-6 md:p-8">
            {/* Title */}
            <div className="mb-6">
              <label htmlFor="title" className="block text-sm font-medium text-secondary-700 mb-2">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                className="w-full px-4 py-3 rounded-lg border border-secondary-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-lg"
                placeholder="Enter a descriptive title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            
            {/* Cover Image */}
            <div className="mb-6">
              <label htmlFor="coverImage" className="block text-sm font-medium text-secondary-700 mb-2">
                Cover Image URL <span className="text-red-500">*</span>
              </label>
              <div className="flex">
                <div className="flex-1 flex items-center space-x-2">
                  <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Image className="w-5 h-5 text-secondary-500" />
                    </div>
                    <input
                      type="url"
                      id="coverImage"
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-secondary-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      placeholder="Paste the image URL"
                      value={coverImage}
                      onChange={(e) => setCoverImage(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
              {coverImage && (
                <div className="mt-4 relative aspect-video rounded-lg overflow-hidden bg-secondary-100">
                  <img 
                    src={coverImage} 
                    alt="Cover preview" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = 'https://via.placeholder.com/800x400?text=Invalid+Image+URL';
                    }}
                  />
                </div>
              )}
            </div>
            
            {/* Excerpt */}
            <div className="mb-6">
              <label htmlFor="excerpt" className="block text-sm font-medium text-secondary-700 mb-2">
                Excerpt/Summary (optional)
              </label>
              <textarea
                id="excerpt"
                className="w-full px-4 py-3 rounded-lg border border-secondary-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                placeholder="Short description of your article (will be auto-generated if left blank)"
                rows={2}
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
              />
              <p className="mt-1 text-sm text-secondary-500">
                {excerpt.length}/200 characters (recommended max)
              </p>
            </div>
            
            {/* Category & Tags */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Category */}
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-secondary-700 mb-2">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  id="category"
                  className="w-full px-4 py-3 rounded-lg border border-secondary-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Tags */}
              <div>
                <label htmlFor="tags" className="block text-sm font-medium text-secondary-700 mb-2">
                  Tags
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Tag className="w-5 h-5 text-secondary-500" />
                  </div>
                  <input
                    type="text"
                    id="tags"
                    className="w-full pl-10 pr-12 py-3 rounded-lg border border-secondary-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    placeholder="Add a tag and press Enter"
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    onKeyPress={handleTagKeyPress}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 px-3 flex items-center text-primary-600 hover:text-primary-700 transition-colors"
                    onClick={handleAddTag}
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {tags.map(t => (
                      <span 
                        key={t} 
                        className="flex items-center space-x-1 px-3 py-1 bg-secondary-100 text-secondary-700 rounded-full text-sm"
                      >
                        <span>{t}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(t)}
                          className="text-secondary-500 hover:text-secondary-700 transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            {/* Content */}
            <div className="mb-8">
              <label htmlFor="content" className="block text-sm font-medium text-secondary-700 mb-2">
                Content <span className="text-red-500">*</span>
              </label>
              <textarea
                id="content"
                className="w-full px-4 py-3 rounded-lg border border-secondary-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all font-medium"
                placeholder="Write your article here..."
                rows={12}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </div>
            
            {/* Submit Button */}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="px-6 py-3 rounded-lg border border-secondary-300 text-secondary-700 hover:bg-secondary-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-colors"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Publishing...' : 'Publish Article'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateArticle;