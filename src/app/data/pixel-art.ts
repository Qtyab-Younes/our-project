import { Colour, coulourToHex } from "./Colour";

type PixelArtRow = readonly Colour[];
export type PixelArt = readonly PixelArtRow[];

type PixelArtHexRow = readonly string[];
export type PixelArtHex = readonly PixelArtHexRow[];

export function createPixelArtCanvas(width: number, height: number, colour: Colour): PixelArt {
    const row: PixelArtRow = Array.from({ length: width }, () => colour );
    return Array.from({ length: height }, () => [...row]);
}

export function changeColor(pixelArt: PixelArt, line: number, column: number, color: Colour): PixelArt {
    return pixelArt.map(
        (row, r) => r !== line ? row : row.map(
            (pixel, col) => col !== column ? pixel : color
        )
    );
}

export function pixelArtToHex(pixelArt: PixelArt): PixelArtHex {
    let ret = pixelArt.map( (row) => row.map( (e) => coulourToHex(e) ));
    return ret;
}