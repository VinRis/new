'use server';
/**
 * This file is now deprecated as insights are generated locally.
 * It is kept to prevent build errors from deleting it.
 */
export type GenerateFarmInsightsInput = any;
export type GenerateFarmInsightsOutput = any;
export async function generateFarmInsights(input: any): Promise<any> {
  return { insights: 'This is a mock insight.' };
}
