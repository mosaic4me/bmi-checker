# Vercel Deployment Guide

## Current Issue: 404 Error

The application is getting a 404 error because the **OPENAI_API_KEY environment variable is missing** in Vercel.

## Fix Steps:

### 1. Add Environment Variable to Vercel

1. Go to your Vercel dashboard: https://vercel.com/dashboard
2. Select your project: `bmi-checker-eight`
3. Go to **Settings** → **Environment Variables**
4. Add the following variable:

   **Variable Name**: `OPENAI_API_KEY`

   **Value**: `your-openai-api-key-here`

   > **Note**: Use the same API key from your `.env.local` file

   **Environment**: Select all three: Production, Preview, Development

5. Click **Save**

### 2. Trigger Redeploy

After adding the environment variable:
- Go to **Deployments** tab
- Click the **⋯** menu on the latest deployment
- Select **Redeploy**
- Or simply push a new commit to trigger automatic deployment

### 3. Verify Deployment

Once redeployed, visit: https://bmi-checker-eight.vercel.app/

The application should now load successfully with:
- BMI calculation form
- AI-powered health insights
- Professional medical theme

## Build Script Fix (Already Applied)

The build script has been fixed to remove the `--turbopack` flag which Vercel doesn't support:

```json
"build": "next build"  ✅ Correct for Vercel
```

## Local Development

For local development, create a `.env.local` file (gitignored) with your OpenAI API key:

```bash
OPENAI_API_KEY=your-openai-api-key-here
```

Run locally:
```bash
npm run dev
# Access at http://localhost:3000
```

## Troubleshooting

If 404 persists after adding environment variable:

1. **Check Vercel Build Logs**:
   - Go to Deployments → Latest deployment
   - Click to view logs
   - Look for "OPENAI_API_KEY" errors

2. **Verify Environment Variable**:
   - Settings → Environment Variables
   - Ensure OPENAI_API_KEY is set for all environments

3. **Check Build Output**:
   - Logs should show: `✓ Compiled successfully`
   - No ESLint errors
   - Route `/` should be listed

4. **Force Redeploy**:
   - Sometimes Vercel caches need clearing
   - Try: Deployments → Redeploy without cache

## Production URL

https://bmi-checker-eight.vercel.app/

## GitHub Repository

https://github.com/mosaic4me/bmi-checker
