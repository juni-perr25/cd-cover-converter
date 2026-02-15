const sharp = require('sharp');

/**
 * Composites uploaded images with a background template using darken blending mode.
 * @param {string} imagePath - The path to the uploaded image.
 * @param {string} templatePath - The path to the background template.
 * @param {string} outputPath - The path where the output image will be saved.
 */
async function processImage(imagePath, templatePath, outputPath) {
    try {
        const image = sharp(imagePath);
        const template = sharp(templatePath);

        const metadata = await image.metadata();

        // Ensure the template is the same size as the image
        const resizedTemplate = template.resize(metadata.width, metadata.height);

        await image
            .composite([{ input: await resizedTemplate.toBuffer(), blend: 'darken' }])
            .toFile(outputPath);

        console.log('Image processed and saved to', outputPath);
    } catch (error) {
        console.error('Error processing image:', error);
    }
}

module.exports = processImage;