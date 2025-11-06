
import React, { useState } from 'react';
import type { SyllabusModule } from '../types';

const Card: React.FC<{ title: string; children: React.ReactNode; defaultOpen?: boolean }> = ({ title, children, defaultOpen = true }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className="bg-white dark:bg-slate-800 shadow-md rounded-lg overflow-hidden">
            <button
                className="w-full flex justify-between items-center p-4 text-left bg-slate-50 dark:bg-slate-700/50"
                onClick={() => setIsOpen(!isOpen)}
            >
                <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200">{title}</h3>
                <svg className={`w-6 h-6 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            {isOpen && <div className="p-4">{children}</div>}
        </div>
    );
};

export const LearnView: React.FC<{ moduleData: SyllabusModule }> = ({ moduleData }) => {
  const [activeDrill, setActiveDrill] = useState<number | null>(null);

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold mb-3 text-sky-700 dark:text-sky-400">Learning Outcomes</h3>
        <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-300">
          {moduleData.outcomes.map((outcome, index) => (
            <li key={index}>{outcome}</li>
          ))}
        </ul>
      </div>

      {moduleData.explain.length > 0 && (
        <Card title="Explanations" defaultOpen={true}>
          <div className="space-y-4">
            {moduleData.explain.map((item) => (
              <details key={item.topic} className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-md group">
                  <summary className="font-semibold text-md cursor-pointer text-slate-800 dark:text-slate-100">{item.topic}</summary>
                  <div className="prose prose-sm max-w-none mt-2 text-slate-600 dark:text-slate-300" dangerouslySetInnerHTML={{ __html: item.summary_html }} />
              </details>
            ))}
          </div>
        </Card>
      )}

      {moduleData.algorithms.length > 0 && (
        <Card title="Clinical Algorithms">
          {moduleData.algorithms.map((algo, index) => (
            <div key={index} className="bg-slate-900 dark:bg-black text-white p-4 rounded-lg font-mono text-xs whitespace-pre-wrap overflow-x-auto">
              <h4 className="font-bold mb-2 text-sky-400">{algo.name}</h4>
              <code>{algo.ascii_flow}</code>
            </div>
          ))}
        </Card>
      )}
      
      {moduleData.cases.length > 0 && (
        <Card title="Case Vignettes">
           <div className="space-y-4">
            {moduleData.cases.map((caseItem, index) => (
                <details key={index} className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-md group">
                    <summary className="font-semibold text-md cursor-pointer text-slate-800 dark:text-slate-100">{caseItem.title}</summary>
                    <p className="italic my-2 text-slate-600 dark:text-slate-300">{caseItem.stem}</p>
                    <div className="my-3 space-y-2">
                        {caseItem.questions.map((q, qIndex) => <p key={qIndex} className="text-sm font-medium text-slate-700 dark:text-slate-200">{`• ${q}`}</p>)}
                    </div>
                    <div className="mt-4 border-t border-slate-200 dark:border-slate-600 pt-3">
                      <h5 className="font-semibold text-sm mb-2 text-sky-600 dark:text-sky-400">Teaching Points:</h5>
                      <ul className="list-disc list-inside space-y-1 text-sm text-slate-600 dark:text-slate-300">
                          {caseItem.teaching_points.map((pt, ptIndex) => <li key={ptIndex}>{pt}</li>)}
                      </ul>
                    </div>
                </details>
            ))}
          </div>
        </Card>
      )}
      
      {moduleData.image_drills.length > 0 && (
        <Card title="Image Drills">
          <div className="space-y-4">
            {moduleData.image_drills.map((drill, index) => (
              <div key={index} className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-md">
                <p className="font-semibold">{drill.type} Prompt:</p>
                <p className="my-2 text-slate-600 dark:text-slate-300">{drill.prompt}</p>
                <button onClick={() => setActiveDrill(activeDrill === index ? null : index)} className="text-sm text-sky-600 hover:text-sky-800 dark:text-sky-400 dark:hover:text-sky-300">
                  {activeDrill === index ? 'Hide Answer' : 'Show Model Answer'}
                </button>
                {activeDrill === index && <p className="mt-2 p-3 bg-green-50 dark:bg-green-900/50 rounded-md text-sm text-slate-700 dark:text-slate-200">{drill.model_answer}</p>}
              </div>
            ))}
          </div>
        </Card>
      )}
      
      {moduleData.dental_emergency_cards.length > 0 && (
        <Card title="Dental Clinic Emergency Cards">
          <div className="grid md:grid-cols-2 gap-4">
            {moduleData.dental_emergency_cards.map((card, index) => (
              <div key={index} className="border border-red-400 dark:border-red-600 bg-red-50 dark:bg-slate-800 p-4 rounded-lg">
                <h4 className="font-bold text-red-800 dark:text-red-400">{card.condition}</h4>
                <div className="mt-2">
                  <h5 className="font-semibold text-sm">First-Aid Steps:</h5>
                  <ul className="list-decimal list-inside text-sm mt-1 space-y-1">
                    {card.first_aid_steps.map((step, sIndex) => <li key={sIndex}>{step}</li>)}
                  </ul>
                </div>
                <div className="mt-3">
                  <h5 className="font-semibold text-sm">Refer When:</h5>
                  <ul className="list-disc list-inside text-sm mt-1 space-y-1">
                    {card.refer_when.map((reason, rIndex) => <li key={rIndex}>{reason}</li>)}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

       {moduleData.reflection.length > 0 && (
        <Card title="Reflection Prompts">
          <ul className="list-disc list-inside space-y-3 text-slate-600 dark:text-slate-300">
            {moduleData.reflection.map((prompt, index) => (
              <li key={index} className="italic">{prompt}</li>
            ))}
          </ul>
        </Card>
      )}
      
      <footer className="text-center text-xs text-slate-400 py-4">
        <p>{moduleData.references_note}</p>
        <p>Version: {moduleData.version}</p>
      </footer>
    </div>
  );
};
