
import { allResults } from '@/lib/data';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';

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
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-foreground">
              {article.title}
            </h1>
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
      </div>
    </main>
  );
}
