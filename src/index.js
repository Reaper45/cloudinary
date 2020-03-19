
/** @module cloudinary/upload */
import cryptoJS from  "crypto-js";
import { config } from "dotenv";
import fetch from "node-fetch"

config();

/**
 * Upload file to cloudinary storage
 * 
 * @param {File} file
 * @returns {Promise}
 */
const upload = (file) => {
  const name = process.env.CLOUDINARY_CLOUD_NAME;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  const apiKey = process.env.CLOUDINARY_API_KEY;

  const timestamp = ((Date.now() / 1000) | 0).toString();
  const hashString = `timestamp=${timestamp}${apiSecret}`;
  const signature = cryptoJS.SHA1(hashString).toString();
  const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${name}/image/upload`;

  const data = new FormData();

  data.append("file", file);
  data.append("timestamp", timestamp);
  data.append("api_key", apiKey);
  data.append("signature", signature);

  return fetch(UPLOAD_URL, {
    method: "POST",
    body: data
  });
};

module.exports = {
  upload
}