import chalk from 'chalk';

export type LogLevel = 'info' | 'warn' | 'error' | 'debug';

export const getTimestamp = (): string => {
    return chalk.gray(new Date().toISOString());
};

export const getLevelPrefix = (level: LogLevel): string => {
    switch (level) {
        case 'info':
            return chalk.blueBright('[INFO]');
        case 'warn':
            return chalk.yellow('[WARN]');
        case 'error':
            return chalk.red('[ERROR]');
        case 'debug':
            return chalk.magenta('[DEBUG]');
    }
};

export const formatError = (err?: Error): string => {
    return err?.stack ? `\n${chalk.gray(err.stack)}` : '';
};

export const formatFileDisplay = (display: string): string => {
    return chalk.gray(`(${chalk.underline(display)})`);
};

export const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(Math.abs(bytes)) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};
