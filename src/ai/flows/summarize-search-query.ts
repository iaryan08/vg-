'use server';
/**
 * @fileOverview An AI agent that summarizes a search query topic.
 *
 * - summarizeSearchQuery - A function that generates a summary for a given search query.
 * - SummarizeSearchQueryInput - The input type for the summarizeSearchQuery function.
 * - SummarizeSearchQueryOutput - The return type for the summarizeSearchQuery function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeSearchQueryInputSchema = z.object({
  query: z.string().describe('The search query or topic to summarize.'),
});
export type SummarizeSearchQueryInput = z.infer<typeof SummarizeSearchQueryInputSchema>;

const SummarizeSearchQueryOutputSchema = z.object({
  summary: z.string().describe('A concise, encyclopedia-style summary of the topic.'),
});
export type SummarizeSearchQueryOutput = z.infer<typeof SummarizeSearchQueryOutputSchema>;

export async function summarizeSearchQuery(input: SummarizeSearchQueryInput): Promise<SummarizeSearchQueryOutput> {
  return summarizeSearchQueryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeSearchQueryPrompt',
  input: {schema: SummarizeSearchQueryInputSchema},
  output: {schema: SummarizeSearchQueryOutputSchema},
  prompt: `You are a knowledgeable and helpful research assistant. Your task is to provide a concise, neutral, and informative summary for the given search query. The summary should be like a short encyclopedia entry.

Search Query: {{{query}}}

Please provide a summary of this topic.`,
});

const summarizeSearchQueryFlow = ai.defineFlow(
  {
    name: 'summarizeSearchQueryFlow',
    inputSchema: SummarizeSearchQueryInputSchema,
    outputSchema: SummarizeSearchQueryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
