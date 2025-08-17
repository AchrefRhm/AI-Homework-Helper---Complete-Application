import React from 'react';
import { useProblemContext } from '../context/ProblemContext';
import { Calendar, Clock, Trash2, Eye, Calculator, Atom, Code } from 'lucide-react';

const History: React.FC = () => {
  const { problems, removeProblem } = useProblemContext();

  const getSubjectIcon = (subject: string) => {
    switch (subject) {
      case 'math': return Calculator;
      case 'science': return Atom;
      case 'coding': return Code;
      default: return Calculator;
    }
  };

  const getSubjectColor = (subject: string) => {
    switch (subject) {
      case 'math': return 'text-blue-600 bg-blue-50';
      case 'science': return 'text-green-600 bg-green-50';
      case 'coding': return 'text-purple-600 bg-purple-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (problems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto text-center py-16 animate-fade-in-up">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 p-12 hover:shadow-xl transition-all duration-300">
          <Clock className="h-16 w-16 text-gray-300 mx-auto mb-6 animate-pulse" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No Problems Yet</h2>
          <p className="text-gray-600 mb-8">
            Start solving problems to see your history here. All your solved problems will be saved for future reference.
          </p>
          <a
            href="/"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            Solve Your First Problem
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 animate-fade-in-up">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">Problem History</h1>
        <p className="text-gray-600 animate-fade-in-up animation-delay-200">
          Review your previously solved problems ({problems.length} total)
        </p>
      </div>

      <div className="space-y-6">
        {problems.map((problem) => {
          const SubjectIcon = getSubjectIcon(problem.subject);
          const subjectColors = getSubjectColor(problem.subject);

          return (
            <div
              key={problem.id}
              className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] animate-fade-in-up"
              style={{ animationDelay: `${problems.indexOf(problem) * 100}ms` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${subjectColors} transform hover:scale-110 transition-transform duration-300`}>
                    <SubjectIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 capitalize">
                      {problem.subject}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(problem.timestamp)}</span>
                      </div>
                      <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                        {problem.inputMethod === 'text' ? 'Text Input' : 'Image Upload'}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => removeProblem(problem.id)}
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-300 transform hover:scale-110"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>

              <div className="mb-4">
                <h4 className="font-medium text-gray-900 mb-2">Question:</h4>
                <p className="text-gray-700 bg-gradient-to-r from-gray-50 to-blue-50 p-3 rounded-lg">
                  {problem.question}
                </p>
              </div>

              <div className="mb-4">
                <h4 className="font-medium text-gray-900 mb-2">Answer:</h4>
                <p className="text-blue-600 font-mono bg-gradient-to-r from-blue-50 to-purple-50 p-3 rounded-lg">
                  {problem.solution.answer}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span>{problem.solution.steps.length} steps</span>
                  <span className="capitalize">{problem.solution.difficulty} difficulty</span>
                </div>
                <button className="flex items-center space-x-2 px-4 py-2 text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 rounded-lg transition-all duration-300 transform hover:scale-105">
                  <Eye className="h-4 w-4" />
                  <span>View Solution</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default History;