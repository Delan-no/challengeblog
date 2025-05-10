import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Github, Twitter, Linkedin, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-secondary-900 text-white py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center space-x-2">
              <BookOpen className="w-8 h-8 text-primary-400" />
              <span className="font-heading text-2xl font-bold">Eloquent</span>
            </Link>
            <p className="mt-4 text-secondary-300 text-sm">
              A modern platform for expressive writing, thoughtful comments, and meaningful connections.
            </p>
          </div>
          
          <div className="md:col-span-1">
            <h3 className="font-heading text-lg font-bold mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-secondary-300 hover:text-primary-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/create" className="text-secondary-300 hover:text-primary-400 transition-colors">
                  Write
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-secondary-300 hover:text-primary-400 transition-colors">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-secondary-300 hover:text-primary-400 transition-colors">
                  Register
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="md:col-span-1">
            <h3 className="font-heading text-lg font-bold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/?category=technology" className="text-secondary-300 hover:text-primary-400 transition-colors">
                  Technology
                </Link>
              </li>
              <li>
                <Link to="/?category=design" className="text-secondary-300 hover:text-primary-400 transition-colors">
                  Design
                </Link>
              </li>
              <li>
                <Link to="/?category=business" className="text-secondary-300 hover:text-primary-400 transition-colors">
                  Business
                </Link>
              </li>
              <li>
                <Link to="/?category=lifestyle" className="text-secondary-300 hover:text-primary-400 transition-colors">
                  Lifestyle
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="md:col-span-1">
            <h3 className="font-heading text-lg font-bold mb-4">Connect</h3>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="text-secondary-300 hover:text-primary-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-secondary-300 hover:text-primary-400 transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-secondary-300 hover:text-primary-400 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-secondary-300 hover:text-primary-400 transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
            <p className="text-secondary-300 text-sm">
              Subscribe to our newsletter for the latest updates and featured articles.
            </p>
            <div className="mt-2 flex">
              <input
                type="email"
                placeholder="Your email"
                className="rounded-l-md px-4 py-2 bg-secondary-800 border-secondary-700 text-white focus:outline-none focus:ring-1 focus:ring-primary-500 text-sm"
              />
              <button className="rounded-r-md px-4 py-2 bg-primary-600 text-white hover:bg-primary-700 transition-colors text-sm">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-secondary-800 mt-8 pt-8 text-center text-secondary-400 text-sm">
          <p>© {new Date().getFullYear()} Eloquent. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;