import { getTimestamp, getLevelPrefix } from './Formatter.js';
import chalk from 'chalk';

let timerId: NodeJS.Timeout | null = null;
const CHECK_INTERVAL = 1000; // Check every second
const THRESHOLD = 100; // If blocked by more than 100ms extra, warn

export const startHeartbeat = () => {
    if (timerId) return; // Already running

    let lastCheck = process.hrtime.bigint();

    timerId = setInterval(() => {
        const now = process.hrtime.bigint();
        // Difference in milliseconds
        const delta = Number(now - lastCheck) / 1_000_000;

        const lag = delta - CHECK_INTERVAL;

        if (lag > THRESHOLD) {
            const time = getTimestamp();
            const prefix = getLevelPrefix('warn');
            const alert = chalk.redBright(`[🔥 EVENT LOOP BLOCKED]`);
            const details = chalk.yellow(`delayed by ${Math.round(lag)}ms`);

            console.warn(`${time} ${prefix} ${alert} ${details}`);
        }

        lastCheck = now;
    }, CHECK_INTERVAL);

    // Don't keep process alive just for this
    timerId.unref();
};

export const stopHeartbeat = () => {
    if (timerId) {
        clearInterval(timerId);
        timerId = null;
    }
};
