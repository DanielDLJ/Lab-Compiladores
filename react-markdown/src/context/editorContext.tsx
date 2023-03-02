import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { SymbolType } from '../compiler/lexer/symbol';

interface CompilerErrorType {
  line: number;
  message: string;
  token: SymbolType;
}

interface EditorContextType {
  markdownText: string;
  error: CompilerErrorType | null;
  setError: React.Dispatch<React.SetStateAction<CompilerErrorType | null>>;
  setMarkdownText: React.Dispatch<React.SetStateAction<string>>;
}

interface EditorProviderProps {
  children: ReactNode;
}

export const EditorContext = createContext<EditorContextType>(
  {} as EditorContextType
);

export function EditorProvider({ children }: EditorProviderProps) {
  const [markdownText, setMarkdownText] = useState<string>('');
  const [error, setError] = useState<CompilerErrorType | null>(null);

  useEffect(() => {
    console.log('error.line', error?.line);
    console.log('error.message', error?.message);
    console.log('error.token', error?.token);
  }, [error]);

  return (
    <EditorContext.Provider
      value={{
        error,
        setError,
        markdownText,
        setMarkdownText,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
}
