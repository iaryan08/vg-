'use client';

import { useState, useEffect, useCallback } from 'react';

const HISTORY_KEY = 'veritasSearchHistory';
const MAX_HISTORY_SIZE = 5;

export const useSearchHistory = () => {
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    // Check if window is defined to avoid SSR errors
    if (typeof window === 'undefined') return;

    try {
      const storedHistory = localStorage.getItem(HISTORY_KEY);
      if (storedHistory) {
        setHistory(JSON.parse(storedHistory));
      }
    } catch (error) {
      console.error('Could not load search history', error);
    }
  }, []);

  const addSearchTerm = useCallback((term: string) => {
    if (!term || term.trim() === '') return;

    const lowerCaseTerm = term.toLowerCase();

    setHistory(prevHistory => {
      const newHistory = [
        term,
        ...prevHistory.filter(item => item.toLowerCase() !== lowerCaseTerm)
      ].slice(0, MAX_HISTORY_SIZE);
      
      try {
        localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
      } catch (error) {
        console.error('Could not save search history', error);
      }
      return newHistory;
    });
  }, []);

  return { history, addSearchTerm };
};
