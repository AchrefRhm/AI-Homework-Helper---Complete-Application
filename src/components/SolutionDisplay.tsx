import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Copy, Check, Star, StarOff } from 'lucide-react';

interface Step {
  title: string;
  explanation: string;
  formula?: string;
  code?: string;
}

interface Solution {
  answer: string;
  steps: Step[];
  difficulty: 'Easy' | 'Medium' | 'Hard';
  timeToComplete: string;
}

interface SolutionDisplayProps {
  solution: Solution;
}

const SolutionDisplay: React.FC<SolutionDisplayProps> = ({ solution }) => {
  const [expandedSteps, setExpandedSteps] = useState<number[]>([0]);
  const [copiedStep, setCopiedStep] = useState<number | null>(null);
  const [isFavorited, setIsFavorited] = useState(false);

  const toggleStep = (stepIndex: number) => {
    setExpandedSteps(prev =>
      prev.includes(stepIndex)
        ? prev.filter(i => i !== stepIndex)
        : [...prev, stepIndex]
    );
  };

  const copyToClipboard = async (text: string, stepIndex: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedStep(stepIndex);
      setTimeout(() => setCopiedStep(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 p-6 border-b border-gray-200 animate-gradient-x">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Solution</h2>
          <button
            onClick={() => setIsFavorited(!isFavorited)}
            className="p-2 rounded-lg hover:bg-white/50 transition-all duration-300 transform hover:scale-110"
          >
            {isFavorited ? (
              <Star className="h-6 w-6 text-yellow-500 fill-current animate-pulse" />
            ) : (
              <StarOff className="h-6 w-6 text-gray-400 hover:text-yellow-400 transition-colors" />
            )}
          </button>
        </div>

        <div className="flex items-center space-x-4 mb-4">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(solution.difficulty)}`}>
            {solution.difficulty}
          </span>
          <span className="text-sm text-gray-600">
            ⏱️ Est. time: {solution.timeToComplete}
          </span>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Final Answer:</h3>
          <div className="text-xl font-mono text-blue-600 bg-gradient-to-r from-blue-50 to-purple-50 p-3 rounded-lg animate-pulse-slow">
            {solution.answer}
          </div>
        </div>
      </div>

      {/* Steps */}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Step-by-Step Solution:</h3>
        <div className="space-y-4">
          {solution.steps.map((step, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]"
            >
              <button
                onClick={() => toggleStep(index)}
                className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-blue-50 hover:from-blue-50 hover:to-purple-50 transition-all duration-300"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full flex items-center justify-center text-sm font-semibold transform hover:scale-110 transition-transform duration-300">
                    {index + 1}
                  </div>
                  <span className="font-medium text-left">{step.title}</span>
                </div>
                {expandedSteps.includes(index) ? (
                  <ChevronDown className="h-5 w-5 text-gray-500 transform rotate-180 transition-transform duration-300" />
                ) : (
                  <ChevronRight className="h-5 w-5 text-gray-500 transition-transform duration-300" />
                )}
              </button>

              {expandedSteps.includes(index) && (
                <div className="p-4 bg-white animate-fade-in">
                  <div className="prose prose-sm max-w-none mb-4">
                    <p className="text-gray-700 leading-relaxed">{step.explanation}</p>
                  </div>

                  {step.formula && (
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">Formula:</h4>
                      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-3 rounded-lg font-mono text-blue-800 relative hover:shadow-md transition-shadow duration-300">
                        {step.formula}
                        <button
                          onClick={() => copyToClipboard(step.formula!, index)}
                          className="absolute top-2 right-2 p-1 hover:bg-blue-100 rounded transition-all duration-300 transform hover:scale-110"
                        >
                          {copiedStep === index ? (
                            <Check className="h-4 w-4 text-green-600 animate-bounce" />
                          ) : (
                            <Copy className="h-4 w-4 text-gray-500" />
                          )}
                        </button>
                      </div>
                    </div>
                  )}

                  {step.code && (
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">Code:</h4>
                      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-gray-100 p-4 rounded-lg font-mono text-sm relative hover:shadow-lg transition-shadow duration-300">
                        <pre className="whitespace-pre-wrap">{step.code}</pre>
                        <button
                          onClick={() => copyToClipboard(step.code!, index)}
                          className="absolute top-2 right-2 p-1 hover:bg-gray-800 rounded transition-all duration-300 transform hover:scale-110"
                        >
                          {copiedStep === index ? (
                            <Check className="h-4 w-4 text-green-400 animate-bounce" />
                          ) : (
                            <Copy className="h-4 w-4 text-gray-400" />
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-4 text-center text-sm text-gray-600">
        💡 Tip: Click on each step to expand and see detailed explanations
      </div>
    </div>
  );
};

export default SolutionDisplay;