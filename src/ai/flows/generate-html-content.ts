'use server';

/**
 * @fileOverview Flow to trigger an external webhook to generate HTML content.
 *
 * - generateHtmlContent - A function that calls an n8n webhook to generate a DAT.
 * - GenerateHtmlContentInput - The input type for the generateHtmlContent function.
 * - GenerateHtmlContentOutput - The return type for the generateHtmlContent function.
 */

import {z} from 'genkit';

// The input schema remains the same, as we still need a topic.
const GenerateHtmlContentInputSchema = z.object({
  topic: z.string().describe('The topic for which to generate HTML content.'),
});
export type GenerateHtmlContentInput = z.infer<typeof GenerateHtmlContentInputSchema>;

// The output schema is updated to match the webhook's response.
const GenerateHtmlContentOutputSchema = z.object({
  status: z.string().describe('The status of the webhook call, e.g., "ok".'),
});
export type GenerateHtmlContentOutput = z.infer<typeof GenerateHtmlContentOutputSchema>;

/**
 * Triggers an external webhook to generate the DAT content.
 * @param input The topic for the DAT.
 * @returns A promise that resolves to an object with a status property.
 */
export async function generateHtmlContent(
  input: GenerateHtmlContentInput
): Promise<GenerateHtmlContentOutput> {
  const webhookUrl = 'https://n8n.dinamicsw.site/webhook/generate-dat';
  console.log(`Calling webhook at ${webhookUrl} with topic: "${input.topic}"`);

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input), // Send the topic in the request body
    });

    // Check if the request was successful
    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`Webhook call failed with status ${response.status}: ${errorBody}`);
    }

    // Parse the JSON response from the webhook
    const result = await response.json();
    
    // Validate that the response matches the expected output
    const validatedOutput = GenerateHtmlContentOutputSchema.safeParse(result);
    if (!validatedOutput.success) {
        throw new Error(`Webhook response did not match expected format: ${validatedOutput.error.message}`);
    }

    console.log('Webhook call successful, received:', validatedOutput.data);
    return validatedOutput.data;

  } catch (error) {
    console.error('An error occurred while calling the webhook:', error);
    // Re-throw the error so the frontend can catch it
    throw error;
  }
}
