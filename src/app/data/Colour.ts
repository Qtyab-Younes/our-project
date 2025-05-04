/**
 * Interface for a colour object
 * Each color component is an integer between 0 and 255
 */
export interface Colour {
    readonly red: number;
    readonly green: number;
    readonly blue: number;
}

export function coulourToHex(c: Colour): string {
    return `#${c.red.toString(16).padStart(2, '0')}${c.green.toString(16).padStart(2, '0')}${c.blue.toString(16).padStart(2, '0')}`;
}

export function hexToColour(hex: string): Colour {
    return {
        red: parseInt(hex.substring(1, 3), 16),
        green: parseInt(hex.substring(3, 5), 16),
        blue: parseInt(hex.substring(5, 7), 16)
    };
}
