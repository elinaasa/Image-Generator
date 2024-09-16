import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

export const generateImage = async (prompt: string, filename: string) => {
  const apiUrl = `${process.env.OPENAI_API_URL}/v1/images/generations`; // Ensure this is the correct endpoint

  if (!apiUrl) {
    throw new Error('API URL is missing in environment variables');
  }

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: prompt,
        n: 1,
        size: '1024x1024', // Thumbnail size
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to generate image: ${errorData.error.message}`);
    }

    const data = await response.json();
    const imageUrl = data.data[0].url;

    // Download the image
    const imageResponse = await fetch(imageUrl);

    if (!imageResponse.ok) {
      throw new Error(`Failed to download image: ${imageResponse.statusText}`);
    }

    const buffer = await imageResponse.buffer();

    // Save the image to a file
    const outputPath = path.join(__dirname, filename);
    fs.writeFileSync(outputPath, buffer);
    console.log(`Image saved to ${outputPath}`);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error('An unknown error occurred');
    }
    throw error; // Re-throw error for further handling
  }
};
