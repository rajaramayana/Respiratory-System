
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { LearnView } from './components/LearnView';
import { OsceView } from './components/OsceView';
import { QuizView } from './components/QuizView';
import { LoadingSpinner } from './components/LoadingSpinner';
import { generateModuleContent } from './services/geminiService';
import type { SyllabusModule, ModuleName, Language } from './types';
import { MODULES } from './constants';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Chatbot } from './components/Chatbot';

export default function App() {
  const [storedModule, setStoredModule] = useLocalStorage<ModuleName>('gmTutorModule', 'Respiratory System');
  const [storedLanguage, setStoredLanguage] = useLocalStorage<Language>('gmTutorLanguage', 'en');

  const [currentModuleData, setCurrentModuleData] = useState<SyllabusModule | null>(null);
  const [selectedModule, setSelectedModule] = useState<ModuleName>(storedModule);
  const [language, setLanguage] = useState<Language>(storedLanguage);
  const [activeTab, setActiveTab] = useState<'learn' | 'osce' | 'quiz'>('learn');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchModuleData = useCallback(async (moduleName: ModuleName, lang: Language) => {
    setIsLoading(true);
    setError(null);
    try {
      // This is where the actual API call to a backend/Gemini would go.
      // For now, we use the mock service.
      const data = await generateModuleContent(moduleName, lang);
      setCurrentModuleData(data);
    } catch (err) {
      setError('Failed to load module content. Please try again later.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchModuleData(selectedModule, language);
    setStoredModule(selectedModule);
    setStoredLanguage(language);
  }, [selectedModule, language, fetchModuleData, setStoredModule, setStoredLanguage]);

  const handleModuleSelect = (moduleName: ModuleName) => {
    setSelectedModule(moduleName);
    setActiveTab('learn');
    setSearchTerm('');
  };
  
  const filteredModuleData = useMemo(() => {
    if (!searchTerm || !currentModuleData) {
      return currentModuleData;
    }
    const lowercasedFilter = searchTerm.toLowerCase();
    
    const filteredExplain = currentModuleData.explain.filter(
      (item) => item.topic.toLowerCase().includes(lowercasedFilter)
    );

    const filteredCases = currentModuleData.cases.filter(
      (item) => item.title.toLowerCase().includes(lowercasedFilter) || item.stem.toLowerCase().includes(lowercasedFilter)
    );

    return {
      ...currentModuleData,
      explain: filteredExplain,
      cases: filteredCases,
    };
  }, [searchTerm, currentModuleData]);

  const renderContent = () => {
    if (isLoading) {
      return <div className="flex items-center justify-center h-full"><LoadingSpinner /></div>;
    }
    if (error) {
      return <div className="flex items-center justify-center h-full text-red-500">{error}</div>;
    }
    if (!filteredModuleData) {
      return <div className="flex items-center justify-center h-full">No content available.</div>;
    }
    switch (activeTab) {
      case 'osce':
        return <OsceView osceData={filteredModuleData.osce} />;
      case 'quiz':
        return <QuizView moduleData={filteredModuleData} />;
      case 'learn':
      default:
        return <LearnView moduleData={filteredModuleData} />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-100 dark:bg-slate-900 font-sans">
      <Sidebar
        modules={MODULES}
        selectedModule={selectedModule}
        onSelectModule={handleModuleSelect}
        language={language}
        onLanguageChange={setLanguage}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        currentModuleData={currentModuleData}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          moduleTitle={currentModuleData?.module_title || ''}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          {renderContent()}
        </main>
      </div>
      <Chatbot moduleData={currentModuleData} />
    </div>
  );
}
