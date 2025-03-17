const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');
const toIco = require('to-ico');

const sizes = {
  'favicon-16x16.png': 16,
  'favicon-32x32.png': 32,
  'favicon-48x48.png': 48,
  'apple-touch-icon.png': 180,
  'icon-192.png': 192,
  'icon-512.png': 512,
};

async function generateFavicons() {
  const inputFile = path.join(__dirname, '../public/favicons/icon.svg');
  const outputDir = path.join(__dirname, '../public/favicons');

  try {
    // Ensure output directory exists
    await fs.mkdir(outputDir, { recursive: true });

    // Array to store PNG buffers for ICO generation
    const icoBuffers = [];

    // Generate each size
    for (const [filename, size] of Object.entries(sizes)) {
      const outputFile = path.join(outputDir, filename);

      const pngBuffer = await sharp(inputFile)
        .resize(size, size)
        .png()
        .toBuffer();

      // Save the PNG file
      await fs.writeFile(outputFile, pngBuffer);
      console.log(`Generated ${filename} (${size}x${size})`);

      // Store buffers needed for ICO
      if (size <= 48) {
        icoBuffers.push(pngBuffer);
      }
    }

    // Generate favicon.ico with multiple sizes
    const icoBuffer = await toIco(icoBuffers);
    await fs.writeFile(path.join(outputDir, 'favicon.ico'), icoBuffer);
    console.log('Generated favicon.ico with multiple sizes');

    console.log('All favicons generated successfully!');
  } catch (error) {
    console.error('Error generating favicons:', error);
    process.exit(1);
  }
}

generateFavicons();
