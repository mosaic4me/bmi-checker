# Quick Start Guide

Get your BMI & Reproductive Health Analyzer running in 5 minutes!

## ⚡ Super Quick Start (Local Development)

### 1. Install Dependencies

```bash
cd bmi-reproductive-health
npm install
```

### 2. Add Your OpenAI API Key

Create `.env.local` file:

```bash
# Windows Command Prompt
copy .env.local.example .env.local

# Windows PowerShell
Copy-Item .env.local.example .env.local

# Mac/Linux
cp .env.local.example .env.local
```

Edit `.env.local` and add your key:

```
OPENAI_API_KEY=sk-proj-your-actual-key-here
```

**Get an API key**: [platform.openai.com/api-keys](https://platform.openai.com/api-keys)

### 3. Run the Application

```bash
npm run dev
```

### 4. Open in Browser

Go to: [http://localhost:3000](http://localhost:3000)

**That's it!** Your application is running! 🎉

## 🧪 Test the Application

Enter sample data:
- **Age**: 25
- **Height**: 165 cm
- **Weight**: 60 kg

Click **"Calculate BMI & Analyze"**

You should see:
1. ✅ BMI Result: 22.0 (Normal Weight)
2. ✅ Interactive BMI gauge
3. ✅ AI-generated educational insights
4. ✅ Detailed reproductive health impacts
5. ✅ WHO evidence and statistics

## 🚀 Deploy to Vercel (Production)

### Quick Deploy

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/bmi-reproductive-health.git
   git push -u origin main
   ```

2. **Deploy on Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Add environment variable:
     - Name: `OPENAI_API_KEY`
     - Value: Your API key
   - Click "Deploy"

3. **Get your URL**:
   - Your app will be live at: `https://your-project.vercel.app`

## 📚 Full Documentation

- **Detailed README**: [README.md](./README.md)
- **Deployment Guide**: [DEPLOYMENT-GUIDE.md](./DEPLOYMENT-GUIDE.md)

## 🔧 Troubleshooting

### AI Analysis Not Working

**Error**: "OpenAI API key not configured"

**Fix**: Check your `.env.local` file:
```bash
# Verify file exists
ls .env.local

# Check contents (should show your API key)
cat .env.local
```

### Build Errors

**Fix**: Run build command to see errors:
```bash
npm run build
```

### Port Already in Use

**Error**: "Port 3000 is already in use"

**Fix**: Use a different port:
```bash
npm run dev -- -p 3001
```

## ✨ Next Steps

1. ✅ Customize the UI colors in `tailwind.config.ts`
2. ✅ Add your institution logo to the header
3. ✅ Modify medical disclaimers for your course requirements
4. ✅ Deploy to Vercel for live access
5. ✅ Share with your medical course instructor

## 💰 Cost Estimate

**OpenAI API** (GPT-5-nano):
- Cost per calculation: ~$0.00004 ($0.04 per 1000)
- 100 calculations: ~$0.004 (less than 1 cent!)
- Very budget-friendly for school projects

**Vercel Hosting**:
- Free tier: Perfect for school projects
- Unlimited bandwidth
- Automatic HTTPS

**Total Cost**: ~$0.50/month for typical school project usage

## 📞 Need Help?

- OpenAI API Issues: [platform.openai.com/docs](https://platform.openai.com/docs)
- Next.js Questions: [nextjs.org/docs](https://nextjs.org/docs)
- Vercel Deployment: [vercel.com/docs](https://vercel.com/docs)

Happy coding! 🎓🏥
