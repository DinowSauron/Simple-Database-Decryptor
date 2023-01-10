const CryptoJS = require('crypto-js');
require('dotenv').config();

const SECRET = process.env.CRYPTO_SECRET;
const IV = process.env.CRYPTO_IV;
const CRYPTO_DISABLED = false; //process.env.CRYPTO_DISABLED;

const cryptoIsDisabled = () => {
  if (CRYPTO_DISABLED === null || CRYPTO_DISABLED === undefined) {
    return false;
  }
  if (typeof CRYPTO_DISABLED === 'string') {
    return CRYPTO_DISABLED.toLowerCase() === 'true';
  }
  return CRYPTO_DISABLED;
};

var key = CryptoJS.enc.Hex.parse(SECRET);
var iv = CryptoJS.enc.Hex.parse(IV);

function encrypt(text) {
  if (cryptoIsDisabled()) {
    return text;
  }
  const crypted = CryptoJS.AES.encrypt(text, key, { iv }).toString();
  return crypted;
}

function decrypt(ciphertext) {
  try {
    if (cryptoIsDisabled()) {
      return ciphertext;
    }
    const decripted = CryptoJS.AES.decrypt(ciphertext, key, { iv }).toString(
      CryptoJS.enc.Utf8
    );

    if (ciphertext && !decripted) {
      throw new Error('Decryption failed');
    }
    return decripted;
  } catch (e) {
    return ciphertext;
  }
}

module.exports = {
  encrypt,
  decrypt,
  encryptPersonalData: (data, personalDataFields) => {
    if (!data) return data;

    for (const field of personalDataFields) {
      if (data[field]) {
        data[field] = encrypt(data[field]);
      }
    }

    return data;
  },

  decryptPersonalData: (data, personalDataFields) => {
    if (!data) return data;
    for (const field of personalDataFields) {
      if (data[field]) {
        data[field] = decrypt(data[field]);
      }
    }

    return data;
  },
};
