
import React, { useState } from 'react';
import type { ModuleName, Language, SyllabusModule } from '../types';
import { BookOpenIcon, ClipboardCheckIcon, BeakerIcon, DownloadIcon, PrinterIcon, MenuIcon } from './icons';

interface SidebarProps {
  modules: readonly ModuleName[];
  selectedModule: ModuleName;
  onSelectModule: (module: ModuleName) => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  activeTab: 'learn' | 'osce' | 'quiz';
  onTabChange: (tab: 'learn' | 'osce' | 'quiz') => void;
  currentModuleData: SyllabusModule | null;
}

const TabButton: React.FC<{
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}> = ({ label, icon, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center space-x-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200 ${
      isActive
        ? 'bg-sky-600 text-white shadow-md'
        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
    }`}
  >
    {icon}
    <span className="truncate">{label}</span>
  </button>
);

export const Sidebar: React.FC<SidebarProps> = ({
  modules,
  selectedModule,
  onSelectModule,
  language,
  onLanguageChange,
  activeTab,
  onTabChange,
  currentModuleData
}) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleExportJSON = () => {
        if (!currentModuleData) return;
        const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
            JSON.stringify(currentModuleData, null, 2)
        )}`;
        const link = document.createElement("a");
        link.href = jsonString;
        link.download = `${currentModuleData.module_title.replace(/\s/g, '_')}.json`;
        link.click();
    };

    const handleExportQuizCSV = () => {
        if (!currentModuleData || currentModuleData.quiz_mcq.length === 0) return;
        const header = ["question", "option_a", "option_b", "option_c", "option_d", "answer_index", "explanation"];
        const rows = currentModuleData.quiz_mcq.map(q => [
            `"${q.q.replace(/"/g, '""')}"`,
            `"${q.options[0].replace(/"/g, '""')}"`,
            `"${q.options[1].replace(/"/g, '""')}"`,
            `"${q.options[2].replace(/"/g, '""')}"`,
            `"${q.options[3].replace(/"/g, '""')}"`,
            q.answer_index,
            `"${q.why.replace(/"/g, '""')}"`
        ].join(','));
        const csvContent = "data:text/csv;charset=utf-8," + [header.join(','), ...rows].join('\n');
        const link = document.createElement("a");
        link.href = encodeURI(csvContent);
        link.download = `${currentModuleData.module_title.replace(/\s/g, '_')}_quiz.csv`;
        link.click();
    };

    const sidebarContent = (
      <aside className="no-print w-64 bg-white dark:bg-slate-800 shadow-lg flex-shrink-0 flex flex-col p-4 space-y-4">
        <div className="flex items-center space-x-2">
            <img src="https://picsum.photos/40/40" alt="logo" className="rounded-full" />
            <h1 className="text-lg font-bold text-slate-800 dark:text-white">GM Tutor</h1>
        </div>

        <div className="flex-1 overflow-y-auto pr-2 -mr-2">
          {/* Module Selector */}
          <div>
            <label htmlFor="module-select" className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Module</label>
            <select
              id="module-select"
              value={selectedModule}
              onChange={(e) => onSelectModule(e.target.value as ModuleName)}
              className="w-full bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg p-2 text-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
            >
              {modules.map(module => (
                <option key={module} value={module}>{module}</option>
              ))}
            </select>
          </div>
          
          <hr className="my-4 border-slate-200 dark:border-slate-700"/>

          {/* View Tabs */}
          <nav className="space-y-2">
            <TabButton label="Learn" icon={<BookOpenIcon className="w-5 h-5"/>} isActive={activeTab === 'learn'} onClick={() => onTabChange('learn')} />
            <TabButton label="OSCE Stations" icon={<ClipboardCheckIcon className="w-5 h-5"/>} isActive={activeTab === 'osce'} onClick={() => onTabChange('osce')} />
            <TabButton label="Quiz" icon={<BeakerIcon className="w-5 h-5"/>} isActive={activeTab === 'quiz'} onClick={() => onTabChange('quiz')} />
          </nav>

          <hr className="my-4 border-slate-200 dark:border-slate-700"/>

          {/* Export section */}
          <div>
            <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">Export</h3>
            <div className="space-y-2">
              <button onClick={handleExportJSON} className="w-full flex items-center space-x-3 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 p-2 rounded-lg transition-colors">
                <DownloadIcon className="w-4 h-4" /><span>Module (JSON)</span>
              </button>
              <button onClick={handleExportQuizCSV} className="w-full flex items-center space-x-3 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 p-2 rounded-lg transition-colors">
                <DownloadIcon className="w-4 h-4" /><span>Quiz (CSV)</span>
              </button>
              <button onClick={() => window.print()} className="w-full flex items-center space-x-3 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 p-2 rounded-lg transition-colors">
                <PrinterIcon className="w-4 h-4" /><span>Print OSCE</span>
              </button>
            </div>
          </div>
        </div>

        {/* Language Toggle */}
        <div className="flex items-center justify-center space-x-2">
          <span className={`text-sm font-medium ${language === 'en' ? 'text-sky-600' : 'text-slate-500'}`}>EN</span>
          <button
            onClick={() => onLanguageChange(language === 'en' ? 'ne' : 'en')}
            className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 ${language === 'ne' ? 'bg-sky-600' : 'bg-slate-300 dark:bg-slate-600'}`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 ${language === 'ne' ? 'translate-x-5' : 'translate-x-0'}`}
            />
          </button>
          <span className={`text-sm font-medium ${language === 'ne' ? 'text-sky-600' : 'text-slate-500'}`}>NE</span>
        </div>
      </aside>
    );

  return (
    <>
      <div className="hidden lg:flex">{sidebarContent}</div>
      <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="lg:hidden no-print fixed top-4 left-4 z-20 p-2 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-full shadow-lg">
          <MenuIcon className="w-6 h-6"/>
      </button>
      {isSidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-10" onClick={() => setIsSidebarOpen(false)}>
              <div className="fixed inset-0 bg-black/30" aria-hidden="true"></div>
              <div onClick={e => e.stopPropagation()} className="relative h-full">
                  {sidebarContent}
              </div>
          </div>
      )}
    </>
  );
};
