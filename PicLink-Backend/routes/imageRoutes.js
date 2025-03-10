const express = require("express");
const router = express.Router();
const upload = require("../config/multer");
const githubService = require("../services/githubService");
const fs = require('fs');
const path = require('path');


// Upload image
router.post("/upload", upload.single("image"), async (req, res) => {
    try {
        if(!req.file){
            // console.log("No file uploaded");
            return res.status(400).json({ message: "Please upload an image" });
        }

        // console.log("File uploaded locally: ", req.file.path);

        const filePath = req.file.path;
        const fileName = req.file.filename;

        // console.log(`Attempting to upload ${fileName} to GitHub...`);

        // Upload to GitHub
        const githubResult = await githubService.uploadFileToGithub(filePath, fileName);
        // console.log("GitHub upload successful:", githubResult.content.html_url);

        // Generate CDN URL
        const cdnUrl = githubService.generateCdnUrl(fileName);
        // console.log("Generated CDN URL:", cdnUrl);

        // Clean up - remove local file after sucessful github upload
        fs.unlinkSync(filePath);
        // console.log("Removed local file: ", filePath);

        res.status(200).json({
            success: true,
            file: {
                name: fileName,
                size: req.file.size
            },
            cdnUrl: cdnUrl,
            message: "Image uploaded successfully and received CDN URL",
        });
    }
    catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ error: 'Failed to process upload: ' + error.message });
    }
});

module.exports = router;