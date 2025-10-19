import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(request: NextRequest) {
  try {
    const { bmi, category, age, impacts, statistics } = await request.json();

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

    // Create educational prompt for GPT-5-nano
    const prompt = `You are a medical education assistant providing evidence-based information about BMI and reproductive health for young African women.

Patient Profile:
- Age: ${age} years
- BMI: ${bmi}
- Category: ${category}

Reproductive Health Impacts:
${JSON.stringify(impacts, null, 2)}

Key Statistics:
${JSON.stringify(statistics, null, 2)}

Please provide:
1. A clear, compassionate explanation of what this BMI category means for reproductive health
2. Specific insights about fertility and pregnancy considerations for this BMI range
3. Evidence-based recommendations for maintaining or improving reproductive health
4. Important note about African body composition variations and individual assessment needs
5. Encouragement to consult healthcare providers for personalized guidance

Keep the tone educational, supportive, and empowering. Use simple language appropriate for ages 15-40. Focus on actionable insights and avoid fear-mongering.

Limit response to 250-300 words.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-5-nano', // Using GPT-5-nano as specified
      messages: [
        {
          role: 'system',
          content: 'You are a medical education assistant specializing in reproductive health for young women in African populations. Provide evidence-based, compassionate, and culturally sensitive health education.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 500,
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
