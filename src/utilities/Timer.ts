import { getTimestamp, getLevelPrefix, formatError, formatFileDisplay } from './Formatter.js'; /**/
import { getStackDetails } from './Stack.js';

function logFromTimer(level: 'info' | 'error', message: string, err?: Error) {
    const time = getTimestamp();
    const prefix = getLevelPrefix(level);
    const errorDetails = formatError(err);

    const { display } = getStackDetails();
    const formatted = `${time} ${prefix} ${message} ${formatFileDisplay(display)}${errorDetails}`;

    if (level === 'info') {
        console.log(formatted);
    } else {
        console.error(formatted);
    }
}

export async function timer<T>(
    label: string,
    fn: () => Promise<T> | T,
): Promise<T> {
    const start = performance.now();

    try {
        const result = await fn();
        const end = performance.now();
        const duration = Math.round(end - start);

        logFromTimer('info', `${label} took ${duration}ms`);
        return result;
    } catch (err) {
        const end = performance.now();
        const duration = Math.round(end - start);

        logFromTimer(
            'error',
            `${label} failed after ${duration}ms`,
            err as Error,
        );
        throw err;
    }
}
