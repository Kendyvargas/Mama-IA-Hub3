
import React from 'react';
import type { Prompt } from '../types';
import { PromptCard } from './PromptCard';

interface PromptListProps {
  prompts: Prompt[];
}

export const PromptList: React.FC<PromptListProps> = ({ prompts }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {prompts.map(prompt => (
        <PromptCard key={prompt.id} prompt={prompt} />
      ))}
    </div>
  );
};
