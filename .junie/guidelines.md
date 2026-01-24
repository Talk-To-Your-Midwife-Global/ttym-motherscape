### Project Guidelines

#### 1. Build & Configuration

The project is built with **Next.js 15** and uses **pnpm** for package management.

**Prerequisites:**

- Node.js (Latest LTS recommended)
- pnpm (`npm install -g pnpm@latest-10`)

**Setup:**

1. Install dependencies:
   ```sh
   pnpm install
   ```
2. Configure environment variables. Create a `.env.local` file in the root directory (refer to `README.md` for the list
   of required variables).
    - Note: The app uses `process.env.environment` and `process.env.NEXT_PUBLIC_ENVIRONMENT` to toggle between `http`
      and `https` for API calls.

**Running the app:**

- Development mode: `pnpm dev`
- Production build: `pnpm build && pnpm start`

#### 2. Testing Information

The project uses **Vitest** with **jsdom** for unit and component testing.

**Running Tests:**

- Run all tests: `pnpm test`
- Run tests in watch mode: `pnpm vitest`
- Run a specific test file: `pnpm test path/to/file.test.js`

**Adding New Tests:**

- Test files should follow the naming convention `*.test.js` or `*.test.jsx`.
- Place test files alongside the code they test (e.g., `app/_lib/functions.js` -> `app/_lib/functions.test.js`).
- Use `@/` alias for absolute imports from the project root.

**Example Test Case:**

```javascript
import { describe, it, expect } from 'vitest';
import { removeSpaces } from '@/app/_lib/functions';

describe('removeSpaces', () => {
  it('should remove all spaces from a string', () => {
    expect(removeSpaces('hello world')).toBe('helloworld');
  });
});
```

#### 3. Development Guidelines

**Architecture & Conventions:**

- **Next.js App Router**: The project heavily utilizes the App Router structure.
- **Server Actions**: Server-side logic (e.g., authentication, database mutations) is located in `app/_actions/` and
  marked with `"use server"`.
- **Utility Functions**: General-purpose helpers are in `app/_lib/`.
- **Configuration**: Application-wide constants and dynamic URI builders are in `app/_config/main.js`.
- **Code Style**:
    - Use functional components and hooks.
    - Follow the existing pattern of using `Log` from `@/app/_lib/utils` for debugging instead of `console.log`.
    - Prefer JSDoc comments for exported utility functions.
    - Path Aliases: Use `@/` to refer to the project root for cleaner imports.

**Tailwind CSS:**

- Tailwind is used for styling. Custom configurations can be found in `tailwind.config.js`.
- Check `postcss.config.mjs` for CSS processing steps.

**PWA Support:**

- The project uses `@serwist/next` for Service Worker and PWA capabilities. Configuration is in `next.config.mjs` and
  `app/sw.js`.
