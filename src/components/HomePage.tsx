import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator, Atom, Code, ArrowRight, Upload, MessageSquare, Zap } from 'lucide-react';
import AnimatedCounter from './AnimatedCounter';

const HomePage: React.FC = () => {
  const subjects = [
    {
      id: 'math',
      name: 'Mathematics',
      icon: Calculator,
      description: 'Algebra, Calculus, Geometry, Statistics',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
    },
    {
      id: 'science',
      name: 'Science',
      icon: Atom,
      description: 'Physics, Chemistry, Biology',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
    },
    {
      id: 'coding',
      name: 'Programming',
      icon: Code,
      description: 'Python, JavaScript, Java, C++',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
    },
  ];

  const features = [
    {
      icon: MessageSquare,
      title: 'Text Input',
      description: 'Type your questions directly for instant help',
    },
    {
      icon: Upload,
      title: 'Image Upload',
      description: 'Upload photos of handwritten problems',
    },
    {
      icon: Zap,
      title: 'Step-by-Step',
      description: 'Get detailed explanations for every solution',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight animate-fade-in-up">
          Get Help with Your
          <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient-x">
            {' '}Homework
          </span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in-up animation-delay-200">
          Upload images or type questions to get instant, step-by-step solutions for math, science, 
          and programming problems. Learn better with AI-powered explanations.
        </p>
        
        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 animate-fade-in-up animation-delay-400">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-xl hover:scale-105 transition-all duration-300 group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 group-hover:scale-110 transition-all duration-300">
                <feature.icon className="h-6 w-6 text-white group-hover:animate-pulse" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{feature.title}</h3>
              <p className="text-gray-600 group-hover:text-gray-700 transition-colors">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Subject Selection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in-up animation-delay-600">
        {subjects.map((subject) => {
          const IconComponent = subject.icon;
          return (
            <Link
              key={subject.id}
              to={`/solve/${subject.id}`}
              className={`${subject.bgColor} ${subject.borderColor} border-2 rounded-2xl p-8 hover:shadow-2xl transition-all duration-500 hover:scale-105 group relative overflow-hidden`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <div className={`bg-gradient-to-r ${subject.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 relative z-10`}>
                <IconComponent className="h-8 w-8 text-white group-hover:animate-pulse" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors relative z-10">{subject.name}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed group-hover:text-gray-700 transition-colors relative z-10">{subject.description}</p>
              
              <div className="flex items-center text-blue-600 font-semibold group-hover:text-blue-700 relative z-10">
                <span>Get Started</span>
                <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-2 group-hover:scale-110 transition-all duration-300" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Stats Section */}
      <div className="mt-20 bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 animate-fade-in-up animation-delay-800">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-blue-600 mb-2"><AnimatedCounter end={10000} suffix="+" /></div>
            <div className="text-gray-600">Problems Solved</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-green-600 mb-2"><AnimatedCounter end={95} suffix="%" /></div>
            <div className="text-gray-600">Accuracy Rate</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-purple-600 mb-2"><AnimatedCounter end={24} suffix="/7" /></div>
            <div className="text-gray-600">Available</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;