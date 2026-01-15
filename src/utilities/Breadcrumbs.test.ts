import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { addBreadcrumb, flushBreadcrumbs } from './Breadcrumbs.js';

describe('Breadcrumbs', () => {
    beforeEach(() => {
        // Clear console spy before each test
        vi.restoreAllMocks();
        // We need a way to clear breadcrumbs or just ensure tests are isolated
        // Since module state is singleton, we might need a clear method or rely on flush
        flushBreadcrumbs();
    });

    it('should store and flush logs', () => {
        const consoleSpy = vi
            .spyOn(console, 'log')
            .mockImplementation(() => {});

        addBreadcrumb('Step 1');
        addBreadcrumb('Step 2', 'AUTH');

        flushBreadcrumbs();

        expect(consoleSpy).toHaveBeenCalledWith(
            expect.stringContaining('Step 1'),
        );
        expect(consoleSpy).toHaveBeenCalledWith(
            expect.stringContaining('[AUTH] Step 2'),
        );
    });

    it('should respect max limit (FIFO)', () => {
        const consoleSpy = vi
            .spyOn(console, 'log')
            .mockImplementation(() => {});

        // Add 55 items (limit is 50)
        for (let i = 0; i < 55; i++) {
            addBreadcrumb(`Log ${i}`);
        }

        flushBreadcrumbs();

        // Should NOT have Log 0 (shifted out)
        expect(consoleSpy).not.toHaveBeenCalledWith(
            expect.stringContaining('Log 0'),
        );
        // Should have Log 54 (newest)
        expect(consoleSpy).toHaveBeenCalledWith(
            expect.stringContaining('Log 54'),
        );
    });
});
