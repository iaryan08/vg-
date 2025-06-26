
'use client';

import { useAuth } from '@/hooks/use-auth';
import { useBookmarks } from '@/hooks/use-bookmarks';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import { Loader2, Bookmark, ArrowRight, ArrowLeft } from 'lucide-react';
import { allResults } from '@/lib/data';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

export default function SavedArticlesPage() {
  const { user, loading: authLoading } = useAuth();
  const { bookmarks, loading: bookmarksLoading } = useBookmarks();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/');
    }
  }, [user, authLoading, router]);

  const savedArticles = useMemo(() => {
    return allResults.filter(article => bookmarks.includes(article.id));
  }, [bookmarks]);

  const isLoading = authLoading || bookmarksLoading;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8 md:py-16 flex flex-col items-center min-h-screen">
      <div className="w-full max-w-4xl">
        <div className="mb-8 self-start">
            <Button asChild variant="outline">
                <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
                </Link>
            </Button>
        </div>

        <div className="w-full mb-8 border-b pb-4">
            <h1 className="text-4xl font-bold tracking-tight">Saved Articles</h1>
            <p className="text-muted-foreground mt-2">
                Your personal collection of interesting reads.
            </p>
        </div>

        {savedArticles.length > 0 ? (
          <div className="space-y-8 w-full">
            {savedArticles.map((result, index) => (
              <motion.div
                key={result.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card className="bg-card border-border hover:border-primary/50 transition-colors duration-300 shadow-sm group flex flex-col">
                  <CardHeader className="flex-grow">
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
                  <CardFooter className="flex flex-col items-start gap-4">
                    {result.tags && result.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {result.tags.map(tag => (
                          <Badge asChild key={tag} variant="secondary" className="cursor-pointer hover:bg-primary/20">
                            <Link href={`/search?q=${encodeURIComponent(tag)}`}>{tag}</Link>
                          </Badge>
                        ))}
                      </div>
                    )}
                    <Button asChild variant="link" className="text-primary p-0 h-auto font-semibold">
                      <Link href={`/article/${result.id}`}>
                        <span className="group-hover:bg-focus-gradient bg-400 group-hover:animate-gradient-flow group-hover:text-transparent group-hover:bg-clip-text">Read More</span>
                        <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center text-muted-foreground py-16 bg-card rounded-lg border w-full">
            <Bookmark className="mx-auto h-12 w-12 mb-4 text-muted-foreground/50" />
            <h2 className="text-xl font-semibold text-foreground mb-2">No saved articles yet</h2>
            <p>Click the bookmark icon on any article to save it for later.</p>
          </div>
        )}
      </div>
    </main>
  );
}
