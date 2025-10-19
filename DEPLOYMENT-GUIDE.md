# Deployment Guide - BMI & Reproductive Health Analyzer

Complete guide for deploying your application to Vercel with OpenAI GPT-5-nano integration.

## Prerequisites

Before deploying, ensure you have:

1. ✅ OpenAI API key ([get one here](https://platform.openai.com/api-keys))
2. ✅ GitHub account (for Vercel deployment)
3. ✅ Vercel account ([sign up free](https://vercel.com/signup))

## Step 1: Configure API Key Locally (For Testing)

1. **Navigate to your project**:
   ```bash
   cd bmi-reproductive-health
   ```

2. **Create `.env.local` file**:
   ```bash
   # Windows (Command Prompt)
   copy .env.local.example .env.local

   # Windows (PowerShell)
   Copy-Item .env.local.example .env.local

   # Mac/Linux
   cp .env.local.example .env.local
   ```

3. **Edit `.env.local`** and add your actual API key:
   ```
   OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```

4. **Test locally**:
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) and test the application.

## Step 2: Push to GitHub

1. **Initialize git repository** (if not already done):
   ```bash
   cd bmi-reproductive-health
   git init
   ```

2. **Create `.gitignore`** (should already exist, but verify it includes):
   ```
   .env.local
   .env*.local
   node_modules/
   .next/
   ```

3. **Commit your code**:
   ```bash
   git add .
   git commit -m "Initial commit: BMI & Reproductive Health Analyzer"
   ```

4. **Create GitHub repository**:
   - Go to [github.com/new](https://github.com/new)
   - Name it: `bmi-reproductive-health`
   - Make it **Private** (recommended for projects with API keys)
   - Do NOT initialize with README (you already have one)

5. **Push to GitHub**:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/bmi-reproductive-health.git
   git branch -M main
   git push -u origin main
   ```

## Step 3: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard (Recommended)

1. **Go to [vercel.com](https://vercel.com)** and log in

2. **Click "New Project"** or "Add New..." → "Project"

3. **Import your GitHub repository**:
   - Click "Import Git Repository"
   - Select your GitHub account
   - Choose `bmi-reproductive-health` repository
   - Click "Import"

4. **Configure Project**:
   - **Framework Preset**: Next.js (should be auto-detected)
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)
   - **Install Command**: `npm install` (default)

5. **Add Environment Variable** (CRITICAL STEP):
   - Click "Environment Variables" section
   - Add variable:
     - **Name**: `OPENAI_API_KEY`
     - **Value**: `sk-proj-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx` (your actual key)
   - Select which environments: **Production, Preview, Development** (all three)
   - Click "Add"

6. **Deploy**:
   - Click "Deploy"
   - Wait 2-3 minutes for deployment

7. **Get your URL**:
   - After deployment, you'll see: `https://bmi-reproductive-health-xxxx.vercel.app`
   - Click "Visit" to see your live application!

### Option B: Deploy via Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   cd bmi-reproductive-health
   vercel
   ```

4. **Add environment variable**:
   ```bash
   vercel env add OPENAI_API_KEY
   ```

   When prompted:
   - Enter your API key value
   - Select environments: Production, Preview, Development

5. **Redeploy with environment variables**:
   ```bash
   vercel --prod
   ```

## Step 4: Verify Deployment

1. **Open your deployed URL** (e.g., `https://bmi-reproductive-health-xxxx.vercel.app`)

2. **Test the application**:
   - Enter sample data:
     - Age: 25
     - Height: 165 cm
     - Weight: 60 kg
   - Click "Calculate BMI & Analyze"
   - Verify BMI calculation shows
   - Verify AI analysis loads (this confirms API key is working)

3. **Check for errors**:
   - If AI analysis shows error, check Vercel dashboard → Settings → Environment Variables
   - Ensure `OPENAI_API_KEY` is correctly set

## Step 5: Custom Domain (Optional)

1. **Go to Vercel Dashboard** → Your Project → Settings → Domains

2. **Add custom domain**:
   - Enter your domain (e.g., `bmichecker.com`)
   - Follow DNS configuration instructions
   - Vercel provides automatic HTTPS

## Troubleshooting

### AI Analysis Not Working

**Problem**: "OpenAI API key not configured" error

**Solutions**:
1. Check Vercel Dashboard → Settings → Environment Variables
2. Ensure `OPENAI_API_KEY` is present and correct
3. Redeploy: Vercel Dashboard → Deployments → ⋮ Menu → Redeploy

### Build Fails

**Problem**: Deployment fails during build

**Solutions**:
1. Check build logs in Vercel dashboard
2. Test locally: `npm run build`
3. Ensure all dependencies are in `package.json`

### TypeScript Errors

**Problem**: Type errors during build

**Solutions**:
1. Run locally: `npm run build`
2. Fix any TypeScript errors
3. Commit and push fixes

## Post-Deployment

### Monitor Usage

1. **OpenAI Usage**:
   - Go to [platform.openai.com/usage](https://platform.openai.com/usage)
   - Monitor API token usage
   - GPT-5-nano costs: $0.05/1M input tokens, $0.40/1M output tokens

2. **Vercel Analytics** (Optional):
   - Enable in Vercel Dashboard → Analytics
   - Track page views and performance

### Set API Rate Limits (Recommended)

1. **Go to OpenAI Dashboard** → [Usage Limits](https://platform.openai.com/account/limits)

2. **Set monthly budget** (recommended for school projects):
   - Example: $5-10/month limit
   - This prevents unexpected charges

### Share Your Project

Your application is now live! Share it with:
- Your medical course instructor
- Classmates for peer review
- Include in your academic portfolio

**Example URL**: `https://bmi-reproductive-health-xxxx.vercel.app`

## Updating Your Deployment

When you make changes:

1. **Edit code locally**

2. **Test locally**:
   ```bash
   npm run dev
   ```

3. **Build and test**:
   ```bash
   npm run build
   npm start
   ```

4. **Commit and push to GitHub**:
   ```bash
   git add .
   git commit -m "Description of changes"
   git push
   ```

5. **Vercel auto-deploys** (if GitHub integration is set up)
   - New deployment triggered automatically
   - Check Vercel dashboard for deployment status

## Cost Estimation

For a typical school project with moderate usage:

### OpenAI Costs (GPT-5-nano)

**Example Usage** (100 calculations/day for 30 days):
- Input tokens per request: ~500 tokens
- Output tokens per request: ~300 tokens
- Total daily: 80,000 tokens (50K input + 30K output)
- Monthly: 2.4M tokens

**Monthly Cost**:
- Input: 2.4M × $0.05/1M = $0.12
- Output: 0.9M × $0.40/1M = $0.36
- **Total: ~$0.48/month**

### Vercel Costs

- **Free tier**: Unlimited bandwidth, 100GB bandwidth
- **Serverless function executions**: 100,000/month (free)
- **For school projects**: $0/month

**Total Monthly Cost: ~$0.50**

## Security Best Practices

1. ✅ Never commit `.env.local` to GitHub
2. ✅ Use environment variables in Vercel for secrets
3. ✅ Set OpenAI usage limits
4. ✅ Make GitHub repository private (recommended)
5. ✅ Regularly rotate API keys if exposed

## Support

If you encounter issues:

1. Check [Vercel Documentation](https://vercel.com/docs)
2. Check [OpenAI API Documentation](https://platform.openai.com/docs)
3. Review [Next.js Deployment Guide](https://nextjs.org/docs/app/building-your-application/deploying)

## Completion Checklist

Before submitting your project:

- [ ] Application builds successfully (`npm run build`)
- [ ] Deployed to Vercel
- [ ] Custom domain configured (if required)
- [ ] AI analysis working with GPT-5-nano
- [ ] All features tested (BMI calculation, health impacts, history)
- [ ] README.md updated with your deployment URL
- [ ] API usage limits set
- [ ] Project documentation complete

Congratulations! Your BMI & Reproductive Health Analyzer is now live! 🎉
