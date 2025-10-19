import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(request: NextRequest) {
  try {
    const { bmi, category, age } = await request.json();

    // Validate API key
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured. Please add OPENAI_API_KEY to your environment variables.' },
        { status: 500 }
      );
    }

    const openai = new OpenAI({
      apiKey: apiKey,
    });

    // Create educational prompt
    const prompt = `You are a medical education specialist providing concise, evidence-based health guidance about BMI and reproductive health.

Patient Profile:
- Age: ${age} years
- BMI: ${bmi}
- Category: ${category}

Provide a concise, structured health analysis with these sections:

**1. BMI Overview**
In 1-2 sentences, explain what this BMI category means for overall health.

**2. Reproductive Health Impact**
In 2-3 sentences, describe key effects on fertility, menstrual health, and pregnancy outcomes.

**3. Recommendations**
Provide 3 specific, actionable points:
- Nutrition focus
- Physical activity guidance
- When to seek medical consultation

Write in a warm, professional tone. Be direct and actionable. Use bold text for key health terms (e.g., **fertility**, **menstrual cycle**, **pregnancy**).

Limit response to 200-250 words for clarity and impact.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini', // Using gpt-4o-mini for better text generation
      messages: [
        {
          role: 'system',
          content: 'You are a medical education assistant specializing in reproductive health. Provide evidence-based, compassionate health education with bold formatting for key medical terms.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 400, // Reduced for more concise responses
    });

    const analysis = completion.choices[0]?.message?.content || 'Unable to generate analysis at this time.';

    return NextResponse.json({ analysis });

  } catch (error: unknown) {
    console.error('OpenAI API Error:', error);

    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';

    return NextResponse.json(
      {
        error: 'Failed to generate AI analysis',
        details: errorMessage
      },
      { status: 500 }
    );
  }
}
