
import { allResults } from '@/lib/data';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
<<<<<<< HEAD
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { BookmarkButton } from '@/components/bookmark-button';
=======
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
>>>>>>> a99bb5b93e16a4ead5edf2e777a0d89891ddb0d1

export function generateStaticParams() {
  return allResults.map((post) => ({
    id: post.id.toString(),
  }));
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const article = allResults.find((result) => result.id.toString() === params.id);
  if (!article) {
    return {
      title: 'Not Found',
      description: 'The requested article could not be found.',
    };
  }
  return {
    title: `${article.title} | Veritas`,
    description: article.summary,
    openGraph: {
      images: [article.image],
    },
  };
}

export default function ArticlePage({ params }: { params: { id: string } }) {
  const article = allResults.find((result) => result.id.toString() === params.id);

  if (!article) {
    notFound();
  }

<<<<<<< HEAD
  const relatedArticles = allResults
    .filter((r) => r.id !== article.id && r.tags && article.tags)
    .map((r) => {
      const commonTags = r.tags!.filter((tag) => article.tags!.includes(tag)).length;
      return { ...r, commonTags };
    })
    .filter((r) => r.commonTags > 0)
    .sort((a, b) => b.commonTags - a.commonTags)
    .slice(0, 3);

=======
>>>>>>> a99bb5b93e16a4ead5edf2e777a0d89891ddb0d1
  return (
    <main className="container mx-auto px-4 py-8 md:py-16 flex flex-col items-center min-h-screen">
      <div className="w-full max-w-4xl">
        <div className="mb-8 self-start">
          <Button asChild variant="outline" className="hover:bg-focus-gradient bg-400 hover:animate-gradient-flow hover:text-primary-foreground hover:border-transparent">
            <Link href="/search">
              <ArrowLeft className="mr-2" />
              Back to Search
            </Link>
          </Button>
        </div>
        <article>
          <header className="mb-8 border-b pb-8">
<<<<<<< HEAD
            <div className="flex justify-between items-start gap-4">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-foreground">
                {article.title}
              </h1>
              <BookmarkButton articleId={article.id} className="shrink-0" />
            </div>
=======
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-foreground">
              {article.title}
            </h1>
>>>>>>> a99bb5b93e16a4ead5edf2e777a0d89891ddb0d1
            <div className="text-lg text-muted-foreground">
              <span>
                By {article.author} &middot; A{' '}
                {article.type === 'blog' ? 'Personal Blog' : 'Published Article'}
              </span>
              {article.sourceName && (
                <div className="text-sm mt-1">
                  Source:{' '}
                  {article.sourceUrl ? (
                    <a
                      href={article.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:bg-focus-gradient bg-400 hover:animate-gradient-flow hover:text-transparent hover:bg-clip-text"
                    >
                      {article.sourceName}
                    </a>
                  ) : (
                    article.sourceName
                  )}
                </div>
              )}
            </div>
<<<<<<< HEAD
             {article.tags && article.tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="capitalize">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
=======
>>>>>>> a99bb5b93e16a4ead5edf2e777a0d89891ddb0d1
          </header>

          <Image
            src={article.image}
            alt={article.title}
            data-ai-hint={article.imageHint}
            width={1200}
            height={600}
            className="w-full h-auto object-cover rounded-lg shadow-lg mb-12"
            priority
          />

          <div className="text-lg leading-relaxed space-y-6 text-foreground/90">
            {article.content.split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </article>
<<<<<<< HEAD

        {relatedArticles.length > 0 && (
          <section className="mt-16 pt-12 border-t w-full">
            <h2 className="text-3xl font-bold tracking-tight mb-8 text-center">You might also like...</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedArticles.map((related) => (
                <Card key={related.id} className="bg-card border-border hover:border-primary/50 transition-colors duration-300 shadow-sm group flex flex-col relative">
                  <BookmarkButton articleId={related.id} className="absolute top-2 right-2 z-10" />
                  <CardHeader>
                    <CardTitle className="text-lg tracking-tight flex-grow pr-8">
                      <Link href={`/article/${related.id}`} className="hover:underline decoration-primary underline-offset-4">
                        {related.title}
                      </Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="mt-auto">
                    <Button asChild variant="link" className="text-primary p-0 h-auto font-semibold">
                      <Link href={`/article/${related.id}`}>
                        <span className="group-hover:bg-focus-gradient bg-400 group-hover:animate-gradient-flow group-hover:text-transparent group-hover:bg-clip-text">Read More</span>
                        <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}
=======
>>>>>>> a99bb5b93e16a4ead5edf2e777a0d89891ddb0d1
      </div>
    </main>
  );
}
