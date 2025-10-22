'use server';

/**
 * @fileOverview Summarizes the content of an uploaded document using GenAI.
 *
 * - summarizeUploadedDocument - A function that handles the document summarization process.
 * - SummarizeUploadedDocumentInput - The input type for the summarizeUploadedDocument function.
 * - SummarizeUploadedDocumentOutput - The return type for the summarizeUploadedDocument function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeUploadedDocumentInputSchema = z.object({
  fileDataUri: z
    .string()
    .describe(
      'The document content as a data URI (PDF or DOCX) that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.' // eslint-disable-line prettier/prettier
    ),
});
export type SummarizeUploadedDocumentInput = z.infer<
  typeof SummarizeUploadedDocumentInputSchema
>;

const SummarizeUploadedDocumentOutputSchema = z.object({
  summary: z
    .string()
    .describe('A concise summary of the document content.'),
});
export type SummarizeUploadedDocumentOutput = z.infer<
  typeof SummarizeUploadedDocumentOutputSchema
>;

export async function summarizeUploadedDocument(
  input: SummarizeUploadedDocumentInput
): Promise<SummarizeUploadedDocumentOutput> {
  return summarizeUploadedDocumentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeUploadedDocumentPrompt',
  input: {schema: SummarizeUploadedDocumentInputSchema},
  output: {schema: SummarizeUploadedDocumentOutputSchema},
  prompt: `You are an expert document summarizer. Please provide a concise summary of the following document content:

{{media url=fileDataUri}}`,
});

const summarizeUploadedDocumentFlow = ai.defineFlow(
  {
    name: 'summarizeUploadedDocumentFlow',
    inputSchema: SummarizeUploadedDocumentInputSchema,
    outputSchema: SummarizeUploadedDocumentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
