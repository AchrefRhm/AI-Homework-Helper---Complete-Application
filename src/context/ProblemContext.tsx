import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Problem {
  id: string;
  subject: string;
  question: string;
  solution: {
    answer: string;
    steps: Array<{
      title: string;
      explanation: string;
      formula?: string;
      code?: string;
    }>;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    timeToComplete: string;
  };
  timestamp: Date;
  inputMethod: 'text' | 'image';
}

interface ProblemContextType {
  problems: Problem[];
  addProblem: (problem: Problem) => void;
  removeProblem: (id: string) => void;
}

const ProblemContext = createContext<ProblemContextType | undefined>(undefined);

interface ProblemProviderProps {
  children: ReactNode;
}

export const ProblemProvider: React.FC<ProblemProviderProps> = ({ children }) => {
  const [problems, setProblems] = useState<Problem[]>([]);

  const addProblem = (problem: Problem) => {
    setProblems(prev => [problem, ...prev]);
  };

  const removeProblem = (id: string) => {
    setProblems(prev => prev.filter(problem => problem.id !== id));
  };

  return (
    <ProblemContext.Provider value={{ problems, addProblem, removeProblem }}>
      {children}
    </ProblemContext.Provider>
  );
};

export const useProblemContext = (): ProblemContextType => {
  const context = useContext(ProblemContext);
  if (!context) {
    throw new Error('useProblemContext must be used within a ProblemProvider');
  }
  return context;
};