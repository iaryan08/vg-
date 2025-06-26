'use server';

/**
 * @fileOverview An orchestrator flow that takes a URL, fetches its content,
<<<<<<< HEAD
 * classifies it, summarizes it, and generates tags for it.
=======
 * classifies it, and summarizes it.
>>>>>>> a99bb5b93e16a4ead5edf2e777a0d89891ddb0d1
 *
 * - processUrl - The main function to process a URL.
 * - ProcessUrlInput - The input type for the processUrl function.
 * - ProcessUrlOutput - The return type for the processUrl function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { JSDOM } from 'jsdom';
import { classifyBlogType } from './classify-blog-type';
import { summarizeBlogArticle } from './summarize-blog-article';
<<<<<<< HEAD
import { generateTags } from './generate-tags-flow';
=======
>>>>>>> a99bb5b93e16a4ead5edf2e777a0d89891ddb0d1

const ProcessUrlInputSchema = z.object({
  url: z.string().url().describe('The URL of the webpage to process.'),
});
export type ProcessUrlInput = z.infer<typeof ProcessUrlInputSchema>;


// Define schemas from other flows locally to avoid exporting them from 'use server' files.
const ClassifyBlogTypeOutputSchema = z.object({
  type: z.enum(['personal_blog', 'article', 'other']).describe('The classified type of the website.'),
  confidence: z.number().min(0).max(1).describe('The confidence level of the classification (0 to 1).'),
});
const SummarizeBlogArticleOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the blog article.'),
});
<<<<<<< HEAD
const GenerateTagsOutputSchema = z.object({
  tags: z.array(z.string()).describe('A list of 5-7 relevant, lowercase tags for the article. Tags should be one or two words.'),
});
=======
>>>>>>> a99bb5b93e16a4ead5edf2e777a0d89891ddb0d1


const ProcessUrlOutputSchema = z.object({
  title: z.string().describe('The title of the webpage.'),
  classification: ClassifyBlogTypeOutputSchema.describe('The classification result.'),
  summary: SummarizeBlogArticleOutputSchema.describe('The summarization result.'),
<<<<<<< HEAD
  tags: GenerateTagsOutputSchema.describe('A list of AI-generated tags for the content.'),
=======
>>>>>>> a99bb5b93e16a4ead5edf2e777a0d89891ddb0d1
});
export type ProcessUrlOutput = z.infer<typeof ProcessUrlOutputSchema>;

export async function processUrl(input: ProcessUrlInput): Promise<ProcessUrlOutput> {
  return processUrlFlow(input);
}

const processUrlFlow = ai.defineFlow(
  {
    name: 'processUrlFlow',
    inputSchema: ProcessUrlInputSchema,
    outputSchema: ProcessUrlOutputSchema,
  },
  async ({ url }) => {
    // 1. Fetch and parse the webpage
    let dom: JSDOM;
    try {
      const response = await fetch(url, { headers: { 'User-Agent': 'Googlebot/2.1 (+http://www.google.com/bot.html)' } });
      if (!response.ok) {
        throw new Error(`Failed to fetch URL: ${response.statusText}`);
      }
      const html = await response.text();
      dom = new JSDOM(html);
    } catch (error: any) {
      console.error(`Error fetching or parsing URL ${url}:`, error);
      throw new Error(`Failed to process URL ${url}: ${error.message}`);
    }
    
    const document = dom.window.document;
    const title = document.title || 'No title found';

    // 2. Extract content for classification
    const domainContent = document.body?.innerHTML || '';
    const headerContent = document.querySelector('header')?.innerHTML;
    const footerContent = document.querySelector('footer')?.innerHTML;

<<<<<<< HEAD
    // 3. Extract main text for summarization and tagging
    const mainContentEl = document.querySelector('main') || document.querySelector('article') || document.body;
    // Clone the main content element to avoid modifying the original for classification
    const contentToProcess = mainContentEl.cloneNode(true) as HTMLElement;
    contentToProcess.querySelectorAll('script, style, noscript, header, footer, nav').forEach((el) => el.remove());
    const articleText = (contentToProcess.textContent || '').replace(/\s+/g, ' ').trim();


    // 4. Run classification, summarization, and tagging flows in parallel
    const [classification, summary, tags] = await Promise.all([
=======
    // 3. Extract main text for summarization
    const mainContentEl = document.querySelector('main') || document.querySelector('article') || document.body;
    // Clone the main content element to avoid modifying the original for classification
    const contentToSummarize = mainContentEl.cloneNode(true) as HTMLElement;
    contentToSummarize.querySelectorAll('script, style, noscript, header, footer, nav').forEach((el) => el.remove());
    const articleText = (contentToSummarize.textContent || '').replace(/\s+/g, ' ').trim();


    // 4. Run classification and summarization flows in parallel
    const [classification, summary] = await Promise.all([
>>>>>>> a99bb5b93e16a4ead5edf2e777a0d89891ddb0d1
      classifyBlogType({
        url,
        domainContent,
        headerContent,
        footerContent,
      }),
<<<<<<< HEAD
      summarizeBlogArticle({ articleText }),
      generateTags({ articleText }),
=======
      summarizeBlogArticle({ articleText })
>>>>>>> a99bb5b93e16a4ead5edf2e777a0d89891ddb0d1
    ]);

    // 5. Return the combined result
    return {
      title,
      classification,
      summary,
<<<<<<< HEAD
      tags,
=======
>>>>>>> a99bb5b93e16a4ead5edf2e777a0d89891ddb0d1
    };
  }
);
