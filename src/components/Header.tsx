import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, User, BookOpen } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white shadow-md py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <BookOpen className="w-8 h-8 text-primary-600" />
            <span className="font-heading text-2xl font-bold text-secondary-800">Eloquent</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-secondary-700 hover:text-primary-600 transition-colors"
            >
              Home
            </Link>
            <Link 
              to="/create" 
              className="text-secondary-700 hover:text-primary-600 transition-colors"
            >
              Write
            </Link>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search articles..."
                className="pl-10 pr-4 py-2 rounded-full bg-secondary-100 focus:outline-none focus:ring-2 focus:ring-primary-500 w-48 text-sm"
              />
            </div>
          </nav>

          {/* Authentication */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/profile" 
                  className="flex items-center space-x-2 text-secondary-700 hover:text-primary-600 transition-colors"
                >
                  <User className="w-5 h-5" />
                  <span>{user.name}</span>
                </Link>
                <button 
                  onClick={logout}
                  className="px-4 py-2 rounded-md bg-secondary-100 text-secondary-700 hover:bg-secondary-200 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/login" 
                  className="px-4 py-2 rounded-md text-secondary-700 hover:text-primary-600 transition-colors"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="px-4 py-2 rounded-md bg-primary-600 text-white hover:bg-primary-700 transition-colors"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-secondary-700 focus:outline-none"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 py-4 border-t border-secondary-200 animate-fade-in">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="text-secondary-700 hover:text-primary-600 transition-colors py-2"
              >
                Home
              </Link>
              <Link 
                to="/create" 
                className="text-secondary-700 hover:text-primary-600 transition-colors py-2"
              >
                Write
              </Link>
              <div className="relative py-2">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  className="pl-10 pr-4 py-2 rounded-full bg-secondary-100 focus:outline-none focus:ring-2 focus:ring-primary-500 w-full text-sm"
                />
              </div>
              {user ? (
                <>
                  <Link 
                    to="/profile" 
                    className="flex items-center space-x-2 text-secondary-700 hover:text-primary-600 transition-colors py-2"
                  >
                    <User className="w-5 h-5" />
                    <span>{user.name}</span>
                  </Link>
                  <button 
                    onClick={logout}
                    className="w-full text-left px-4 py-2 rounded-md bg-secondary-100 text-secondary-700 hover:bg-secondary-200 transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="block px-4 py-2 rounded-md text-secondary-700 hover:text-primary-600 transition-colors"
                  >
                    Login
                  </Link>
                  <Link 
                    to="/register" 
                    className="block px-4 py-2 rounded-md bg-primary-600 text-white hover:bg-primary-700 transition-colors text-center"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;