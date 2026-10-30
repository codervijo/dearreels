// src/__tests__/signup-form.test.js
// Regression check: the sign-up form must actually deliver leads. It
// previously wrote them only to the visitor's own localStorage and then
// said "We'll write back personally within a day".

import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const src = readFileSync(join(process.cwd(), 'src', 'components', 'SignupSection.tsx'), 'utf8');

describe('SignupSection form', () => {
  it('posts to Web3Forms', () => {
    expect(src).toMatch(/fetch\("https:\/\/api\.web3forms\.com\/submit"/);
  });

  it('reads the access key from PUBLIC_WEB3FORMS_KEY', () => {
    expect(src).toMatch(/import\.meta\.env\.PUBLIC_WEB3FORMS_KEY/);
  });

  it('only shows success after the service confirms', () => {
    expect(src).toMatch(/if \(data\.success\) \{\s*setState\("done"\)/);
  });

  it('errors instead of faking success when the key is unset', () => {
    expect(src).toMatch(/if \(!WEB3FORMS_ACCESS_KEY\) \{\s*setState\("error"\)/);
  });

  it('no longer stashes leads in localStorage', () => {
    expect(src).not.toMatch(/localStorage/);
  });
});
