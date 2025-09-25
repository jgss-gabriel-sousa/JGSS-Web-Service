const express = require("express");
const fs = require("fs");
const path = require("path");
const { readJSONFile } = require("../utils/fileUtils");

const router = express.Router();

const HnMdirectories = [
    "data/hnm/general/",
    "data/hnm/general/classes/",
    "data/hnm/bestiary/",
    "data/hnm/spells/",
    "data/hnm/items/",
    "data/hnm/items/weapons",
];

// Lista todos os arquivos
router.get("/", (req, res) => {
    const files = {};

    try {
        for (const dir of HnMdirectories) {
        const dirFiles = fs.readdirSync(dir).filter(f => f.endsWith(".json"));
        const trimmedFiles = dirFiles.map(f => f.slice(0, -5)).sort();

        files[dir.slice(5, -1)] = trimmedFiles;
        }
        res.json(files);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erro ao listar arquivos" });
    }
});

// Query por nome
router.get("/query-:name", (req, res) => {
    const name = req.params.name.toLowerCase() + ".json";
    let found = false;

    for (const dir of HnMdirectories) {
        const folderFiles = fs.readdirSync(dir);
        if (folderFiles.includes(name)) {
        const filePath = path.join(process.cwd(), dir, name);
        found = true;
        return res.sendFile(filePath);
        }
    }

    if (!found) {
        res.status(404).json({ error: `Arquivo não encontrado: ${name}` });
    }
});

// Busca por tipo/arquivo
router.get("/:dataType/:jsonFile", async (req, res) => {
    const fileName = req.params.jsonFile + ".json";
    const dataType = req.params.dataType;
    const filePath = path.join(process.cwd(), "data", dataType, fileName);

    try {
        const data = await readJSONFile(filePath);
        res.json(data);
    } catch {
        res.status(404).json({ error: `Arquivo não encontrado: ${filePath}` });
    }
});

module.exports = router;
