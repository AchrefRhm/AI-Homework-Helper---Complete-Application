import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Upload, MessageSquare, Send, Image as ImageIcon, Loader, CheckCircle } from 'lucide-react';
import { useProblemContext } from '../context/ProblemContext';
import { generateSolution } from '../services/aiService';
import SolutionDisplay from './SolutionDisplay';
import LoadingSpinner from './LoadingSpinner';

const ProblemSolver: React.FC = () => {
  const { subject } = useParams<{ subject: string }>();
  const { addProblem } = useProblemContext();
  const [inputMethod, setInputMethod] = useState<'text' | 'image'>('text');
  const [question, setQuestion] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [solution, setSolution] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const subjectNames = {
    math: 'Mathematics',
    science: 'Science',
    coding: 'Programming',
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if ((!question.trim() && !imageFile) || loading) return;

    setLoading(true);
    try {
      const problemData = {
        subject: subject || '',
        question: inputMethod === 'text' ? question : 'Image-based problem',
        inputMethod,
        imageFile: inputMethod === 'image' ? imageFile : null,
      };

      const generatedSolution = await generateSolution(problemData);
      setSolution(generatedSolution);
      
      addProblem({
        id: Date.now().toString(),
        subject: subject || '',
        question: problemData.question,
        solution: generatedSolution,
        timestamp: new Date(),
        inputMethod,
      });
    } catch (error) {
      console.error('Error generating solution:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setQuestion('');
    setImageFile(null);
    setImagePreview(null);
    setSolution(null);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 text-center animate-fade-in-up">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
          {subjectNames[subject as keyof typeof subjectNames]} Problem Solver
        </h1>
        <p className="text-gray-600">
          Get step-by-step solutions for your {subject} problems
        </p>
      </div>

      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 animate-fade-in-up animation-delay-200">
        {/* Input Method Toggle */}
        <div className="border-b border-gray-200 p-6">
          <div className="flex space-x-4">
            <button
              onClick={() => setInputMethod('text')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                inputMethod === 'text'
                  ? 'bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 border-2 border-blue-200 shadow-md transform scale-105'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <MessageSquare className="h-5 w-5" />
              <span>Type Question</span>
            </button>
            <button
              onClick={() => setInputMethod('image')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                inputMethod === 'image'
                  ? 'bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 border-2 border-blue-200 shadow-md transform scale-105'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Upload className="h-5 w-5" />
              <span>Upload Image</span>
            </button>
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="p-6">
          {inputMethod === 'text' ? (
            <div className="mb-6">
              <label htmlFor="question" className="block text-sm font-medium text-gray-700 mb-3">
                Enter your {subject} problem:
              </label>
              <textarea
                id="question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder={`Example: ${
                  subject === 'math' ? 'Solve for x: 2x + 5 = 15'
                  : subject === 'science' ? 'What is the molecular formula of water?'
                  : 'How do I create a function in Python?'
                }`}
                className="w-full h-32 p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-300 focus:shadow-lg"
                disabled={loading}
              />
            </div>
          ) : (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Upload an image of your problem:
              </label>
              <div
                className={`border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition-all duration-300 hover:bg-blue-50/50 ${
                  imagePreview ? 'bg-gray-50' : ''
                }`}
              >
                {imagePreview ? (
                  <div className="space-y-4">
                    <img
                      src={imagePreview}
                      alt="Problem preview" 
                      className="max-h-64 mx-auto rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:scale-105"
                    />
                    <div className="flex items-center justify-center space-x-2 text-green-600">
                      <CheckCircle className="h-5 w-5" />
                      <span>Image uploaded successfully</span>
                    </div>
                  </div>
                ) : (
                  <>
                    <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4 animate-bounce" />
                    <p className="text-gray-600 mb-4">
                      Click to upload or drag and drop your problem image
                    </p>
                  </>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                  disabled={loading}
                />
                <label
                  htmlFor="image-upload"
                  className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                >
                  <Upload className="h-5 w-5 mr-2" />
                  {imagePreview ? 'Change Image' : 'Choose Image'}
                </label>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={resetForm}
              className="px-6 py-3 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-all duration-300"
              disabled={loading}
            >
              Clear
            </button>
            <button
              type="submit"
              disabled={(!question.trim() && !imageFile) || loading}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:transform-none disabled:shadow-none"
            >
              {loading ? (
                <LoadingSpinner size="sm" color="text-white" />
              ) : (
                <Send className="h-5 w-5" />
              )}
              <span>{loading ? 'Solving...' : 'Solve Problem'}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Solution Display */}
      {solution && (
        <div className="mt-8 animate-fade-in-up">
          <SolutionDisplay solution={solution} />
        </div>
      )}
    </div>
  );
};

export default ProblemSolver;