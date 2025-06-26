
import Image from 'next/image';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import SearchForm from '@/components/search-form';
import headlinesData from '@/lib/news-data.json';
import ParticlesBackground from '@/components/particles-background';
<<<<<<< HEAD
import { UserButton } from '@/components/user-button';
=======
>>>>>>> a99bb5b93e16a4ead5edf2e777a0d89891ddb0d1

type Article = {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
};

type NewsApiResponse = {
  status: string;
  totalResults: number;
  articles: Article[];
};

<<<<<<< HEAD
=======
/*
async function getTopHeadlines() {
  const apiKey = process.env.NEWS_API_KEY;
  if (!apiKey) {
    console.error('News API key is not configured.');
    return [];
  }

  try {
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`,
      {
        next: { revalidate: 3600 }, // Revalidate every hour
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error('News API error:', errorData);
      return [];
    }

    const data: NewsApiResponse = await response.json();
    return data.articles;
  } catch (error) {
    console.error('Failed to fetch top headlines:', error);
    return [];
  }
}
*/

>>>>>>> a99bb5b93e16a4ead5edf2e777a0d89891ddb0d1
export default function Home() {
  const headlines = headlinesData.articles.filter(
    (article) => article.urlToImage
  );

  return (
    <div className="relative min-h-screen">
      <ParticlesBackground />
<<<<<<< HEAD
      <header className="absolute top-0 left-0 right-0 z-20">
        <div className="container mx-auto flex items-center justify-between p-4">
            <Link href="/" className="mr-auto flex items-center gap-2">
                <h1 className="text-2xl font-bold tracking-tight font-serif text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">Veritas</h1>
            </Link>
            <UserButton />
        </div>
      </header>
      <main className="container mx-auto flex min-h-screen flex-col items-center justify-center p-4 relative z-10">
        <div className="w-full max-w-2xl text-center">
=======
      <main className="container mx-auto flex min-h-screen flex-col items-center p-4 relative z-10">
        <div className="w-full max-w-2xl text-center py-16 md:py-24">
>>>>>>> a99bb5b93e16a4ead5edf2e777a0d89891ddb0d1
          <h1 className="mb-4 bg-focus-gradient bg-400 animate-gradient-flow bg-clip-text text-4xl font-bold tracking-tight text-transparent md:text-6xl font-serif">
            Veritas
          </h1>
          <p className="mb-8 text-lg text-foreground/70">
            A search engine for personal blogs and articles.
          </p>
          <SearchForm />
        </div>

        {headlines.length > 0 && (
<<<<<<< HEAD
          <section className="w-full max-w-6xl mt-24">
=======
          <section className="w-full max-w-6xl">
>>>>>>> a99bb5b93e16a4ead5edf2e777a0d89891ddb0d1
            <h2 className="text-3xl font-bold tracking-tight mb-8 text-center font-serif text-foreground [text-shadow:0_2px_4px_rgba(0,0,0,0.5)]">
              Top Headlines
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {headlines.slice(0, 6).map((article, index) => (
                <Card
                  key={index}
                  className="relative flex flex-col overflow-hidden transition-colors card-hover-gradient"
                >
                  <Link
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <div className="relative h-48 w-full">
                      <Image
                        src={article.urlToImage!}
                        alt={article.title}
                        data-ai-hint="news article"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </Link>
                  <CardHeader>
                    <CardTitle className="text-lg leading-snug">
                      <Link
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        {article.title}
                      </Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {article.description}
                    </p>
                  </CardContent>
                  <CardFooter>
                    <p className="text-xs text-muted-foreground">
                      Source: {article.source.name}
                    </p>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
