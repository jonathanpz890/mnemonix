export interface StackDetails {
    fullPath: string;
    display: string;
}

export const getStackDetails = (depthOffset: number = 0): StackDetails => {
    const obj = {} as { stack?: string };

    if (typeof (Error as any).captureStackTrace === 'function') {
        // Pass this function to limit the stack trace, but we need to capture enough
        (Error as any).captureStackTrace(obj, getStackDetails);
    } else {
        obj.stack = new Error().stack;
    }

    const stackLines = obj.stack?.split('\n') ?? [];

    // The stack line index depends on the environment (V8 vs others) and strict mode
    // Usually:
    // 0: Error
    // 1: getStackDetails
    // 2: caller (e.g. formatMessage)
    // 3: caller's caller (e.g. logger.info)
    // 4: The actual user code

    // Default to index 3 in the local Logger.ts implementation, 
    // but if we move this to a utility, "caller" is the utility function using this.

    // Let's assume usage:
    // User -> Tool (e.g. timer) -> LogHelper -> getStackDetails

    // We want 'User'.

    // By default, target the 4th line (index 3) plus offset
    // Adjust based on observation if needed.
    const targetIndex = 3 + depthOffset;

    const callerLine = stackLines[targetIndex] ?? '';
    const match = callerLine.match(/\(([^)]+)\)/);
    const fullPath = match ? match[1] : callerLine.trim();

    const parts = fullPath.split('/');
    const last = parts.pop() ?? '';

    return {
        fullPath,
        display: last,
    };
};
