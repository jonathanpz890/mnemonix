import { getTimestamp, getLevelPrefix, formatBytes, formatFileDisplay } from './Formatter.js';
import { getStackDetails } from './Stack.js';
import chalk from 'chalk';

function logHeap(message: string, bytes: number, diff?: number) {
    const time = getTimestamp();
    const prefix = getLevelPrefix('info'); // Always info for memory stats usually?
    const memoryTag = chalk.cyan('[MEMORY]');

    const formattedBytes = chalk.yellow(formatBytes(bytes));
    let diffString = '';

    if (diff !== undefined) {
        const sign = diff > 0 ? '+' : '';
        const color =
            diff > 0 ? chalk.red : diff < 0 ? chalk.green : chalk.gray;
        diffString = color(` (${sign}${formatBytes(diff)})`);
    }

    const { display } = getStackDetails();

    console.log(
        `${time} ${prefix} ${memoryTag} ${message}: ${formattedBytes}${diffString} ${formatFileDisplay(display)}`,
    );
}

/**
 * Logs the current heap usage.
 * @param label Optional label to identify the snapshot
 * @returns The current heapUsed in bytes
 */
export const heapSnapshot = (label: string = 'Snapshot'): number => {
    const used = process.memoryUsage().heapUsed;
    logHeap(label, used);
    return used;
};

/**
 * Runs a function and logs the change in heap usage.
 * @param label Label for the measurement
 * @param fn The function to execute
 */
export async function heapCheck<T>(
    label: string,
    fn: () => Promise<T> | T,
): Promise<T> {
    const start = process.memoryUsage().heapUsed;

    const result = await fn();
    const end = process.memoryUsage().heapUsed;
    const diff = end - start;

    logHeap(label, end, diff);
    return result;
}
