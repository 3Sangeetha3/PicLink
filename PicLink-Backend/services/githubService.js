require("dotenv").config();
const { Octokit } = require("@octokit/rest");
const fs = require("fs");

// GitHub configuration
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_USERNAME = process.env.GITHUB_USERNAME;
const REPO_NAME = process.env.GITHUB_REPO;
const BRANCH = process.env.GITHUB_BRANCH || "main";
const FOLDER_NAME = process.env.GITHUB_FOLDER || "images";

// console.log("GitHub Configuration:");
// console.log(`- Username: ${GITHUB_USERNAME}`);
// console.log(`- Repository: ${REPO_NAME}`);
// console.log(`- Branch: ${BRANCH}`);
// console.log(`- Folder: ${FOLDER_NAME}`);
// console.log(`- Token present: ${GITHUB_TOKEN ? 'Yes' : 'No'}`);

// Initialize Octokit
const octokit = new Octokit({
    auth: GITHUB_TOKEN,
});


// Uploading the file to the github
const uploadFileToGithub = async (filePath, fileName) => {
    try{
        // console.log(`Reading file: ${filePath}`);
        // Read file content
        const content = fs.readFileSync(filePath, { encoding: "base64" });
        // console.log(`File read successfully, size: ${content.length}`);

        // Create a new file (no need to check for duplicates as fileName is unique)
        // console.log(`Creating file in GitHub: ${FOLDER_NAME}/${fileName}`);

        const result = await octokit.repos.createOrUpdateFileContents({
            owner: GITHUB_USERNAME,
            repo: REPO_NAME,
            path: `${FOLDER_NAME}/${fileName}`,
            message: `Upload ${fileName} picture`,
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            },
            content,
            branch: BRANCH,
        });
          
        // console.log(`File uploaded to GitHub: ${FOLDER_NAME}/${fileName}`);
        return result.data;
    }
    catch(error) {
        console.error('GitHub upload error:', error);
        throw new Error('Failed to upload to GitHub: ' + error.message);
    }
};


// Generate CDN URL
const generateCdnUrl = (fileName) => {
    const cdnUrl = `https://cdn.jsdelivr.net/gh/${GITHUB_USERNAME}/${REPO_NAME}@${BRANCH}/${FOLDER_NAME}/${fileName}`;
    // console.log(`Generated CDN URL: ${cdnUrl}`);
    return cdnUrl;
};

module.exports = {
    uploadFileToGithub,
    generateCdnUrl
};