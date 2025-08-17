interface ProblemData {
  subject: string;
  question: string;
  inputMethod: 'text' | 'image';
  imageFile?: File | null;
}

interface Solution {
  answer: string;
  steps: Array<{
    title: string;
    explanation: string;
    formula?: string;
    code?: string;
  }>;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  timeToComplete: string;
}

// Sample solutions for different subjects
const sampleSolutions = {
  math: {
    answer: "x = 5",
    steps: [
      {
        title: "Identify the equation type",
        explanation: "This is a linear equation in one variable. We need to isolate x on one side.",
        formula: "2x + 5 = 15"
      },
      {
        title: "Subtract 5 from both sides",
        explanation: "To isolate the term with x, we subtract 5 from both sides of the equation.",
        formula: "2x + 5 - 5 = 15 - 5 → 2x = 10"
      },
      {
        title: "Divide both sides by 2",
        explanation: "Now we divide both sides by 2 to solve for x.",
        formula: "2x ÷ 2 = 10 ÷ 2 → x = 5"
      },
      {
        title: "Verify the solution",
        explanation: "Let's check our answer by substituting x = 5 back into the original equation.",
        formula: "2(5) + 5 = 10 + 5 = 15 ✓"
      }
    ],
    difficulty: "Easy" as const,
    timeToComplete: "3 minutes"
  },
  
  science: {
    answer: "H₂O (2 hydrogen atoms + 1 oxygen atom)",
    steps: [
      {
        title: "Identify the compound",
        explanation: "Water is a chemical compound composed of hydrogen and oxygen atoms.",
      },
      {
        title: "Count hydrogen atoms",
        explanation: "Each water molecule contains 2 hydrogen atoms. These are represented by H₂ in the formula.",
      },
      {
        title: "Count oxygen atoms",
        explanation: "Each water molecule contains 1 oxygen atom, represented by O in the formula.",
      },
      {
        title: "Write the molecular formula",
        explanation: "Combining the elements, we get H₂O, where the subscript 2 indicates two hydrogen atoms.",
        formula: "H₂O"
      }
    ],
    difficulty: "Easy" as const,
    timeToComplete: "2 minutes"
  },
  
  coding: {
    answer: "def my_function(parameter): return result",
    steps: [
      {
        title: "Use the 'def' keyword",
        explanation: "In Python, functions are defined using the 'def' keyword followed by the function name.",
        code: "def function_name():"
      },
      {
        title: "Add parameters (optional)",
        explanation: "Parameters go inside parentheses. You can have multiple parameters separated by commas.",
        code: "def my_function(param1, param2):"
      },
      {
        title: "Add the function body",
        explanation: "The function body is indented and contains the code that runs when the function is called.",
        code: "def my_function(param1, param2):\n    # Function body here\n    result = param1 + param2\n    return result"
      },
      {
        title: "Call the function",
        explanation: "To use the function, call it by name with arguments if it has parameters.",
        code: "# Call the function\nresult = my_function(5, 3)\nprint(result)  # Output: 8"
      }
    ],
    difficulty: "Easy" as const,
    timeToComplete: "5 minutes"
  }
};

export const generateSolution = async (problemData: ProblemData): Promise<Solution> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // In a real implementation, this would call an actual AI API like OpenAI, Claude, or Google's API
  // For demo purposes, we'll return sample solutions based on the subject
  
  let baseSolution = sampleSolutions[problemData.subject as keyof typeof sampleSolutions];
  
  if (!baseSolution) {
    baseSolution = sampleSolutions.math; // fallback
  }
  
  // Customize solution based on the actual question
  if (problemData.inputMethod === 'image') {
    return {
      ...baseSolution,
      steps: [
        {
          title: "Image Analysis",
          explanation: "I've analyzed your uploaded image and identified the problem. Here's the step-by-step solution:",
        },
        ...baseSolution.steps
      ]
    };
  }
  
  return baseSolution;
};