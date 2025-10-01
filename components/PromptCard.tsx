
import React, { useState } from 'react';
import type { Prompt, UrgencyLevel } from '../types';

const ClipboardIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a2.25 2.25 0 0 1-2.25 2.25H9a2.25 2.25 0 0 1-2.25-2.25v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
  </svg>
);

const CheckIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
  </svg>
);


interface PromptCardProps {
  prompt: Prompt;
}

const urgencyStyles: { [key in UrgencyLevel]: string } = {
  CRÍTICA: 'bg-red-100 text-red-800 border-red-200',
  ALTA: 'bg-orange-100 text-orange-800 border-orange-200',
  MEDIA: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  BAJA: 'bg-green-100 text-green-800 border-green-200',
};

const Tag: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
    <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full border ${className}`}>
        {children}
    </span>
);


export const PromptCard: React.FC<PromptCardProps> = ({ prompt }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col h-full">
      <div className="p-5 flex-grow">
        <h3 className="text-lg font-bold text-gray-800">{prompt.tool}</h3>
        <p className="text-sm text-gray-500 mt-1 mb-4">{prompt.description}</p>
        <div className="space-y-2 mb-4 text-xs text-gray-600">
          <div className="flex items-center">
            <Tag className={urgencyStyles[prompt.urgency]}>
              Urgencia: {prompt.urgency}
            </Tag>
          </div>
          <div className="flex items-center">
             <Tag className="bg-blue-100 text-blue-800 border-blue-200">
                Ahorro: {prompt.timeSaved}
            </Tag>
          </div>
          <div className="flex items-center">
            <Tag className="bg-indigo-100 text-indigo-800 border-indigo-200">
              Setup: {prompt.implementation}
            </Tag>
          </div>
        </div>
        <div className="bg-gray-100 rounded-md p-3 my-4">
          <p className="text-sm text-gray-700 font-mono whitespace-pre-wrap break-words">{prompt.prompt}</p>
        </div>
      </div>
      <div className="border-t border-gray-200 p-3 bg-gray-50 rounded-b-lg">
        <button
          onClick={handleCopy}
          className={`w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
            copied
              ? 'bg-green-600 text-white'
              : 'bg-purple-600 text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500'
          }`}
        >
          {copied ? (
            <>
              <CheckIcon className="w-4 h-4" />
              Copiado!
            </>
          ) : (
            <>
              <ClipboardIcon className="w-4 h-4" />
              Copiar Prompt
            </>
          )}
        </button>
      </div>
    </div>
  );
};
