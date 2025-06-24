import chalk from 'chalk';

function logFromTimer(
    level: 'info' | 'error',
    message: string,
    err?: Error
) {
    const time = new Date().toISOString();
    const prefix = level === 'info'
        ? chalk.blueBright('[INFO]')
        : chalk.red('[ERROR]');

    const errorDetails = err?.stack ? `\n${chalk.gray(err.stack)}` : '';

    const formatted = `${chalk.gray(time)} ${prefix} ${message} ${errorDetails}`;

    if (level === 'info') {
        console.log(formatted);
    } else {
        console.error(formatted);
    }
}

export async function timer<T>(
    label: string,
    fn: () => Promise<T> | T
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

        logFromTimer('error', `${label} failed after ${duration}ms`, err as Error);
        throw err;
    }
}