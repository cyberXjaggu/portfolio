# Deployment Guide for GitHub Pages

## Quick Start Deployment

### Step 1: Update Configuration Files

**File: vite.config.js**
```javascript
base: '/portfolio/' // Change 'portfolio' to your GitHub repo name
```

**File: package.json**
```json
"homepage": "https://your-username.github.io/portfolio"
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Build the Project

```bash
npm run build
```

### Step 4: Verify Build

```bash
npm run preview
```

### Step 5: Commit and Push

```bash
git add .
git commit -m "Initial portfolio setup"
git push origin main
```

### Step 6: Enable GitHub Pages

1. Go to your GitHub repository
2. Click **Settings** (top right)
3. Select **Pages** from the left menu
4. Under "Build and deployment":
   - Source: Select "Deploy from a branch"
   - Branch: Select "main" and "/" (root) folder
5. Click **Save**

### Step 7: Access Your Portfolio

Your portfolio will be live at:
```
https://your-username.github.io/portfolio/
```

Wait a few minutes for the first deployment.

## Automated Deployment (Using gh-pages)

If you want to deploy automatically with npm:

1. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

2. Run deploy command:
```bash
npm run deploy
```

This will automatically:
- Build the project
- Push the dist folder to a gh-pages branch
- GitHub Pages will deploy from that branch

## Troubleshooting

### White Screen on GitHub Pages

**Solution**: Verify `base` in `vite.config.js` matches your repo name

### Styles Not Loading

**Solution**: Clear browser cache (Ctrl+Shift+Delete) and hard refresh (Ctrl+F5)

### 404 Errors on Page Refresh

**Solution**: This is normal for single-page apps. GitHub Pages is configured correctly.

### Long Deployment Time

**Tip**: First deployment can take 5-10 minutes. Check Actions tab for progress.

## Update Existing Portfolio

```bash
# Make changes to your code
git add .
git commit -m "Update portfolio"
git push origin main

# If using npm run deploy
npm run deploy
```

## Custom Domain

To use a custom domain:

1. Create a CNAME file in the root of your repo:
```
yourdomain.com
```

2. Update DNS settings at your domain provider
3. GitHub Pages will auto-detect and use your domain

## Performance Tips

- Images should be optimized before adding
- Use React DevTools to check for unnecessary re-renders
- Monitor bundle size with `npm run build`
- Enable gzip compression (GitHub Pages does this automatically)

## Security

- Never commit sensitive information (API keys, tokens)
- Use environment variables for any dynamic content
- GitHub Pages uses HTTPS automatically

---

Your portfolio is now ready for the world! 🚀
