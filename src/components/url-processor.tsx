
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, Wand2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { processUrl, ProcessUrlOutput } from '@/ai/flows/process-url-flow';
import { Badge } from './ui/badge';

const FormSchema = z.object({
  url: z.string().url({ message: 'Please enter a valid URL.' }),
});

export default function URLProcessor() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ProcessUrlOutput | null>(null);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      url: '',
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    setResult(null);
    try {
      const response = await processUrl({ url: data.url });
      setResult(response);
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'An error occurred.',
        description: (error as Error).message || 'Failed to process the URL. Please check the console for details.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  const getClassificationLabel = (type?: string) => {
    switch (type) {
      case 'personal_blog':
        return 'Personal Blog';
      case 'article':
        return 'Article';
      case 'other':
        return 'Other';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className="pt-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">URL</FormLabel>
                <div className="flex items-start gap-2">
                  <div className="flex-grow space-y-2">
                    <FormControl>
                      <Input placeholder="https://example.com/blog/my-article" {...field} />
                    </FormControl>
                    <FormMessage />
                  </div>
                  <Button type="submit" disabled={isLoading} size="icon" className="shrink-0">
                    {isLoading ? <Loader2 className="animate-spin" /> : <Wand2 />}
                  </Button>
                </div>
              </FormItem>
            )}
          />
        </form>
      </Form>
      
      {isLoading && (
        <Card className="mt-4 animate-pulse">
            <CardHeader>
                <div className="h-6 bg-muted rounded w-3/4"></div>
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                    <div className="h-4 bg-muted rounded w-full"></div>
                    <div className="h-4 bg-muted rounded w-full"></div>
                    <div className="h-4 bg-muted rounded w-5/6"></div>
                </div>
            </CardContent>
        </Card>
      )}

      {result && (
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>{result?.title ?? 'No Title Found'}</CardTitle>
            <CardDescription className="flex flex-wrap items-center gap-2 pt-2">
              <span>Classification:</span>
              <Badge variant="secondary">{getClassificationLabel(result?.classification?.type)}</Badge>
              <span>Confidence:</span>
              <Badge variant="outline">{((result?.classification?.confidence ?? 0) * 100).toFixed(0)}%</Badge>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <h3 className="font-semibold mb-2 text-foreground">Summary</h3>
            <p className="text-muted-foreground">{result?.summary?.summary ?? 'No summary available.'}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
