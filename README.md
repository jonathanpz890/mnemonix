# 🧠 Mnemonix

A light-weight utility toolkit for Node.js and TypeScript, focused on smart, developer-friendly logging and diagnostics.  
Mnemonix gives you beautiful logs, stack-aware insights, execution timers, memory tracking, and event loop monitoring — with zero setup.

✅ **Universal Compatibility**: Works seamlessly with both **CommonJS** (`require`) and **ES Modules** (`import`).

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

These log messages with timestamps, color-coded levels, and clickable file references.

### ✅ Usage

```ts
import { logger } from 'mnemonix';

// Basic usage
logger.info('Server started');

// Context and Metadata
logger.warn('Missing field', { field: 'email' });
logger.error('Database error', new Error('Connection failed'));
```

### 🖨️ Example Output

> 💡 In supported terminals (like VSCode or iTerm2), the file name is clickable — taking you straight to the code.

```bash
2026-06-24T11:00:00.123Z [INFO] Server started (index.ts)
2026-06-24T11:00:01.456Z [WARN] Missing field (user.ts)
{ field: 'email' }
```

---

## ⏱️ Timer

Measure and log how long a function (sync or async) takes to run.

### ✅ Usage

```ts
import { timer } from 'mnemonix';

// Async functions
await timer('Load users', async () => {
    await db.fetchUsers();
});

// Sync functions
timer('Complex Math', () => {
    heavyComputation();
});
```

### 🖨️ Example Output
```bash
2026-06-24T12:05:00.123Z [INFO] Load users took 201ms
```

---

## 💾 Memory Utilities (Heap)

Monitor your application's memory usage in real-time. Detect leaks, optimize heavy operations, and keep track of your heap size with precision.

### `heapSnapshot()`
Instantly log the current heap usage of your application.

```ts
import { heapSnapshot } from 'mnemonix';

heapSnapshot('Initialization');
```
Output:
```bash
2026-06-24T12:00:00.000Z [INFO] [MEMORY] Initialization: 25.4 MB
```

### `heapCheck()`
Measure the **difference** in memory allocation caused by a function. Great for finding memory leaks or optimizing heavy processes.

```ts
import { heapCheck } from 'mnemonix';

await heapCheck('Process Huge Data', async () => {
    const data = new Array(1_000_000).fill('test');
});
```
Output:
```bash
2026-06-24T12:00:05.000Z [INFO] [MEMORY] Process Huge Data: 35.8 MB (+10.4 MB)
```
*Displays the final memory usage and the delta (e.g., `+10.4 MB` in red, or `-2 KB` in green).*

---

## 🍞 Breadcrumbs (Trace History)

Keep a running history of the last 50 log events in memory without spamming your console. When an error occurs, flush the breadcrumbs to see exactly what led up to the crash.

### ✅ Usage

```ts
import { addBreadcrumb, flushBreadcrumbs } from 'mnemonix';

// Log internal steps that you don't want to see unless something breaks
addBreadcrumb('User clicked checkout');
addBreadcrumb('Validating cart items', 'CART');

try {
    processOrder();
} catch (err) {
    console.error('Order failed!');
    // Print the history leading up to the error
    flushBreadcrumbs();
}
```

---

## 💓 Heartbeat (Event Loop Monitor)

Node.js is single-threaded. If a heavy calculation blocks the event loop, your server freezes. The Heartbeat monitor detects these freezes and warns you.

### ✅ Usage

```ts
import { startHeartbeat } from 'mnemonix';

// Start monitoring (best done at app startup)
startHeartbeat();

// If the event loop is blocked for >100ms, you'll see:
// [WARN] [🔥 EVENT LOOP BLOCKED] delayed by 450ms
```

---

## 📁 File Structure Insight

Mnemonix uses `Error.captureStackTrace` to find the file that called the tool — helping you debug faster by showing exactly where each log or measurement originated.

---

## 🪪 License

MIT © 2026