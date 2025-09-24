const express = require("express");
const { generateKey, validateKey, genValidKeys, validKeys } = require("../utils/keys");
const { roughSizeOfObject } = require("../utils/memory");

const router = express.Router();

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const NUMBER_OF_VALID_KEYS = process.env.NUMBER_OF_VALID_KEYS;

const startTime = Date.now();
let genValidKeysTime;

// Inicializa chaves
genValidKeys();
genValidKeysTime = Date.now();

// Rotas
router.post("/generate-key", (req, res) => {
    const { password, index } = req.body;

    if (password !== ADMIN_PASSWORD) {
        return res.status(401).json({ error: "Senha de Administrador Inválida" });
    }

    try {
        res.json({ key: generateKey(index) });
    } catch (err) {
        res.status(500).json({ error: "Erro interno ao gerar chave" });
    }
});

router.post("/validate-key", (req, res) => {
    const { key } = req.body;

    try {
        if (!validateKey(key)) {
        return res.status(401).json({ error: "Key inválida" });
        }

        validKeys[key].timesUsed++;
        validKeys[key].lastTimeUsed = Date.now();

        res.json(validKeys[key]);
    } catch (err) {
        res.status(500).json({ error: "Erro interno ao validar chave" });
    }
});

router.get("/stats", (req, res) => {
    const sizeOfValidKeysOBJ = roughSizeOfObject(validKeys);

    res.json({
        serverStarted: new Date(startTime).toISOString(),
        uptimeMs: Date.now() - startTime,
        initTimeMs: genValidKeysTime - startTime,
        objectSizeMB: (sizeOfValidKeysOBJ / 1024000).toFixed(2),
        totalKeys: Object.keys(validKeys).length,
    });
});

module.exports = router;
