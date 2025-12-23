'use server';

/**
 * @fileOverview A farm insights AI agent.
 *
 * - generateFarmInsights - A function that handles the farm insights process.
 * - GenerateFarmInsightsInput - The input type for the generateFarmInsights function.
 * - GenerateFarmInsightsOutput - The return type for the generateFarmInsights function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateFarmInsightsInputSchema = z.object({
  livestockType: z.string().describe('The type of livestock being managed (e.g., Dairy, Poultry, Pigs, Goats/Sheep).'),
  keyPerformanceIndicators: z.record(z.string(), z.any()).describe('Key performance indicators for the livestock, such as production metrics, financial data, and health records.'),
});
export type GenerateFarmInsightsInput = z.infer<typeof GenerateFarmInsightsInputSchema>;

const GenerateFarmInsightsOutputSchema = z.object({
  insights: z.string().describe('Personalized insights and actionable suggestions for optimizing livestock management and improving farm performance.'),
});
export type GenerateFarmInsightsOutput = z.infer<typeof GenerateFarmInsightsOutputSchema>;

export async function generateFarmInsights(input: GenerateFarmInsightsInput): Promise<GenerateFarmInsightsOutput> {
  return generateFarmInsightsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateFarmInsightsPrompt',
  input: {schema: GenerateFarmInsightsInputSchema},
  output: {schema: GenerateFarmInsightsOutputSchema},
  prompt: `You are an expert farm management consultant specializing in providing data-driven insights for livestock farmers.

  Based on the following information about the farm, provide personalized insights and actionable suggestions to help the farmer optimize their livestock management and improve farm performance.

  Livestock Type: {{{livestockType}}}
  Key Performance Indicators: {{{keyPerformanceIndicators}}}

  Focus on providing specific, actionable recommendations that the farmer can implement immediately to see tangible results.
  Consider factors such as:
  - Optimal timing for buying/selling livestock
  - Strategies for improving production efficiency
  - Cost-saving measures
  - Health management practices

  Ensure the insights are tailored to the specific livestock type and KPIs provided.
  `,
});

const generateFarmInsightsFlow = ai.defineFlow(
  {
    name: 'generateFarmInsightsFlow',
    inputSchema: GenerateFarmInsightsInputSchema,
    outputSchema: GenerateFarmInsightsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
