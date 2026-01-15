import { getTimestamp, LogLevel, formatFileDisplay } from './Formatter.js';
import { getStackDetails } from './Stack.js';
import chalk from 'chalk';

interface Breadcrumb {
    message: string;
    category?: string;
    timestamp: string;
    level: LogLevel;
    display: string;
}

const MAX_BREADCRUMBS = 50;
const breadcrumbs: Breadcrumb[] = [];

export const addBreadcrumb = (message: string, category?: string) => {
    const crumb: Breadcrumb = {
        message,
        category,
        timestamp: getTimestamp(),
        level: 'debug',
        display: getStackDetails(-1).display,
    };

    if (breadcrumbs.length >= MAX_BREADCRUMBS) {
        breadcrumbs.shift();
    }
    breadcrumbs.push(crumb);
};

export const flushBreadcrumbs = () => {
    if (breadcrumbs.length === 0) return;

    console.log(chalk.gray('\n--- Breadcrumb History ---'));
    breadcrumbs.forEach((crumb) => {
        const cat = crumb.category ? chalk.cyan(`[${crumb.category}]`) : '';
        console.log(
            `${crumb.timestamp} ${chalk.magenta('[TRACE]')} ${cat} ${crumb.message} ${formatFileDisplay(crumb.display)}`,
        );
    });
    console.log(chalk.gray('--- End History ---\n'));

    // Clear after flushing (optional, but good for reducing noise)
    breadcrumbs.length = 0;
};

// Auto-hook into Logger?
// Ideally, the user connects this manually or we expose a helper 'trace' level.
