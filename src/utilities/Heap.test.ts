import { describe, it, expect, vi } from 'vitest';
import { heapSnapshot, heapCheck } from './Heap.js';

describe('Heap', () => {
    it('should log current snapshot', () => {
        const consoleSpy = vi
            .spyOn(console, 'log')
            .mockImplementation(() => {});

        const usage = heapSnapshot('Test Snap');

        expect(usage).toBeGreaterThan(0);
        expect(consoleSpy).toHaveBeenCalledWith(
            expect.stringContaining('[MEMORY] Test Snap'),
        );

        consoleSpy.mockRestore();
    });

    it('should measure memory diff in heapCheck', async () => {
        const consoleSpy = vi
            .spyOn(console, 'log')
            .mockImplementation(() => {});

        await heapCheck('Allocation Test', () => {
            // Allocate some memory
            const arr = new Array(10000).fill('test');
            return arr.length;
        });

        expect(consoleSpy).toHaveBeenCalledWith(
            expect.stringContaining('[MEMORY] Allocation Test'),
        );
        // We can't easily assert the exact diff because GC is unpredictable,
        // but we verify the log format contains the heap usage.

        consoleSpy.mockRestore();
    });
});
