import {existsSync, lstatSync, mkdirSync, readdirSync} from "fs";
import sharp from "sharp";

export function isDir(path: string): boolean {
    return existsSync(path) && lstatSync(path).isDirectory();
}

export function createNewImagePath(image: string): string {
    const imageLastPoint = image.lastIndexOf('.');
    return `${image.slice(0, imageLastPoint)}.webp`
}

export async function processImages(input: string) {
    const images: string[] = readdirSync(input);
    if (!isDir('./output')) {
        mkdirSync('./output', {recursive: true});
    }
    for (const image of images) {
        console.info(`Processing '${image}'`)
        const newImage = createNewImagePath(image);
        await sharp(`${input}/${image}`).webp({
            quality: 100,
            alphaQuality: 100,
            lossless: true,
            smartSubsample: true,
            effort: 6
        })
            .toFile(`./output/${newImage}`)
    }
}