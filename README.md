# BMI & Reproductive Health Analyzer

An evidence-based educational tool that helps young women (ages 15-40) understand the relationship between Body Mass Index (BMI) and reproductive health outcomes, including fertility, pregnancy, and menstrual health.

## Features

- **Accurate BMI Calculation**: WHO-standard BMI formula with age validation (15-40 years)
- **Comprehensive Health Information**: Evidence-based reproductive health impacts for all BMI categories
- **AI-Powered Insights**: Personalized educational analysis powered by OpenAI GPT-5-nano
- **African Context**: Notes on body composition variations and WHO standard applicability
- **Calculation History**: Local browser cache for tracking multiple calculations
- **Interactive Visualizations**: Color-coded BMI gauge and expandable health impact sections
- **Medical Citations**: Detailed statistics with peer-reviewed research sources (WHO, PMC, FIGO, ASRM)

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **AI Integration**: OpenAI API (GPT-5-nano)
- **Deployment**: Vercel-ready

## Getting Started

### Prerequisites

- Node.js 18+ installed
- OpenAI API key ([get one here](https://platform.openai.com/api-keys))

### Installation

1. **Clone or navigate to the project**:
   ```bash
   cd bmi-reproductive-health
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables**:

   Create a `.env.local` file in the root directory:
   ```bash
   cp .env.local.example .env.local
   ```

   Edit `.env.local` and add your OpenAI API key:
   ```
   OPENAI_API_KEY=your_actual_api_key_here
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Open the application**:

   Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment to Vercel

### Option 1: Deploy via Vercel CLI

```bash
npm install -g vercel
vercel
```

### Option 2: Deploy via Vercel Dashboard

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your repository
5. Add environment variable:
   - Key: `OPENAI_API_KEY`
   - Value: Your OpenAI API key
6. Click "Deploy"

## Usage

1. **Enter Information**:
   - Age (15-40 years)
   - Height (in centimeters)
   - Weight (in kilograms)

2. **View Results**:
   - BMI calculation with WHO category
   - Interactive BMI gauge visualization
   - AI-generated educational insights
   - Detailed reproductive health impacts
   - Statistical evidence with citations

3. **Access History**:
   - Previous calculations are cached locally
   - Click "Expand" to view history
   - Select any entry to recalculate

## Medical Disclaimer

This tool is for **educational purposes only** and does not provide medical diagnosis or treatment recommendations.

- BMI is a screening tool and may not account for individual factors like muscle mass or body composition variations
- All users (especially those ages 15-17) should consult healthcare providers for personalized health assessment
- The information provided is based on WHO guidelines and peer-reviewed research but should not replace professional medical advice

## Data Sources

All medical information is based on:

- **World Health Organization (WHO)** BMI Classifications
- **Peer-Reviewed Research**: PMC/PubMed systematic reviews and meta-analyses (2023-2024)
- **Medical Organizations**: FIGO, ASRM, Office on Women's Health
- **African Context**: WHO Africa Regional Office guidance and population-specific research

### Key Citations

- Systematic Review: "Impact of BMI on fertility in otherwise healthy population" (PMC11529583, 2024)
- "Types of reproductive disorders in underweight and overweight young females" (PMC4426152)
- "The effect of underweight on female reproduction" (ScienceDirect, 2020)
- "Obesity and reproduction: a committee opinion" (ASRM, 2021)
- FIGO Literature Review: "The challenges of obesity for fertility" (2023)

## Project Structure

```
bmi-reproductive-health/
├── app/
│   ├── api/analyze/route.ts    # OpenAI API integration
│   └── page.tsx                # Main application page
├── components/
│   ├── bmi-input-form.tsx      # Input form with validation
│   ├── bmi-gauge.tsx           # BMI visualization
│   ├── reproductive-health-impact.tsx  # Health impact panel
│   ├── ai-insights.tsx         # AI analysis display
│   └── calculation-history.tsx # History management
├── lib/
│   ├── bmi-calculator.ts       # BMI calculation logic
│   ├── medical-data.ts         # WHO studies and evidence
│   └── utils.ts                # Utility functions
└── .env.local.example          # Environment template
```

## AI Model

This application uses **GPT-5-nano** - OpenAI's most budget-friendly model as of 2025:

- **Pricing**: $0.05/1M input tokens, $0.40/1M output tokens
- **Context Window**: 272,000 tokens input, 128,000 tokens output
- **Use Case**: Perfect for classification, extraction, and educational content generation

## Contributing

This is a medical education project. Contributions should:

- Maintain medical accuracy with peer-reviewed sources
- Follow WHO and medical organization guidelines
- Include proper citations for health claims
- Respect the educational (non-diagnostic) purpose

## License

This project is created for educational purposes. Medical data is sourced from public health organizations and peer-reviewed research.

## Support

For issues or questions:

- Check that your `.env.local` file contains a valid OpenAI API key
- Ensure you have sufficient API credits
- Verify internet connection for AI analysis features

## Acknowledgments

- **WHO** for BMI classifications and global health data
- **OpenAI** for GPT-5-nano AI model
- **Medical Research Community** for peer-reviewed reproductive health studies
- **Next.js Team** for the excellent React framework
