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
    const prompt = `You are a medical education specialist providing detailed, evidence-based health guidance about BMI and reproductive health for young women.

Patient Profile:
- Age: ${age} years
- BMI: ${bmi}
- Category: ${category}

Reproductive Health Data:
${JSON.stringify(impacts, null, 2)}

Research Evidence:
${JSON.stringify(statistics, null, 2)}

Provide a comprehensive, structured health analysis with these sections:

**1. BMI Overview** (2-3 sentences)
Explain what this BMI category means and its general health implications in clear, compassionate terms.

**2. Reproductive Health Impact** (4-5 sentences)
Detail specific effects on:
- Fertility and ovulation
- Menstrual health and hormonal balance
- Pregnancy outcomes and risks
Use concrete examples and statistics where relevant.

**3. Actionable Recommendations** (3-4 points)
Provide specific, practical steps for:
- Nutrition and dietary considerations
- Physical activity guidance
- Health monitoring suggestions
- When to seek medical consultation

**4. Important Considerations**
- Note individual variations in body composition
- Emphasize that BMI is one screening tool among many
- Encourage professional medical consultation for personalized care

Write in a warm, educational tone that empowers without alarming. Use evidence-based language appropriate for ages 15-40. Be specific and actionable.

Limit response to 350-400 words for comprehensive coverage.`;

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
      max_tokens: 650,
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
