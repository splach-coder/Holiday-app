const express = require("express");
const axios = require("axios");
const getSecret = require("../utils/getSecret");

const router = express.Router();

router.all("/fetch-data", async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const apiKey = await getSecret();
    if (!apiKey) {
      return res.status(500).json({ message: "Failed to retrieve API key" });
    }

    const url = "https://functionapp-python-pdf.azurewebsites.net/api/holidays"; // Replace with your base API URL

    const axiosConfig = {
      method: req.method,
      url,
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    };

    // If it's a POST/PUT request, attach the body
    if (req.method === "POST" || req.method === "PUT") {
      axiosConfig.data = req.body;
    }

    const response = await axios(axiosConfig);
    res.json({ success: true, data: response.data });
  } catch (error) {
    console.error("Error fetching API data:", error);
    res.status(500).json({ message: "Error fetching API data" });
  }
});

module.exports = router;