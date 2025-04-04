import express from "express";
import bodyParser from "body-parser";
import fs from "fs";
import { filterImageFromURL, deleteLocalFiles } from "./util/util.js";


// Init the Express application
const app = express();

// Set the network port
const port = process.env.PORT || 8081;

// Use the body parser middleware for post requests
app.use(bodyParser.json());

app.get("/filteredimage", async (req, res) => {
  // 1. Validate the image_url query parameter
  const { image_url } = req.query;

  if (!image_url) {
    return res.status(400).send({ message: "Image URL is required" });
  }

  // Validate URL format
  try {
    const url = new URL(image_url);
    // Check if protocol is http or https
    if (url.protocol !== "http:" && url.protocol !== "https:") {
      return res
        .status(400)
        .send({ message: "URL must use HTTP or HTTPS protocol" });
    }
  } catch (error) {
    return res.status(400).send({ message: "Invalid URL format" });
  }

  try {
    // 2. Call filterImageFromURL to process the image
    const filteredImagePath = await filterImageFromURL(image_url);

    // Check if the file exists before sending
    if (!fs.existsSync(filteredImagePath)) {
      return res.status(422).send({ message: "Failed to process the image" });
    }

    // 3. Send the resulting file in the response with 200 status code
    return res.status(200).sendFile(filteredImagePath, { root: "/" }, (err) => {
      if (err) {
        console.error("Error sending file:", err);
      }

      // 4. Delete the local file after sending the response
      deleteLocalFiles([filteredImagePath]);
    });
  } catch (error) {
    console.error("Error processing image:", error);
    return res.status(422).send({
      message: "Error processing image. Please check the URL and try again.",
      error: error.message,
    });
  }
});

// Test Endpoint
app.get("/test", (req, res) => {
  res.send("Test route works!");
});

// Root Endpoint
// Displays a simple message to the user
app.get("/", async (req, res) => {
  res.send(
    "try GET /filteredimage?image_url={{}} or copy and paste link - http://image-filter.eba-7pbts7vi.eu-west-2.elasticbeanstalk.com/filteredimage?image_url=https://upload.wikimedia.org/wikipedia/commons/b/bd/Golden_tabby_and_white_kitten_n01.jpg"
  );
});

// Start the Server
app.listen(port, () => {
  console.log(`server running http://localhost:${port}`);
  console.log(`press CTRL+C to stop server`);
});
