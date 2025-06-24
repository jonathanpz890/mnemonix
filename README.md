# 🧠 Mnemonix

A light-weight utility toolkit for Node.js and TypeScript, focused on smart, developer-friendly logging and diagnostics.  
Mnemonix gives you beautiful logs, stack-aware insights, execution timers, and more — with zero setup.


## 📦 Installation

```bash
npm install mnemonix
# or
yarn add mnemonix
```

---

## 📣 Logger

Mnemonix includes a built-in `logger` object with four core methods:

- `info()`
- `warn()`
- `error()`
- `debug()`

These log messages with timestamps, color-coded levels, and clickable file references. You can pass one or two values to each method — the first is the main message (string, object, or error), and the second is optional additional data like context or a stack trace.

### ✅ Usage

```ts
import { logger } from 'mnemonix';

// Basic usage with one value
logger.info('Server started');
logger.warn('Low disk space');
logger.error(new Error('Failed to connect'));
logger.debug('Debugging mode enabled');

// You can also pass a second value (object, error, metadata, etc.)
logger.info('User login attempt', { userId: 123 });
logger.warn('Missing field', { field: 'email' });
logger.error('Unhandled exception occurred', new Error('Oops'));
logger.debug('Payload received', { body: req.body });
```

### 🖨️ Example Output

> 💡 In supported terminals (like VSCode or iTerm2), the file name (e.g. `index.ts`) is clickable — clicking it opens the source log line in your editor.

```ts
logger.info('User login successful');
// 2025-06-24T11:00:00.123Z [INFO] User login successful (index.ts)
```

```ts
logger.warn('Missing field in request', { field: 'email' });
// 2025-06-24T11:00:01.456Z [WARN] Missing field in request (index.ts)
// { field: 'email' }
```

```ts
logger.error('Database error occurred', new Error('Connection timeout'));
// 2025-06-24T11:00:02.789Z [ERROR] Database error occurred (index.ts)
// Error: Connection timeout
//     at connectToDatabase (/app/db.ts:42:13)
//     at handleRequest (/app/index.ts:10:5)
```

### 📜 API

```ts
logger.info(value1: any, value2?: any): void
logger.warn(value1: any, value2?: any): void
logger.error(value1: any, value2?: any): void
logger.debug(value1: any, value2?: any): void
```

- `value1`: The **main message**, can be a `string`, `object`, or even an `Error`.
- `value2` *(optional)*: Any **additional data** you want to log (object, error, metadata, etc).
- Both values are passed through to `console.log`/`console.error` with formatting and stack awareness.

---

## ⏱️ Timer Utility

Measure and log how long a function (sync or async) takes to run — with file trace context.

### ✅ Usage

```ts
import { timer } from 'mnemonix';

await timer('Load users', async () => {
	await new Promise((res) => setTimeout(res, 200));
});

timer('Heavy computation', () => {
	for (let i = 0; i < 1e6; i++) {}
});
```

### 🖨️ Example Output

```bash
2025-06-24T12:05:00.123Z [INFO] Load users took 201ms
2025-06-24T12:05:00.456Z [INFO] Heavy computation took 18ms
```

- Works with both async and sync functions.
- Prints a stack trace if the function throws.

---

## 📁 File Structure Insight

Mnemonix uses `Error.captureStackTrace` to find the file that called the logger — helping you debug faster by showing exactly where each log originated.

---

## 🪪 License

MIT © 2025