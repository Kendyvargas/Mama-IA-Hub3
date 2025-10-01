
import React, { useState, useMemo } from 'react';
import { prompts } from './constants/data';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { PromptList } from './components/PromptList';
import type { Prompt } from './types';

const App: React.FC = () => {
  const categories = useMemo(() => {
    const categorySet = new Set(prompts.map(p => p.category));
    return Array.from(categorySet);
  }, []);

  const [selectedCategory, setSelectedCategory] = useState<string>(categories[0]);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const filteredPrompts: Prompt[] = useMemo(() => {
    return prompts.filter(p => p.category === selectedCategory);
  }, [selectedCategory]);

  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
    // Close sidebar on mobile after selection
    if (window.innerWidth < 768) { // Tailwind's 'md' breakpoint
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className="flex h-screen w-screen font-sans text-gray-800 bg-white overflow-hidden">
      <Sidebar
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={handleSelectCategory}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          category={selectedCategory} 
          onMenuClick={() => setIsSidebarOpen(true)} 
        />
        <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-50">
          <PromptList prompts={filteredPrompts} />
        </main>
      </div>
    </div>
  );
};

export default App;
