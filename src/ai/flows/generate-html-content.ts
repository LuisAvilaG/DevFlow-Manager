'use server';

/**
 * @fileOverview Flow to generate HTML content based on a given topic using GenAI.
 *
 * - generateHtmlContent - A function that generates HTML content for a given topic.
 * - GenerateHtmlContentInput - The input type for the generateHtmlContent function.
 * - GenerateHtmlContentOutput - The return type for the generateHtmlContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateHtmlContentInputSchema = z.object({
  topic: z.string().describe('The topic for which to generate HTML content.'),
});
export type GenerateHtmlContentInput = z.infer<typeof GenerateHtmlContentInputSchema>;

const GenerateHtmlContentOutputSchema = z.object({
  htmlContent: z.string().describe('The generated HTML content as a string.'),
});
export type GenerateHtmlContentOutput = z.infer<typeof GenerateHtmlContentOutputSchema>;

export async function generateHtmlContent(
  input: GenerateHtmlContentInput
): Promise<GenerateHtmlContentOutput> {
  return generateHtmlContentFlow(input);
}

const generateHtmlContentPrompt = ai.definePrompt({
  name: 'generateHtmlContentPrompt',
  input: {schema: GenerateHtmlContentInputSchema},
  output: {schema: GenerateHtmlContentOutputSchema},
  prompt: `You are an AI assistant specialized in generating HTML content.
  Generate HTML content for the following topic:
  {{{topic}}}
  The output should be a valid HTML document.
`,
});

const generateHtmlContentFlow = ai.defineFlow(
  {
    name: 'generateHtmlContentFlow',
    inputSchema: GenerateHtmlContentInputSchema,
    outputSchema: GenerateHtmlContentOutputSchema,
  },
  async input => {
    const {output} = await generateHtmlContentPrompt(input);
    return output!;
  }
);
