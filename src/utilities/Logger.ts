import chalk from 'chalk';

export type LogLevel = 'info' | 'warn' | 'error' | 'debug';

interface StackDetails {
	fullPath: string;
	display: string;
}

const getStackDetails = (): StackDetails => {
	const obj = {} as { stack?: string };

	if (typeof (Error as any).captureStackTrace === 'function') {
		(Error as any).captureStackTrace(obj, getStackDetails);
	} else {
		obj.stack = new Error().stack;
	}

	const stackLines = obj.stack?.split('\n') ?? [];
	const callerLine = stackLines[3] ?? '';
	const match = callerLine.match(/\(([^)]+)\)/);
	const fullPath = match ? match[1] : callerLine.trim();

	const parts = fullPath.split('/');
	const last = parts.pop() ?? '';

	return {
		fullPath,
		display: last,
	}
};

const formatMessage = (
	level: LogLevel,
	message: string,
	err?: Error
): string => {
	const time = new Date().toISOString();
	const { fullPath, display } = getStackDetails();

	let prefix: string;
	switch (level) {
		case 'info':
			prefix = chalk.blueBright('[INFO]');
			break;
		case 'warn':
			prefix = chalk.yellow('[WARN]');
			break;
		case 'error':
			prefix = chalk.red('[ERROR]');
			break;
		case 'debug':
			prefix = chalk.magenta('[DEBUG]');
			break;
	}

	const errorDetails = err?.stack ? `\n${chalk.gray(err.stack)}` : '';

	return `${chalk.gray(time)} ${prefix} ${message} ${chalk.gray(
		`(${chalk.underline(display)})`
	)}${errorDetails}`;
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