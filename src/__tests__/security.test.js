/**
 * Security Tests for Jagarnath Portfolio
 * 
 * These tests validate security-critical behavior without destructive testing.
 * Run with: npx vitest run src/__tests__/security.test.js
 */

import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

// ─── SEC-01: No hard-coded secrets in source ───────────────────────────────────
describe('SEC-01: Secret Exposure', () => {
  const contactSource = fs.readFileSync(
    path.resolve(__dirname, '../components/Contact.jsx'),
    'utf-8'
  );

  it('should not contain hard-coded EmailJS service ID', () => {
    expect(contactSource).not.toMatch(/service_[a-zA-Z0-9]{7}/);
  });

  it('should not contain hard-coded EmailJS template ID', () => {
    expect(contactSource).not.toMatch(/template_[a-zA-Z0-9]{7}/);
  });

  it('should not contain hard-coded EmailJS public key as a string literal', () => {
    // The public key should come from import.meta.env, not a string literal
    expect(contactSource).toMatch(/import\.meta\.env\.VITE_EMAILJS_PUBLIC_KEY/);
    expect(contactSource).not.toMatch(/['"]5kSLf7O0CVCCWZSAk['"]/);
  });

  it('should reference environment variables for EmailJS config', () => {
    expect(contactSource).toMatch(/import\.meta\.env\.VITE_EMAILJS_SERVICE_ID/);
    expect(contactSource).toMatch(/import\.meta\.env\.VITE_EMAILJS_TEMPLATE_ID/);
    expect(contactSource).toMatch(/import\.meta\.env\.VITE_EMAILJS_PUBLIC_KEY/);
  });
});

// ─── SEC-02: Security headers configuration ────────────────────────────────────
describe('SEC-02: Security Headers (vercel.json)', () => {
  const vercelConfig = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, '../../vercel.json'), 'utf-8')
  );

  const globalHeaders = vercelConfig.headers.find(h => h.source === '/(.*)');
  const headerMap = {};
  if (globalHeaders) {
    globalHeaders.headers.forEach(h => {
      headerMap[h.key.toLowerCase()] = h.value;
    });
  }

  it('should define Content-Security-Policy', () => {
    expect(headerMap['content-security-policy']).toBeDefined();
  });

  it('CSP should block framing (frame-ancestors none)', () => {
    expect(headerMap['content-security-policy']).toMatch(/frame-ancestors\s+'none'/);
  });

  it('CSP should disallow object-src', () => {
    expect(headerMap['content-security-policy']).toMatch(/object-src\s+'none'/);
  });

  it('CSP should restrict script-src to self only', () => {
    expect(headerMap['content-security-policy']).toMatch(/script-src\s+'self'/);
    expect(headerMap['content-security-policy']).not.toMatch(/unsafe-eval/);
  });

  it('CSP should allow EmailJS connect-src', () => {
    expect(headerMap['content-security-policy']).toMatch(/connect-src[^;]*https:\/\/api\.emailjs\.com/);
  });

  it('should set X-Content-Type-Options to nosniff', () => {
    expect(headerMap['x-content-type-options']).toBe('nosniff');
  });

  it('should set X-Frame-Options to DENY', () => {
    expect(headerMap['x-frame-options']).toBe('DENY');
  });

  it('should set Referrer-Policy', () => {
    expect(headerMap['referrer-policy']).toBe('strict-origin-when-cross-origin');
  });

  it('should set Permissions-Policy denying sensitive features', () => {
    const pp = headerMap['permissions-policy'];
    expect(pp).toBeDefined();
    expect(pp).toMatch(/camera=\(\)/);
    expect(pp).toMatch(/microphone=\(\)/);
    expect(pp).toMatch(/geolocation=\(\)/);
  });
});

// ─── SEC-03: No XSS sinks ─────────────────────────────────────────────────────
describe('SEC-03: XSS Sinks', () => {
  const srcDir = path.resolve(__dirname, '..');
  const jsxFiles = [];

  function collectFiles(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory() && entry.name !== '__tests__' && entry.name !== 'node_modules') {
        collectFiles(fullPath);
      } else if (entry.isFile() && (entry.name.endsWith('.jsx') || entry.name.endsWith('.js'))) {
        jsxFiles.push(fullPath);
      }
    }
  }
  collectFiles(srcDir);

  it('should have no dangerouslySetInnerHTML usage', () => {
    for (const file of jsxFiles) {
      const content = fs.readFileSync(file, 'utf-8');
      expect(content).not.toMatch(/dangerouslySetInnerHTML/);
    }
  });

  it('should have no innerHTML assignments', () => {
    for (const file of jsxFiles) {
      const content = fs.readFileSync(file, 'utf-8');
      expect(content).not.toMatch(/\.innerHTML\s*=/);
    }
  });

  it('should have no eval() calls', () => {
    for (const file of jsxFiles) {
      const content = fs.readFileSync(file, 'utf-8');
      expect(content).not.toMatch(/\beval\s*\(/);
    }
  });

  it('should have no document.write() calls', () => {
    for (const file of jsxFiles) {
      const content = fs.readFileSync(file, 'utf-8');
      expect(content).not.toMatch(/document\.write\s*\(/);
    }
  });

  it('should have no new Function() constructor calls', () => {
    for (const file of jsxFiles) {
      const content = fs.readFileSync(file, 'utf-8');
      expect(content).not.toMatch(/new\s+Function\s*\(/);
    }
  });
});

// ─── SEC-04: Hash navigation allowlist ─────────────────────────────────────────
describe('SEC-04: Hash Navigation Validation', () => {
  const appSource = fs.readFileSync(
    path.resolve(__dirname, '../App.jsx'),
    'utf-8'
  );

  it('should define VALID_SECTION_IDS allowlist', () => {
    expect(appSource).toMatch(/VALID_SECTION_IDS/);
  });

  it('should validate hash against allowlist before using getElementById', () => {
    expect(appSource).toMatch(/VALID_SECTION_IDS\.has\(hash\)/);
  });
});

// ─── SEC-05: Input validation limits ───────────────────────────────────────────
describe('SEC-05: Contact Form Input Validation', () => {
  const contactSource = fs.readFileSync(
    path.resolve(__dirname, '../components/Contact.jsx'),
    'utf-8'
  );

  it('should enforce name length limit', () => {
    expect(contactSource).toMatch(/MAX_NAME_LENGTH/);
    expect(contactSource).toMatch(/maxLength=\{MAX_NAME_LENGTH\}/);
  });

  it('should enforce email length limit', () => {
    expect(contactSource).toMatch(/MAX_EMAIL_LENGTH/);
    expect(contactSource).toMatch(/maxLength=\{MAX_EMAIL_LENGTH\}/);
  });

  it('should enforce message length limit', () => {
    expect(contactSource).toMatch(/MAX_MESSAGE_LENGTH/);
    expect(contactSource).toMatch(/maxLength=\{MAX_MESSAGE_LENGTH\}/);
  });

  it('should implement rate limiting with cooldown', () => {
    expect(contactSource).toMatch(/SUBMISSION_COOLDOWN_MS/);
    expect(contactSource).toMatch(/cooldownRemaining/);
  });
});

// ─── SEC-06: .gitignore coverage ───────────────────────────────────────────────
describe('SEC-06: Git Ignore Configuration', () => {
  const gitignore = fs.readFileSync(
    path.resolve(__dirname, '../../.gitignore'),
    'utf-8'
  );

  it('should ignore .env files', () => {
    expect(gitignore).toMatch(/\.env/);
  });

  it('should ignore node_modules', () => {
    expect(gitignore).toMatch(/node_modules/);
  });

  it('should ignore dist output', () => {
    expect(gitignore).toMatch(/dist/);
  });
});

// ─── SEC-07: Build configuration security ──────────────────────────────────────
describe('SEC-07: Build Configuration', () => {
  const viteConfig = fs.readFileSync(
    path.resolve(__dirname, '../../vite.config.js'),
    'utf-8'
  );

  it('should have source maps disabled in production', () => {
    expect(viteConfig).toMatch(/sourcemap:\s*false/);
  });

  it('should drop console statements in production', () => {
    expect(viteConfig).toMatch(/drop_console:\s*true/);
  });

  it('should drop debugger statements in production', () => {
    expect(viteConfig).toMatch(/drop_debugger:\s*true/);
  });
});

// ─── SEC-08: External link safety ──────────────────────────────────────────────
describe('SEC-08: External Link Safety', () => {
  const srcDir = path.resolve(__dirname, '..');
  const jsxFiles = [];

  function collectFiles(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory() && entry.name !== '__tests__' && entry.name !== 'node_modules') {
        collectFiles(fullPath);
      } else if (entry.isFile() && entry.name.endsWith('.jsx')) {
        jsxFiles.push(fullPath);
      }
    }
  }
  collectFiles(srcDir);

  it('all target="_blank" links should have rel="noopener noreferrer"', () => {
    for (const file of jsxFiles) {
      const content = fs.readFileSync(file, 'utf-8');
      // Find all target="_blank" occurrences
      const blankMatches = content.match(/target="_blank"/g) || [];
      const noopenerMatches = content.match(/rel="noopener noreferrer"/g) || [];
      expect(noopenerMatches.length).toBeGreaterThanOrEqual(blankMatches.length);
    }
  });
});

// ─── SEC-09: No console.error in production code ───────────────────────────────
describe('SEC-09: Error Information Leakage', () => {
  const contactSource = fs.readFileSync(
    path.resolve(__dirname, '../components/Contact.jsx'),
    'utf-8'
  );

  it('should not have console.error that could leak error details', () => {
    expect(contactSource).not.toMatch(/console\.error/);
  });
});

// ─── SEC-10: .env.example exists ───────────────────────────────────────────────
describe('SEC-10: Environment Variable Documentation', () => {
  it('should have .env.example file', () => {
    const envExamplePath = path.resolve(__dirname, '../../.env.example');
    expect(fs.existsSync(envExamplePath)).toBe(true);
  });

  it('.env.example should not contain actual secret values', () => {
    const envExample = fs.readFileSync(
      path.resolve(__dirname, '../../.env.example'),
      'utf-8'
    );
    // Lines with = should either be empty after = or have a comment
    const lines = envExample.split('\n').filter(l => l.includes('=') && !l.startsWith('#'));
    for (const line of lines) {
      const value = line.split('=')[1]?.trim();
      expect(value).toBe('');
    }
  });
});
