'use server';

/**
 * @fileOverview This file defines a Genkit flow for improving HTML content using GenAI.
 *
 * The flow accepts HTML content and improvement instructions as input, and returns the improved HTML.
 *
 * @interface ImproveHtmlContentInput - Defines the input schema for the improveHtmlContent function.
 * @interface ImproveHtmlContentOutput - Defines the output schema for the improveHtmlContent function.
 * @function improveHtmlContent - The main function that triggers the HTML improvement flow.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ImproveHtmlContentInputSchema = z.object({
  htmlContent: z
    .string()
    .describe('The HTML content to be improved.'),
  instructions: z
    .string()
    .describe('Instructions for improving the HTML content.'),
});

export type ImproveHtmlContentInput = z.infer<typeof ImproveHtmlContentInputSchema>;

const ImproveHtmlContentOutputSchema = z.object({
  improvedHtmlContent: z
    .string()
    .describe('The improved HTML content.'),
});

export type ImproveHtmlContentOutput = z.infer<typeof ImproveHtmlContentOutputSchema>;

export async function improveHtmlContent(input: ImproveHtmlContentInput): Promise<ImproveHtmlContentOutput> {
  return improveHtmlContentFlow(input);
}

const improveHtmlContentPrompt = ai.definePrompt({
  name: 'improveHtmlContentPrompt',
  input: {schema: ImproveHtmlContentInputSchema},
  output: {schema: ImproveHtmlContentOutputSchema},
  prompt: `You are an expert HTML content improver.

You will receive HTML content and instructions on how to improve it.

Follow the instructions carefully and return the improved HTML content.

HTML Content:
{{{htmlContent}}}

Instructions:
{{{instructions}}}
`,
});

const improveHtmlContentFlow = ai.defineFlow(
  {
    name: 'improveHtmlContentFlow',
    inputSchema: ImproveHtmlContentInputSchema,
    outputSchema: ImproveHtmlContentOutputSchema,
  },
  async input => {
    const {output} = await improveHtmlContentPrompt(input);
    return output!;
  }
);
