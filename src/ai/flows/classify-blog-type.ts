'use server';

/**
 * @fileOverview Blog type classification AI agent.
 *
 * - classifyBlogType - A function that classifies a website as a personal blog or article.
 * - ClassifyBlogTypeInput - The input type for the classifyBlogType function.
 * - ClassifyBlogTypeOutput - The return type for the classifyBlogType function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ClassifyBlogTypeInputSchema = z.object({
  url: z.string().url().describe('The URL of the website to classify.'),
  domainContent: z.string().describe('The HTML content of the website domain.'),
  headerContent: z.string().optional().describe('The HTML content of the website header, if available.'),
  footerContent: z.string().optional().describe('The HTML content of the website footer, if available.'),
});
export type ClassifyBlogTypeInput = z.infer<typeof ClassifyBlogTypeInputSchema>;

const ClassifyBlogTypeOutputSchema = z.object({
  type: z.enum(['personal_blog', 'article', 'other']).describe('The classified type of the website.'),
  confidence: z.number().min(0).max(1).describe('The confidence level of the classification (0 to 1).'),
});
export type ClassifyBlogTypeOutput = z.infer<typeof ClassifyBlogTypeOutputSchema>;

export async function classifyBlogType(input: ClassifyBlogTypeInput): Promise<ClassifyBlogTypeOutput> {
  return classifyBlogTypeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'classifyBlogTypePrompt',
  input: {schema: ClassifyBlogTypeInputSchema},
  output: {schema: ClassifyBlogTypeOutputSchema},
  prompt: `You are an expert web content classifier. Given the content of a website, you will classify it as either a "personal_blog", an "article", or "other".

  A personal blog is a website where an individual or small group of individuals share their personal experiences, opinions, and interests. The content is typically informal, conversational, and subjective.

  An article is a piece of writing included with others in a newspaper, magazine, or other publication. The content is typically formal, objective, and informative.

  If the website does not fit into either of these categories, classify it as "other".

  To classify the website, you will be given the content of the domain, and optionally the header and footer.  The header and footer can be useful for determining the overall structure of the site. If you are uncertain based on the domain, you MUST use the header and footer.

  Here is the domain content:
  {{domainContent}}

  {{#if headerContent}}
  Here is the header content:
  {{headerContent}}
  {{/if}}

  {{#if footerContent}}
  Here is the footer content:
  {{footerContent}}
  {{/if}}

  Please classify the website based on the content provided. You must also provide a confidence level between 0 and 1.
  `,
});

const classifyBlogTypeFlow = ai.defineFlow(
  {
    name: 'classifyBlogTypeFlow',
    inputSchema: ClassifyBlogTypeInputSchema,
    outputSchema: ClassifyBlogTypeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
