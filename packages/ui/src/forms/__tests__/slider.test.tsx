import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Slider } from '../slider';

global.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
};

describe('Slider Accessibility Navigation Bounds', () => {

    it('should bootstrap complex nested radix primitives exactly synchronously safely', () => {
        render(<Slider aria-label="Volume Control" defaultValue={[50]} max={100} step={1} />);
        const sliderTrack = screen.getByRole('slider');
        expect(sliderTrack).toBeInTheDocument();
        expect(sliderTrack).toHaveAttribute('aria-valuenow', '50');
    });

    it('should assert native keyboard navigation boundary translations reliably dynamically', async () => {
        const handleChange = vi.fn();
        const user = userEvent.setup();

        render(
            <Slider 
                aria-label="Brightness" 
                defaultValue={[20]} 
                max={100} 
                step={5} 
                onValueChange={handleChange}
            />
        );
        
        const slider = screen.getByRole('slider');
        await user.tab();
        expect(slider).toHaveFocus();

        // Increment structurally using up arrow
        await user.keyboard('[ArrowUp]');
        expect(handleChange).toHaveBeenCalledWith([25]);

        // Decrement using left arrow accurately mapping Radix bounds natively 
        await user.keyboard('[ArrowLeft]');
        expect(handleChange).toHaveBeenCalledWith([20]);
    });

    describe('keyboard increment and decrement navigation', () => {
        it('increments value with ArrowRight and ArrowUp', async () => {
            const handleChange = vi.fn();
            const user = userEvent.setup();

            render(
                <Slider
                    aria-label="Volume"
                    defaultValue={[50]}
                    max={100}
                    step={1}
                    onValueChange={handleChange}
                />
            );

            const slider = screen.getByRole('slider');
            slider.focus();
            expect(slider).toHaveFocus();

            await user.keyboard('[ArrowRight]');
            expect(handleChange).toHaveBeenCalledWith([51]);

            await user.keyboard('[ArrowUp]');
            expect(handleChange).toHaveBeenCalledWith([52]);
        });

        it('decrements value with ArrowLeft and ArrowDown', async () => {
            const handleChange = vi.fn();
            const user = userEvent.setup();

            render(
                <Slider
                    aria-label="Volume"
                    defaultValue={[50]}
                    max={100}
                    step={1}
                    onValueChange={handleChange}
                />
            );

            const slider = screen.getByRole('slider');
            slider.focus();
            expect(slider).toHaveFocus();

            await user.keyboard('[ArrowLeft]');
            expect(handleChange).toHaveBeenCalledWith([49]);

            await user.keyboard('[ArrowDown]');
            expect(handleChange).toHaveBeenCalledWith([48]);
        });
    });

    describe('readOnly and disabled states', () => {
        it('respects disabled state and prevents keyboard interactions', async () => {
            const handleChange = vi.fn();
            const user = userEvent.setup();

            render(
                <Slider
                    aria-label="Disabled Slider"
                    defaultValue={[40]}
                    disabled={true}
                    onValueChange={handleChange}
                />
            );

            const slider = screen.getByRole('slider');
            expect(slider).toHaveAttribute('data-disabled');

            // Attempt keyboard navigation
            await user.keyboard('[ArrowRight]');
            await user.keyboard('[ArrowUp]');
            expect(handleChange).not.toHaveBeenCalled();
        });

        it('respects readOnly state, sets aria-readonly, and prevents value changes via keyboard', async () => {
            const handleChange = vi.fn();
            const user = userEvent.setup();

            render(
                <Slider
                    aria-label="Read Only Slider"
                    defaultValue={[40]}
                    readOnly={true}
                    onValueChange={handleChange}
                />
            );

            const slider = screen.getByRole('slider');
            expect(slider).toHaveAttribute('aria-readonly', 'true');

            slider.focus();
            expect(slider).toHaveFocus();

            await user.keyboard('[ArrowRight]');
            await user.keyboard('[ArrowUp]');
            await user.keyboard('[ArrowLeft]');
            await user.keyboard('[ArrowDown]');

            expect(handleChange).not.toHaveBeenCalled();
            expect(slider).toHaveAttribute('aria-valuenow', '40');
        });
    });

    describe('min and max clamping', () => {
        it('clamps value at max bound when attempting to increment past maximum', async () => {
            const handleChange = vi.fn();
            const user = userEvent.setup();

            render(
                <Slider
                    aria-label="Clamped Max Slider"
                    defaultValue={[100]}
                    min={0}
                    max={100}
                    step={5}
                    onValueChange={handleChange}
                />
            );

            const slider = screen.getByRole('slider');
            slider.focus();
            expect(slider).toHaveAttribute('aria-valuenow', '100');

            await user.keyboard('[ArrowRight]');
            await user.keyboard('[ArrowUp]');

            expect(handleChange).not.toHaveBeenCalled();
            expect(slider).toHaveAttribute('aria-valuenow', '100');
        });

        it('clamps value at min bound when attempting to decrement below minimum', async () => {
            const handleChange = vi.fn();
            const user = userEvent.setup();

            render(
                <Slider
                    aria-label="Clamped Min Slider"
                    defaultValue={[10]}
                    min={10}
                    max={50}
                    step={2}
                    onValueChange={handleChange}
                />
            );

            const slider = screen.getByRole('slider');
            slider.focus();
            expect(slider).toHaveAttribute('aria-valuenow', '10');

            await user.keyboard('[ArrowLeft]');
            await user.keyboard('[ArrowDown]');

            expect(handleChange).not.toHaveBeenCalled();
            expect(slider).toHaveAttribute('aria-valuenow', '10');
        });
    });
});
