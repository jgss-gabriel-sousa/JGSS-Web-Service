const fs = require("fs");

async function readJSONFile(filePath) {
    try {
        const data = await fs.promises.readFile(filePath);
        return JSON.parse(data);
    } catch (err) {
        console.error(`❌ Error reading file: ${filePath}`);
        throw err;
    }
}

module.exports = { readJSONFile };
