import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Brain, History, Home, Sparkles, Zap } from 'lucide-react';

const Header: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/history', icon: History, label: 'History' },
  ];

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 group transform hover:scale-105 transition-all duration-300">
            <div className="relative">
              <Brain className="h-8 w-8 text-blue-600 group-hover:text-blue-700 transition-all duration-300 group-hover:rotate-12" />
              <Sparkles className="h-4 w-4 text-orange-400 absolute -top-1 -right-1 animate-pulse group-hover:animate-spin" />
              <Zap className="h-3 w-3 text-yellow-400 absolute -bottom-1 -left-1 animate-bounce" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent group-hover:from-purple-600 group-hover:via-blue-600 group-hover:to-purple-600 transition-all duration-500">
                AI Homework Helper
              </h1>
              <p className="text-sm text-gray-500 group-hover:text-blue-500 transition-colors">By Achref Rhouma</p>
            </div>
          </Link>

          <nav className="flex items-center space-x-6">
            {navItems.map(({ path, icon: Icon, label }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-md ${
                  location.pathname === path
                    ? 'bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 shadow-md'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50'
                }`}
              >
                <Icon className="h-5 w-5 transition-transform duration-300 hover:rotate-12" />
                <span className="font-medium">{label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;