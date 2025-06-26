
'use client';

import { useState, useEffect } from 'react';
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
import { Search, Wand2 } from 'lucide-react';
import URLProcessor from '@/components/url-processor';

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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedSearch = searchTerm.trim();
    if (trimmedSearch) {
      router.push(`/search?q=${encodeURIComponent(trimmedSearch)}`);
    }
  };

  return (
    <div className="w-full">
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
      <p className="mt-3 flex items-center justify-center gap-1.5 text-sm text-muted-foreground">
        Or try the URL Analyzer
        <Wand2 className="inline-block h-4 w-4 text-primary" />
      </p>
    </div>
  );
}
