const utf8 = require("utf8");
const crypto = require("crypto");
const base64 = require("base-64");

function toMD5(string) {
    return crypto.createHash("MD5").update(string).digest("hex");
};

function toBase64String(string) {
    const bytes = utf8.encode(string);
    const encoded = base64.encode(bytes);
    return encoded;
}

function fromBase64String(string) {
    const bytes = base64.decode(string);
    const decoded = utf8.decode(bytes);
    return decoded;
}


const MD5Hash = toMD5("12345");

const base64String = toBase64String("12345");

const decodeBase64 = fromBase64String(base64String);

console.log(decodeBase64);