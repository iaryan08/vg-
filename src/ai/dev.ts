import { config } from 'dotenv';
config();

import '@/ai/flows/summarize-blog-article.ts';
import '@/ai/flows/classify-blog-type.ts';
import '@/ai/flows/process-url-flow.ts';
import '@/ai/flows/summarize-search-query.ts';
