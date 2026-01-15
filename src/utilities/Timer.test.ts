import { describe, it, expect, vi } from 'vitest';
import { timer } from './Timer.js';

describe('Timer', () => {
    it('should measure async function duration', async () => {
        const consoleSpy = vi
            .spyOn(console, 'log')
            .mockImplementation(() => {});

        const result = await timer('Test Async', async () => {
            await new Promise((resolve) => setTimeout(resolve, 10));
            return 'success';
        });

        expect(result).toBe('success');
        expect(consoleSpy).toHaveBeenCalledWith(
            expect.stringContaining('[INFO] Test Async took'),
        );

        consoleSpy.mockRestore();
    });

    it('should measure sync function duration', async () => {
        const consoleSpy = vi
            .spyOn(console, 'log')
            .mockImplementation(() => {});

        const result = await timer('Test Sync', () => {
            return 'sync-success';
        });

        expect(result).toBe('sync-success');
        expect(consoleSpy).toHaveBeenCalledWith(
            expect.stringContaining('[INFO] Test Sync took'),
        );

        consoleSpy.mockRestore();
    });

    it('should log error when function fails', async () => {
        const consoleSpy = vi
            .spyOn(console, 'error')
            .mockImplementation(() => {});
        const error = new Error('Fail');

        await expect(
            timer('Test Error', async () => {
                throw error;
            }),
        ).rejects.toThrow('Fail');

        expect(consoleSpy).toHaveBeenCalledWith(
            expect.stringContaining('[ERROR] Test Error failed after'),
        );

        consoleSpy.mockRestore();
    });
});
