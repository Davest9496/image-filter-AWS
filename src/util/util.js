import fs from "fs";
import Jimp from "jimp";

// filterImageFromURL
// helper function to download, filter, and save the filtered image locally
// returns the absolute path to the local image
// INPUTS
//    inputURL: string - a publicly accessible url to an image file
// RETURNS
//    an absolute path to a filtered image locally saved file
export async function filterImageFromURL(inputURL) {
  return new Promise(async (resolve, reject) => {
    try {
      // Configure options with longer timeout and accept headers
      const options = {
        headers: {
          "User-Agent": "Mozilla/5.0 (Node.js)",
          Accept: "image/*",
        },
        timeout: 15000, // 15 seconds timeout
      };

      console.log(`Attempting to read image from: ${inputURL}`);

      // Use Jimp's built-in read method with our options
      const photo = await Jimp.read({
        url: inputURL,
        ...options,
      });

      if (!photo) {
        throw new Error("Failed to load image");
      }

      const outpath =
        "/tmp/filtered." + Math.floor(Math.random() * 2000) + ".jpg";
      console.log(`Processing image to: ${outpath}`);

      await photo
        .resize(256, 256) // resize
        .quality(60) // set JPEG quality
        .greyscale() // set greyscale
        .writeAsync(outpath); // Use writeAsync instead of write with callback

      console.log(`Image successfully processed`);
      resolve(outpath);
    } catch (error) {
      console.error(`Error in filterImageFromURL: ${error.message}`);
      reject(error);
    }
  });
}

// deleteLocalFiles
// helper function to delete files on the local disk
// useful to cleanup after tasks
// INPUTS
//    files: Array<string> an array of absolute paths to files
export async function deleteLocalFiles(files) {
  for (let file of files) {
    try {
      fs.unlinkSync(file);
      console.log(`Deleted file: ${file}`);
    } catch (error) {
      console.error(`Error deleting file ${file}: ${error.message}`);
    }
  }
}
