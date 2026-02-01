# Quick Start Guide

## 🎯 Get Running in 2 Minutes

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

Opens automatically at `http://localhost:3000`

### 3. Edit Files & See Changes Instantly
- Edit components in `src/components/`
- Edit styles in `src/styles/`
- HMR (Hot Module Replacement) will refresh automatically

## 📝 Common Customizations

### Update Your Information

1. **Hero Section** (`src/components/Hero.jsx`):
   - Line 35-36: Update name
   - Line 37-38: Update title and tagline
   - Line 65-70: Update social media links
   - Line 22: Update CV download content

2. **About Section** (`src/components/About.jsx`):
   - Line 34-40: Update professional summary
   - Line 34: Update highlighted skills

3. **Contact Section** (`src/components/Contact.jsx`):
   - Line 133: Update phone number
   - Line 165: Update email address
   - Line 140: Update email for form submission

### Add Your Projects

In `src/components/Projects.jsx`, add to the `projects` array:

```javascript
{
  id: 4,
  title: 'Your Project Title',
  description: 'Your project description',
  tech: ['Tech1', 'Tech2', 'Tech3'],
  icon: '🔧',
  github: 'https://github.com/username/repo',
  demo: 'https://project-link.com'
}
```

### Change Colors

In `src/styles/global.css`, update the `:root` variables:

```css
--primary: #00ff41;      /* Main neon color */
--secondary: #00ffff;    /* Accent color */
--background: #0a0e27;   /* Dark background */
```

## 🚀 Build & Deploy

### Build for Production
```bash
npm run build
```

Creates optimized files in `dist/` folder

### Deploy to GitHub Pages
```bash
npm run deploy
```

Or manually push `dist` folder to GitHub

## 🔍 Quality Checks

### No Errors?
- Check terminal for build messages
- Open DevTools (F12) and check Console tab
- Should see no red errors

### Testing Responsiveness
- Press F12 → Click device toolbar (Ctrl+Shift+M)
- Test on Mobile, Tablet, Desktop views

### Performance
```bash
npm run build
```
Check the file sizes in terminal output

## ⚡ Pro Tips

1. **Font Changes**: Update fonts in `public/index.html` (line 11)
2. **Add Icons**: React Icons are already imported (700+ available)
3. **Add Animations**: Use Framer Motion (already installed)
4. **Dark Mode**: Already implemented! Theme is built-in
5. **SEO**: Update meta tags in `public/index.html`

## 📋 Before Deployment Checklist

- [ ] Updated all personal information
- [ ] Updated all social media links
- [ ] Changed contact email address
- [ ] Added your projects
- [ ] Updated certifications
- [ ] Updated education details
- [ ] Tested on mobile
- [ ] No console errors (F12)
- [ ] Build runs without errors (`npm run build`)

## 🐛 Quick Fixes

**Styles not showing?**
```bash
npm run dev
```
(Then hard refresh: Ctrl+F5)

**Dependencies error?**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Port 3000 already in use?**
```bash
npm run dev -- --port 3001
```

## 📚 Learn More

- [React Docs](https://react.dev)
- [Vite Docs](https://vitejs.dev)
- [Framer Motion](https://www.framer.com/motion/)
- [React Icons](https://react-icons.github.io/react-icons/)

## 🎉 You're Ready!

Your portfolio is production-ready. Start customizing and deploy! 🚀
