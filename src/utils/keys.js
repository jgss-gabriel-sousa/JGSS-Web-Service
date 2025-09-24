const crypto = require("crypto");

const KEY_PREFIX = process.env.KEY_PREFIX;
const NUMBER_OF_VALID_KEYS = process.env.NUMBER_OF_VALID_KEYS;

const validKeys = {};

function generateKey(index) {
    const md5 = crypto.createHash("md5");
    md5.update(`${KEY_PREFIX}${index}`, "utf-8");

    let key = md5.digest("hex").match(/.{1,4}/g).join("-").toUpperCase();
    return key;
}

function validateKey(key) {
    return validKeys.hasOwnProperty(key);
}

function genValidKeys() {
  for (let i = 0; i < NUMBER_OF_VALID_KEYS; i++) {
        const key = generateKey(i);
        validKeys[key] = {
            key,
            timesUsed: 0,
            lastTimeUsed: 0,
        };
    }
}

module.exports = { generateKey, validateKey, genValidKeys, validKeys };
