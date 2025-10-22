import { config } from 'dotenv';
config();

import '@/ai/flows/generate-html-content.ts';
import '@/ai/flows/improve-html-content.ts';
import '@/ai/flows/summarize-uploaded-document.ts';