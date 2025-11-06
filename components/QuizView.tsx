
import React, { useState, useEffect } from 'react';
import type { SyllabusModule, McqItem } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';

type AnswersState = { [key: number]: number | null };

const McqQuestion: React.FC<{
  question: McqItem;
  index: number;
  onSelect: (questionIndex: number, answerIndex: number) => void;
  selectedAnswer: number | null;
  isSubmitted: boolean;
}> = ({ question, index, onSelect, selectedAnswer, isSubmitted }) => {
  const isCorrect = selectedAnswer === question.answer_index;

  return (
    <div className="p-4 border-b border-slate-200 dark:border-slate-700">
      <p className="font-semibold mb-3">{index + 1}. {question.q}</p>
      <div className="space-y-2">
        {question.options.map((option, optIndex) => {
          let optionClasses = "w-full text-left p-3 rounded-lg border transition-colors duration-200 ";
          if (isSubmitted) {
            if (optIndex === question.answer_index) {
              optionClasses += "bg-green-100 border-green-400 text-green-800 dark:bg-green-900/50 dark:border-green-600 dark:text-green-200";
            } else if (optIndex === selectedAnswer) {
              optionClasses += "bg-red-100 border-red-400 text-red-800 dark:bg-red-900/50 dark:border-red-600 dark:text-red-200";
            } else {
              optionClasses += "bg-slate-50 dark:bg-slate-700 border-slate-300 dark:border-slate-600";
            }
          } else {
            if (selectedAnswer === optIndex) {
              optionClasses += "bg-sky-100 border-sky-400 dark:bg-sky-900/50 dark:border-sky-600";
            } else {
              optionClasses += "bg-slate-50 hover:bg-slate-100 dark:bg-slate-700 dark:hover:bg-slate-600 border-slate-300 dark:border-slate-600";
            }
          }

          return (
            <button key={optIndex} onClick={() => !isSubmitted && onSelect(index, optIndex)} disabled={isSubmitted}>
              <div className={optionClasses}>
                <span className="font-mono mr-2">{String.fromCharCode(65 + optIndex)}.</span>
                <span>{option}</span>
              </div>
            </button>
          );
        })}
      </div>
      {isSubmitted && (
        <div className={`mt-3 p-3 rounded-lg text-sm ${isCorrect ? 'bg-green-50 text-green-700 dark:bg-green-900/50 dark:text-green-300' : 'bg-red-50 text-red-700 dark:bg-red-900/50 dark:text-red-300'}`}>
          <strong>Rationale:</strong> {question.why}
        </div>
      )}
    </div>
  );
};


export const QuizView: React.FC<{ moduleData: SyllabusModule }> = ({ moduleData }) => {
  const [storedAnswers, setStoredAnswers] = useLocalStorage<AnswersState>(`quizAnswers_${moduleData.module_title}`, {});
  
  const [answers, setAnswers] = useState<AnswersState>(storedAnswers);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  useEffect(() => {
    // Reset state when module changes
    setAnswers(storedAnswers);
    setIsSubmitted(false);
    setScore(0);
  }, [moduleData.module_title, storedAnswers]);
  
  const handleSelectAnswer = (questionIndex: number, answerIndex: number) => {
    const newAnswers = { ...answers, [questionIndex]: answerIndex };
    setAnswers(newAnswers);
    setStoredAnswers(newAnswers);
  };

  const handleSubmit = () => {
    let currentScore = 0;
    moduleData.quiz_mcq.forEach((q, index) => {
      if (answers[index] === q.answer_index) {
        currentScore++;
      }
    });
    setScore(currentScore);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setAnswers({});
    setStoredAnswers({});
    setIsSubmitted(false);
    setScore(0);
  };

  if (moduleData.quiz_mcq.length === 0 && moduleData.quiz_short.length === 0) {
    return <div className="text-center p-8 bg-white dark:bg-slate-800 rounded-lg shadow-md">No quiz available for this module.</div>;
  }

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md">
        <div className="p-4 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-xl font-bold">Module Quiz: {moduleData.module_title}</h2>
        </div>
        {isSubmitted && (
          <div className="p-4 bg-sky-50 dark:bg-sky-900/50">
            <h3 className="text-lg font-semibold text-sky-800 dark:text-sky-300">
              Quiz Results: {score} / {moduleData.quiz_mcq.length} Correct
            </h3>
          </div>
        )}
        <div>
          {moduleData.quiz_mcq.map((q, index) => (
            <McqQuestion 
              key={index} 
              question={q} 
              index={index}
              onSelect={handleSelectAnswer}
              selectedAnswer={answers[index] ?? null}
              isSubmitted={isSubmitted}
            />
          ))}
        </div>
        <div className="p-4 flex space-x-4">
          <button 
            onClick={handleSubmit} 
            disabled={isSubmitted}
            className="px-6 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition"
          >
            Submit
          </button>
          <button 
            onClick={handleReset} 
            className="px-6 py-2 bg-slate-200 text-slate-800 dark:bg-slate-600 dark:text-slate-200 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-500 transition"
          >
            Reset
          </button>
        </div>
      </div>
      
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-4 space-y-4">
         <h2 className="text-xl font-bold">Short Answer Questions</h2>
         {moduleData.quiz_short.map((q, index) => (
           <div key={index} className="p-4 border-t border-slate-200 dark:border-slate-700 first:border-t-0">
             <p className="font-semibold">{q.q} <span className="text-sm font-normal text-slate-500">({q.marks} marks)</span></p>
             <details className="mt-2">
               <summary className="cursor-pointer text-sm text-sky-600 dark:text-sky-400">View Marking Guide</summary>
               <div className="mt-2 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-md">
                 <ul className="list-disc list-inside space-y-1 text-sm">
                   {q.expected_points.map((pt, ptIndex) => <li key={ptIndex}>{pt}</li>)}
                 </ul>
               </div>
             </details>
           </div>
         ))}
      </div>
    </div>
  );
};
