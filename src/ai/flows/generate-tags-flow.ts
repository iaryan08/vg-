'use server';
/**
 * @fileOverview An AI agent for generating content tags.
 *
 * - generateTags - Generates a list of relevant tags for a given text.
 * - GenerateTagsInput - The input type.
 * - GenerateTagsOutput - The output type.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateTagsInputSchema = z.object({
  articleText: z.string().describe('The full text content of the blog article to tag.'),
});
export type GenerateTagsInput = z.infer<typeof GenerateTagsInputSchema>;

const GenerateTagsOutputSchema = z.object({
  tags: z.array(z.string()).describe('A list of 5-7 relevant, lowercase tags for the article. Tags should be one or two words.'),
});
export type GenerateTagsOutput = z.infer<typeof GenerateTagsOutputSchema>;

export async function generateTags(input: GenerateTagsInput): Promise<GenerateTagsOutput> {
  return generateTagsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateTagsPrompt',
  input: {schema: GenerateTagsInputSchema},
  output: {schema: GenerateTagsOutputSchema},
  prompt: `You are an expert content tagger. Analyze the following article text and generate a list of 5-7 relevant, single-word or two-word lowercase tags. The tags should be relevant for categorization and discovery.

Article Text: {{{articleText}}}`,
});

const generateTagsFlow = ai.defineFlow(
  {
    name: 'generateTagsFlow',
    inputSchema: GenerateTagsInputSchema,
    outputSchema: GenerateTagsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
