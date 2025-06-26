'use server';
/**
 * @fileOverview A blog article summarization AI agent.
 *
 * - summarizeBlogArticle - A function that handles the blog article summarization process.
 * - SummarizeBlogArticleInput - The input type for the summarizeBlogArticle function.
 * - SummarizeBlogArticleOutput - The return type for the summarizeBlogArticle function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeBlogArticleInputSchema = z.object({
  articleText: z.string().describe('The full text content of the blog article to summarize.'),
});
export type SummarizeBlogArticleInput = z.infer<typeof SummarizeBlogArticleInputSchema>;

const SummarizeBlogArticleOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the blog article.'),
});
export type SummarizeBlogArticleOutput = z.infer<typeof SummarizeBlogArticleOutputSchema>;

export async function summarizeBlogArticle(input: SummarizeBlogArticleInput): Promise<SummarizeBlogArticleOutput> {
  return summarizeBlogArticleFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeBlogArticlePrompt',
  input: {schema: SummarizeBlogArticleInputSchema},
  output: {schema: SummarizeBlogArticleOutputSchema},
  prompt: `You are an expert summarizer of blog articles.  Your job is to create a concise and informative summary of the article provided.

Article Text: {{{articleText}}}`,
});

const summarizeBlogArticleFlow = ai.defineFlow(
  {
    name: 'summarizeBlogArticleFlow',
    inputSchema: SummarizeBlogArticleInputSchema,
    outputSchema: SummarizeBlogArticleOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
