# Jagarnath - Cybersecurity Portfolio

A modern, high-tech cybersecurity portfolio website built with React + Vite, featuring a dark neon-green hacker theme.

## 🚀 Features

- **Responsive Design**: Mobile-first approach, fully optimized for all devices
- **Dark Neon Theme**: Professional cybersecurity aesthetic with glowing effects
- **Smooth Animations**: Framer Motion animations for engaging user experience
- **Performance**: Optimized build with zero console warnings
- **Accessibility**: WCAG compliant with proper semantic HTML
- **Component-Based**: Clean, reusable React components
- **GitHub Pages Ready**: Easily deployable to GitHub Pages

## 📋 Sections

1. **Navbar** - Fixed navigation with smooth scroll
2. **Hero** - Profile introduction with CTA buttons
3. **About** - Professional summary
4. **Skills** - Technical and security skills by category
5. **Projects** - Featured project showcase
6. **Certifications** - Credentials and internships
7. **Education** - Academic background
8. **Contact** - Contact form with validation
9. **Footer** - Copyright information

## 🛠️ Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool
- **Framer Motion** - Animation library
- **React Icons** - Icon library
- **CSS3** - Styling with CSS variables and gradients

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone or download the project:
```bash
cd "d:\Jagarnath Portfolio"
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

The application will open at `http://localhost:3000`

## 🔨 Build & Deployment

### Local Build
```bash
npm run build
```

This creates an optimized production build in the `dist` folder.

### Preview Build
```bash
npm run preview
```

### Deploy to GitHub Pages

#### Option 1: Using npm script
```bash
npm run deploy
```

#### Option 2: Manual Deployment

1. Update `homepage` in `package.json`:
```json
"homepage": "https://your-username.github.io/portfolio"
```

2. Update `base` in `vite.config.js`:
```javascript
base: '/portfolio/'
```

3. Build the project:
```bash
npm run build
```

4. Push the `dist` folder to your GitHub repository:
```bash
git add dist/
git commit -m "Deploy portfolio"
git push origin main
```

5. Enable GitHub Pages in repository settings:
   - Go to Settings > Pages
   - Select "Deploy from a branch"
   - Choose `main` branch and `/root` folder (or `/dist` if using a separate branch)

## 🎨 Customization

### Update Personal Information

Edit the following files to customize with your information:

- **Hero Section**: `src/components/Hero.jsx`
  - Name, title, tagline
  - Social media links
  - CV download

- **About Section**: `src/components/About.jsx`
  - Professional summary
  - Key highlights

- **Skills**: `src/components/Skills.jsx`
  - Update skill categories and items

- **Projects**: `src/components/Projects.jsx`
  - Add your own projects
  - Update GitHub links

- **Certifications**: `src/components/Certifications.jsx`
  - Add/remove certifications

- **Education**: `src/components/Education.jsx`
  - Update education details

- **Contact**: `src/components/Contact.jsx`
  - Update email and phone
  - Change contact email in `handleSubmit` function

### Color Theme

Customize colors in `src/styles/global.css`:

```css
:root {
  --primary: #00ff41;      /* Neon green */
  --secondary: #00ffff;    /* Cyan */
  --background: #0a0e27;   /* Dark blue-black */
  --surface: #1a1f3a;      /* Card background */
  /* ... other colors */
}
```

### Fonts

Google Fonts are already imported in `public/index.html`:
- **Poppins** - Main font
- **Courier Prime** - Monospace font

## 📱 Responsive Breakpoints

- Desktop: 1200px+
- Tablet: 768px - 1199px
- Mobile: 480px - 767px
- Small Mobile: < 480px

## ♿ Accessibility

The website includes:
- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Color contrast compliance
- Reduced motion support
- Alt text for images

## 📊 Performance

- Minified and optimized build
- No external CDN dependencies (except Google Fonts)
- Efficient component rendering with React
- CSS variables for quick theme switching
- Optimized animations with Framer Motion

## 🚀 Deployment Checklist

- [ ] Update all personal information (name, email, phone, links)
- [ ] Replace placeholder content with actual content
- [ ] Test all forms and functionality
- [ ] Update GitHub repository name in `vite.config.js` and `package.json`
- [ ] Test on mobile devices
- [ ] Check console for errors
- [ ] Optimize images if added
- [ ] Run `npm run build` and verify no errors
- [ ] Deploy to GitHub Pages
- [ ] Test live website

## 📝 File Structure

```
src/
├── components/
│   ├── Navbar.jsx
│   ├── Hero.jsx
│   ├── About.jsx
│   ├── Skills.jsx
│   ├── Projects.jsx
│   ├── Certifications.jsx
│   ├── Education.jsx
│   ├── Contact.jsx
│   └── Footer.jsx
├── assets/
│   ├── images/
│   └── icons/
├── styles/
│   ├── global.css
│   └── theme.css
├── App.jsx
├── main.jsx
└── index.html
```

## 🐛 Troubleshooting

### Build Errors
1. Clear node_modules: `rm -rf node_modules && npm install`
2. Clear Vite cache: `rm -rf dist .vite`
3. Check Node version: `node --version` (should be v16+)

### GitHub Pages Issues
1. Verify `homepage` and `base` are correctly set
2. Ensure GitHub Pages is enabled in repository settings
3. Wait a few minutes for deployment to complete
4. Clear browser cache

### Styling Issues
1. Check CSS variables are properly set in `global.css`
2. Ensure `theme.css` is imported in components
3. Clear browser cache (Ctrl+Shift+Delete)

## 📄 License

This portfolio is open source and available under the MIT License.

## 🤝 Contributing

Feel free to fork this project and customize it for your own use.

## 📧 Contact

For questions or support, please reach out through the contact form on the website.

---

**Built with ❤️ using React & Vite**
