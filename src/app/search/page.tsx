
'use client';

import { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Search, Link as LinkIcon, ArrowRight, Star, Palette, Bot, SearchX } from 'lucide-react';
import { allResults } from '@/lib/data';
import AuthorCard from '@/components/author-card';
import AuthorCardArchita from '@/components/author-card-archita';
import { motion } from 'framer-motion';
import { summarizeSearchQuery, SummarizeSearchQueryOutput } from '@/ai/flows/summarize-search-query';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

const ITEMS_PER_PAGE = 10;

const authorKeywords = ['aryan', 'aryan mehra', 'aaru', 'author', 'who are you'];
const author2Keywords = ['aryan 2', 'portfolio 2', 'version 2'];
const architaKeywords = ['archita', 'archita saxena', 'archu', 'archuu', 'bestie', 'best friend', 'beastfriend'];

function SearchResults() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const query = searchParams.get('q') || '';
    const filter = searchParams.get('filter') || 'all';
    const page = searchParams.get('page') || '1';

    const [searchTerm, setSearchTerm] = useState(query);
    const [aiSummary, setAiSummary] = useState<SummarizeSearchQueryOutput | null>(null);
    const [isAiSummaryLoading, setIsAiSummaryLoading] = useState(false);
    
    useEffect(() => {
        setSearchTerm(query);
    }, [query]);

    useEffect(() => {
        const fetchAiSummary = async () => {
            if (query && !authorKeywords.some(k => query.toLowerCase().includes(k)) && !author2Keywords.some(k => query.toLowerCase().includes(k)) && !architaKeywords.some(k => query.toLowerCase().includes(k))) {
                setIsAiSummaryLoading(true);
                setAiSummary(null);
                try {
                    const summaryResult = await summarizeSearchQuery({ query });
                    setAiSummary(summaryResult);
                } catch (error) {
                    console.error("Failed to fetch AI summary:", error);
                    setAiSummary(null);
                } finally {
                    setIsAiSummaryLoading(false);
                }
            } else {
                setAiSummary(null);
            }
        };

        fetchAiSummary();
    }, [query]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const newParams = new URLSearchParams(searchParams.toString());
        newParams.set('q', searchTerm.trim());
        newParams.set('page', '1');
        router.push(`/search?${newParams.toString()}`);
    };

    const handleFilterChange = (newFilter: string) => {
        const newParams = new URLSearchParams(searchParams.toString());
        newParams.set('filter', newFilter);
        newParams.set('page', '1');
        router.push(`/search?${newParams.toString()}`);
    };

    const handlePageChange = (newPage: number) => {
        const newParams = new URLSearchParams(searchParams.toString());
        newParams.set('page', newPage.toString());
        router.push(`/search?${newParams.toString()}`);
    };

    const { results, showAuthorCard, showAuthorCard2, showArchitaCard } = useMemo(() => {
        const lowercasedQuery = query.toLowerCase();
        const isAuthorSearch = authorKeywords.some(keyword => lowercasedQuery.includes(keyword));
        const isAuthor2Search = author2Keywords.some(keyword => lowercasedQuery.includes(keyword));
        const isArchitaSearch = architaKeywords.some(keyword => lowercasedQuery.includes(keyword));

        let relevantResults = allResults;
        if (query) {
             relevantResults = allResults.filter(
                (r) =>
                    r.title.toLowerCase().includes(lowercasedQuery) ||
                    r.summary.toLowerCase().includes(lowercasedQuery) ||
                    r.author.toLowerCase().includes(lowercasedQuery)
            );
        }
        
        let filtered = relevantResults;
        if (filter !== 'all') {
            filtered = relevantResults.filter(r => r.type === filter);
        }

        return { 
            results: filtered, 
            showAuthorCard: isAuthorSearch, 
            showAuthorCard2: isAuthor2Search,
            showArchitaCard: isArchitaSearch
        };
    }, [query, filter]);

    const currentPage = parseInt(page, 10);
    const totalPages = Math.ceil(results.length / ITEMS_PER_PAGE);
    const paginatedResults = results.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );
     const noResults = results.length === 0;
     const noResultsForQuery = noResults && query;


    return (
      <main className="min-h-screen">
        <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur-sm">
          <div className="container mx-auto flex h-16 items-center gap-4 px-4">
            <Link href="/" className="mr-auto flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight font-serif">Veritas</h1>
            </Link>
            <form onSubmit={handleSearch} className="hidden w-full max-w-sm sm:flex items-center gap-2">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="pl-10 text-base h-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  aria-label="Search"
                />
              </div>
              <Button type="submit" className="h-10">
                Search
              </Button>
            </form>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8 md:py-12">
            <form onSubmit={handleSearch} className="sm:hidden w-full mx-auto mb-8 flex items-center gap-2">
                <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search for articles, topics, or people..."
                        className="pl-10 text-base h-12"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        aria-label="Search"
                    />
                </div>
                <Button type="submit" size="lg" className="h-12">Search</Button>
            </form>
          <div className="w-full max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-baseline mb-8 border-b pb-4">
              <div className="flex items-center gap-2 mb-4 sm:mb-0">
                  {['all', 'blog', 'article'].map((filterType) => (
                      <Button
                          key={filterType}
                          variant="ghost"
                          onClick={() => handleFilterChange(filterType)}
                          className={cn(
                              "relative rounded-none px-4 py-2 h-auto transition-colors focus-visible:ring-0 group",
                              filter === filterType ? 'text-primary' : 'text-muted-foreground hover:text-primary'
                          )}
                      >
                          <span className="capitalize">{filterType}</span>
                          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-focus-gradient bg-400 origin-center scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
                          {filter === filterType && (
                              <motion.div
                                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                                  layoutId="underline"
                                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                              />
                          )}
                      </Button>
                  ))}
              </div>
              <p className="text-sm text-muted-foreground whitespace-nowrap">About {results.length} results found</p>
            </div>

            <div className="space-y-8">
                {(isAiSummaryLoading || aiSummary) && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Card className="bg-gradient-to-br from-card to-green-950/20 border-green-900/20 shadow-lg shadow-green-950/10">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-xl">
                                    <Bot className="text-green-500/80" />
                                    AI-Generated Overview
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {isAiSummaryLoading ? (
                                    <div className="space-y-2">
                                        <Skeleton className="h-4 w-full" />
                                        <Skeleton className="h-4 w-full" />
                                        <Skeleton className="h-4 w-5/6" />
                                    </div>
                                ) : (
                                    <p className="text-muted-foreground">{aiSummary?.summary}</p>
                                )}
                            </CardContent>
                        </Card>
                    </motion.div>
                )}

                {showAuthorCard && <AuthorCard />}
                {showArchitaCard && <AuthorCardArchita />}
                {showAuthorCard2 && (
                   <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    <Card className="bg-gradient-to-br from-card to-primary/10 border-primary/20 shadow-lg shadow-primary/10">
                        <div className="flex flex-col sm:flex-row items-center gap-6 p-6">
                            <div className="flex-1 text-center sm:text-left">
                                <div className="flex items-center gap-2 justify-center sm:justify-start">
                                     <Star className="h-5 w-5 text-primary" />
                                     <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Alternate Portfolio</h3>
                                </div>
                                <h2 className="text-2xl font-bold text-foreground mt-1">Aryan Mehra (V2)</h2>
                                <p className="text-muted-foreground mt-1">Check out an alternate version of the author's portfolio page.</p>
                            </div>
                            <Button asChild className="mt-4 sm:mt-0 bg-primary text-primary-foreground hover:bg-primary/90 shrink-0">
                                <Link href="/aryan-mehra/page2">
                                    View Portfolio V2 <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </div>
                    </Card>
                </motion.div>
                )}

                {paginatedResults.length > 0 ? (
                    paginatedResults.map((result, index) => (
                      <motion.div
                        key={result.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      >
                      <Card
                        className="bg-card border-border hover:border-primary/50 transition-colors duration-300 shadow-sm group"
                      >
                        <CardHeader>
                           <CardTitle className="text-xl tracking-tight">
                            <Link href={`/article/${result.id}`} className="hover:underline decoration-primary underline-offset-4">
                              {result.title}
                            </Link>
                          </CardTitle>
                          <CardDescription className="pt-1">
                            By {result.author}
                            {result.sourceName && ` | ${result.sourceName}`}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                           <p className="text-muted-foreground line-clamp-2">{result.summary}</p>
                        </CardContent>
                        <CardFooter>
                           <Button asChild variant="link" className="text-primary p-0 h-auto font-semibold">
                             <Link href={`/article/${result.id}`}>
                               <span className="group-hover:bg-focus-gradient bg-400 group-hover:animate-gradient-flow group-hover:text-transparent group-hover:bg-clip-text">Read More</span>
                               <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                             </Link>
                          </Button>
                        </CardFooter>
                      </Card>
                      </motion.div>
                    ))
                ) : (
                    noResultsForQuery && !showAuthorCard && !showAuthorCard2 && !showArchitaCard && !isAiSummaryLoading && (
                        <div className="text-center text-muted-foreground py-16 bg-card rounded-lg border">
                            <SearchX className="mx-auto h-12 w-12 mb-4 text-muted-foreground/50" />
                            <h2 className="text-xl font-semibold text-foreground mb-2">No results found for "{query}"</h2>
                            <p>Try searching for something else or check your spelling.</p>
                        </div>
                    )
                )}

                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-4 mt-12">
                    <Button
                      variant="outline"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="hover:bg-focus-gradient bg-400 hover:animate-gradient-flow hover:text-primary-foreground hover:border-transparent"
                    >
                      Previous
                    </Button>
                    <span className="text-muted-foreground tabular-nums">
                      Page {currentPage} of {totalPages}
                    </span>
                    <Button
                      variant="outline"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="hover:bg-focus-gradient bg-400 hover:animate-gradient-flow hover:text-primary-foreground hover:border-transparent"
                    >
                      Next
                    </Button>
                  </div>
                )}
            </div>
          </div>
        </div>
      </main>
    );
}

export default function SearchPage() {
    return (
        <Suspense fallback={<div className="flex justify-center items-center h-screen">Loading results...</div>}>
            <SearchResults />
        </Suspense>
    );
}
