
'use client';

<<<<<<< HEAD
import { useState, useEffect, useRef } from 'react';
=======
import { useState, useEffect } from 'react';
>>>>>>> a99bb5b93e16a4ead5edf2e777a0d89891ddb0d1
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
<<<<<<< HEAD
import { Search, Wand2, History } from 'lucide-react';
import URLProcessor from '@/components/url-processor';
import { useSearchHistory } from '@/hooks/use-search-history';
import { Card, CardContent } from '@/components/ui/card';
=======
import { Search, Wand2 } from 'lucide-react';
import URLProcessor from '@/components/url-processor';
>>>>>>> a99bb5b93e16a4ead5edf2e777a0d89891ddb0d1

const searchSuggestions = [
  "Search for 'machine learning'...",
  "Search for 'stoicism'...",
  "Search for 'urban gardening'...",
  "Search for 'quantum computing'...",
  "Search for 'minimalism'...",
  "Search for 'indie game dev'...",
  "Search for 'slow living'...",
];

export default function SearchForm() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPlaceholder, setCurrentPlaceholder] = useState(searchSuggestions[0]);
  const router = useRouter();
<<<<<<< HEAD
  const { history, addSearchTerm } = useSearchHistory();
  const [showHistory, setShowHistory] = useState(false);
  const searchWrapperRef = useRef<HTMLDivElement>(null);
=======
>>>>>>> a99bb5b93e16a4ead5edf2e777a0d89891ddb0d1

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPlaceholder((prev) => {
        const currentIndex = searchSuggestions.indexOf(prev);
        const nextIndex = (currentIndex + 1) % searchSuggestions.length;
        return searchSuggestions[nextIndex];
      });
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, []);
<<<<<<< HEAD
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
        if (searchWrapperRef.current && !searchWrapperRef.current.contains(event.target as Node)) {
            setShowHistory(false);
        }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
=======
>>>>>>> a99bb5b93e16a4ead5edf2e777a0d89891ddb0d1

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedSearch = searchTerm.trim();
    if (trimmedSearch) {
<<<<<<< HEAD
      addSearchTerm(trimmedSearch);
=======
>>>>>>> a99bb5b93e16a4ead5edf2e777a0d89891ddb0d1
      router.push(`/search?q=${encodeURIComponent(trimmedSearch)}`);
    }
  };

<<<<<<< HEAD
  const handleHistoryClick = (term: string) => {
    addSearchTerm(term);
    router.push(`/search?q=${encodeURIComponent(term)}`);
    setShowHistory(false);
  }

  return (
    <div className="w-full relative" ref={searchWrapperRef}>
=======
  return (
    <div className="w-full">
>>>>>>> a99bb5b93e16a4ead5edf2e777a0d89891ddb0d1
      <form
        onSubmit={handleSearch}
        className="mt-4 flex w-full items-center gap-2"
      >
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder={currentPlaceholder}
            className="h-12 pl-10 text-base"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
<<<<<<< HEAD
            onFocus={() => setShowHistory(true)}
=======
>>>>>>> a99bb5b93e16a4ead5edf2e777a0d89891ddb0d1
            aria-label="Search"
          />
        </div>
        <Button
          type="submit"
          size="icon"
          variant="ghost"
          className="h-12 w-12 shrink-0 border border-input text-foreground hover:bg-focus-gradient bg-400 hover:animate-gradient-flow hover:text-primary-foreground hover:border-transparent"
          aria-label="Search"
        >
          <Search />
        </Button>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-12 w-12 shrink-0 border border-input text-foreground hover:bg-focus-gradient bg-400 hover:animate-gradient-flow hover:text-primary-foreground hover:border-transparent"
              aria-label="Process URL"
            >
              <Wand2 />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[625px] max-h-[90dvh] flex flex-col">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Wand2 className="h-6 w-6 text-primary" />
                Process an Article from the Web
              </DialogTitle>
              <DialogDescription>
                Enter the URL of a blog post or article to classify and summarize
                it using AI.
              </DialogDescription>
            </DialogHeader>
            <div className='overflow-y-auto -mr-2 pr-2 sm:-mr-6 sm:pr-6'>
              <URLProcessor />
            </div>
          </DialogContent>
        </Dialog>
      </form>
<<<<<<< HEAD
       {showHistory && history.length > 0 && (
          <Card className="absolute top-full mt-2 w-full shadow-lg z-50">
              <CardContent className="p-2">
                  <ul>
                      {history.map((histItem, index) => (
                          <li key={index}>
                              <button onClick={() => handleHistoryClick(histItem)} className="w-full text-left flex items-center gap-2 p-2 rounded-md hover:bg-muted">
                                  <History className="h-4 w-4 text-muted-foreground" />
                                  <span>{histItem}</span>
                              </button>
                          </li>
                      ))}
                  </ul>
              </CardContent>
          </Card>
      )}
=======
>>>>>>> a99bb5b93e16a4ead5edf2e777a0d89891ddb0d1
      <p className="mt-3 flex items-center justify-center gap-1.5 text-sm text-muted-foreground">
        Or try the URL Analyzer
        <Wand2 className="inline-block h-4 w-4 text-primary" />
      </p>
    </div>
  );
}
