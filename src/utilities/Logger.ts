import {
    getTimestamp,
    getLevelPrefix,
    formatError,
    formatFileDisplay,
    LogLevel,
} from './Formatter.js';



import { getStackDetails } from './Stack.js';

const formatMessage = (
    level: LogLevel,
    message: string,
    err?: Error,
): string => {
    const time = getTimestamp();
    const prefix = getLevelPrefix(level);
    const { display } = getStackDetails();
    const errorDetails = formatError(err);

    return `${time} ${prefix} ${message} ${formatFileDisplay(display)}${errorDetails}`;
};

export const logger: {
    info: (value1: any, value2?: any) => void;
    warn: (value1: any, value2?: any) => void;
    error: (value1: any, value2?: any) => void;
    debug: (value1: any, value2?: any) => void;
} = {
    info: (value1: any, value2?: any): void => {
        console.log(formatMessage('info', value1));
        if (value2) console.log(value2);
    },
    warn: (value1: any, value2?: any): void => {
        console.log(formatMessage('warn', value1));
        if (value2) console.log(value2);
    },
    error: (value1: any, value2?: any): void => {
        console.error(formatMessage('error', value1));
        if (value2) console.error(value2);
    },
    debug: (value1: any, value2?: any): void => {
        console.log(formatMessage('debug', value1));
        if (value2) console.log(value2);
    },
};
